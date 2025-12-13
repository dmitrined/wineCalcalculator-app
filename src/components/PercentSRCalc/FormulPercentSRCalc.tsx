import React from 'react';

/**
 * Компонент для отображения формул расчета Süßreserve (SR) в процентах.
 * Адаптирован для лучшего отображения на мобильных устройствах (уменьшенный шрифт формул).
 */
const FormulPercentSRCalc: React.FC = () => {
    // Вспомогательные элементы для унификации
    const L_SR = <>L<sub>SR</sub></>;
    const L_W = <>L<sub>W</sub></>;
    const P_SR = <>%<sub>SR</sub></>;

    // Адаптированный VariableDisplay для мобильных
    const VariableDisplay: React.FC<{ symbol: React.ReactNode; description: string }> = ({ symbol, description }) => (
        <div className="flex items-start p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            {/* Символ: меньше фиксированной ширины на мобильных, но все еще заметен */}
            <div className="text-xl sm:text-2xl font-mono font-extrabold flex-none w-16 sm:w-20 text-teal-600 dark:text-teal-400 mr-4">
                {symbol}
            </div>
            {/* Описание */}
            <div className="flex-grow">
                <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">{description}</p>
            </div>
        </div>
    );

    // Адаптированный FractionDisplay
    const FractionDisplay: React.FC<{ numerator: React.ReactNode; denominator: React.ReactNode }> = ({ numerator, denominator }) => (
        // Убрали scale-90, но уменьшили базовый размер шрифта для мобильных
        <div className="flex flex-col items-center min-w-[100px] sm:min-w-[150px]">
            <div className="pb-1 border-b-4 border-gray-900 dark:border-white w-full text-center">
                {/* Шрифт для дроби: 2xl на мобильных, 3xl на sm+ */}
                <span className="text-2xl sm:text-3xl font-mono text-purple-600 dark:text-purple-400">
                    {numerator}
                </span>
            </div>
            <div className="pt-1 w-full text-center">
                <span className="text-2xl sm:text-3xl font-mono text-purple-600 dark:text-purple-400">
                    {denominator}
                </span>
            </div>
        </div>
    );

    return (
        // Отступы: p-4 на мобильных, p-8 на sm+
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full mx-auto my-6 border border-teal-300 dark:border-teal-700">

            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
                Mathematische Formeln (% SR Rechner)
            </h2>

            {/* --- Секция % AUF (Простой процент) --- */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400 border-b pb-2">
                1. SR % auf (Prozentsatz *vom* Gesamtvolumen)
            </h3>
            
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                Berechnet die Süßreserve als Prozentsatz des Endvolumens.
            </p>

            <div className="flex justify-center items-center py-6 px-2 bg-teal-50 dark:bg-gray-900/50 rounded-lg shadow-inner mb-8">
                {/* Базовый шрифт: 3xl на мобильных, 4xl на sm+ */}
                <div className="flex items-center text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    {L_SR}
                    <span className="mx-2 sm:mx-4">=</span>
                    <FractionDisplay numerator={P_SR} denominator={100} />
                    <span className="mx-2 sm:mx-4 text-3xl">⋅</span>
                    {L_W}
                </div>
            </div>

            {/* --- Секция % IN (Процент в смеси) --- */}
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-teal-600 dark:text-teal-400 border-b pb-2">
                2. SR % in (Prozentsatz *im* fertigen Wein)
            </h3>
            
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                Berechnet die Süßreserve als Prozentsatz der fertigen Mischung.
            </p>

            <div className="flex justify-center items-center py-6 px-2 bg-teal-50 dark:bg-gray-900/50 rounded-lg shadow-inner mb-8">
                {/* Базовый шрифт: 3xl на мобильных, 4xl на sm+ */}
                <div className="flex items-center text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    {L_SR}
                    <span className="mx-2 sm:mx-4">=</span>
                    <FractionDisplay numerator={P_SR} denominator={<>100 - {P_SR}</>} />
                    <span className="mx-2 sm:mx-4 text-3xl">⋅</span>
                    {L_W}
                </div>
            </div>
            
            {/* --- Описание переменных --- */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Beschreibung der Variablen
                </h3>
                <div className="space-y-3">
                    <VariableDisplay 
                        symbol={L_SR} 
                        description="Benötigtes Volumen der Süßreserve in Litern."
                    />
                    <VariableDisplay 
                        symbol={P_SR} 
                        description="Der gewünschte Süßreserve Prozentsatz."
                    />
                    <VariableDisplay 
                        symbol={L_W} 
                        description="Das verfügbare Volumen des Grundweins in Litern."
                    />
                </div>
            </div>

        </div>
    );
};

export default FormulPercentSRCalc;