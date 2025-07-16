// src/components/Keywords/KeywordDisplay.js - Keyword Metadata Display

import React, { useState } from 'react';
import { Tag, Copy, Download, Eye, EyeOff, Target, Zap, Star } from 'lucide-react';

const KeywordDisplay = ({ keywords, title, language, onCopyKeywords, onExportMetadata }) => {
  const [showKeywords, setShowKeywords] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);

  if (!keywords || !keywords.all || keywords.all.length === 0) {
    return null;
  }

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatKeywordsForCopy = (keywordArray) => {
    return keywordArray.join(', ');
  };

  const getKeywordTypeIcon = (type) => {
    switch(type) {
      case 'primary': return <Target size={12} className="text-red-500" />;
      case 'secondary': return <Zap size={12} className="text-orange-500" />;
      case 'tertiary': return <Star size={12} className="text-blue-500" />;
      default: return <Tag size={12} className="text-gray-500" />;
    }
  };

  const getKeywordTypeLabel = (type) => {
    const labels = {
      primary: language === 'en' ? 'Primary Keywords (Highest Search Weight)' : 'Keyword Utama (Bobot Pencarian Tertinggi)',
      secondary: language === 'en' ? 'Secondary Keywords (Medium Search Weight)' : 'Keyword Sekunder (Bobot Pencarian Sedang)', 
      tertiary: language === 'en' ? 'Tertiary Keywords (Supporting Keywords)' : 'Keyword Tersier (Keyword Pendukung)'
    };
    return labels[type] || type;
  };

  const renderKeywordSection = (keywordArray, type, maxDisplay = 10) => {
    if (!keywordArray || keywordArray.length === 0) return null;

    const displayKeywords = showKeywords ? keywordArray : keywordArray.slice(0, maxDisplay);
    const hasMore = keywordArray.length > maxDisplay;

    return (
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getKeywordTypeIcon(type)}
            <span className="text-sm font-medium text-gray-700">
              {getKeywordTypeLabel(type)}
            </span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {keywordArray.length}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(formatKeywordsForCopy(keywordArray), type)}
            className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg transition-colors flex items-center gap-1"
          >
            <Copy size={10} />
            {copiedSection === type ? (language === 'en' ? 'Copied!' : 'Tersalin!') : (language === 'en' ? 'Copy' : 'Salin')}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {displayKeywords.map((keyword, index) => (
            <span 
              key={index}
              className={`text-xs px-2 py-1 rounded-full border ${
                type === 'primary' 
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : type === 'secondary'
                  ? 'bg-orange-50 text-orange-700 border-orange-200' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              {keyword}
            </span>
          ))}
          {hasMore && !showKeywords && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{keywordArray.length - maxDisplay} more...
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-green-600" />
          <h3 className="font-semibold text-gray-800">
            {language === 'en' ? 'Adobe Stock Keywords & Metadata' : 'Keywords & Metadata Adobe Stock'}
          </h3>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            {keywords.count}/49 keywords
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeywords(!showKeywords)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors flex items-center gap-1"
          >
            {showKeywords ? <EyeOff size={12} /> : <Eye size={12} />}
            {showKeywords 
              ? (language === 'en' ? 'Hide All' : 'Sembunyikan') 
              : (language === 'en' ? 'Show All' : 'Tampilkan Semua')
            }
          </button>
          <button
            onClick={() => copyToClipboard(formatKeywordsForCopy(keywords.all), 'all')}
            className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Copy size={12} />
            {copiedSection === 'all' 
              ? (language === 'en' ? 'Copied!' : 'Tersalin!') 
              : (language === 'en' ? 'Copy All' : 'Salin Semua')
            }
          </button>
        </div>
      </div>

      {/* SEO Title */}
      {title && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              {language === 'en' ? 'SEO Optimized Title' : 'Judul Dioptimalkan SEO'}
            </span>
            <button
              onClick={() => copyToClipboard(title, 'title')}
              className="text-xs px-2 py-1 bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-lg transition-colors flex items-center gap-1"
            >
              <Copy size={10} />
              {copiedSection === 'title' 
                ? (language === 'en' ? 'Copied!' : 'Tersalin!') 
                : (language === 'en' ? 'Copy' : 'Salin')
              }
            </button>
          </div>
          <p className="text-sm text-blue-900 font-medium">{title}</p>
          <p className="text-xs text-blue-600 mt-1">
            {title.length}/200 characters • {language === 'en' ? 'Adobe Stock optimized' : 'Dioptimalkan Adobe Stock'}
          </p>
        </div>
      )}

      {/* Keyword Sections */}
      {renderKeywordSection(keywords.primary, 'primary', 10)}
      {renderKeywordSection(keywords.secondary, 'secondary', 10)}
      {renderKeywordSection(keywords.tertiary, 'tertiary', 10)}

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-lg font-semibold text-red-600">{keywords.primary?.length || 0}</div>
            <div className="text-xs text-gray-600">{language === 'en' ? 'Primary' : 'Utama'}</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-orange-600">{keywords.secondary?.length || 0}</div>
            <div className="text-xs text-gray-600">{language === 'en' ? 'Secondary' : 'Sekunder'}</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-600">{keywords.tertiary?.length || 0}</div>
            <div className="text-xs text-gray-600">{language === 'en' ? 'Tertiary' : 'Tersier'}</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">{keywords.count}</div>
            <div className="text-xs text-gray-600">{language === 'en' ? 'Total' : 'Total'}</div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          {language === 'en' 
            ? 'Ready for Adobe Stock submission' 
            : 'Siap untuk submisi Adobe Stock'
          }
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onCopyKeywords && onCopyKeywords(keywords.all)}
            className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <Copy size={12} />
            {language === 'en' ? 'Keywords Only' : 'Keywords Saja'}
          </button>
          <button
            onClick={() => onExportMetadata && onExportMetadata({ keywords, title })}
            className="text-xs px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Download size={12} />
            {language === 'en' ? 'Export CSV' : 'Export CSV'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordDisplay;