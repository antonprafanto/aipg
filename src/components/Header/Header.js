import React from 'react';
import { Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SupportBanner from './SupportBanner';

const Header = ({ language, setLanguage, t }) => {
  return (
    <div className="text-center mb-8">
      <LanguageSwitcher language={language} setLanguage={setLanguage} />

      <div className="inline-flex items-center gap-3 mb-4 bg-white backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 shadow-sm">
        <Sparkles className="text-blue-500" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
        <Sparkles className="text-blue-500" size={24} />
      </div>
      
      <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-4">
        {t('subtitle')}
      </p>
      
      <SupportBanner t={t} />
    </div>
  );
};

export default Header;