// src/components/Results/PromptsDisplay.js - UPDATED with Keyword Optimization

import React, { useState } from 'react';
import { Bot, Image, Copy, Download, Eye, EyeOff, FileText, FileSpreadsheet, Settings2 } from 'lucide-react';
import PromptCard from './PromptCard';
import KeywordDisplay from '../Keywords/KeywordDisplay';
import { 
  exportToCSV, 
  exportAdobeStockFormat, 
  exportDetailedTXT, 
  exportPromptsTXT,
  exportPortfolioAnalysis 
} from '../../utils/exportHelpers';

const PromptsDisplay = ({ 
  prompts, 
  promptsWithMetadata, // ✅ NEW: Metadata support
  outputMode, 
  copiedIndex, 
  onCopyPrompt, 
  onCopyAllPrompts, 
  onExportPrompts, 
  language, 
  t 
}) => {
  const [showKeywords, setShowKeywords] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  if (prompts.length === 0) return null;

  // ✅ Enhanced export functions
  const handleExportCSV = () => {
    if (promptsWithMetadata && promptsWithMetadata.length > 0) {
      exportToCSV(promptsWithMetadata, 'adobe-stock-prompts');
    } else {
      // Fallback for legacy prompts without metadata
      const basicData = prompts.map((prompt, index) => ({
        prompt,
        title: `Prompt ${index + 1}`,
        keywords: { all: [], count: 0 },
        category: 'Unknown',
        style: 'Unknown',
        mood: 'Unknown'
      }));
      exportToCSV(basicData, 'basic-prompts');
    }
    setExportMenuOpen(false);
  };

  const handleExportAdobeFormat = () => {
    if (promptsWithMetadata && promptsWithMetadata.length > 0) {
      exportAdobeStockFormat(promptsWithMetadata, 'adobe-stock-submission');
    }
    setExportMenuOpen(false);
  };

  const handleExportDetailedTXT = () => {
    if (promptsWithMetadata && promptsWithMetadata.length > 0) {
      exportDetailedTXT(promptsWithMetadata, 'detailed-prompts');
    } else {
      // Fallback for basic prompts
      exportPromptsTXT(prompts, 'basic-prompts');
    }
    setExportMenuOpen(false);
  };

  const handleExportPromptsOnly = () => {
    exportPromptsTXT(prompts, 'prompts-only');
    setExportMenuOpen(false);
  };

  const handleExportAnalysis = () => {
    if (promptsWithMetadata && promptsWithMetadata.length > 0) {
      exportPortfolioAnalysis(promptsWithMetadata, 'portfolio-analysis');
    }
    setExportMenuOpen(false);
  };

  const handleCopyKeywords = (keywords) => {
    navigator.clipboard.writeText(keywords.join(', '));
  };

  const handleExportMetadata = (metadata) => {
    const csvData = [{
      title: metadata.title,
      keywords: metadata.keywords.all.join(', '),
      primary_keywords: metadata.keywords.primary.join(', '),
      secondary_keywords: metadata.keywords.secondary.join(', '),
      tertiary_keywords: metadata.keywords.tertiary.join(', '),
      keyword_count: metadata.keywords.count
    }];
    exportToCSV(csvData, 'single-prompt-metadata');
  };

  // ✅ Calculate portfolio stats
  const portfolioStats = promptsWithMetadata && promptsWithMetadata.length > 0 ? {
    totalKeywords: promptsWithMetadata.reduce((sum, p) => sum + (p.keywords?.count || 0), 0),
    avgKeywords: Math.round(promptsWithMetadata.reduce((sum, p) => sum + (p.keywords?.count || 0), 0) / promptsWithMetadata.length),
    categoriesUsed: [...new Set(promptsWithMetadata.map(p => p.category))].length,
    stylesUsed: [...new Set(promptsWithMetadata.map(p => p.style))].length,
    moodsUsed: [...new Set(promptsWithMetadata.map(p => p.mood))].length,
    hasMetadata: true
  } : {
    hasMetadata: false
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {outputMode === 'midjourney' ? <Bot size={24} className="text-blue-500" /> : <Image size={24} className="text-blue-500" />}
            {t('generatedPrompts')} {outputMode === 'midjourney' ? t('midjourneyPrompts') : t('standardPrompts')} {t('prompts')} ({prompts.length})
          </h2>
          
          {/* ✅ NEW: Portfolio Stats */}
          {portfolioStats.hasMetadata && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {portfolioStats.avgKeywords} avg keywords
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {portfolioStats.categoriesUsed} categories
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {portfolioStats.totalKeywords} total keywords
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {/* ✅ NEW: Toggle Keywords Display */}
          {portfolioStats.hasMetadata && (
            <button
              onClick={() => setShowKeywords(!showKeywords)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                showKeywords
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {showKeywords ? <EyeOff size={16} /> : <Eye size={16} />}
              {showKeywords 
                ? (language === 'en' ? 'Hide Keywords' : 'Sembunyikan Keywords')
                : (language === 'en' ? 'Show Keywords' : 'Tampilkan Keywords')
              }
            </button>
          )}

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

          {/* ✅ Enhanced Export Menu */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
              title={language === 'en' 
                ? 'Export all prompts to a text file' 
                : 'Export semua prompt ke file teks'
              }
            >
              <Download size={16} />
              {t('exportTxt')}
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                    {language === 'en' ? 'Basic Exports' : 'Export Dasar'}
                  </div>
                  
                  <button
                    onClick={handleExportPromptsOnly}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                  >
                    <FileText size={14} />
                    {language === 'en' ? 'Prompts Only (TXT)' : 'Prompts Saja (TXT)'}
                  </button>
                  
                  <button
                    onClick={handleExportDetailedTXT}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                  >
                    <FileText size={14} />
                    {language === 'en' ? 'Detailed with Keywords' : 'Detail dengan Keywords'}
                  </button>

                  {portfolioStats.hasMetadata && (
                    <>
                      <div className="border-t border-gray-100 my-1"></div>
                      <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                        {language === 'en' ? 'Adobe Stock Ready' : 'Siap Adobe Stock'}
                      </div>
                      
                      <button
                        onClick={handleExportCSV}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                      >
                        <FileSpreadsheet size={14} />
                        {language === 'en' ? 'CSV with Metadata' : 'CSV dengan Metadata'}
                      </button>
                      
                      <button
                        onClick={handleExportAdobeFormat}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                      >
                        <Settings2 size={14} />
                        {language === 'en' ? 'Adobe Stock Format' : 'Format Adobe Stock'}
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={handleExportAnalysis}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2"
                      >
                        <Settings2 size={14} />
                        {language === 'en' ? 'Portfolio Analysis' : 'Analisis Portfolio'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
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

      {/* ✅ NEW: Global Keyword Display */}
      {showKeywords && portfolioStats.hasMetadata && promptsWithMetadata.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'en' ? 'Portfolio Keywords Overview' : 'Gambaran Keywords Portfolio'}
          </h3>
          
          {/* Show keywords from first prompt as sample */}
          <KeywordDisplay
            keywords={promptsWithMetadata[0].keywords}
            title={promptsWithMetadata[0].title}
            language={language}
            onCopyKeywords={handleCopyKeywords}
            onExportMetadata={handleExportMetadata}
          />
        </div>
      )}

      <div className="grid gap-4">
        {prompts.map((item, index) => {
          // ✅ Enhanced: Pass metadata if available
          const metadata = promptsWithMetadata && promptsWithMetadata[index] ? promptsWithMetadata[index] : null;
          
          return (
            <PromptCard
              key={item.id || index}
              item={item}
              metadata={metadata} // ✅ NEW: Pass metadata to card
              index={index}
              copiedIndex={copiedIndex}
              onCopy={onCopyPrompt}
              showKeywords={showKeywords} // ✅ NEW: Pass keyword display state
              onCopyKeywords={handleCopyKeywords} // ✅ NEW: Pass keyword copy handler
              onExportMetadata={handleExportMetadata} // ✅ NEW: Pass metadata export handler
              language={language}
              t={t}
            />
          );
        })}
      </div>

      {/* Click outside to close export menu */}
      {exportMenuOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setExportMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default PromptsDisplay;