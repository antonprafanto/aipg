import React from 'react';
import { Camera, Video, Settings, Shuffle, RefreshCw, Zap } from 'lucide-react';
import { categories } from '../../data/categories';
import { styles, moods } from '../../data/styles';

const ControlPanel = ({
  selectedCategory, setSelectedCategory,
  contentType, setContentType,
  selectedStyle, setSelectedStyle,
  selectedMood, setSelectedMood,
  promptCount, setPromptCount,
  outputMode,
  isGenerating,
  showSettings, setShowSettings,
  generatePrompts, randomizeAll,
  language, t
}) => {
  const getCategoryName = (categoryKey) => {
    return language === 'id' ? categories[categoryKey]?.nameId : categories[categoryKey]?.name;
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 mb-8 border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('category')}</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.entries(categories).map(([key, cat]) => (
              <option key={key} value={key} className="bg-white text-gray-800">
                {cat.icon} {getCategoryName(key)}
              </option>
            ))}
          </select>
        </div>

        {/* Content Type (for Standard mode only) */}
        {outputMode === 'standard' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('contentType')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setContentType('photo')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  contentType === 'photo' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Camera size={16} />
                {t('photo')}
              </button>
              <button
                onClick={() => setContentType('video')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  contentType === 'video' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Video size={16} />
                {t('video')}
              </button>
            </div>
          </div>
        )}

        {/* Style */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('style')}</label>
          <select 
            value={selectedStyle} 
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.entries(styles).map(([key, style]) => (
              <option key={key} value={key} className="bg-white text-gray-800">
                {t(`styles.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('mood')}</label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.keys(moods).map((mood) => (
              <option key={mood} value={mood} className="bg-white text-gray-800">
                {t(`moods.${mood}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt Count & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">{t('promptCount')}:</label>
          <input
            type="range"
            min="1"
            max="500"
            value={promptCount}
            onChange={(e) => setPromptCount(parseInt(e.target.value))}
            className="w-32"
          />
          <span className="text-gray-800 font-bold bg-gray-100 px-3 py-1 rounded-lg">
            {promptCount}
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          <a
            href="https://trakteer.id/anton-prafanto-nszpm/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-all transform hover:scale-105 font-medium"
            title={language === 'en' 
              ? 'Support development - Help keep this tool free and growing!' 
              : 'Dukung pengembangan - Bantu tools ini tetap gratis dan berkembang!'
            }
          >
            <span>☕</span>
            <span className="text-sm">{t('support')}</span>
          </a>
          <button
            onClick={randomizeAll}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-all"
            title={language === 'en' 
              ? 'Randomize ALL settings and generate mixed category prompts automatically' 
              : 'Random SEMUA pengaturan dan buat prompt kategori campur otomatis'
            }
          >
            <Zap size={16} />
            <span className="text-sm">{t('randomAll')}</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-all"
            title={language === 'en' ? 'Advanced settings for customization' : 'Pengaturan lanjutan untuk kustomisasi'}
          >
            <Settings size={16} />
            <span className="text-sm">{t('settings')}</span>
          </button>
          <button
            onClick={() => generatePrompts(false)}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all disabled:opacity-50"
            title={language === 'en'
              ? 'Generate prompts using YOUR exact settings (category, style, mood, advanced settings)'
              : 'Buat prompt menggunakan pengaturan ANDA yang tepat (kategori, gaya, mood, pengaturan lanjutan)'
            }
          >
            {isGenerating ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Shuffle size={16} />
            )}
            <span className="text-sm">{isGenerating ? t('generating') : t('generatePrompts')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;