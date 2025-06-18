import React from 'react';
import { Settings, Sparkles } from 'lucide-react';

const AdvancedSettings = ({
  showSettings, setShowSettings,
  colorEnhancement, setColorEnhancement,
  qualityPriority, setQualityPriority,
  focusStyle, setFocusStyle,
  lightingPreference, setLightingPreference,
  compositionStyle, setCompositionStyle,
  generatePrompts, t, language
}) => {
  if (!showSettings) return null;

  const handleApplyAndGenerate = () => {
    setShowSettings(false);
    generatePrompts();
    const successMsg = document.createElement('div');
    successMsg.textContent = t('notifications.settingsApplied');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 mb-8 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Settings size={20} />
          {t('advancedSettings')}
        </h3>
        <button
          onClick={() => setShowSettings(false)}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-gray-800 font-medium text-lg mb-3">{t('technicalSpecs')}</h4>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('qualityPriority')}</label>
            <select 
              value={qualityPriority}
              onChange={(e) => setQualityPriority(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="professional" className="bg-white">{language === 'en' ? 'Professional Quality' : 'Kualitas Profesional'}</option>
              <option value="commercial" className="bg-white">{language === 'en' ? 'Commercial Grade' : 'Tingkat Komersial'}</option>
              <option value="artistic" className="bg-white">{language === 'en' ? 'Artistic Excellence' : 'Keunggulan Artistik'}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('focusStyle')}</label>
            <select 
              value={focusStyle}
              onChange={(e) => setFocusStyle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="shallow" className="bg-white">{language === 'en' ? 'Shallow Depth of Field' : 'Kedalaman Bidang Dangkal'}</option>
              <option value="deep" className="bg-white">{language === 'en' ? 'Deep Focus' : 'Fokus Dalam'}</option>
              <option value="selective" className="bg-white">{language === 'en' ? 'Selective Focus' : 'Fokus Selektif'}</option>
              <option value="macro" className="bg-white">{language === 'en' ? 'Macro Detail' : 'Detail Makro'}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('colorEnhancement')}</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setColorEnhancement('vibrant')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                  colorEnhancement === 'vibrant' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('vibrant')}
              </button>
              <button 
                onClick={() => setColorEnhancement('natural')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                  colorEnhancement === 'natural' 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('natural')}
              </button>
              <button 
                onClick={() => setColorEnhancement('muted')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                  colorEnhancement === 'muted' 
                    ? 'bg-gray-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('muted')}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-gray-800 font-medium text-lg mb-3">{t('contentPreferences')}</h4>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('lightingPreference')}</label>
            <select 
              value={lightingPreference}
              onChange={(e) => setLightingPreference(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="golden" className="bg-white">{language === 'en' ? 'Golden Hour Priority' : 'Prioritas Golden Hour'}</option>
              <option value="natural" className="bg-white">{language === 'en' ? 'Natural Light Only' : 'Hanya Cahaya Alami'}</option>
              <option value="studio" className="bg-white">{language === 'en' ? 'Studio Lighting' : 'Pencahayaan Studio'}</option>
              <option value="mixed" className="bg-white">{language === 'en' ? 'Mixed Lighting' : 'Pencahayaan Campuran'}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('compositionStyle')}</label>
            <select 
              value={compositionStyle}
              onChange={(e) => setCompositionStyle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="thirds" className="bg-white">{language === 'en' ? 'Rule of Thirds Focus' : 'Fokus Rule of Thirds'}</option>
              <option value="centered" className="bg-white">{language === 'en' ? 'Centered Composition' : 'Komposisi Terpusat'}</option>
              <option value="dynamic" className="bg-white">{language === 'en' ? 'Dynamic Angles' : 'Sudut Dinamis'}</option>
              <option value="minimalist" className="bg-white">{language === 'en' ? 'Minimalist Layout' : 'Layout Minimalis'}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">{t('marketFocus')}</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">{language === 'en' ? 'Adobe Stock Optimized' : 'Dioptimalkan Adobe Stock'}</span>
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">{language === 'en' ? 'Commercial Use Ready' : 'Siap Penggunaan Komersial'}</span>
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">{language === 'en' ? 'Trending Keywords Priority' : 'Prioritas Kata Kunci Trending'}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
        <button 
          onClick={() => setShowSettings(false)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
        >
          {t('cancel')}
        </button>
        <button 
          onClick={handleApplyAndGenerate}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-2"
        >
          <Sparkles size={16} />
          {t('applyGenerate')}
        </button>
      </div>
    </div>
  );
};

export default AdvancedSettings;