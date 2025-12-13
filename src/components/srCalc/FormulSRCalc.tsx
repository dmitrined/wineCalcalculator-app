import React from 'react';

/**
 * Компонент для отображения формулы расчета Süßreserve (SR) в вине.
 * Адаптирован для лучшего отображения на мобильных устройствах.
 */
const FormulSRCalc: React.FC = () => {
    // Элементы формулы для использования в <sub>
    const L_SR = <>L<sub>SR</sub></>;
    const L_W = <>L<sub>W</sub></>;
    const G_SR = <>g<sub>SR</sub></>;
    const G_W = <>g<sub>W</sub></>;
    const G_Z = <>g<sub>Ziel</sub></>;
    const L_Gesamt = <>L<sub>Gesamt</sub></>;

    // Вспомогательный компонент для отображения переменной (перенесен внутрь FormulSRCalc, чтобы использовать адаптированные стили)
    interface VariableProps {
        symbol: React.ReactNode; 
        description: string; 
        unit: string;       
        color: string;
    }
    
    const FormulaVariable: React.FC<VariableProps> = ({ symbol, description, unit, color }) => (
        // Стили для карточки переменной
        <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition hover:shadow-md border border-gray-200 dark:border-gray-600">
            {/* Символ переменной: W-16 на мобильных, W-20 на sm+ */}
            <div className={`text-xl sm:text-2xl font-mono font-extrabold flex-none w-16 sm:w-20 ${color} mr-4`}>
                {symbol} 
            </div>
            {/* Описание и единица измерения */}
            <div className="flex-grow">
                <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">{description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Einheit: {unit}</p>
            </div>
        </div>
    );


    return (
        // Контейнер с общими стилями: p-4 на мобильных, p-8 на sm+
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full mx-auto my-6 border border-teal-400 dark:border-teal-700">

            {/* Заголовок на немецком: text-2xl на мобильных, text-3xl на sm+ */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-teal-600 dark:text-teal-400">
                Mathematische Formel zur Verschnittberechnung
            </h2>
            <p className="text-center text-sm sm:text-lg text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                Formel zur Bestimmung des benötigten Volumens der Süßreserve ({L_SR}) nach der Mischungsregel (Alligation).
            </p>

            {/* --- БЛОК ОСНОВНОЙ ФОРМУЛЫ (ДИЗАЙН КАРТОЧКИ) --- */}
            <div className="flex flex-col items-center py-6 px-4 sm:py-10 sm:px-6 bg-gray-50 dark:bg-gray-900/70 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl">
                
                {/* Формула: LSR = LW * (ДРОБЬ). Базовый шрифт: 3xl на мобильных, 5xl на sm+ */}
                <div className="flex items-center text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
                    
                    {/* L_SR (КРАСНЫЙ) */}
                    <span className="text-red-500 mr-2 sm:mr-4">
                        {L_SR}
                    </span>
                    <span className="mx-1 sm:mx-2">=</span>
                    {/* L_W (СИНИЙ) */}
                    <span className="text-blue-500 mx-1 sm:mx-4">
                        {L_W}
                    </span>
                    <span className="mx-1 sm:mx-2 text-3xl">⋅</span> {/* Символ умножения */}
                    
                    {/* Правая часть: ДРОБЬ */}
                    {/* Убрали transform scale, уменьшили min-w */}
                    <div className="flex flex-col items-center min-w-[120px] sm:min-w-[180px]">
                        
                        {/* Числитель (Zähler) */}
                        <div className="pb-1 border-b-4 border-gray-900 dark:border-white w-full text-center">
                            {/* Шрифт: 1xl на мобильных, 3xl на sm+ */}
                            <span className="text-xl sm:text-3xl font-mono text-pink-600 dark:text-pink-400">
                                ({G_Z} - {G_W})
                            </span>
                        </div>
                        
                        {/* Знаменатель (Nenner) */}
                        <div className="pt-1 w-full text-center">
                            <span className="text-xl sm:text-3xl font-mono text-purple-600 dark:text-purple-400">
                                ({G_SR} - {G_Z})
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Секция с описанием переменных --- */}
            <div className="mt-8 sm:mt-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                    Beschreibung der Variablen
                </h3>

                <div className="space-y-3">
                    <FormulaVariable
                        symbol={L_SR} 
                        description="Das benötigte Volumen der Süßreserve (SR) in Litern (liter_SR)."
                        unit="L"
                        color="text-red-500"
                    />
                    <FormulaVariable
                        symbol={L_W} 
                        description="Das Volumen des Grundweins (Wein) in Litern (l_Wein)."
                        unit="L"
                        color="text-blue-500"
                    />
                    <FormulaVariable
                        symbol={G_SR} 
                        description="Der Zuckergehalt der Süßreserve (g/l SR) in Gramm pro Liter."
                        unit="g/l"
                        color="text-purple-600"
                    />
                    <FormulaVariable
                        symbol={G_W} 
                        description="Der Zuckergehalt des Grundweins (g/l Wein) in Gramm pro Liter."
                        unit="g/l"
                        color="text-orange-500"
                    />
                    <FormulaVariable
                        symbol={G_Z} 
                        description="Der angestrebte Zuckergehalt des Endweins (Ziel g/l) in Gramm pro Liter."
                        unit="g/l"
                        color="text-pink-600"
                    />
                </div>

                <h3 className="text-lg sm:text-xl font-medium mt-6 sm:mt-8 text-gray-800 dark:text-white">
                    Erläuterung der Formelteile:
                </h3>
                {/* Список объяснений числителя и знаменателя */}
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 dark:text-gray-400 space-y-2 text-sm sm:text-base">
                    <li>
                        <span className="font-bold text-teal-600 dark:text-teal-400">Zähler ({G_Z} - {G_W}):</span>
                        &mdash; Die Differenz zwischen dem Zielgehalt ({G_Z}) und dem Gehalt des Weins ({G_W}).
                    </li>
                    <li>
                        <span className="font-bold text-teal-600 dark:text-teal-400">Nenner ({G_SR} - {G_Z}):</span>
                        &mdash; Die Differenz zwischen dem Gehalt der Süßreserve ({G_SR}) und dem Zielgehalt ({G_Z}).
                    </li>
                </ul>

                {/* Дополнительная формула для общего объема */}
                <h3 className="text-lg sm:text-xl font-medium mt-6 sm:mt-8 text-gray-800 dark:text-white">
                    Formel für das Gesamtvolumen:
                </h3>
                <p className="mt-2 text-base sm:text-lg font-mono font-bold text-gray-900 dark:text-white">
                    {L_Gesamt} = {L_W} + {L_SR}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Das Gesamtvolumen ist die Summe aus dem Volumen des Grundweins ({L_W}) und dem hinzugefügten Volumen der Süßreserve ({L_SR}).
                </p>
            </div>

        </div>
    );
};

// Вспомогательный компонент FormulaVariable был адаптирован и перемещен внутрь FormulSRCalc для лучшей инкапсуляции адаптированных стилей. 
// Однако, если он должен оставаться внешним, его определение должно быть следующим:

/*
interface VariableProps {
    symbol: React.ReactNode; 
    description: string; 
    unit: string;       
    color: string;
}

const FormulaVariable: React.FC<VariableProps> = ({ symbol, description, unit, color }) => (
    // Стили для карточки переменной
    <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition hover:shadow-md border border-gray-200 dark:border-gray-600">
        // Символ переменной: W-16 на мобильных, W-20 на sm+
        <div className={`text-xl sm:text-2xl font-mono font-extrabold flex-none w-16 sm:w-20 ${color} mr-4`}>
            {symbol} // Прямое отображение JSX
        </div>
        // Описание и единица измерения
        <div className="flex-grow">
            <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">{description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Einheit: {unit}</p>
        </div>
    </div>
);
export default FormulSRCalc;
*/

export default FormulSRCalc;