import React, { useState, useMemo, useCallback } from 'react';
import FormulAlcCalculation from './FormulAlcCalculation';

const CONVERSION_FACTOR = 0.1267;

const parseAndFormatInput = (value: string): number => {
  const cleanValue = value.replace(',', '.');
  const number = parseFloat(cleanValue);
  return !isNaN(number) && number >= 0 ? number : NaN;
};

interface CalculatorFieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isResult: boolean;
  formula: string;
}

const CalculatorField = ({ label, unit, value, onChange, placeholder, isResult, formula }: CalculatorFieldProps) => (
  <div className={`p-5 rounded-xl shadow-lg transition-all duration-300 ${isResult ? 'bg-green-50 dark:bg-green-900/40 border-l-4 border-green-500' : 'bg-indigo-50 dark:bg-indigo-900/40 border-l-4 border-indigo-500'}`}>
    <label htmlFor={unit} className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex justify-between items-center">
      <span>{label} ({unit})</span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isResult ? 'text-green-600 dark:text-green-400 bg-green-200/50 dark:bg-green-800/50' : 'text-indigo-600 dark:text-indigo-400 bg-indigo-200/50 dark:bg-indigo-800/50'}`}>
        {isResult ? 'Ergebnis' : 'Eingabe'}
      </span>
    </label>
    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 bg-white/50 dark:bg-gray-800/50">
      <input
        id={unit}
        type="text"
        pattern="[0-9]*[.,]?[0-9]*" 
        inputMode="decimal"
        value={value}
        onChange={isResult ? undefined : onChange}
        readOnly={isResult}
        className={`w-full p-3 text-2xl font-mono outline-none bg-transparent ${isResult ? 'text-green-800 dark:text-green-200 font-bold' : 'text-gray-900 dark:text-white'}`}
        placeholder={placeholder}
      />
      <span className={`p-3 text-lg font-bold ${isResult ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{unit}</span>
    </div>
    
    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
      {formula}
    </p>

    {!isResult && value !== '' && isNaN(parseAndFormatInput(value)) && (
        <p className="mt-2 text-sm text-red-500 font-medium">
            Ungültiger Wert. Bitte geben Sie eine positive Zahl ein.
        </p>
    )}
  </div>
);

const AlcCalculation = () => {
  const [showFormula, setShowFormula] = useState(false);
  const [inputGL, setInputGL] = useState<string>(''); 
  
  const resultVOL = useMemo(() => {
    const numGL = parseAndFormatInput(inputGL);
    if (isNaN(numGL)) return '';
    return (numGL * CONVERSION_FACTOR).toFixed(2).replace('.', ',');
  }, [inputGL]);

  const handleGLChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGL(e.target.value);
  }, []);

  const [inputVOL, setInputVOL] = useState<string>(''); 
  
  const resultGL = useMemo(() => {
    const numVol = parseAndFormatInput(inputVOL);
    if (isNaN(numVol)) return '';
    return (numVol / CONVERSION_FACTOR).toFixed(2).replace('.', ',');
  }, [inputVOL]);

  const handleVOLChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVOL(e.target.value);
  }, []);
  
  const toggleFormula = () => setShowFormula(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center pt-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-indigo-700 dark:text-indigo-400">
          Alkohol-Umrechner
        </h1>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-indigo-200 dark:border-indigo-700">
          1. g/l in % Vol. umrechnen
        </h2>
        <div className="space-y-4 mb-10">
          <CalculatorField
            label="Alkohol in Gramm pro Liter"
            unit="g/l"
            value={inputGL}
            onChange={handleGLChange}
            placeholder="0,00"
            isResult={false}
            formula="Eingabe g/l"
          />
          <CalculatorField
            label="Alkohol in Prozent Volumen"
            unit="% Vol."
            value={resultVOL}
            onChange={() => {}}
            placeholder="Ergebnis"
            isResult={true}
            formula=""
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-green-200 dark:border-green-700">
          2. % Vol. in G/l umrechnen
        </h2>
        <div className="space-y-4">
          <CalculatorField
            label="Alkohol in Prozent Volumen"
            unit="% Vol."
            value={inputVOL}
            onChange={handleVOLChange}
            placeholder="0,00"
            isResult={false}
            formula="Eingabe % Vol."
          />
          <CalculatorField
            label="Alkohol in Gramm pro Liter"
            unit="g/l"
            value={resultGL}
            onChange={() => {}}
            placeholder="Ergebnis"
            isResult={true}
            formula=""
          />
        </div>
      </div>
      
      <button
          onClick={toggleFormula}
          className="w-full max-w-lg px-6 py-3 mt-4 mb-8 text-lg font-semibold text-indigo-600 dark:text-indigo-300 bg-white dark:bg-gray-800 border border-indigo-600 dark:border-indigo-500 rounded-lg shadow-md hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300"
      >
          {showFormula ? 'Formeln ausblenden' : 'Die Formeln ansehen'}
      </button>

      {showFormula && (
          <div className="w-full max-w-lg">
              <FormulAlcCalculation />
          </div>
      )}
    </div>
  );
};

export default AlcCalculation;