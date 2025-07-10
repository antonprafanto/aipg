// src/components/Settings/AdvancedSettings.js - FIXED VERSION

import React from "react";
import { Settings, Sparkles, X } from "lucide-react";
import notificationManager from "../../utils/notificationManager";

const AdvancedSettings = ({
  settings,
  language,
  t,
  isVisible,
  setIsVisible,
}) => {
  // ✅ FIX: Remove duplicate conditional - handled in parent
  // if (!showSettings) return null; // REMOVED

  const handleApplyAndGenerate = () => {
    setIsVisible(false);
    notificationManager.success(
      t("notifications.settingsApplied") || "Settings applied successfully!"
    );
  };

  // ✅ FIX: Don't render if not visible
  if (!isVisible) return null;

  return (
    <>
      {/* ✅ NEW: Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />

      {/* ✅ FIXED: Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Settings size={24} />
              {t("advancedSettings") || "Advanced Settings"}
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Technical Settings */}
            <div className="space-y-6">
              <h4 className="text-gray-800 font-semibold text-lg border-b border-gray-200 pb-2">
                {t("technicalSpecs") || "Technical Specifications"}
              </h4>

              {/* Quality Priority */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("qualityPriority") || "Quality Priority"}
                </label>
                <select
                  value={settings.qualityPriority}
                  onChange={(e) => settings.setQualityPriority(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option value="professional">
                    {language === "en"
                      ? "Professional Quality"
                      : "Kualitas Profesional"}
                  </option>
                  <option value="commercial">
                    {language === "en"
                      ? "Commercial Grade"
                      : "Tingkat Komersial"}
                  </option>
                  <option value="artistic">
                    {language === "en"
                      ? "Artistic Excellence"
                      : "Keunggulan Artistik"}
                  </option>
                </select>
              </div>

              {/* Focus Style */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("focusStyle") || "Focus Style"}
                </label>
                <select
                  value={settings.focusStyle}
                  onChange={(e) => settings.setFocusStyle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option value="shallow">
                    {language === "en"
                      ? "Shallow Depth of Field"
                      : "Kedalaman Bidang Dangkal"}
                  </option>
                  <option value="deep">
                    {language === "en" ? "Deep Focus" : "Fokus Dalam"}
                  </option>
                  <option value="artistic">
                    {language === "en" ? "Artistic Blur" : "Blur Artistik"}
                  </option>
                </select>
              </div>

              {/* Lighting Preference */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("lightingPreference") || "Lighting Preference"}
                </label>
                <select
                  value={settings.lightingPreference}
                  onChange={(e) =>
                    settings.setLightingPreference(e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option value="golden">
                    {language === "en" ? "Golden Hour" : "Golden Hour"}
                  </option>
                  <option value="studio">
                    {language === "en"
                      ? "Studio Lighting"
                      : "Pencahayaan Studio"}
                  </option>
                  <option value="natural">
                    {language === "en" ? "Natural Light" : "Cahaya Alami"}
                  </option>
                  <option value="dramatic">
                    {language === "en"
                      ? "Dramatic Lighting"
                      : "Pencahayaan Dramatis"}
                  </option>
                </select>
              </div>
            </div>

            {/* Right Column - Content Settings */}
            <div className="space-y-6">
              <h4 className="text-gray-800 font-semibold text-lg border-b border-gray-200 pb-2">
                {t("contentPreferences") || "Content Preferences"}
              </h4>

              {/* Color Enhancement */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("colorEnhancement") || "Color Enhancement"}
                </label>
                <select
                  value={settings.colorEnhancement}
                  onChange={(e) => settings.setColorEnhancement(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option value="vibrant">
                    {t("vibrant") ||
                      (language === "en" ? "Vibrant" : "Vibrant")}
                  </option>
                  <option value="natural">
                    {t("natural") ||
                      (language === "en" ? "Natural" : "Natural")}
                  </option>
                  <option value="muted">
                    {t("muted") || (language === "en" ? "Muted" : "Redup")}
                  </option>
                </select>
              </div>

              {/* Composition Style */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("compositionStyle") || "Composition Style"}
                </label>
                <select
                  value={settings.compositionStyle}
                  onChange={(e) => settings.setCompositionStyle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option value="thirds">
                    {language === "en" ? "Rule of Thirds" : "Aturan Sepertiga"}
                  </option>
                  <option value="center">
                    {language === "en"
                      ? "Center Composition"
                      : "Komposisi Tengah"}
                  </option>
                  <option value="leading">
                    {language === "en" ? "Leading Lines" : "Garis Pemandu"}
                  </option>
                  <option value="symmetry">
                    {language === "en" ? "Symmetrical" : "Simetris"}
                  </option>
                </select>
              </div>

              {/* Market Focus Options */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t("marketFocus") || "Market Focus"}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === "en"
                        ? "Adobe Stock Optimized"
                        : "Dioptimalkan Adobe Stock"}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === "en"
                        ? "Commercial Use Ready"
                        : "Siap Penggunaan Komersial"}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === "en"
                        ? "Trending Keywords Priority"
                        : "Prioritas Kata Kunci Trending"}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">
                      {language === "en"
                        ? "Evergreen Content Focus"
                        : "Fokus Konten Evergreen"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button
              onClick={() => setIsVisible(false)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-medium"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={handleApplyAndGenerate}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg"
            >
              <Sparkles size={18} />
              {t("applyGenerate") || "Apply & Generate"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSettings;
