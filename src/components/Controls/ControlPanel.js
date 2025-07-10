// src/components/Controls/ControlPanel.js - CLEAN FIXED VERSION

import React, { useState } from "react";
import {
  Camera,
  Video,
  Settings,
  Shuffle,
  RefreshCw,
  Zap,
  Target,
  Edit3,
  Filter,
} from "lucide-react";
import { categories } from "../../data/categories";
import { styles, moods } from "../../data/styles";
import MarketIndicators from "../MarketIndicators/MarketIndicators";
import AdvancedFilters from "../Filters/AdvancedFilters";

const ControlPanel = ({
  selectedCategory,
  setSelectedCategory,
  selectedTheme,
  setSelectedTheme,
  // Manual keyword props
  manualKeyword,
  setManualKeyword,
  isManualMode,
  setIsManualMode,

  contentType,
  setContentType,
  selectedStyle,
  setSelectedStyle,
  selectedMood,
  setSelectedMood,
  promptCount,
  setPromptCount,
  outputMode,
  isGenerating,
  showSettings,
  setShowSettings,
  generatePrompts,
  randomizeAll,
  language,
  t,
}) => {
  // Advanced Filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const getCategoryName = (categoryKey) => {
    return language === "id"
      ? categories[categoryKey]?.nameId
      : categories[categoryKey]?.name;
  };

  // Get current category themes for dropdown
  const getCurrentThemes = () => {
    const categoryData = categories[selectedCategory];
    return categoryData ? categoryData.themes : [];
  };

  // Format theme name for display (truncate if too long)
  const getThemeDisplayName = (theme) => {
    if (theme === "auto") return t("autoRandom");
    if (theme === "manual") return t("manualKeyword");
    return theme.length > 50 ? theme.substring(0, 47) + "..." : theme;
  };

  // Extended prompt count options up to 100
  const getPromptCountOptions = () => {
    const options = [];

    // Low numbers (1-20): every number
    for (let i = 1; i <= 20; i++) {
      options.push(i);
    }

    // Medium numbers (25-50): increments of 5
    for (let i = 25; i <= 50; i += 5) {
      options.push(i);
    }

    // High numbers (60-100): increments of 10
    for (let i = 60; i <= 100; i += 10) {
      options.push(i);
    }

    return options;
  };

  // ✅ FIX: Style display name helper - Use translations
  const getStyleDisplayName = (styleKey) => {
    // Use translation system
    return (
      t(`styles.${styleKey}`) ||
      styleKey.charAt(0).toUpperCase() + styleKey.slice(1)
    );
  };

  // ✅ FIX: Mood display name helper - Use translations
  const getMoodDisplayName = (moodKey) => {
    // Use translation system
    return (
      t(`moods.${moodKey}`) ||
      moodKey.charAt(0).toUpperCase() + moodKey.slice(1)
    );
  };

  // ✅ FIX: Handle Settings button click - SINGLE DECLARATION
  const handleSettingsClick = () => {
    console.log("Settings clicked - current state:", showSettings);
    setShowSettings(!showSettings);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 mb-8 border border-gray-200 shadow-sm">
      {/* Market Performance Indicators */}
      <MarketIndicators category={selectedCategory} language={language} t={t} />

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Selection */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
            <Filter size={16} />
            {t("category")}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            {Object.entries(categories).map(([key, category]) => (
              <option key={key} value={key} className="bg-white">
                {getCategoryName(key)}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Selection */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
            <Target size={16} />
            {t("themeSelection")}
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            <option value="auto" className="bg-white">
              🎲 {t("autoRandom")}
            </option>
            <option value="manual" className="bg-white">
              ✏️ {t("manualKeyword")}
            </option>
            {getCurrentThemes().map((theme, index) => (
              <option key={index} value={theme} className="bg-white">
                {getThemeDisplayName(theme)}
              </option>
            ))}
          </select>
        </div>

        {/* Content Type Toggle */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
            <Camera size={16} />
            {t("contentType")}
          </label>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setContentType("photo")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all ${
                contentType === "photo"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Camera size={16} />
              {t("photo")}
            </button>
            <button
              onClick={() => setContentType("video")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all ${
                contentType === "video"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Video size={16} />
              {t("video")}
            </button>
          </div>
        </div>
      </div>

      {/* Manual Keyword Input */}
      {(selectedTheme === "manual" || isManualMode) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <label className="flex items-center gap-2 text-amber-800 font-medium mb-3">
            <Edit3 size={16} />
            {t("manualKeywordInput")}
          </label>
          <input
            type="text"
            value={manualKeyword}
            onChange={(e) => setManualKeyword(e.target.value)}
            placeholder={t("manualKeywordPlaceholder")}
            className="w-full bg-white border border-amber-300 rounded-xl px-4 py-3 text-gray-800 placeholder-amber-400 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
          />
          <p className="text-amber-700 text-sm mt-2">
            {t("manualKeywordHint")}
          </p>
        </div>
      )}

      {/* Style, Mood, Count Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Style Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            {t("style")}
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            {Object.keys(styles).map((style) => (
              <option key={style} value={style} className="bg-white">
                {getStyleDisplayName(style)}
              </option>
            ))}
          </select>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            {t("mood")}
          </label>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            {Object.keys(moods).map((mood) => (
              <option key={mood} value={mood} className="bg-white">
                {getMoodDisplayName(mood)}
              </option>
            ))}
          </select>
        </div>

        {/* Prompt Count */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            {t("promptCount")}
          </label>
          <select
            value={promptCount}
            onChange={(e) => setPromptCount(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            {getPromptCountOptions().map((count) => (
              <option key={count} value={count} className="bg-white">
                {count} {t("prompts")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Generate Prompts */}
        <button
          onClick={generatePrompts}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
          title={t("generateTooltip")}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
              {t("generating")}
            </>
          ) : (
            <>
              <Zap
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              {t("generatePrompts")}
            </>
          )}
        </button>

        {/* Random All Categories */}
        <button
          onClick={randomizeAll}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
          title={t("randomAllTooltip")}
        >
          <Shuffle
            size={20}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
          {t("randomAll")}
        </button>

        {/* Settings Button */}
        <button
          onClick={handleSettingsClick}
          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group"
        >
          <Settings
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          {t("settings")}
        </button>
      </div>

      {/* Advanced Filters (Optional) */}
      {showAdvancedFilters && (
        <AdvancedFilters
          language={language}
          t={t}
          onClose={() => setShowAdvancedFilters(false)}
        />
      )}
    </div>
  );
};

export default ControlPanel;
