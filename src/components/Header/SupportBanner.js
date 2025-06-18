import React from 'react';

const SupportBanner = ({ t }) => {
  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-md rounded-2xl px-6 py-3 border border-blue-200 mb-4">
      <span className="text-2xl">☕</span>
      <div className="text-left">
        <p className="text-gray-800 font-medium text-sm">{t('supportBanner.title')}</p>
        <p className="text-gray-600 text-xs">{t('supportBanner.subtitle')}</p>
      </div>
      <a
        href="https://trakteer.id/anton-prafanto-nszpm/tip"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all transform hover:scale-105 shadow-sm"
      >
        {t('supportBanner.button')}
      </a>
    </div>
  );
};

export default SupportBanner;