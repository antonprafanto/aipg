import { useState } from 'react';

const useSettings = () => {
  // Basic Settings
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [selectedTheme, setSelectedTheme] = useState('auto');
  // ✨ NEW: Manual keyword input state
  const [manualKeyword, setManualKeyword] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  
  const [promptCount, setPromptCount] = useState(10);
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [selectedMood, setSelectedMood] = useState('professional');
  const [contentType, setContentType] = useState('photo');
  const [outputMode, setOutputMode] = useState('standard');
  const [language, setLanguage] = useState('en');
  const [showSettings, setShowSettings] = useState(false);
  
  // Advanced Settings States
  const [colorEnhancement, setColorEnhancement] = useState('vibrant');
  const [qualityPriority, setQualityPriority] = useState('professional');
  const [focusStyle, setFocusStyle] = useState('shallow');
  const [lightingPreference, setLightingPreference] = useState('golden');
  const [compositionStyle, setCompositionStyle] = useState('thirds');
  
  // Midjourney Settings
  const [mjVersion, setMjVersion] = useState('7');
  const [mjAspectRatio, setMjAspectRatio] = useState('1:1');
  const [mjChaos, setMjChaos] = useState(25);
  const [mjStylize, setMjStylize] = useState(100);
  const [mjQuality, setMjQuality] = useState('1');
  const [mjWeird, setMjWeird] = useState(0);
  const [mjRaw, setMjRaw] = useState(false);
  const [mjTile, setMjTile] = useState(false);
  const [mjNiji, setMjNiji] = useState(false);
  const [mjNoElements, setMjNoElements] = useState('');
  
  // Collapsible Sections
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    howToUse: false,
    mjParams: false,
    tips: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Smart category change handler
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setSelectedTheme('auto'); // Auto reset theme when category changes
  };

  // ✨ NEW: Handle manual mode toggle
  const handleManualModeToggle = (enabled) => {
    setIsManualMode(enabled);
    if (enabled) {
      setSelectedTheme('manual'); // Set to manual when enabled
    } else {
      setSelectedTheme('auto'); // Reset to auto when disabled
      setManualKeyword(''); // Clear manual keyword
    }
  };

  // ✨ NEW: Handle manual keyword change
  const handleManualKeywordChange = (keyword) => {
    setManualKeyword(keyword);
    if (keyword.trim()) {
      setSelectedTheme('manual');
      setIsManualMode(true);
    }
  };

  // ✅ FIXED: Complete randomizeAll function - BENAR-BENAR RANDOM!
  const randomizeAll = () => {
    // 🎯 BASIC SETTINGS - Yang harus dirandom
    const categoryKeys = ['business', 'lifestyle', 'food', 'abstract', 'nature', 'architecture'];
    const newCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    setSelectedCategory(newCategory);
    setSelectedTheme('auto'); // Always auto for random all
    
    // Reset manual mode when randomizing
    setIsManualMode(false);
    setManualKeyword('');
    
    // Randomize styles and moods
    const styleKeys = ['photorealistic', 'cinematic', 'minimalist', 'vintage', 'artistic', 'documentary', 'editorial'];
    setSelectedStyle(styleKeys[Math.floor(Math.random() * styleKeys.length)]);
    
    const moodKeys = ['professional', 'calm', 'energetic', 'luxurious', 'natural', 'modern', 'warm'];
    setSelectedMood(moodKeys[Math.floor(Math.random() * moodKeys.length)]);
    
    // ✅ FIXED: Randomize Advanced Settings (yang sebelumnya tidak dirandom)
    const colorOptions = ['vibrant', 'natural', 'muted'];
    setColorEnhancement(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    
    const qualityOptions = ['professional', 'commercial', 'artistic', 'editorial'];
    setQualityPriority(qualityOptions[Math.floor(Math.random() * qualityOptions.length)]);
    
    const focusOptions = ['shallow', 'deep', 'selective', 'macro'];
    setFocusStyle(focusOptions[Math.floor(Math.random() * focusOptions.length)]);
    
    const lightingOptions = ['golden', 'natural', 'studio', 'mixed'];
    setLightingPreference(lightingOptions[Math.floor(Math.random() * lightingOptions.length)]);
    
    const compositionOptions = ['thirds', 'centered', 'dynamic', 'minimalist'];
    setCompositionStyle(compositionOptions[Math.floor(Math.random() * compositionOptions.length)]);
    
    // 🚫 YANG TIDAK BOLEH DIRANDOM (User-controlled only):
    // ❌ promptCount - User yang kontrol
    // ❌ contentType - User yang kontrol (photo/video) - FIXED: TIDAK DIRANDOM LAGI
    // ❌ outputMode - User yang kontrol (standard/midjourney)
    // ❌ language - User yang kontrol (en/id)
    // ❌ Semua Midjourney settings - User yang kontrol
    
    // Show randomized notification
    const msg = document.createElement('div');
    msg.textContent = '🎲 All settings randomized completely & generating unique mixed category prompts...';
    msg.className = 'fixed top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-xl shadow-lg z-50';
    document.body.appendChild(msg);
    setTimeout(() => {
      if (document.body.contains(msg)) {
        document.body.removeChild(msg);
      }
    }, 3000);
  };

  return {
    // Basic Settings
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    selectedTheme,
    setSelectedTheme,
    // ✨ NEW: Manual keyword states
    manualKeyword,
    setManualKeyword: handleManualKeywordChange,
    isManualMode,
    setIsManualMode: handleManualModeToggle,
    
    promptCount,
    setPromptCount,
    selectedStyle,
    setSelectedStyle,
    selectedMood,
    setSelectedMood,
    contentType,
    setContentType,
    outputMode,
    setOutputMode,
    language,
    setLanguage,
    showSettings,
    setShowSettings,
    
    // Advanced Settings
    colorEnhancement,
    setColorEnhancement,
    qualityPriority,
    setQualityPriority,
    focusStyle,
    setFocusStyle,
    lightingPreference,
    setLightingPreference,
    compositionStyle,
    setCompositionStyle,
    
    // Midjourney Settings
    mjVersion,
    setMjVersion,
    mjAspectRatio,
    setMjAspectRatio,
    mjChaos,
    setMjChaos,
    mjStylize,
    setMjStylize,
    mjQuality,
    setMjQuality,
    mjWeird,
    setMjWeird,
    mjRaw,
    setMjRaw,
    mjTile,
    setMjTile,
    mjNiji,
    setMjNiji,
    mjNoElements,
    setMjNoElements,
    
    // Functions
    expandedSections,
    toggleSection,
    randomizeAll
  };
};

export default useSettings;