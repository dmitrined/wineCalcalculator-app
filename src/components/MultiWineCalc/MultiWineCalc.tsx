import React, { useState } from 'react';
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormulMultiCalc from './FormulMultiCalc';

interface WineEntry {
  liter: string;
  sugar: string;
  alcohol: string;
}

interface MultiWineFormValues {
  wines: WineEntry[];
}

interface CalculationResults {
  totalLiters: number;
  avgSugar: number;
  avgAlcohol: number;
}

const validationSchema = Yup.object().shape({
  wines: Yup.array().of(
    Yup.object().shape({
      liter: Yup.number()
        .transform((_, v) => (v === "" ? 0 : Number(String(v).replace(',', '.'))))
        .typeError('Zahl!')
        .min(0),
      sugar: Yup.number()
        .transform((_, v) => (v === "" ? 0 : Number(String(v).replace(',', '.'))))
        .typeError('Zahl!')
        .min(0),
      alcohol: Yup.number()
        .transform((_, v) => (v === "" ? 0 : Number(String(v).replace(',', '.'))))
        .typeError('Zahl!')
        .min(0),
    })
  )
});

const MultiWineCalc: React.FC = () => {
  const [showFormula, setShowFormula] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Изменено на 5 вин
  const initialValues: MultiWineFormValues = {
    wines: Array(5).fill(null).map(() => ({ liter: '', sugar: '', alcohol: '' }))
  };

  const handleSubmit = (values: MultiWineFormValues, { setSubmitting }: FormikHelpers<MultiWineFormValues>) => {
    let totalLiters = 0;
    let totalSugarMass = 0;
    let totalAlcoholMass = 0;

    values.wines.forEach(wine => {
      const l = parseFloat(String(wine.liter).replace(',', '.')) || 0;
      const s = parseFloat(String(wine.sugar).replace(',', '.')) || 0;
      const a = parseFloat(String(wine.alcohol).replace(',', '.')) || 0;

      if (l > 0) {
        totalLiters += l;
        totalSugarMass += l * s;
        totalAlcoholMass += l * a;
      }
    });

    setResults({
      totalLiters,
      avgSugar: totalLiters > 0 ? totalSugarMass / totalLiters : 0,
      avgAlcohol: totalLiters > 0 ? totalAlcoholMass / totalLiters : 0
    });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
          Verschnitt von mehreren Weinen
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-left border-collapse bg-gray-50 dark:bg-gray-900/50">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      <th className="p-4 text-sm font-semibold uppercase">№</th>
                      <th className="p-4 text-sm font-semibold uppercase">Liter (L)</th>
                      <th className="p-4 text-sm font-semibold uppercase">Zucker (g/l)</th>
                      <th className="p-4 text-sm font-semibold uppercase">Alkohol (g/l)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Рендеринг 5 строк на основе начальных значений */}
                    {initialValues.wines.map((_, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <td className="p-4 font-bold text-gray-400">{index + 1}</td>
                        <td className="p-2">
                          <Field
                            name={`wines.${index}.liter`}
                            className="w-full p-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-teal-500 outline-none dark:text-white"
                            placeholder="0,00"
                          />
                        </td>
                        <td className="p-2">
                          <Field
                            name={`wines.${index}.sugar`}
                            className="w-full p-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-orange-500 outline-none dark:text-white"
                            placeholder="0,00"
                          />
                        </td>
                        <td className="p-2">
                          <Field
                            name={`wines.${index}.alcohol`}
                            className="w-full p-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none dark:text-white"
                            placeholder="0,00"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Wird berechnet...' : 'Berechnen'}
              </button>

              {results && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-xl border-l-4 border-teal-500">
                    <p className="text-xs text-teal-600 font-bold uppercase">Gesamtvolumen</p>
                    <p className="text-3xl font-mono font-bold dark:text-white">{results.totalLiters.toFixed(2)} L</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-xl border-l-4 border-orange-500">
                    <p className="text-xs text-orange-600 font-bold uppercase">Ø Zuckergehalt</p>
                    <p className="text-3xl font-mono font-bold dark:text-white">{results.avgSugar.toFixed(2)} g/l</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl border-l-4 border-purple-500">
                    <p className="text-xs text-purple-600 font-bold uppercase">Ø Alkoholgehalt</p>
                    <p className="text-3xl font-mono font-bold dark:text-white">{results.avgAlcohol.toFixed(2)} g/l</p>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <button
        type="button"
        onClick={() => setShowFormula(!showFormula)}
        className="w-full max-w-4xl py-3 px-6 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 border-2 border-teal-600 dark:border-teal-400 rounded-xl font-bold hover:bg-teal-50 dark:hover:bg-gray-700 transition duration-300 mb-8"
      >
        {showFormula ? 'Formel ausblenden' : 'Die Formel ansehen'}
      </button>

      {showFormula && <FormulMultiCalc />}
    </div>
  );
};

export default MultiWineCalc;