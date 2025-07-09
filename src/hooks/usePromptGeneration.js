// src/hooks/usePromptGeneration.js - UPDATED with Keyword Optimization

import { useState, useCallback } from "react";
import notificationManager from "../utils/notificationManager";
import { categories } from "../data/categories";
import {
  styles,
  moods,
  styleVariations,
  moodVariations,
  lightingConditions,
  compositions,
  colorPalettes,
  cameraSettings,
  qualityTerms,
  qualityEndings,
} from "../data/styles";

// ✅ NEW: Import keyword optimization system
import { 
  generateOptimizedKeywords, 
  generateSEOTitle
} from "../data/keywordOptimization";

// UTILITY FUNCTIONS FOR TRUE RANDOMIZATION (Outside hook to avoid dependencies)
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Helper functions for consistent settings (moved outside hook)
const getLightingFromSettings = (preference) => {
  const lightingMap = {
    golden: "golden hour lighting",
    natural: "soft natural light",
    studio: "studio lighting",
    mixed: "mixed natural and artificial lighting",
  };
  return lightingMap[preference] || "natural lighting";
};

const getCompositionFromSettings = (style) => {
  const compositionMap = {
    thirds: "rule of thirds",
    centered: "centered composition",
    dynamic: "diagonal composition",
    minimalist: "negative space, minimalist layout",
  };
  return compositionMap[style] || "balanced composition";
};

const getColorsFromSettings = (enhancement) => {
  const colorMap = {
    vibrant: "vibrant colors, high saturation",
    natural: "natural color palette, authentic tones",
    muted: "muted colors, subtle tones",
  };
  return colorMap[enhancement] || "natural colors";
};

const getCameraFromSettings = (focus) => {
  const cameraMap = {
    shallow: "shallow depth of field, wide aperture f/1.8",
    deep: "deep focus, sharp throughout, f/8",
    selective: "selective focus, subject isolation",
    macro: "macro detail, extreme close-up",
  };
  return cameraMap[focus] || "professional camera settings";
};

const usePromptGeneration = (settings, t) => {
  const [prompts, setPrompts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // ✅ NEW: Enhanced prompts with metadata
  const [promptsWithMetadata, setPromptsWithMetadata] = useState([]);

  // ✅ ENHANCED GENERATION LOGIC WITH KEYWORD OPTIMIZATION
  const generatePrompts = useCallback(
    (isFullRandom = false) => {
      setIsGenerating(true);

      const generateSmartPrompt = (
        category,
        isRandomMode,
        promptSettings,
        selectedTheme,
        manualKeyword,
        isManualMode
      ) => {
        const categoryData = categories[category];

        // Theme selection logic
        let selectedThemeText;
        if (isManualMode && manualKeyword && manualKeyword.trim()) {
          selectedThemeText = manualKeyword.trim();
        } else if (
          selectedTheme &&
          selectedTheme !== "auto" &&
          selectedTheme !== "manual"
        ) {
          selectedThemeText = selectedTheme;
        } else if (categoryData) {
          selectedThemeText = getRandomElement(categoryData.themes);
        } else {
          selectedThemeText = "professional product photography";
        }

        // Style and mood variations
        const styleOptions = styleVariations[promptSettings.selectedStyle];
        const styleDesc = styleOptions
          ? getRandomElement(styleOptions)
          : styles[promptSettings.selectedStyle];

        const moodOptions = moodVariations[promptSettings.selectedMood];
        const moodDesc = moodOptions
          ? getRandomElement(moodOptions)
          : moods[promptSettings.selectedMood];

        const lighting = isRandomMode
          ? getRandomElement(lightingConditions)
          : getLightingFromSettings(promptSettings.lightingPreference);

        const composition = isRandomMode
          ? getRandomElement(compositions)
          : getCompositionFromSettings(promptSettings.compositionStyle);

        const colors = isRandomMode
          ? getRandomElement(colorPalettes)
          : getColorsFromSettings(promptSettings.colorEnhancement);

        const camera = isRandomMode
          ? getRandomElement(cameraSettings)
          : getCameraFromSettings(promptSettings.focusStyle);

        const quality = getRandomElement(qualityTerms);
        const ending = getRandomElement(qualityEndings);

        // ✅ NEW: Generate optimized keywords
        const keywords = generateOptimizedKeywords(
          category,
          promptSettings.selectedStyle,
          promptSettings.selectedMood,
          selectedThemeText,
          [lighting, composition, colors] // Additional context
        );

        // ✅ NEW: Generate SEO title
        const seoTitle = generateSEOTitle(
          category,
          selectedThemeText,
          promptSettings.selectedStyle,
          promptSettings.selectedMood
        );

        // Construct the prompt
        const promptParts = [
          selectedThemeText,
          styleDesc,
          moodDesc,
          lighting,
          composition,
          colors,
          camera,
          quality,
          ending,
        ];

        const fullPrompt = promptParts.join(", ");

        return {
          id: generateUniqueId(),
          prompt: fullPrompt,
          category: category,
          style: promptSettings.selectedStyle,
          mood: promptSettings.selectedMood,
          contentType: promptSettings.contentType,
          theme: selectedThemeText,
          // ✅ NEW: Include metadata
          keywords: keywords,
          title: seoTitle,
          metadata: {
            lighting,
            composition,
            colors,
            camera,
            quality,
            generated: new Date().toISOString(),
            settings: {
              isManualMode,
              manualKeyword,
              isRandomMode
            }
          }
        };
      };

      try {
        const newPrompts = [];
        const newMetadata = [];

        for (let i = 0; i < settings.promptCount; i++) {
          let currentCategory, currentStyle, currentMood;

          if (isFullRandom) {
            const categoryKeys = [
              "business",
              "transportation", 
              "food",
              "abstract",
              "nature",
              "architecture",
            ];
            currentCategory = getRandomElement(categoryKeys);

            const styleKeys = Object.keys(styles);
            currentStyle = getRandomElement(styleKeys);

            const moodKeys = Object.keys(moods);
            currentMood = getRandomElement(moodKeys);
          } else {
            currentCategory = settings.selectedCategory;
            currentStyle = settings.selectedStyle;
            currentMood = settings.selectedMood;
          }

          const promptSettings = {
            selectedStyle: currentStyle,
            selectedMood: currentMood,
            contentType: settings.contentType,
            lightingPreference: settings.lightingPreference,
            compositionStyle: settings.compositionStyle,
            colorEnhancement: settings.colorEnhancement,
            focusStyle: settings.focusStyle,
          };

          const promptData = generateSmartPrompt(
            currentCategory,
            isFullRandom,
            promptSettings,
            settings.selectedTheme,
            settings.manualKeyword,
            settings.isManualMode
          );

          newPrompts.push(promptData.prompt);
          newMetadata.push(promptData);
        }

        setPrompts(newPrompts);
        setPromptsWithMetadata(newMetadata);

        // ✅ ENHANCED: Show keyword optimization in notification
        const avgKeywords = Math.round(
          newMetadata.reduce((sum, p) => sum + (p.keywords?.count || 0), 0) / newMetadata.length
        );

        notificationManager.success(
          `✨ Generated ${newPrompts.length} prompts with ${avgKeywords} avg keywords (Adobe Stock optimized)`
        );
      } catch (error) {
        console.error("Error generating prompts:", error);
        notificationManager.error(
          t("notifications.generationError") || "Error generating prompts"
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [settings, t]
  );

  // ✅ ENHANCED: Copy functionality with keyword support
  const copyToClipboard = useCallback(async (text, index = null, type = 'prompt') => {
    try {
      let contentToCopy = text;
      
      // Enhanced copy formats
      if (type === 'with-keywords' && index !== null && promptsWithMetadata[index]) {
        const metadata = promptsWithMetadata[index];
        contentToCopy = `${text}\n\nKeywords: ${metadata.keywords?.all?.join(', ') || ''}\nTitle: ${metadata.title || ''}`;
      } else if (type === 'metadata-only' && index !== null && promptsWithMetadata[index]) {
        const metadata = promptsWithMetadata[index];
        contentToCopy = `Title: ${metadata.title}\nKeywords: ${metadata.keywords?.all?.join(', ') || ''}`;
      }

      await navigator.clipboard.writeText(contentToCopy);
      setCopiedIndex(index);
      
      setTimeout(() => setCopiedIndex(null), 2000);
      
      const successMessage = type === 'with-keywords' 
        ? "Prompt with keywords copied!"
        : type === 'metadata-only'
        ? "Metadata copied!"
        : "Prompt copied!";
        
      notificationManager.success(successMessage);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      notificationManager.error("Failed to copy to clipboard");
    }
  }, [promptsWithMetadata]);

  // ✅ NEW: Copy all prompts with enhanced formats
  const copyAllPrompts = useCallback(async (format = 'prompts-only') => {
    try {
      let content = '';
      
      switch (format) {
        case 'prompts-only':
          content = prompts.join('\n\n');
          break;
        case 'with-keywords':
          content = promptsWithMetadata.map((item, index) => 
            `=== PROMPT ${index + 1} ===\n${item.prompt}\n\nKeywords: ${item.keywords?.all?.join(', ') || ''}\nTitle: ${item.title || ''}\n`
          ).join('\n');
          break;
        case 'keywords-only':
          content = promptsWithMetadata.map(item => item.keywords?.all?.join(', ') || '').join('\n\n');
          break;
        case 'titles-only':
          content = promptsWithMetadata.map(item => item.title || '').join('\n');
          break;
        default:
          content = prompts.join('\n\n');
      }

      await navigator.clipboard.writeText(content);
      notificationManager.success(`All ${format.replace('-', ' ')} copied to clipboard!`);
    } catch (err) {
      console.error("Failed to copy all prompts:", err);
      notificationManager.error("Failed to copy all prompts");
    }
  }, [prompts, promptsWithMetadata]);

  // ✅ NEW: Export functionality
  const exportPrompts = useCallback((format = 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        // Will be handled by enhanced export component
        return promptsWithMetadata;
      case 'json':
        const jsonData = {
          metadata: {
            generated: new Date().toISOString(),
            count: promptsWithMetadata.length,
            settings: settings
          },
          prompts: promptsWithMetadata
        };
        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `adobe-stock-prompts-${timestamp}.json`;
        jsonLink.click();
        break;
      case 'txt':
      default:
        const txtContent = promptsWithMetadata.map((item, index) => 
          `=== PROMPT ${index + 1} ===\nTitle: ${item.title}\nPrompt: ${item.prompt}\nKeywords: ${item.keywords?.all?.join(', ') || ''}\n`
        ).join('\n');
        const txtBlob = new Blob([txtContent], { type: 'text/plain' });
        const txtUrl = URL.createObjectURL(txtBlob);
        const txtLink = document.createElement('a');
        txtLink.href = txtUrl;
        txtLink.download = `adobe-stock-prompts-${timestamp}.txt`;
        txtLink.click();
        break;
    }
    
    notificationManager.success(`Prompts exported as ${format.toUpperCase()}`);
  }, [promptsWithMetadata, settings]);

  return {
    prompts,
    promptsWithMetadata, // ✅ NEW: Include metadata
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyToClipboard,
    copyAllPrompts,    // ✅ ENHANCED
    exportPrompts,     // ✅ NEW
  };
};

export default usePromptGeneration;