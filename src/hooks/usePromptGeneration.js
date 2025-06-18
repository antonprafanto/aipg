import { useState, useCallback } from 'react';
import { categories } from '../data/categories';
import { styles, moods, lightingConditions, compositions, colorPalettes, cameraSettings, qualityTerms } from '../data/styles';

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

  // COMPLETELY REWRITTEN GENERATION LOGIC - TRUE RANDOMIZATION
  const generatePrompts = useCallback((isFullRandom = false) => {
    setIsGenerating(true);
    
    // SMART PROMPT GENERATION WITH TRUE RANDOMIZATION - Moved inside useCallback
    const generateSmartPrompt = (category, isRandomMode, promptSettings) => {
      const categoryData = categories[category];
      if (!categoryData) return null;

      const selectedTheme = getRandomElement(categoryData.themes);
      
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
      const styleDesc = styles[promptSettings.selectedStyle];
      const moodDesc = moods[promptSettings.selectedMood];
      
      const basePrompt = `${selectedTheme} scene, ${styleDesc}, ${lighting}, ${composition}, ${colors}, ${camera}, ${quality}, ${moodDesc}`;
      
      return {
        prompt: basePrompt,
        theme: selectedTheme,
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
    const usedThemes = new Set(); // Ensure no theme repetition within single generation
  
    for (let i = 0; i < settings.promptCount; i++) {
      let categoryToUse;
      
      if (isFullRandom) {
        // Truly random category selection for each prompt
        const categoryKeys = Object.keys(categories);
        categoryToUse = getRandomElement(categoryKeys);
      } else {
        categoryToUse = settings.selectedCategory;
      }
  
      // Generate unique prompt with smart logic
      const promptData = generateSmartPrompt(categoryToUse, isFullRandom, promptSettings);
      
      if (promptData) {
        // Ensure theme uniqueness within this generation
        let attempts = 0;
        while (usedThemes.has(promptData.theme) && attempts < 10) {
          const newPromptData = generateSmartPrompt(categoryToUse, isFullRandom, promptSettings);
          if (newPromptData && !usedThemes.has(newPromptData.theme)) {
            promptData.theme = newPromptData.theme;
            promptData.prompt = newPromptData.prompt;
            break;
          }
          attempts++;
        }
        
        usedThemes.add(promptData.theme);
  
        let finalPrompt = promptData.prompt;
  
        // Format for output mode
        if (settings.outputMode === 'midjourney') {
          // PERBAIKAN: Semua parameter dikumpulkan di akhir, tidak tersebar
          let mjParams = [];
          
          // Tambahkan parameter dasar
          mjParams.push(`--ar ${settings.mjAspectRatio}`);
          mjParams.push(`--v ${settings.mjVersion}`);
          
          // Tambahkan parameter opsional
          if (settings.mjChaos > 0) mjParams.push(`--chaos ${settings.mjChaos}`);
          if (settings.mjStylize !== 100) mjParams.push(`--s ${settings.mjStylize}`);
          if (settings.mjQuality !== '1') mjParams.push(`--q ${settings.mjQuality}`);
          if (settings.mjWeird > 0) mjParams.push(`--weird ${settings.mjWeird}`);
          
          // Tambahkan flag boolean
          if (settings.mjRaw) mjParams.push('--raw');
          if (settings.mjTile) mjParams.push('--tile');
          if (settings.mjNiji) mjParams.push('--niji 6');
          
          // Enhanced negative prompts untuk hasil yang bersih
          const baseNegativePrompts = [
            'people', 'animals', 'faces', 'person', 'human',
            'text', 'words', 'letters', 'writing', 'typography', 'font',
            'watermarks', 'watermark', 'logo', 'logos', 'brand', 'branding',
            'signature', 'copyright', 'trademark', 'stamp',
            'UI elements', 'buttons', 'icons', 'interface',
            'advertisements', 'ads', 'promotional text',
            'social media', 'website elements', 'web design',
            'blurry', 'distortion', 'artifacts', 'noise',
            'oversaturated', 'overexposed', 'underexposed'
          ];
          
          // Gabungkan user custom negative prompts dengan base prompts
          let allNegativePrompts = [...baseNegativePrompts];
          if (settings.mjNoElements.trim()) {
            // Split user input dan tambahkan ke array
            const userNegatives = settings.mjNoElements.split(',').map(item => item.trim()).filter(item => item);
            allNegativePrompts = [...userNegatives, ...baseNegativePrompts];
          }
          
          // Tambahkan --no parameter
          mjParams.push(`--no ${allNegativePrompts.join(', ')}`);
          
          // FORMAT YANG BENAR: Deskripsi lengkap DULU, baru SEMUA parameter di akhir
          finalPrompt = `/imagine prompt: ${finalPrompt} ${mjParams.join(' ')}`;
          
        } else {
          // Standard format dengan quality terms (no 4K/8K)
          const technicalSpecs = settings.contentType === 'video' 
            ? 'professional videography, smooth motion, commercial quality'
            : 'professional photography, perfect exposure, commercial use ready';
  
          // Enhanced negative prompts untuk Standard mode juga
          const standardNegativePrompts = [
            'no watermarks', 'no text overlay', 'no logos', 'no branding', 
            'no people', 'no animals', 'no faces', 'no UI elements',
            'no advertisements', 'no promotional text', 'no social media elements',
            'commercial use ready', 'stock photography style', technicalSpecs
          ].join(', ');
  
          finalPrompt = `${finalPrompt}, ${standardNegativePrompts}. Masterpiece quality, trending on Adobe Stock.`;
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
      
      // Show unique generation notification
      const successMsg = document.createElement('div');
      successMsg.textContent = t('notifications.uniqueGeneration');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50';
      document.body.appendChild(successMsg);
      setTimeout(() => document.body.removeChild(successMsg), 3000);
      
    }, 800);
  
  }, [
    settings.promptCount,
    settings.selectedCategory,
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
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  }, [prompts, t]);

  const exportPrompts = useCallback(() => {
    const content = prompts.map((p, i) => `${i + 1}. ${p.prompt}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${settings.outputMode}-prompts-${settings.selectedCategory}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [prompts, settings.outputMode, settings.selectedCategory]);

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