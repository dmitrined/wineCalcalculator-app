import React from 'react';

/**
 * Компонент для отображения математических формул расчета конвертации спирта.
 * ФОРМУЛЫ РАСПОЛОЖЕНЫ ВЕРТИКАЛЬНО и адаптированы для мобильных устройств.
 */
const FormulAlcCalculation: React.FC = () => {
    
    const conversionFactor = 0.1267;
    const unit_GL = <>g/l</>;
    const unit_VOL = <>% Vol.</>;

    // Вспомогательный компонент для визуальной дроби
    const FractionDisplay: React.FC<{ numerator: React.ReactNode; denominator: React.ReactNode; size?: string }> = ({ numerator, denominator, size = '3xl' }) => (
        // Уменьшенный min-w для мобильных
        <div className="flex flex-col items-center min-w-20 sm:min-w-24 mx-2">
            <div className={`pb-1 border-b-4 border-gray-900 dark:border-white w-full text-center text-xl sm:text-${size} font-mono`}>
                {numerator}
            </div>
            <div className={`pt-1 w-full text-center text-xl sm:text-${size} font-mono`}>
                {denominator}
            </div>
        </div>
    );
    
    // Вспомогательный компонент для визуализации формулы в отдельной карточке
    const FormulaCard: React.FC<{ 
        title: string; 
        formulaContent: React.ReactNode; 
        color: string 
    }> = ({ title, formulaContent, color }) => (
        // Уменьшенный p-4 для мобильных
        <div className={`p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 bg-white dark:bg-gray-700/50 border-t-4 border-${color}-500 flex flex-col`}>
            {/* Заголовок: уменьшен с xl до lg на мобильных */}
            <h3 className={`text-lg sm:text-xl font-bold mb-3 text-${color}-600 dark:text-${color}-400 text-center`}>
                {title}
            </h3>
            {/* Блок формулы центрируем */}
            <div className="flex justify-center items-center py-3 sm:py-4"> 
                {/* Формула: уменьшена с 3xl до 2xl на мобильных */}
                <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-900 dark:text-white text-center">
                    {formulaContent}
                </div>
            </div>
        </div>
    );
    
    // 1. g/l in % Vol. umrechnen
    const formulaGLtoVOLContent = (
        <div className="flex items-center">
            {unit_VOL}
            <span className="mx-2">=</span>
            {unit_GL}
            <span className="mx-2">×</span>
            {conversionFactor}
        </div>
    );

    // 2. % Vol. in g/l umrechnen
    const formulaVOLtoGLContent = (
        <div className="flex items-center">
            {unit_GL}
            <span className="mx-2">=</span>
            <FractionDisplay numerator={unit_VOL} denominator={conversionFactor} size="3xl" />
        </div>
    );

    return (
        // Контейнер: уменьшен p-4 для мобильных
        <div className="p-4 sm:p-8 bg-gray-100 dark:bg-gray-800/80 rounded-2xl shadow-2xl w-full mx-auto my-6 border border-gray-300 dark:border-gray-700">

            {/* Заголовок: уменьшен с 3xl до 2xl на мобильных */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">
                Umrechnungsformeln für Alkoholgehalt
            </h2>
            
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 font-semibold text-sm sm:text-base">
                Umrechnungsfaktor: 1 g/l = {conversionFactor} % Vol.
            </p>

            {/* --- Вертикальный макет --- */}
            <div className="space-y-4 sm:space-y-6">
                
                {/* Формула 1: g/l в % Vol. */}
                <FormulaCard 
                    title="1. g/l in % Vol. umrechnen" 
                    formulaContent={formulaGLtoVOLContent} 
                    color="indigo" 
                />

                {/* Формула 2: % Vol. в g/l */}
                <FormulaCard 
                    title="2. % Vol. in g/l umrechnen" 
                    formulaContent={formulaVOLtoGLContent} 
                    color="green" 
                />
            </div>
            {/* ------------------------- */}

            
        </div>
    );
};

export default FormulAlcCalculation;