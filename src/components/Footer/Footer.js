import React from 'react';

const Footer = ({ t }) => {
  return (
    <div className="text-center mt-8 text-gray-600">
      <p className="mb-4">{t('footer.description')}</p>
      <div className="inline-flex items-center gap-4 bg-white backdrop-blur-md rounded-2xl px-6 py-3 border border-gray-200 shadow-sm">
        <span className="text-lg">💖</span>
        <div className="text-left">
          <p className="text-gray-800 font-medium text-sm">{t('footer.freeMessage')}</p>
          <p className="text-gray-600 text-xs">{t('footer.supportMessage')}</p>
        </div>
        <a
          href="https://trakteer.id/anton-prafanto-nszpm/tip"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all transform hover:scale-105 shadow-sm flex items-center gap-2"
        >
          <span>🎁</span>
          {t('footer.coffeeButton')}
        </a>
      </div>
    </div>
  );
};

export default Footer;