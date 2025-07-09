// src/App.js - COMPLETE FILE with Phase 2B Keyword Optimization Integration

import React, { useEffect, useCallback } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
//import AdSense from "./components/UI/AdSense";
import notificationManager from "./utils/notificationManager";

// Components
import Header from "./components/Header/Header";
import InfoSections from "./components/InfoSections/InfoSections";
import OutputModeSelector from "./components/OutputMode/OutputModeSelector";
import MidjourneySettings from "./components/Settings/MidJourneySettings";
import AdvancedSettings from "./components/Settings/AdvancedSettings";
import ControlPanel from "./components/Controls/ControlPanel";
import PromptsDisplay from "./components/Results/PromptsDisplay";
import Footer from "./components/Footer/Footer";
import FloatingButton from "./components/UI/FloatingButton";

// Hooks
import useSettings from "./hooks/useSettings";
import usePromptGeneration from "./hooks/usePromptGeneration";

// Data
import { translations } from "./data/translations";

const AdobeStockPromptGeneratorContent = () => {
  // Custom Hooks
  const settings = useSettings();

  // ✅ ENHANCED: Destructure promptsWithMetadata for keyword optimization
  const {
    prompts,
    promptsWithMetadata, // ✅ NEW: Metadata for keyword optimization
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyToClipboard: copyPrompt,
    copyAllPrompts,
    exportPrompts,
  } = usePromptGeneration(
    settings,
    useCallback(
      (key) => {
        const keys = key.split(".");
        let value = translations[settings.language];
        for (const k of keys) {
          value = value?.[k];
        }
        return value || key;
      },
      [settings.language]
    )
  );

  // Translation function
  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[settings.language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [settings.language]
  );

  // Handle randomize all with proper notification
  const handleRandomizeAll = useCallback(() => {
    settings.randomizeAll();
    generatePrompts(true); // true indicates full randomization
  }, [settings, generatePrompts]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl/Cmd + Enter to generate prompts
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isGenerating) {
          generatePrompts();
        }
      }

      // Ctrl/Cmd + R to randomize all
      if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        if (!isGenerating) {
          handleRandomizeAll();
        }
      }

      // Escape to close settings
      if (event.key === "Escape") {
        settings.setShowSettings(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGenerating, generatePrompts, handleRandomizeAll, settings]);

  // Error boundary effect
  useEffect(() => {
    const handleError = (error) => {
      console.error("Application error:", error);
      notificationManager.error(
        t("notifications.applicationError") || "An unexpected error occurred"
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Header
          language={settings.language}
          setLanguage={settings.setLanguage}
          t={t}
        />

        {/* Info Sections */}
        <InfoSections
          expandedSections={settings.expandedSections}
          toggleSection={settings.toggleSection}
          t={t}
        />

        {/* Output Mode Selector */}
        <OutputModeSelector
          outputMode={settings.outputMode}
          setOutputMode={settings.setOutputMode}
          language={settings.language}
          t={t}
        />

        {/* Midjourney Settings */}
        {settings.outputMode === "midjourney" && (
          <MidjourneySettings
            mjVersion={settings.mjVersion}
            setMjVersion={settings.setMjVersion}
            mjAspectRatio={settings.mjAspectRatio}
            setMjAspectRatio={settings.setMjAspectRatio}
            mjQuality={settings.mjQuality}
            setMjQuality={settings.setMjQuality}
            mjChaos={settings.mjChaos}
            setMjChaos={settings.setMjChaos}
            mjStylize={settings.mjStylize}
            setMjStylize={settings.setMjStylize}
            mjWeird={settings.mjWeird}
            setMjWeird={settings.setMjWeird}
            mjNoElements={settings.mjNoElements}
            setMjNoElements={settings.setMjNoElements}
            mjRaw={settings.mjRaw}
            setMjRaw={settings.setMjRaw}
            mjTile={settings.mjTile}
            setMjTile={settings.setMjTile}
            mjNiji={settings.mjNiji}
            setMjNiji={settings.setMjNiji}
            language={settings.language}
            t={t}
          />
        )}

        {/* Advanced Settings Modal */}
        {settings.showSettings && (
          <AdvancedSettings
            setShowSettings={settings.setShowSettings}
            qualityPriority={settings.qualityPriority}
            setQualityPriority={settings.setQualityPriority}
            focusStyle={settings.focusStyle}
            setFocusStyle={settings.setFocusStyle}
            colorEnhancement={settings.colorEnhancement}
            setColorEnhancement={settings.setColorEnhancement}
            lightingPreference={settings.lightingPreference}
            setLightingPreference={settings.setLightingPreference}
            compositionStyle={settings.compositionStyle}
            setCompositionStyle={settings.setCompositionStyle}
            marketFocus={settings.marketFocus}
            setMarketFocus={settings.setMarketFocus}
            generatePrompts={generatePrompts}
            language={settings.language}
            t={t}
          />
        )}

        {/* Control Panel */}
        <ControlPanel
          selectedCategory={settings.selectedCategory}
          setSelectedCategory={settings.setSelectedCategory}
          selectedTheme={settings.selectedTheme}
          setSelectedTheme={settings.setSelectedTheme}
          manualKeyword={settings.manualKeyword}
          setManualKeyword={settings.setManualKeyword}
          isManualMode={settings.isManualMode}
          setIsManualMode={settings.setIsManualMode}
          contentType={settings.contentType}
          setContentType={settings.setContentType}
          selectedStyle={settings.selectedStyle}
          setSelectedStyle={settings.setSelectedStyle}
          selectedMood={settings.selectedMood}
          setSelectedMood={settings.setSelectedMood}
          promptCount={settings.promptCount}
          setPromptCount={settings.setPromptCount}
          outputMode={settings.outputMode}
          isGenerating={isGenerating}
          showSettings={settings.showSettings}
          setShowSettings={settings.setShowSettings}
          generatePrompts={generatePrompts}
          randomizeAll={handleRandomizeAll}
          language={settings.language}
          t={t}
        />

        {/* ✅ ENHANCED: Results Display with Keyword Optimization */}
        <PromptsDisplay
          prompts={prompts}
          promptsWithMetadata={promptsWithMetadata} // ✅ NEW: Pass metadata for keywords
          outputMode={settings.outputMode}
          copiedIndex={copiedIndex}
          onCopyPrompt={copyPrompt}
          onCopyAllPrompts={copyAllPrompts}
          onExportPrompts={exportPrompts}
          language={settings.language}
          t={t}
        />

        {/* Footer */}
        <Footer language={settings.language} t={t} />

        {/* Floating Support Button */}
        <FloatingButton language={settings.language} t={t} />

        {/* AdSense - Commented out but ready for use */}
        {/* <AdSense /> */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <AdobeStockPromptGeneratorContent />
      </div>
    </ThemeProvider>
  );
};

export default App;
