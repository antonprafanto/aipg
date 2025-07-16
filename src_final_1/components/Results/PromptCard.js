import React from 'react';
import { Copy } from 'lucide-react';
import { categories } from '../../data/categories';

const PromptCard = ({ 
  item, 
  index, 
  copiedIndex, 
  onCopy, 
  language, 
  t 
}) => {
  const getCategoryName = (categoryKey) => {
    return language === 'id' ? categories[categoryKey]?.nameId : categories[categoryKey]?.name;
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
          </div>
          <p className="text-gray-700 leading-relaxed text-sm font-mono bg-white p-3 rounded-lg border border-gray-200">
            {item.prompt}
          </p>
        </div>
        <button
          onClick={() => onCopy(item.prompt, index)}
          className="flex-shrink-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          title={language === 'en' ? 'Copy this prompt to clipboard' : 'Copy prompt ini ke clipboard'}
        >
          {copiedIndex === index ? (
            <span className="text-green-600 text-xs">✓</span>
          ) : (
            <Copy size={16} className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;