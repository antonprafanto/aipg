import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center gap-2 bg-white backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm">
        <Globe size={16} className="text-gray-500" />
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            language === 'en' 
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('id')}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            language === 'id' 
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ID
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;