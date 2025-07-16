import React from 'react';
import { Bot, Image, Copy, Download } from 'lucide-react';
import PromptCard from './PromptCard';

const PromptsDisplay = ({ 
  prompts, 
  outputMode, 
  copiedIndex, 
  onCopyPrompt, 
  onCopyAllPrompts, 
  onExportPrompts, 
  language, 
  t 
}) => {
  if (prompts.length === 0) return null;

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          {outputMode === 'midjourney' ? <Bot size={24} className="text-blue-500" /> : <Image size={24} className="text-blue-500" />}
          {t('generatedPrompts')} {outputMode === 'midjourney' ? t('midjourneyPrompts') : t('standardPrompts')} {t('prompts')} ({prompts.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCopyAllPrompts}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
            title={language === 'en' 
              ? 'Copy all generated prompts to clipboard' 
              : 'Copy semua prompt yang dibuat ke clipboard'
            }
          >
            <Copy size={16} />
            {t('copyAll')}
          </button>
          <button
            onClick={onExportPrompts}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
            title={language === 'en' 
              ? 'Export all prompts to a text file' 
              : 'Export semua prompt ke file teks'
            }
          >
            <Download size={16} />
            {t('exportTxt')}
          </button>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur-md rounded-2xl p-4 border border-green-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-gray-800 font-medium">{t('thankYou.title')}</p>
              <p className="text-gray-600 text-sm">{t('thankYou.subtitle')}</p>
            </div>
          </div>
          <a
            href="https://trakteer.id/anton-prafanto-nszpm/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all transform hover:scale-105 shadow-sm flex items-center gap-2"
          >
            <span>🙏</span>
            {t('thankYou.button')}
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        {prompts.map((item, index) => (
          <PromptCard
            key={item.id}
            item={item}
            index={index}
            copiedIndex={copiedIndex}
            onCopy={onCopyPrompt}
            language={language}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptsDisplay;