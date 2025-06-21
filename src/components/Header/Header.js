// src/components/Header/Header.js
import React from 'react';
import { Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SupportBanner from './SupportBanner';
import ThemeToggle from '../UI/ThemeToggle';

const Header = ({ language, setLanguage, t }) => {
  return (
    <div className="text-center mb-8">
      {/* Language and Theme Controls */}
      <div className="flex justify-between items-start mb-4">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <ThemeToggle />
      </div>

      {/* Main Title */}
      <div className="inline-flex items-center gap-3 mb-4 bg-white dark:bg-gray-800 backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
        <Sparkles className="text-blue-500 dark:text-blue-400" size={24} />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('title')}</h1>
        <Sparkles className="text-blue-500 dark:text-blue-400" size={24} />
      </div>
      
      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-4 transition-colors duration-300">
        {t('subtitle')}
      </p>
      
      {/* Support Banner */}
      <SupportBanner t={t} />
    </div>
  );
};

export default Header;