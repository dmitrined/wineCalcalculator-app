import React from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
// Предполагаем, что FormulSRCalc доступен в том же проекте
import FormulSRCalc from './FormulSRCalc'; 

// --- Определение интерфейсов и схемы валидации Yup ---

interface FormValues {
  gl_SR: string;
  gl_Wein: string;
  l_Wein: string;
  ziel_gl: string;
}

interface CalculationResults {
    liter_SR: number;
    gesamt_Liter: number;
}

const initialResults: CalculationResults = { liter_SR: 0.0, gesamt_Liter: 0.0 };

// ФУНКЦИЯ ДЛЯ ТРАНСФОРМАЦИИ
const numberTransform = (_: any, originalValue: any) => {
    const cleanedValue = originalValue ? String(originalValue).replace(',', '.') : originalValue;
    
    if (cleanedValue === "") {
        return null;
    }
    
    const numberValue = Number(cleanedValue);
    
    return isNaN(numberValue) ? originalValue : numberValue;
};


const validationSchema = Yup.object().shape({
  gl_SR: Yup.number()
    .transform(numberTransform)
    .typeError('Muss eine Zahl sein')
    .required('Pflichtfeld')
    .min(0, 'Muss nicht negativ sein'),
  
  gl_Wein: Yup.number()
    .transform(numberTransform)
    .typeError('Muss eine Zahl sein')
    .required('Pflichtfeld')
    .min(0, 'Muss nicht negativ sein'),

  l_Wein: Yup.number()
    .transform(numberTransform)
    .typeError('Muss eine Zahl sein')
    .required('Pflichtfeld')
    .min(0.01, 'Muss größer als 0 sein'),

  ziel_gl: Yup.number()
    .transform(numberTransform)
    .typeError('Muss eine Zahl sein')
    .required('Pflichtfeld')
    .min(0, 'Muss nicht negativ sein')
    .test(
      'is-between-gl',
      'Zielwert muss zwischen dem g/l Wein und g/l SR liegen',
      function (ziel_gl) {
        const { gl_SR, gl_Wein } = this.parent;
        
        const sr = gl_SR as number || 0;
        const wein = gl_Wein as number || 0;
        const ziel = ziel_gl as number || 0;

        // Проверяем диапазон, если значения заполнены
        if (sr !== 0 && wein !== 0 && ziel !== 0) {
             // Целевое значение должно быть строго между SR и Wein
             const isBetween = (ziel > wein && ziel < sr) || (ziel > sr && ziel < wein);
             
             // Дополнительная проверка: чтобы не было деления на ноль, SR не может равняться Ziel g/l
             const denominatorZero = (sr === ziel);

             if (denominatorZero) {
                 return this.createError({ message: 'g/l SR darf nicht gleich Ziel g/l sein' });
             }

             return isBetween;
        }
        // Если поле невалидно или пусто, позволяем другим валидаторам (required, typeError) выдать ошибку
        return true; 
      }
    )
});


// --- Вспомогательный компонент для отображения результатов (без изменений) ---

const ResultDisplay: React.FC<{ label: string; value: number; description: string }> = ({
  label,
  value,
  description,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center bg-teal-50 dark:bg-teal-900/50 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-teal-500 dark:border-teal-400">
    <div className="flex-1 mb-2 md:mb-0">
      <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{description}</p>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{label}</h3>
    </div>
    <div className="flex-none bg-white dark:bg-gray-800 px-6 py-2 rounded-lg border border-teal-200 dark:border-teal-700 w-full md:w-auto text-right">
      <p className="text-3xl font-mono text-teal-600 dark:text-teal-400">
        {value === 0.0 ? '---' : value.toFixed(4)}
      </p>
    </div>
  </div>
);


// --- Вспомогательный компонент для поля ввода (без изменений) ---

const InputField: React.FC<{ name: keyof FormValues; label: string; unit: string; colorClass: string; placeholder: string }> = ({ 
    name, 
    label, 
    unit, 
    colorClass,
    placeholder
}) => {
    const bgClass = `${colorClass}-100 dark:bg-${colorClass}-900/50`;
    const textClass = `text-${colorClass}-700 dark:text-${colorClass}-300`;
    const borderClass = `border-${colorClass}-300 dark:border-${colorClass}-700`;
    const ringClass = `ring-${colorClass}-500`;

    return (
        <div className={`${bgClass} p-4 rounded-xl shadow-inner`}>
            <label htmlFor={name} className={`block text-sm font-medium ${textClass} mb-2`}>
                {label}
            </label>
            <div className={`flex items-center border ${borderClass} rounded-lg focus-within:ring-2 focus-within:${ringClass}`}>
                <Field
                    id={name}
                    name={name}
                    type="text"
                    inputMode="decimal"
                    className="w-full p-3 text-lg text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400"
                    placeholder={placeholder} 
                />
                <span className={`p-3 text-lg font-bold ${textClass}`}>
                    {unit}
                </span>
            </div>
            <ErrorMessage name={name} component="p" className="mt-2 text-sm text-red-500" />
        </div>
    );
};


// --- Функция расчета (без изменений) ---

const calculateResults = (values: FormValues): CalculationResults => {
    // Безопасно парсим значения, обрабатывая пустые строки и запятые
    const safeParse = (str: string) => parseFloat(str.replace(',', '.') || '0');

    const gl_SR = safeParse(values.gl_SR);
    const gl_Wein = safeParse(values.gl_Wein);
    const l_Wein = safeParse(values.l_Wein);
    const ziel_gl = safeParse(values.ziel_gl);

    const denominator = gl_SR - ziel_gl;

    let liter_SR = 0;
    
    if (Math.abs(denominator) > 1e-6) { 
        liter_SR = l_Wein * (ziel_gl - gl_Wein) / denominator;
        liter_SR = Math.max(0, liter_SR); 
    }

    const gesamt_Liter = l_Wein + liter_SR;

    return { liter_SR, gesamt_Liter };
};


// --- Основной компонент SrCalc ---

const SrCalc: React.FC = () => {
    const initialValues: FormValues = {
        gl_SR: "",   
        gl_Wein: "", 
        l_Wein: "", 
        ziel_gl: "",  
    };

    // Состояние для управления видимостью компонента FormulSRCalc
    const [showFormula, setShowFormula] = React.useState(false);

    const [results, setResults] = React.useState<CalculationResults>(initialResults);

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const calculatedResults = calculateResults(values);
        setResults(calculatedResults);
        setSubmitting(false); 
    };
    
    // Функция для переключения видимости формулы
    const toggleFormula = () => {
        setShowFormula(prev => !prev);
    };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center pt-10"> {/* Изменил flex-justify/items для вертикального расположения */}
      
      {/* Контейнер калькулятора */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
         SR Verschnittrechner 
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Geben Sie die erforderlichen Werte ein und drücken Sie "Berechnen".
        </p>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} 
        >
            {({ isSubmitting }) => (
                <Form className="space-y-8">
                    {/* Секция ввода данных */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            name="gl_SR"
                            label="g/l SR (Süßreserve Zuckergehalt)"
                            unit="g/l"
                            colorClass="purple"
                            placeholder="g/l SR" 
                        />

                        <InputField
                            name="gl_Wein"
                            label="g/l Wein (Grund Wein Zuckergehalt)"
                            unit="g/l"
                            colorClass="orange"
                            placeholder="g/l Wein" 
                        />

                        <InputField
                            name="l_Wein"
                            label="L Wein (Liter Grund Wein)"
                            unit="L"
                            colorClass="sky"
                            placeholder="L Wein" 
                        />

                        <InputField
                            name="ziel_gl"
                            label="Ziel g/l (Ziel Zuckergehalt des Weins)"
                            unit="g/l"
                            colorClass="pink"
                            placeholder="g/l Ziel" 
                        />
                    </div>

                    {/* Кнопка расчета */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 disabled:opacity-50 dark:bg-teal-500 dark:hover:bg-teal-600"
                        >
                            {isSubmitting ? 'Wird berechnet...' : 'Berechnen'}
                        </button>
                    </div>

                    {/* Секция результатов */}
                    <h2 className="text-2xl font-bold pt-4 mb-4 text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700">
                        Ergebnisse
                    </h2>

                    <div className="space-y-4">
                        {/* Liter SR */}
                        <ResultDisplay
                            label={`Liter SR `}
                            value={results.liter_SR}
                            description={``}
                        />

                        {/* Gesamt Liter */}
                        <ResultDisplay
                            label="Gesamt Liter"
                            value={results.gesamt_Liter}
                            description={``}
                        />
                    </div>
                </Form>
            )}
        </Formik>
      </div>
      
      {/* Кнопка для раскрытия формулы */}
      <button
          onClick={toggleFormula}
          className="w-full max-w-3xl px-6 py-3 mb-8 text-lg font-semibold text-teal-600 dark:text-teal-300 bg-white dark:bg-gray-800 border border-teal-600 dark:border-teal-500 rounded-lg shadow-md hover:bg-teal-50 dark:hover:bg-gray-700 transition duration-300"
      >
          {showFormula ? 'Formel verstecken (Formel ausblenden)' : 'Die Formel ansehen'}
      </button>

      {/* Условный рендеринг компонента FormulSRCalc */}
      {showFormula && (
          <div className="w-full max-w-3xl">
              <FormulSRCalc />
          </div>
      )}
      
    </div>
  );
};

export default SrCalc;