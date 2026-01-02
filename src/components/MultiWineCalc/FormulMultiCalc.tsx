import React from 'react';

const FormulMultiCalc: React.FC = () => {
    return (
        <div className="w-full max-w-4xl p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-teal-500">
            <h2 className="text-xl sm:text-2xl font-extrabold text-teal-600 dark:text-teal-400 mb-4 sm:mb-6 text-center">
                Mathematik des Verschnitts
            </h2>
            
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 italic text-xs sm:text-base px-2">
                Berechnung der Endparameter für Zucker und Alkohol in Gramm pro Liter (g/l).
            </p>

            {/* Блок универсальной формулы */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-10 rounded-xl mb-8 border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex items-center justify-center min-w-max gap-3 sm:gap-5 text-lg sm:text-3xl font-mono font-bold text-gray-800 dark:text-white">
                        
                        <div className="flex flex-col items-end shrink-0">
                            <span className="text-[10px] sm:text-xs text-teal-600 uppercase tracking-tighter">Ergebnis</span>
                            <span>P<sub>Ges</sub></span>
                        </div>

                        <span className="text-2xl sm:text-4xl">=</span>

                        <div className="flex flex-col items-center">
                            {/* Числитель: Универсальный ряд до n */}
                            <div className="px-4 sm:px-8 pb-3 border-b-2 sm:border-b-4 border-gray-800 dark:border-white">
                                (L₁·P₁) + (L₂·P₂) + ... + (L<sub>n</sub>·P<sub>n</sub>)
                            </div>
                            
                            {/* Знаменатель: Сумма литров до n */}
                            <div className="px-4 sm:px-8 pt-3">
                                L₁ + L₂ + ... + L<sub>n</sub>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center sm:hidden pt-2">
                    <span className="text-[10px] text-gray-400 animate-pulse">← Formel wischen →</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base">
                <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-1">
                        Legende:
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-8 sm:w-12 sm:h-10 flex-none flex items-center justify-center bg-teal-100 dark:bg-teal-900 text-teal-600 rounded-lg font-bold">L</span>
                        <p className="text-gray-600 dark:text-gray-400">Volumen der Partie (Liter)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-8 sm:w-12 sm:h-10 flex-none flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-lg font-bold">P</span>
                        <p className="text-gray-600 dark:text-gray-400">Parameter (Zucker/Alkohol in g/l)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-8 sm:w-12 sm:h-10 flex-none flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold italic text-lg sm:text-xl font-serif">n</span>
                        <p className="text-gray-600 dark:text-gray-400">Anzahl der beteiligten Weine</p>
                    </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 sm:p-5 rounded-xl border border-teal-200 dark:border-teal-800 flex flex-col justify-center">
                    <h4 className="text-teal-700 dark:text-teal-400 font-bold mb-2 uppercase text-[10px] sm:text-xs tracking-widest">Logik:</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                        Die Gesamtmasse (Summe aus Volumen × Konzentration) wird durch das gesamte Volumen aller beteiligten Partien (1 bis <span className="italic font-bold text-teal-600">n</span>) geteilt.
                    </p>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-[10px] sm:text-xs text-gray-400">
                    Mathematisch präzises gewichtetes Mittel für die Assemblage im Weinkeller.
                </p>
            </div>
        </div>
    );
};

export default FormulMultiCalc;