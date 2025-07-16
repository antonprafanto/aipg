// src/components/Results/PromptCard.js - UPDATED with Keyword Support

import React from 'react';
import { Copy, Tag, Star } from 'lucide-react';
import { categories } from '../../data/categories';
import KeywordDisplay from '../Keywords/KeywordDisplay';

const PromptCard = ({ 
  item, 
  metadata, // ✅ NEW: Metadata support
  index, 
  copiedIndex, 
  onCopy,
  showKeywords, // ✅ NEW: Keyword display toggle
  onCopyKeywords, // ✅ NEW: Keyword copy handler
  onExportMetadata, // ✅ NEW: Metadata export handler
  language, 
  t 
}) => {
  const getCategoryName = (categoryKey) => {
    return language === 'id' ? categories[categoryKey]?.nameId : categories[categoryKey]?.name;
  };

  // ✅ Enhanced copy with metadata option
  const handleCopyWithKeywords = () => {
    if (metadata && metadata.keywords) {
      const enhancedContent = `${item.prompt}\n\nKeywords: ${metadata.keywords.all.join(', ')}\nTitle: ${metadata.title || ''}`;
      navigator.clipboard.writeText(enhancedContent);
    } else {
      onCopy(item.prompt, index);
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:bg-gray-100 transition-all group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
              {getCategoryName(item.category)}
            </span>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
              item.mode === 'midjourney' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {item.mode === 'midjourney' ? 'Midjourney' : item.type}
            </span>
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium">
              {item.theme}
            </span>
            
            {/* ✅ NEW: Keyword count badge */}
            {metadata && metadata.keywords && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <Tag size={10} />
                {metadata.keywords.count} keywords
              </span>
            )}

            {/* ✅ NEW: SEO Score badge */}
            {metadata && metadata.keywords && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <Star size={10} />
                SEO Ready
              </span>
            )}
          </div>

          {/* ✅ NEW: SEO Title display */}
          {metadata && metadata.title && (
            <div className="mb-2 p-2 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-600 font-medium mb-1">
                {language === 'en' ? 'SEO Title:' : 'Judul SEO:'}
              </div>
              <div className="text-sm text-blue-900 font-medium">
                {metadata.title}
              </div>
            </div>
          )}

          <p className="text-gray-700 leading-relaxed text-sm font-mono bg-white p-3 rounded-lg border border-gray-200">
            {item.prompt}
          </p>

          {/* ✅ NEW: Individual Keyword Display */}
          {showKeywords && metadata && metadata.keywords && (
            <div className="mt-3">
              <KeywordDisplay
                keywords={metadata.keywords}
                title={metadata.title}
                language={language}
                onCopyKeywords={onCopyKeywords}
                onExportMetadata={onExportMetadata}
              />
            </div>
          )}
        </div>

        {/* ✅ Enhanced copy buttons */}
        <div className="flex-shrink-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onCopy(item.prompt, index)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all"
            title={language === 'en' ? 'Copy prompt only' : 'Copy prompt saja'}
          >
            {copiedIndex === index ? (
              <span className="text-green-600 text-xs">✓</span>
            ) : (
              <Copy size={16} className="text-gray-600" />
            )}
          </button>

          {/* ✅ NEW: Copy with keywords button */}
          {metadata && metadata.keywords && (
            <button
              onClick={handleCopyWithKeywords}
              className="p-2 bg-blue-200 hover:bg-blue-300 rounded-xl transition-all"
              title={language === 'en' ? 'Copy with keywords' : 'Copy dengan keywords'}
            >
              <Tag size={16} className="text-blue-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;