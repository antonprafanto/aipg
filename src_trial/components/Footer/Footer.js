// src/components/Footer/Footer.js
import React from 'react';

const Footer = ({ t }) => {
  return (
    <div className="text-center mt-8 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <p className="mb-4">{t('footer.description')}</p>
      <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl px-6 py-3 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
        <span className="text-lg">💖</span>
        <div className="text-left">
          <p className="text-gray-800 dark:text-gray-200 font-medium text-sm transition-colors duration-300">{t('footer.freeMessage')}</p>
          <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300">{t('footer.supportMessage')}</p>
        </div>
        <a
          href="https://trakteer.id/anton-prafanto-nszpm/tip"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center gap-2"
        >
          <span>🎁</span>
          {t('footer.coffeeButton')}
        </a>
      </div>
    </div>
  );
};

export default Footer;