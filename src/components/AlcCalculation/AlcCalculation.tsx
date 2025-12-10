import React, { useState, useMemo, useCallback } from 'react';

// Константа для коэффициента пересчета: 1 г/л спирта = 0.1267 % об.
const CONVERSION_FACTOR = 0.1267;

// Функция для безопасного парсинга и форматирования числа
const parseAndFormatInput = (value: string): number => {
  // Заменяем запятую на точку для корректного parseFloat
  const cleanValue = value.replace(',', '.');
  const number = parseFloat(cleanValue);
  
  // Возвращаем число, если оно валидно и положительно, иначе NaN
  if (!isNaN(number) && number >= 0) {
    return number;
  }
  return NaN;
};

// Определение типов для пропсов CalculatorField
interface CalculatorFieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isResult: boolean;
  formula: string;
}

// Вспомогательный компонент для поля ввода и вывода
const CalculatorField = ({ label, unit, value, onChange, placeholder, isResult, formula }: CalculatorFieldProps) => (
  // Определяем стили контейнера: зеленый для результата, синий для ввода
  <div className={`p-5 rounded-xl shadow-lg transition-all duration-300 ${isResult ? 'bg-green-50 dark:bg-green-900/40' : 'bg-indigo-50 dark:bg-indigo-900/40'}`}>
    <label htmlFor={unit} className=" text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex justify-between items-center">
      <span>{label} ({unit})</span>
      {/* Метка "Ergebnis" или "Eingabe" */}
      {isResult ? (
        <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-200/50 dark:bg-green-800/50 px-2 py-0.5 rounded-full">Ergebnis</span>
      ) : (
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-200/50 dark:bg-indigo-800/50 px-2 py-0.5 rounded-full">Eingabe</span>
      )}
    </label>
    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
      <input
        id={unit}
        type="text"
        // Разрешаем ввод чисел, точек и запятых
        pattern="[0-9]*[.,]?[0-9]*" 
        inputMode="decimal"
        value={value}
        onChange={onChange}
        className={`w-full p-3 text-2xl font-mono outline-none bg-transparent ${isResult ? 'text-green-800 dark:text-green-200' : 'text-gray-900 dark:text-white'}`}
        placeholder={placeholder}
        // Поле вывода должно быть отключено для редактирования
        disabled={isResult} 
      />
      <span className={`p-3 text-lg font-bold ${isResult ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{unit}</span>
    </div>
    
    {/* Отображение формулы */}
    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
      {formula}
    </p>

    {/* Сообщение об ошибке, если число невалидно */}
    {!isResult && value !== '' && isNaN(parseAndFormatInput(value)) && (
        <p className="mt-2 text-sm text-red-500 font-medium">
            Ungültiger Wert. Bitte geben Sie eine positive Zahl ein.
        </p>
    )}
  </div>
);

// Основной компонент приложения
const AlcCalculation = () => {
  
  // --- Блок 1: g/l в % Vol. ---
  const [inputGL, setInputGL] = useState<string>(''); // Ввод g/l
  
  // Расчет % Vol.
  const resultVOL = useMemo(() => {
    const numGL = parseAndFormatInput(inputGL);
    if (isNaN(numGL)) {
      return '';
    }
    // Формула: g/l * 0,1267
    const calculatedVol = numGL * CONVERSION_FACTOR;
    return calculatedVol.toFixed(2).replace('.', ','); // Используем запятую для отображения
  }, [inputGL]);

  // Обработчик изменения ввода g/l
  const handleGLChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGL(e.target.value);
  }, []);

  // --- Блок 2: % Vol. в g/l ---
  const [inputVOL, setInputVOL] = useState<string>(''); // Ввод % Vol.
  
  // Расчет g/l
  const resultGL = useMemo(() => {
    const numVol = parseAndFormatInput(inputVOL);
    // ИСПРАВЛЕНИЕ: Условие должно проверять только валидность ввода
    if (isNaN(numVol)) {
      return '';
    }
    // Формула: % Vol. / 0,1267
    const calculatedGL = numVol / CONVERSION_FACTOR;
    return calculatedGL.toFixed(2).replace('.', ','); // Используем запятую для отображения
  }, [inputVOL]);

  // Обработчик изменения ввода % Vol.
  const handleVOLChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVOL(e.target.value);
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex justify-center items-start pt-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-indigo-700 dark:text-indigo-400">
          Alkohol-Umrechner
        </h1>
        
        {/* --- Секция 1: G/l in % Vol. umrechnen --- */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-indigo-200 dark:border-indigo-700">
          1. g/l in % Vol. umrechnen
        </h2>
        <div className="space-y-4 mb-10">
          
          {/* Ввод g/l */}
          <CalculatorField
            label="Alkohol in Gramm pro Liter"
            unit="g/l"
            value={inputGL}
            onChange={handleGLChange}
            placeholder="g/l"
            isResult={false}
            formula="Eingabe g/l"
          />

          {/* Вывод % Vol. */}
          <CalculatorField
            label="Alkohol in Prozent Volumen"
            unit="% Vol."
            value={resultVOL}
            onChange={() => {}} // Вывод не редактируется
            placeholder="Ergebnis % Vol."
            isResult={true}
            formula="Ergebnis = g/l × 0,1267"
          />
        </div>

        {/* --- Секция 2: % Vol. in G/l umrechnen --- */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-green-200 dark:border-green-700">
          2. % Vol. in G/l umrechnen
        </h2>
        <div className="space-y-4">
          
          {/* Ввод % Vol. */}
          <CalculatorField
            label="Alkohol in Prozent Volumen"
            unit="% Vol."
            value={inputVOL}
            onChange={handleVOLChange}
            placeholder="% Vol."
            isResult={false}
            formula="Eingabe % Vol."
          />

          {/* Вывод g/l */}
          <CalculatorField
            label="Alkohol in Gramm pro Liter"
            unit="g/l"
            value={resultGL}
            onChange={() => {}} // Вывод не редактируется
            placeholder="Ergebnis g/l"
            isResult={true}
            formula="Ergebnis = % Vol. ÷ 0,1267"
          />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Umrechnungsfaktor: 1 g/l = 0,1267 % Vol.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AlcCalculation;