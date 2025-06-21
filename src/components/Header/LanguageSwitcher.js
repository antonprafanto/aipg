// src/components/Header/LanguageSwitcher.js
import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
      <Globe size={16} className="text-gray-500 dark:text-gray-400" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          language === 'en' 
            ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          language === 'id' 
            ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;