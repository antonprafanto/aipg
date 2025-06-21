import { useState, useCallback } from 'react';
import { categories } from '../data/categories';
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
  qualityEndings 
} from '../data/styles';

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
    'golden': 'golden hour lighting',
    'natural': 'soft natural light',
    'studio': 'studio lighting',
    'mixed': 'mixed natural and artificial lighting'
  };
  return lightingMap[preference] || 'natural lighting';
};

const getCompositionFromSettings = (style) => {
  const compositionMap = {
    'thirds': 'rule of thirds',
    'centered': 'centered composition',
    'dynamic': 'diagonal composition',
    'minimalist': 'negative space, minimalist layout'
  };
  return compositionMap[style] || 'balanced composition';
};

const getColorsFromSettings = (enhancement) => {
  const colorMap = {
    'vibrant': 'vibrant colors, high saturation',
    'natural': 'natural color palette, authentic tones',
    'muted': 'muted colors, subtle tones'
  };
  return colorMap[enhancement] || 'natural colors';
};

const getCameraFromSettings = (focus) => {
  const cameraMap = {
    'shallow': 'shallow depth of field, wide aperture f/1.8',
    'deep': 'deep focus, sharp throughout, f/8',
    'selective': 'selective focus, subject isolation',
    'macro': 'macro detail, extreme close-up'
  };
  return cameraMap[focus] || 'professional camera settings';
};

const usePromptGeneration = (settings, t) => {
  const [prompts, setPrompts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ✨ UPDATED GENERATION LOGIC WITH MANUAL KEYWORD SUPPORT + TRUE RANDOMIZATION
  const generatePrompts = useCallback((isFullRandom = false) => {
    setIsGenerating(true);
    
    // ✅ FIXED: Smart prompt generation with styleVariations and moodVariations
    const generateSmartPrompt = (category, isRandomMode, promptSettings, selectedTheme, manualKeyword, isManualMode) => {
      const categoryData = categories[category];
      
      // ✨ NEW: Use manual keyword if provided, otherwise use theme logic
      let selectedThemeText;
      if (isManualMode && manualKeyword && manualKeyword.trim()) {
        selectedThemeText = manualKeyword.trim(); // Use manual keyword
      } else if (selectedTheme && selectedTheme !== 'auto' && selectedTheme !== 'manual') {
        selectedThemeText = selectedTheme; // Use manual selection from dropdown
      } else if (categoryData) {
        selectedThemeText = getRandomElement(categoryData.themes); // Random selection from category
      } else {
        // Fallback if no category data available
        selectedThemeText = 'professional product photography';
      }
      
      // ✅ FIXED: Use styleVariations for randomization, fallback to styles for default
      const styleOptions = styleVariations[promptSettings.selectedStyle];
      const styleDesc = styleOptions 
        ? getRandomElement(styleOptions) 
        : styles[promptSettings.selectedStyle];
      
      // ✅ FIXED: Use moodVariations for randomization, fallback to moods for default
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

      // ✅ ALWAYS random quality terms
      const quality = getRandomElement(qualityTerms);
      
      const basePrompt = `${selectedThemeText}, ${styleDesc}, ${lighting}, ${composition}, ${colors}, ${camera}, ${quality}, ${moodDesc}`;
      
      return {
        prompt: basePrompt,
        theme: selectedThemeText,
        uniqueId: generateUniqueId(),
        timestamp: Date.now()
      };
    };
    
    const promptSettings = {
      selectedStyle: settings.selectedStyle,
      selectedMood: settings.selectedMood,
      lightingPreference: settings.lightingPreference,
      compositionStyle: settings.compositionStyle,
      colorEnhancement: settings.colorEnhancement,
      focusStyle: settings.focusStyle,
      qualityPriority: settings.qualityPriority
    };
  
    const newPrompts = [];
  
    for (let i = 0; i < settings.promptCount; i++) {
      let categoryToUse;
      
      if (isFullRandom) {
        // Truly random category selection for each prompt
        const categoryKeys = Object.keys(categories);
        categoryToUse = getRandomElement(categoryKeys);
      } else {
        categoryToUse = settings.selectedCategory;
      }
  
      // ✨ UPDATED: Pass manual keyword and mode to generation function
      const promptData = generateSmartPrompt(
        categoryToUse, 
        isFullRandom, 
        promptSettings, 
        settings.selectedTheme,
        settings.manualKeyword, // ✨ NEW: Pass manual keyword
        settings.isManualMode   // ✨ NEW: Pass manual mode
      );
      
      if (promptData) {
        let finalPrompt = promptData.prompt;
        
        // Add Midjourney parameters if needed
        if (settings.outputMode === 'midjourney') {
          const mjParams = [];
          
          if (settings.mjAspectRatio !== '1:1') {
            mjParams.push(`--ar ${settings.mjAspectRatio}`);
          }
          
          if (settings.mjVersion !== '6.1') {
            mjParams.push(`--v ${settings.mjVersion}`);
          }
          
          if (settings.mjChaos > 0) {
            mjParams.push(`--chaos ${settings.mjChaos}`);
          }
          
          if (settings.mjStylize !== 100) {
            mjParams.push(`--s ${settings.mjStylize}`);
          }
          
          if (settings.mjQuality !== '1') {
            mjParams.push(`--q ${settings.mjQuality}`);
          }
          
          if (settings.mjWeird > 0) {
            mjParams.push(`--weird ${settings.mjWeird}`);
          }
          
          if (settings.mjRaw) {
            mjParams.push('--raw');
          }
          
          if (settings.mjTile) {
            mjParams.push('--tile');
          }
          
          if (settings.mjNiji) {
            mjParams.push('--niji 6');
          }
          
          // Enhanced negative prompts for clean outputs - NO LIVING CREATURES
          const negativeElements = [
            'people', 'human', 'person', 'man', 'woman', 'child', 'face', 'hands', 'body',
            'animals', 'pets', 'cats', 'dogs', 'birds', 'fish', 'wildlife', 'insects',
            'plants', 'flowers', 'trees', 'leaves', 'grass', 'nature', 'organic life',
            'text', 'logo', 'watermark', 'signature', 'writing', 'letters', 'numbers'
          ];
          
          if (settings.mjNoElements) {
            const customElements = settings.mjNoElements.split(',').map(e => e.trim()).filter(e => e);
            negativeElements.push(...customElements);
          }
          
          if (negativeElements.length > 0) {
            mjParams.push(`--no ${negativeElements.join(', ')}`);
          }
          
          if (mjParams.length > 0) {
            finalPrompt = `/imagine ${finalPrompt} ${mjParams.join(' ')}`;
          } else {
            finalPrompt = `/imagine ${finalPrompt}`;
          }
        } else {
          // ✅ FIXED: Random quality ending instead of hardcoded
          const randomEnding = getRandomElement(qualityEndings);
          finalPrompt = `${finalPrompt}. ${randomEnding}`;
        }
  
        newPrompts.push({
          id: promptData.uniqueId,
          prompt: finalPrompt,
          category: categoryToUse,
          theme: promptData.theme,
          type: settings.contentType,
          mode: settings.outputMode,
          timestamp: promptData.timestamp
        });
      }
    }
  
    setTimeout(() => {
      setPrompts(newPrompts);
      setIsGenerating(false);
      
      // ✨ UPDATED: Enhanced notification dengan manual keyword info
      const successMsg = document.createElement('div');
      let themeMode = 'Auto Random';
      if (settings.isManualMode && settings.manualKeyword) {
        themeMode = `Manual: "${settings.manualKeyword}"`;
      } else if (settings.selectedTheme !== 'auto') {
        themeMode = 'Predefined Theme';
      }
      
      successMsg.innerHTML = `
        <div class="text-sm font-medium">${t('notifications.uniqueGeneration')}</div>
        <div class="text-xs mt-1 opacity-90">🎯 Theme Mode: ${themeMode}</div>
        <div class="text-xs mt-1 opacity-90">🚫 Generated prompts exclude all living creatures. If any appear in results, please remove manually.</div>
      `;
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg z-50 max-w-sm';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 5000); // Extended to 5 seconds for important message
      
    }, 800);
  
  }, [
    settings.promptCount,
    settings.selectedCategory,
    settings.selectedTheme,
    settings.manualKeyword,    // ✨ NEW: Add manual keyword to dependencies
    settings.isManualMode,     // ✨ NEW: Add manual mode to dependencies
    settings.selectedStyle,
    settings.selectedMood,
    settings.lightingPreference,
    settings.compositionStyle,
    settings.colorEnhancement,
    settings.focusStyle,
    settings.qualityPriority,
    settings.outputMode,
    settings.contentType,
    settings.mjAspectRatio,
    settings.mjVersion,
    settings.mjChaos,
    settings.mjStylize,
    settings.mjQuality,
    settings.mjWeird,
    settings.mjRaw,
    settings.mjTile,
    settings.mjNiji,
    settings.mjNoElements,
    t
  ]);

  const copyPrompt = useCallback((prompt, index) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const copyAllPrompts = useCallback(() => {
    const content = prompts.map((p, i) => `${i + 1}. ${p.prompt}`).join('\n\n');
    navigator.clipboard.writeText(content);
    
    const successMsg = document.createElement('div');
    successMsg.textContent = t('notifications.allCopied');
    successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg z-50';
    document.body.appendChild(successMsg);
    setTimeout(() => {
      if (document.body.contains(successMsg)) {
        document.body.removeChild(successMsg);
      }
    }, 3000);
  }, [prompts, t]);

  const exportPrompts = useCallback(() => {
    const content = prompts.map((p, i) => `${i + 1}. ${p.prompt}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-prompts-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [prompts]);

  return {
    prompts,
    isGenerating,
    copiedIndex,
    generatePrompts,
    copyPrompt,
    copyAllPrompts,
    exportPrompts
  };
};

export default usePromptGeneration;