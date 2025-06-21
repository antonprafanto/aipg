// src/components/OutputMode/OutputModeSelector.js
import React from 'react';
import { Camera, Bot } from 'lucide-react';

const OutputModeSelector = ({ outputMode, setOutputMode, t }) => {
  return (
    <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-3xl p-6 mb-6 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h3 className="text-gray-800 dark:text-gray-200 font-bold text-lg transition-colors duration-300">{t('outputMode')}</h3>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setOutputMode('standard')}
          className={`flex items-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 ${
            outputMode === 'standard' 
              ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Camera size={20} />
          <div className="text-left">
            <div className="font-medium">{t('standardMode.title')}</div>
            <div className="text-xs opacity-80">{t('standardMode.subtitle')}</div>
          </div>
        </button>
        <button
          onClick={() => setOutputMode('midjourney')}
          className={`flex items-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 ${
            outputMode === 'midjourney' 
              ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Bot size={20} />
          <div className="text-left">
            <div className="font-medium">{t('midjourneyMode.title')}</div>
            <div className="text-xs opacity-80">{t('midjourneyMode.subtitle')}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OutputModeSelector;