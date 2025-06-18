import React from 'react';
import { Code } from 'lucide-react';
import { mjAspectRatios, mjVersions } from '../../data/styles';

const MidjourneySettings = ({
  mjVersion, setMjVersion,
  mjAspectRatio, setMjAspectRatio,
  mjQuality, setMjQuality,
  mjChaos, setMjChaos,
  mjStylize, setMjStylize,
  mjWeird, setMjWeird,
  mjNoElements, setMjNoElements,
  mjRaw, setMjRaw,
  mjTile, setMjTile,
  mjNiji, setMjNiji,
  language, t
}) => {
  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 mb-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Code size={20} />
        {t('mjSettings')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Version */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('version')}</label>
          <select 
            value={mjVersion}
            onChange={(e) => setMjVersion(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {mjVersions.map(version => (
              <option key={version.value} value={version.value} className="bg-white">
                {version.label}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-xs mt-1">
            {mjVersions.find(v => v.value === mjVersion)?.desc}
          </p>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('aspectRatio')}</label>
          <select 
            value={mjAspectRatio}
            onChange={(e) => setMjAspectRatio(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {mjAspectRatios.map(ratio => (
              <option key={ratio.value} value={ratio.value} className="bg-white">
                {ratio.label}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-xs mt-1">
            {mjAspectRatios.find(r => r.value === mjAspectRatio)?.desc}
          </p>
        </div>

        {/* Quality */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t('quality')}</label>
          <select 
            value={mjQuality}
            onChange={(e) => setMjQuality(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="0.25" className="bg-white">{language === 'en' ? 'Draft (0.25) - Fast & cheap' : 'Draft (0.25) - Cepat & hemat'}</option>
            <option value="0.5" className="bg-white">{language === 'en' ? 'Low (0.5) - Faster generation' : 'Low (0.5) - Generasi lebih cepat'}</option>
            <option value="1" className="bg-white">{language === 'en' ? 'Standard (1) - Default' : 'Standard (1) - Default'}</option>
            <option value="2" className="bg-white">{language === 'en' ? 'High (2) - V7 pre-optimization' : 'High (2) - V7 pra-optimisasi'}</option>
            <option value="4" className="bg-white">{language === 'en' ? 'Ultra (4) - Experimental mode' : 'Ultra (4) - Mode eksperimental'}</option>
          </select>
        </div>

        {/* Chaos */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t('chaos')}: {mjChaos}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={mjChaos}
            onChange={(e) => setMjChaos(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-500 text-xs mt-1">
            <span>{language === 'en' ? 'Predictable' : 'Dapat diprediksi'}</span>
            <span>{language === 'en' ? 'Random' : 'Acak'}</span>
          </div>
        </div>

        {/* Stylize */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t('stylize')}: {mjStylize}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={mjStylize}
            onChange={(e) => setMjStylize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-500 text-xs mt-1">
            <span>{language === 'en' ? 'Accurate' : 'Akurat'}</span>
            <span>{language === 'en' ? 'Artistic' : 'Artistik'}</span>
          </div>
        </div>

        {/* Weird */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t('weird')}: {mjWeird}
          </label>
          <input
            type="range"
            min="0"
            max="3000"
            value={mjWeird}
            onChange={(e) => setMjWeird(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-500 text-xs mt-1">
            <span>{language === 'en' ? 'Normal' : 'Normal'}</span>
            <span>{language === 'en' ? 'Surreal' : 'Surreal'}</span>
          </div>
        </div>

        {/* Enhanced Exclude Elements with Presets */}
        <div className="md:col-span-3">
          <label className="block text-gray-700 font-medium mb-2">
            {t('excludeElements')} 
            <span className="text-green-600 ml-2">✨ Auto: text, logos, watermarks</span>
          </label>
          
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              onClick={() => setMjNoElements('mockup elements, UI, interface, buttons')}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs transition-all"
            >
              📱 Mockup Mode
            </button>
            <button
              type="button"
              onClick={() => setMjNoElements('vintage, old, aged, worn, damaged')}
              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-xs transition-all"
            >
              ✨ Clean & Fresh
            </button>
            <button
              type="button"
              onClick={() => setMjNoElements('cartoon, anime, illustrated, drawn, painted')}
              className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs transition-all"
            >
              📸 Photo Only
            </button>
            <button
              type="button"
              onClick={() => setMjNoElements('dark, shadows, low light, dim')}
              className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-xs transition-all"
            >
              ☀️ Bright Mode
            </button>
            <button
              type="button"
              onClick={() => setMjNoElements('')}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs transition-all"
            >
              🗑️ Clear
            </button>
          </div>

          <input
            type="text"
            value={mjNoElements}
            onChange={(e) => setMjNoElements(e.target.value)}
            placeholder="blur, distortion, vintage, dark lighting..."
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <div className="mt-2 text-gray-500 text-xs space-y-1">
            <p><strong>✅ Auto-excluded:</strong> text, logos, watermarks, people, animals, UI elements</p>
            <p><strong>💡 Tip:</strong> Gunakan preset atau tambah manual. Pisahkan dengan koma.</p>
            <p><strong>🎯 Mockup Mode:</strong> Khusus untuk design work tanpa elemen UI yang mengganggu</p>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-gray-700">
            <input 
              type="checkbox" 
              checked={mjRaw}
              onChange={(e) => setMjRaw(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{t('rawMode')}</span>
          </label>
          <label className="flex items-center gap-3 text-gray-700">
            <input 
              type="checkbox" 
              checked={mjTile}
              onChange={(e) => setMjTile(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{t('tilePattern')}</span>
          </label>
          <label className="flex items-center gap-3 text-gray-700">
            <input 
              type="checkbox" 
              checked={mjNiji}
              onChange={(e) => setMjNiji(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{t('nijiAnime')}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MidjourneySettings;