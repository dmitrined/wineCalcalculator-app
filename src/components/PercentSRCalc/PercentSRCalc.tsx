import React, { useState, useMemo } from "react";
// Импорт нового компонента
import FormulPercentSRCalc from "./FormulPercentSRCalc"; 

// Основной компонент приложения
const PercentSRCalc = () => {
  // Состояния для входных данных
  const [percentSR, setPercentSR] = useState(""); // Соответствует D2: Желаемый % SR
  const [literWein, setLiterWein] = useState(""); // Соответствует F2: Liter Wein
  
  // Состояние для отображения формулы
  const [showFormula, setShowFormula] = useState(false); // НОВОЕ СОСТОЯНИЕ

  // Парсинг входных данных в числа
  const P = parseFloat(percentSR);
  const L = parseFloat(literWein);

  // Флаг для проверки корректности входных данных
  const areInputsValid = P >= 0 && L >= 0 && P < 100; // % SR не может быть 100 или больше для формулы "% in"

  // Расчет результата "% auf"
  // Формула: (D2/100) * F2
  const resultAuf = useMemo(() => {
    if (!areInputsValid || isNaN(P) || isNaN(L)) {
      return 0.0;
    }
    return (P / 100) * L;
  }, [P, L, areInputsValid]);

  // Расчет результата "% in"
  // Формула: D2 / (100 - D2) * F2
  const resultIn = useMemo(() => {
    if (!areInputsValid || isNaN(P) || isNaN(L)) {
      return 0.0;
    }
    const denominator = 100 - P;

    // Защита от деления на ноль или отрицательное число (когда P >= 100)
    if (denominator <= 0) {
      return "N/A"; // Not Applicable, или можно использовать другое сообщение
    }
    return (P / denominator) * L;
  }, [P, L, areInputsValid]);

  // Функция для обработки ввода чисел
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(",", "."); // Заменяем запятую на точку для корректного parseFloat
      setter(value);
    };
    
  // Функция для переключения видимости формулы
  const toggleFormula = () => {
    setShowFormula(prev => !prev);
  };

  // Вспомогательный компонент для отображения результатов
  const ResultDisplay = ({
    label,
    value,
    description,
  }: {
    label: string;
    value: number | string;
    description: string;
  }) => (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex-1 mb-2 md:mb-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {description}
        </p>
        <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          {label}
        </h3>
      </div>
      <div className="flex-none bg-white dark:bg-gray-800 px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-600 w-full md:w-auto text-right">
        <p className="text-3xl font-mono text-gray-900 dark:text-white">
          {typeof value === "number" ? value.toFixed(2) : value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center pt-10"> {/* Изменено на flex-col items-center */}
      
      {/* Контейнер калькулятора */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
           SR Rechner 
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Geben Sie den gewünschten SR Prozentsatz und die Literzahl des Weins.
        </p>

        {/* Секция ввода данных */}
        <div className="space-y-6 mb-10">
          {/* Ввод % SR (D2) */}
          <div className="bg-pink-100 dark:bg-purple-900/50 p-4 rounded-xl shadow-inner">
            <label
              htmlFor="percentSR"
              className="block text-sm font-medium text-pink-700 dark:text-pink-300 mb-2"
            >
              % SR 
            </label>
            <div className="flex items-center border border-pink-300 dark:border-pink-700 rounded-lg focus-within:ring-2 focus-within:ring-pink-500">
              <input
                id="percentSR"
                type="text"
                pattern="[0-9]*[.,]?[0-9]*"
                inputMode="decimal"
                value={percentSR}
                onChange={handleInputChange(setPercentSR)}
                className="w-full p-3 text-lg text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400"
                placeholder="SR-Prozentsatz"
              />
              <span className="p-3 text-lg font-bold text-pink-600 dark:text-pink-400">
                %
              </span>
            </div>
            {P >= 100 && (
              <p className="mt-2 text-sm text-red-500">
                % SR muss kleiner als 100 sein, damit „% in“ korrekt berechnet werden kann.
              </p>
            )}
          </div>

          {/* Ввод Liter Wein (F2) */}
          <div className="bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-xl shadow-inner">
            <label
              htmlFor="literWein"
              className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2"
            >
              Liter Wein 
            </label>
            <div className="flex items-center border border-yellow-300 dark:border-yellow-700 rounded-lg focus-within:ring-2 focus-within:ring-yellow-500">
              <input
                id="literWein"
                type="text"
                pattern="[0-9]*[.,]?[0-9]*"
                inputMode="decimal"
                value={literWein}
                onChange={handleInputChange(setLiterWein)}
                className="w-full p-3 text-lg text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400"
                placeholder="Liter Wein"
              />
              <span className="p-3 text-lg font-bold text-yellow-600 dark:text-yellow-400">
                L
              </span>
            </div>
          </div>
        </div>

        {/* Секция результатов */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Berechnungsergebnisse (Liter SR)
        </h2>

        <div className="space-y-4">
          <ResultDisplay
            label="SR % auf"
            value={resultAuf}
            description="Basierend auf dem Volumen des Grundweins."
          />

          <ResultDisplay
            label="SR % in"
            value={resultIn}
            description="Basierend auf dem Gesamtvolumen der fertigen Mischung."
          />
        </div>
      </div>
      
      {/* Кнопка для раскрытия формулы */}
      <button
          onClick={toggleFormula}
          className="w-full max-w-2xl px-6 py-3 mt-4 mb-8 text-lg font-semibold text-teal-600 dark:text-teal-300 bg-white dark:bg-gray-800 border border-teal-600 dark:border-teal-500 rounded-lg shadow-md hover:bg-teal-50 dark:hover:bg-gray-700 transition duration-300"
      >
          {showFormula ? 'Formel verstecken (Formel ausblenden)' : 'Die Formeln ansehen'}
      </button>

      {/* Условный рендеринг компонента FormulPercentSRCalc */}
      {showFormula && (
          <div className="w-full max-w-2xl">
              <FormulPercentSRCalc />
          </div>
      )}
    </div>
  );
};
export default PercentSRCalc;