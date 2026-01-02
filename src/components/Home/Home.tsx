import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-t-8 border-red-800">
        
        <div className="p-8 sm:p-12">
          {/* Приветствие */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
         <span className="text-red-800 dark:text-red-500">Dmitri Nedioglo</span>
          </h1>

          {/* Кто вы и где работаете */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full font-bold text-lg">
              Wein-Technologe
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-lg">
              bei <span className="font-semibold text-gray-800 dark:text-gray-200">Fellbacher Weingärtner</span>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-700 mb-8" />

          {/* Описание приложения */}
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic">
              "Diese App ist ein digitaler Assistent, der speziell für die täglichen Herausforderungen im Weinkeller entwickelt wurde."
            </p>
          </div>

          {/* Кнопки или дополнительные элементы (опционально) */}
          <div className="mt-12 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Bereit für die nächste Ernte
            </div>
          </div>
        </div>

        {/* Декоративный футер */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 text-center border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
            Präzision im Keller • Qualität im Glas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;