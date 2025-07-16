import React from 'react';

const FloatingButton = ({ t }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://trakteer.id/anton-prafanto-nszpm/tip"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg transition-all transform hover:scale-110 animate-pulse hover:animate-none flex items-center gap-2"
        title={t('floatingSupport')}
      >
        <span className="text-xl">❤️</span>
        <span className="hidden group-hover:block font-medium text-sm whitespace-nowrap pr-2">{t('support')}</span>
      </a>
    </div>
  );
};

export default FloatingButton;