import React, { useEffect, useCallback } from 'react';

// Components
import Header from './components/Header/Header';
import InfoSections from './components/InfoSections/InfoSections';
import OutputModeSelector from './components/OutputMode/OutputModeSelector';
import MidjourneySettings from './components/Settings/MidJourneySettings';
import AdvancedSettings from './components/Settings/AdvancedSettings';
import ControlPanel from './components/Controls/ControlPanel';
import PromptsDisplay from './components/Results/PromptsDisplay';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/UI/FloatingButton';

// Hooks
import useSettings from './hooks/useSettings';
import usePromptGeneration from './hooks/usePromptGeneration';

// Data
import { translations } from './data/translations';

const AdobeStockPromptGenerator = () => {
  // Custom Hooks
  const settings = useSettings();
  const {
    prompts,
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyPrompt,
    copyAllPrompts,
    exportPrompts
  } = usePromptGeneration(settings, useCallback((key) => {
    const keys = key.split('.');
    let value = translations[settings.language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [settings.language]));

  // Translation function
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[settings.language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [settings.language]);

  // Enhanced randomizeAll that auto-generates prompts
  const handleRandomizeAll = () => {
    settings.randomizeAll();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = t('notifications.randomized');
    successMsg.className = 'fixed top-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg z-50';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
    
    // Auto-generate prompts after randomization with TRUE RANDOM mode (mixed categories)
    setTimeout(() => {
      generatePrompts(true); // Pass true to indicate full random mode
    }, 100);
  };

  // Generate initial prompts using user's default settings (not random)
  useEffect(() => {
    generatePrompts(false); // false = use user settings, not random
  }, [generatePrompts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
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

        {/* Output Mode Selection */}
        <OutputModeSelector
          outputMode={settings.outputMode}
          setOutputMode={settings.setOutputMode}
          t={t}
        />

        {/* Midjourney Settings Panel */}
        {settings.outputMode === 'midjourney' && (
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

        {/* Advanced Settings Panel */}
        <AdvancedSettings
          showSettings={settings.showSettings}
          setShowSettings={settings.setShowSettings}
          colorEnhancement={settings.colorEnhancement}
          setColorEnhancement={settings.setColorEnhancement}
          qualityPriority={settings.qualityPriority}
          setQualityPriority={settings.setQualityPriority}
          focusStyle={settings.focusStyle}
          setFocusStyle={settings.setFocusStyle}
          lightingPreference={settings.lightingPreference}
          setLightingPreference={settings.setLightingPreference}
          compositionStyle={settings.compositionStyle}
          setCompositionStyle={settings.setCompositionStyle}
          generatePrompts={generatePrompts}
          t={t}
          language={settings.language}
        />

        {/* Control Panel */}
        <ControlPanel
          selectedCategory={settings.selectedCategory}
          setSelectedCategory={settings.setSelectedCategory}
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

        {/* Results Display */}
        <PromptsDisplay
          prompts={prompts}
          outputMode={settings.outputMode}
          copiedIndex={copiedIndex}
          onCopyPrompt={copyPrompt}
          onCopyAllPrompts={copyAllPrompts}
          onExportPrompts={exportPrompts}
          language={settings.language}
          t={t}
        />

        {/* Footer */}
        <Footer t={t} />
      </div>

      {/* Floating Donation Button */}
      <FloatingButton t={t} />

      {/* Global Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
        }
        .slider::-webkit-slider-track {
          height: 8px;
          cursor: pointer;
          background: #e5e7eb;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdobeStockPromptGenerator;