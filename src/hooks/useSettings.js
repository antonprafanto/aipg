import { useState } from 'react';

const useSettings = () => {
  // Basic Settings
  const [selectedCategory, setSelectedCategory] = useState('business');
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

  const randomizeAll = () => {
    // Randomize ALL settings for RANDOM ALL mode
    const categoryKeys = ['business', 'lifestyle', 'food', 'abstract', 'nature', 'architecture'];
    setSelectedCategory(categoryKeys[Math.floor(Math.random() * categoryKeys.length)]);
    
    const styleKeys = ['photorealistic', 'cinematic', 'minimalist', 'vintage', 'artistic', 'documentary', 'editorial'];
    setSelectedStyle(styleKeys[Math.floor(Math.random() * styleKeys.length)]);
    
    const moodKeys = ['professional', 'calm', 'energetic', 'luxurious', 'natural', 'modern', 'warm'];
    setSelectedMood(moodKeys[Math.floor(Math.random() * moodKeys.length)]);
    
    setContentType(Math.random() > 0.5 ? 'photo' : 'video');
    
    // Randomize advanced settings too
    setColorEnhancement(['vibrant', 'natural', 'muted'][Math.floor(Math.random() * 3)]);
    setQualityPriority(['professional', 'commercial', 'artistic'][Math.floor(Math.random() * 3)]);
    setFocusStyle(['shallow', 'deep', 'selective', 'macro'][Math.floor(Math.random() * 4)]);
    setLightingPreference(['golden', 'natural', 'studio', 'mixed'][Math.floor(Math.random() * 4)]);
    setCompositionStyle(['thirds', 'centered', 'dynamic', 'minimalist'][Math.floor(Math.random() * 4)]);
  };

  return {
    // Basic Settings
    selectedCategory, setSelectedCategory,
    promptCount, setPromptCount,
    selectedStyle, setSelectedStyle,
    selectedMood, setSelectedMood,
    contentType, setContentType,
    outputMode, setOutputMode,
    language, setLanguage,
    showSettings, setShowSettings,
    
    // Advanced Settings
    colorEnhancement, setColorEnhancement,
    qualityPriority, setQualityPriority,
    focusStyle, setFocusStyle,
    lightingPreference, setLightingPreference,
    compositionStyle, setCompositionStyle,
    
    // Midjourney Settings
    mjVersion, setMjVersion,
    mjAspectRatio, setMjAspectRatio,
    mjChaos, setMjChaos,
    mjStylize, setMjStylize,
    mjQuality, setMjQuality,
    mjWeird, setMjWeird,
    mjRaw, setMjRaw,
    mjTile, setMjTile,
    mjNiji, setMjNiji,
    mjNoElements, setMjNoElements,
    
    // UI State
    expandedSections,
    toggleSection,
    randomizeAll
  };
};

export default useSettings;