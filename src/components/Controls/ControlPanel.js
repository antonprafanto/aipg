// src/components/Controls/ControlPanel.js - FIXED VERSION

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

  // ✅ FIX: Style display name helper
  const getStyleDisplayName = (styleKey) => {
    const styleLabels = {
      photorealistic: { en: "Photorealistic", id: "Fotorealistik" },
      cinematic: { en: "Cinematic", id: "Sinematik" },
      minimalist: { en: "Minimalist", id: "Minimalis" },
      vintage: { en: "Vintage", id: "Vintage" },
      artistic: { en: "Artistic", id: "Artistik" },
      documentary: { en: "Documentary", id: "Dokumenter" },
      editorial: { en: "Editorial", id: "Editorial" },
    };

    return styleLabels[styleKey]
      ? styleLabels[styleKey][language]
      : styleKey.charAt(0).toUpperCase() + styleKey.slice(1);
  };

  // ✅ FIX: Mood display name helper
  const getMoodDisplayName = (moodKey) => {
    const moodLabels = {
      professional: { en: "Professional", id: "Profesional" },
      calm: { en: "Calm", id: "Tenang" },
      energetic: { en: "Energetic", id: "Energik" },
      luxurious: { en: "Luxurious", id: "Mewah" },
      natural: { en: "Natural", id: "Alami" },
      modern: { en: "Modern", id: "Modern" },
      warm: { en: "Warm", id: "Hangat" },
    };

    return moodLabels[moodKey]
      ? moodLabels[moodKey][language]
      : moodKey.charAt(0).toUpperCase() + moodKey.slice(1);
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 mb-8 border border-gray-200 shadow-sm">
      {/* Market Performance Indicators */}
      <MarketIndicators
        selectedCategory={selectedCategory}
        language={language}
        t={t}
      />

      {/* Advanced Filters */}
      <AdvancedFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        language={language}
        t={t}
        isVisible={showAdvancedFilters}
        setIsVisible={setShowAdvancedFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-700 font-medium">{t("category")}</label>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`text-xs px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                showAdvancedFilters
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Filter size={12} />
              {language === "en" ? "Filters" : "Filter"}
            </button>
          </div>
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

        {/* Theme Selection Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
            <Target size={16} className="text-blue-500" />
            {t("themeSelection")}
          </label>
          <select
            value={isManualMode ? "manual" : selectedTheme}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "manual") {
                setIsManualMode(true);
                setSelectedTheme("auto");
              } else {
                setIsManualMode(false);
                setSelectedTheme(value);
              }
            }}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            title={t("themeTooltip")}
          >
            <option value="auto" className="bg-white text-gray-800">
              🎲 {t("autoRandom")}
            </option>
            <option value="manual" className="bg-white text-blue-600">
              ✏️ {t("manualKeyword")}
            </option>
            <optgroup label={`📋 ${t("selectedTheme")}`} className="bg-gray-50">
              {getCurrentThemes().map((theme, index) => (
                <option
                  key={index}
                  value={theme}
                  className="bg-white text-gray-800"
                >
                  {getThemeDisplayName(theme)}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Manual Keyword Input */}
          {isManualMode && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Edit3 size={14} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {t("manualKeywordInput")}
                </span>
              </div>
              <input
                type="text"
                value={manualKeyword}
                onChange={(e) => setManualKeyword(e.target.value)}
                placeholder={t("manualKeywordPlaceholder")}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <p className="text-xs text-blue-600 mt-1">
                {t("manualKeywordHint")}
              </p>

              {/* Status indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    manualKeyword.trim() ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  {manualKeyword.trim()
                    ? t("manualKeywordActive")
                    : t("manualKeywordEmpty")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("contentType")}
          </label>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setContentType("photo")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                contentType === "photo"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Camera size={16} />
              {t("photo")}
            </button>
            <button
              onClick={() => setContentType("video")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                contentType === "video"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Video size={16} />
              {t("video")}
            </button>
          </div>
        </div>

        {/* Style - FIXED */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("style")}
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.keys(styles).map((styleKey) => (
              <option
                key={styleKey}
                value={styleKey}
                className="bg-white text-gray-800"
              >
                {getStyleDisplayName(styleKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Mood - FIXED */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("mood")}
          </label>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.keys(moods).map((moodKey) => (
              <option
                key={moodKey}
                value={moodKey}
                className="bg-white text-gray-800"
              >
                {getMoodDisplayName(moodKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Prompt Count */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("promptCount")}
          </label>
          <select
            value={promptCount}
            onChange={(e) => setPromptCount(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {getPromptCountOptions().map((count) => (
              <option
                key={count}
                value={count}
                className="bg-white text-gray-800"
              >
                {count} {t("prompts")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={generatePrompts}
          disabled={isGenerating}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          title={t("generateTooltip")}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              {t("generating")}
            </>
          ) : (
            <>
              <Zap size={20} />
              {t("generatePrompts")}
            </>
          )}
        </button>

        <button
          onClick={randomizeAll}
          disabled={isGenerating}
          className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          title={t("randomAllTooltip")}
        >
          <Shuffle size={20} />
          {t("randomAll")}
        </button>

        <button
          onClick={() => setShowSettings(true)}
          disabled={isGenerating}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Settings size={20} />
          {t("settings")}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
