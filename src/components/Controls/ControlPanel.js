import React from "react";
import {
  Camera,
  Video,
  Settings,
  Shuffle,
  RefreshCw,
  Zap,
  Target,
  Edit3,
} from "lucide-react";
import { categories } from "../../data/categories";
import { styles, moods } from "../../data/styles";
import MarketIndicators from "../MarketIndicators/MarketIndicators";

const ControlPanel = ({
  selectedCategory,
  setSelectedCategory,
  selectedTheme,
  setSelectedTheme,
  // ✨ NEW: Manual keyword props
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

  // ✨ UPDATED: Extended prompt count options up to 100
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

  return (
    <div className="bg-white backdrop-blur-md rounded-3xl p-6 mb-8 border border-gray-200 shadow-sm">
      <MarketIndicators
        selectedCategory={selectedCategory}
        language={language}
        t={t}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("category")}
          </label>
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
              if (e.target.value === "manual") {
                setIsManualMode(true);
              } else {
                setIsManualMode(false);
                setSelectedTheme(e.target.value);
              }
            }}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm"
          >
            <option value="auto" className="bg-white text-gray-800">
              🎲 {t("autoRandom")}
            </option>
            <option value="manual" className="bg-white text-gray-800">
              ✏️ {t("manualKeyword")}
            </option>
            {getCurrentThemes().map((theme, index) => (
              <option
                key={index}
                value={theme}
                className="bg-white text-gray-800"
              >
                {getThemeDisplayName(theme)}
              </option>
            ))}
          </select>
        </div>

        {/* Content Type (for Standard mode only) */}
        {outputMode === "standard" && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t("contentType")}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setContentType("photo")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  contentType === "photo"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Camera size={16} />
                {t("photo")}
              </button>
              <button
                onClick={() => setContentType("video")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  contentType === "video"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Video size={16} />
                {t("video")}
              </button>
            </div>
          </div>
        )}

        {/* Style Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("style")}
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.keys(styles).map((key) => (
              <option key={key} value={key} className="bg-white">
                {language === "id" && t(`styles.${key}`) !== `styles.${key}`
                  ? t(`styles.${key}`)
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {t("mood")}
          </label>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {Object.keys(moods).map((key) => (
              <option key={key} value={key} className="bg-white">
                {language === "id" && t(`moods.${key}`) !== `moods.${key}`
                  ? t(`moods.${key}`)
                  : key.charAt(0).toUpperCase() + key.slice(1)}
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
            onChange={(e) => setPromptCount(parseInt(e.target.value))}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {getPromptCountOptions().map((count) => (
              <option key={count} value={count} className="bg-white">
                {count} {t("prompts")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✨ NEW: Manual Keyword Input Field */}
      {isManualMode && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <label className="block text-gray-700 font-medium mb-3 flex items-center gap-2">
            <Edit3 size={16} className="text-blue-500" />
            {t("manualKeywordInput")}
          </label>
          <input
            type="text"
            value={manualKeyword}
            onChange={(e) => setManualKeyword(e.target.value)}
            placeholder={t("manualKeywordPlaceholder")}
            className="w-full bg-white border border-blue-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <div className="mt-2 text-sm text-blue-600">
            💡 {t("manualKeywordHint")}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => generatePrompts(false)}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none flex-1"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
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
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none"
          title={t("randomAllTooltip")}
        >
          <Shuffle size={20} />
          {t("randomAll")}
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3"
        >
          <Settings size={20} />
          {t("settings")}
        </button>
      </div>

      {/* Theme Selection Info Box */}
      {(selectedTheme !== "auto" || isManualMode) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 text-blue-800 text-sm">
            <Target size={16} />
            <span className="font-medium">
              {isManualMode ? t("manualKeywordActive") : t("selectedTheme")}:
            </span>
          </div>
          <div className="text-blue-700 text-sm mt-1 break-words">
            {isManualMode
              ? manualKeyword || t("manualKeywordEmpty")
              : selectedTheme}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
