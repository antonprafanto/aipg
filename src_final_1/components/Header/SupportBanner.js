// src/components/Header/SupportBanner.js
import React from 'react';

const SupportBanner = ({ t }) => {
  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-blue-200 dark:border-blue-700/50 mb-4 transition-colors duration-300">
      <span className="text-2xl">☕</span>
      <div className="text-left">
        <p className="text-gray-800 dark:text-gray-200 font-medium text-sm transition-colors duration-300">{t('supportBanner.title')}</p>
        <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300">{t('supportBanner.subtitle')}</p>
      </div>
      <a
        href="https://trakteer.id/anton-prafanto-nszpm/tip"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-sm"
      >
        {t('supportBanner.button')}
      </a>
    </div>
  );
};

export default SupportBanner;