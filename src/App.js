// src/App.js - FIXED VERSION with proper MidJourney props
// ✅ FIXED: setMjAspectRatio is not a function error resolved

import React, { useEffect, useCallback, useMemo } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
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

  // ✅ FIX: Memoize translation function to prevent recreation
  const t = useCallback(
    (key) => {
      if (!key) return "";

      try {
        const keys = key.split(".");
        let value = translations[settings.language];
        for (const k of keys) {
          value = value?.[k];
        }
        return value || key;
      } catch (error) {
        console.warn("Translation error for key:", key, error);
        return key;
      }
    },
    [settings.language] // Only recreate when language changes
  );

  // ✅ FIX: Pass stable t function to usePromptGeneration
  const {
    prompts,
    promptsWithMetadata,
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyToClipboard: copyPrompt,
    copyAllPrompts,
    exportPrompts,
  } = usePromptGeneration(settings, t);

  // ✅ FIXED: Memoize randomize handler with all required dependencies
  const handleRandomizeAll = useCallback(() => {
    try {
      if (
        settings.randomizeAll &&
        typeof settings.randomizeAll === "function"
      ) {
        settings.randomizeAll();
        generatePrompts(true); // true indicates full randomization
      } else {
        console.warn("randomizeAll function not available");
      }
    } catch (error) {
      console.error("Randomize all failed:", error);
      notificationManager.error(
        t("notifications.randomizeError") || "Failed to randomize settings"
      );
    }
  }, [settings, generatePrompts, t]);

  // ✅ FIX: Memoize stable copy all handler with validation
  const handleCopyAllPrompts = useCallback(
    (format = "prompts-only") => {
      try {
        if (copyAllPrompts && typeof copyAllPrompts === "function") {
          copyAllPrompts(format);
        } else {
          console.warn("copyAllPrompts function not available");
          notificationManager.error(
            t("notifications.copyError") || "Copy function not available"
          );
        }
      } catch (error) {
        console.error("Copy all prompts failed:", error);
        notificationManager.error(
          t("notifications.copyError") || "Failed to copy prompts"
        );
      }
    },
    [copyAllPrompts, t]
  );

  // ✅ FIX: Memoize stable export handler with validation
  const handleExportPrompts = useCallback(
    (format = "txt") => {
      try {
        if (exportPrompts && typeof exportPrompts === "function") {
          exportPrompts(format);
        } else {
          console.warn("exportPrompts function not available");
          notificationManager.error(
            t("notifications.exportError") || "Export function not available"
          );
        }
      } catch (error) {
        console.error("Export prompts failed:", error);
        notificationManager.error(
          t("notifications.exportError") || "Failed to export prompts"
        );
      }
    },
    [exportPrompts, t]
  );

  // ✅ FIX: Memoize copy prompt handler with validation
  const handleCopyPrompt = useCallback(
    (prompt, index, type = "prompt") => {
      try {
        if (copyPrompt && typeof copyPrompt === "function") {
          copyPrompt(prompt, index, type);
        } else {
          // Fallback to basic clipboard
          navigator.clipboard
            .writeText(prompt)
            .then(() => {
              notificationManager.success("Prompt copied to clipboard!");
            })
            .catch((error) => {
              console.error("Fallback copy failed:", error);
              notificationManager.error("Failed to copy prompt");
            });
        }
      } catch (error) {
        console.error("Copy prompt failed:", error);
        notificationManager.error("Failed to copy prompt");
      }
    },
    [copyPrompt]
  );

  // ✅ FIXED: Keyboard shortcuts with all required dependencies
  useEffect(() => {
    const handleKeyPress = (event) => {
      try {
        // Prevent if user is typing in input fields
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable
        ) {
          return;
        }

        // Ctrl/Cmd + Enter to generate prompts
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          if (
            !isGenerating &&
            generatePrompts &&
            typeof generatePrompts === "function"
          ) {
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
          if (
            settings.setShowSettings &&
            typeof settings.setShowSettings === "function"
          ) {
            settings.setShowSettings(false);
          }
        }

        // Ctrl/Cmd + C to copy all prompts (when not in input)
        if (
          (event.ctrlKey || event.metaKey) &&
          event.key === "c" &&
          prompts.length > 0
        ) {
          event.preventDefault();
          handleCopyAllPrompts("prompts-only");
        }
      } catch (error) {
        console.error("Keyboard shortcut error:", error);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    isGenerating,
    generatePrompts,
    handleRandomizeAll,
    settings,
    prompts.length,
    handleCopyAllPrompts,
  ]);

  // ✅ FIX: Error boundary effect with stable dependencies
  useEffect(() => {
    const handleError = (error) => {
      console.error("Application error:", error);
      notificationManager.error(
        t("notifications.applicationError") || "An unexpected error occurred"
      );
    };

    const handleUnhandledRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      notificationManager.error(
        t("notifications.applicationError") || "An unexpected error occurred"
      );
      event.preventDefault(); // Prevent default browser error handling
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [t]);

  // ✅ FIX: Memoize component props to prevent unnecessary re-renders
  const infoSectionsProps = useMemo(
    () => ({
      expandedSections: settings.expandedSections,
      toggleSection: settings.toggleSection,
      t,
      language: settings.language,
    }),
    [settings.expandedSections, settings.toggleSection, t, settings.language]
  );

  const outputModeSelectorProps = useMemo(
    () => ({
      outputMode: settings.outputMode,
      setOutputMode: settings.setOutputMode,
      language: settings.language,
      t,
    }),
    [settings.outputMode, settings.setOutputMode, settings.language, t]
  );

  // ✅ FIXED: Proper MidJourney props passing - individual props instead of settings object
  const midjourneySettingsProps = useMemo(
    () => ({
      mjVersion: settings.mjVersion,
      setMjVersion: settings.setMjVersion,
      mjAspectRatio: settings.mjAspectRatio,
      setMjAspectRatio: settings.setMjAspectRatio,
      mjQuality: settings.mjQuality,
      setMjQuality: settings.setMjQuality,
      mjChaos: settings.mjChaos,
      setMjChaos: settings.setMjChaos,
      mjStylize: settings.mjStylize,
      setMjStylize: settings.setMjStylize,
      mjWeird: settings.mjWeird,
      setMjWeird: settings.setMjWeird,
      mjNoElements: settings.mjNoElements,
      setMjNoElements: settings.setMjNoElements,
      mjRaw: settings.mjRaw,
      setMjRaw: settings.setMjRaw,
      mjTile: settings.mjTile,
      setMjTile: settings.setMjTile,
      mjNiji: settings.mjNiji,
      setMjNiji: settings.setMjNiji,
      language: settings.language,
      t,
    }),
    [settings, t]
  );

  const advancedSettingsProps = useMemo(
    () => ({
      settings,
      language: settings.language,
      t,
      isVisible: settings.showSettings,
      setIsVisible: settings.setShowSettings,
    }),
    [settings, t]
  );

  const controlPanelProps = useMemo(
    () => ({
      ...settings,
      outputMode: settings.outputMode,
      isGenerating,
      generatePrompts,
      randomizeAll: handleRandomizeAll,
      language: settings.language,
      t,
    }),
    [settings, isGenerating, generatePrompts, handleRandomizeAll, t]
  );

  const promptsDisplayProps = useMemo(
    () => ({
      prompts,
      promptsWithMetadata,
      outputMode: settings.outputMode,
      copiedIndex,
      onCopyPrompt: handleCopyPrompt,
      onCopyAllPrompts: handleCopyAllPrompts,
      onExportPrompts: handleExportPrompts,
      language: settings.language,
      t,
    }),
    [
      prompts,
      promptsWithMetadata,
      settings.outputMode,
      copiedIndex,
      handleCopyPrompt,
      handleCopyAllPrompts,
      handleExportPrompts,
      settings.language,
      t,
    ]
  );

  const headerProps = useMemo(
    () => ({
      language: settings.language,
      setLanguage: settings.setLanguage,
      t,
    }),
    [settings.language, settings.setLanguage, t]
  );

  const footerProps = useMemo(
    () => ({
      language: settings.language,
      t,
    }),
    [settings.language, t]
  );

  const floatingButtonProps = useMemo(
    () => ({
      language: settings.language,
      t,
    }),
    [settings.language, t]
  );

  // ✅ FIX: Show loading state properly
  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Header {...headerProps} />

        {/* Info Sections */}
        <InfoSections {...infoSectionsProps} />

        {/* Output Mode Selector */}
        <OutputModeSelector {...outputModeSelectorProps} />

        {/* ✅ FIXED: Midjourney Settings - Proper props passing */}
        {settings.outputMode === "midjourney" && (
          <MidjourneySettings {...midjourneySettingsProps} />
        )}

        {/* Advanced Settings - Only show if settings panel is open */}
        {settings.showSettings && (
          <AdvancedSettings {...advancedSettingsProps} />
        )}

        {/* Main Control Panel */}
        <ControlPanel {...controlPanelProps} />

        {/* Results Display */}
        {prompts && prompts.length > 0 && (
          <PromptsDisplay {...promptsDisplayProps} />
        )}

        {/* Footer */}
        <Footer {...footerProps} />

        {/* Floating Support Button */}
        <FloatingButton {...floatingButtonProps} />
      </div>
    </div>
  );
};

// ✅ FIX: Main App component with ThemeProvider and error boundary
const App = () => {
  // ✅ Add basic error boundary
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AdobeStockPromptGeneratorContent />
    </ThemeProvider>
  );
};

export default App;
