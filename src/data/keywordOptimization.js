// src/data/keywordOptimization.js - Adobe Stock Keyword Optimization System

// ✅ Adobe Stock Keyword Limits & Guidelines
export const ADOBE_STOCK_LIMITS = {
    MAX_KEYWORDS: 49,
    PRIMARY_KEYWORDS: 10,    // Highest search weight
    SECONDARY_KEYWORDS: 20,  // Medium search weight  
    TERTIARY_KEYWORDS: 19,   // Remaining slots
    MIN_KEYWORDS: 5,         // Minimum for good discoverability
    TITLE_MAX_LENGTH: 200    // Character limit for titles
  };
  
  // ✅ Commercial Keywords by Category (High-performing for Adobe Stock)
  export const commercialKeywordsByCategory = {
    business: {
      primary: [
        'business', 'technology', 'office', 'professional', 'corporate',
        'workplace', 'digital', 'modern', 'equipment', 'productivity'
      ],
      secondary: [
        'commercial', 'industry', 'innovation', 'device', 'computer',
        'laptop', 'smartphone', 'workspace', 'communication', 'networking',
        'finance', 'marketing', 'startup', 'entrepreneurship', 'success',
        'growth', 'strategy', 'management', 'leadership', 'teamwork'
      ],
      tertiary: [
        'efficiency', 'automation', 'ai', 'artificial intelligence', 'data',
        'analytics', 'software', 'hardware', 'internet', 'wireless',
        'bluetooth', 'connection', 'productivity tools', 'remote work',
        'hybrid office', 'collaboration', 'video conference', 'presentation',
        'meeting'
      ]
    },
  
    transportation: {
      primary: [
        'transportation', 'logistics', 'delivery', 'shipping', 'travel',
        'vehicle', 'cargo', 'package', 'freight', 'distribution'
      ],
      secondary: [
        'e-commerce', 'supply chain', 'warehouse', 'packaging', 'courier',
        'express', 'tracking', 'barcode', 'scanner', 'inventory',
        'luggage', 'suitcase', 'journey', 'mobility', 'sustainable',
        'electric', 'eco-friendly', 'green transport', 'urban', 'city'
      ],
      tertiary: [
        'last mile', 'fulfillment', 'storage', 'handling', 'sorting',
        'dispatch', 'route', 'navigation', 'gps', 'tracking system',
        'smart logistics', 'automation', 'efficiency', 'speed',
        'reliability', 'service', 'customer', 'satisfaction', 'quality'
      ]
    },
  
    food: {
      primary: [
        'food', 'kitchen', 'cooking', 'culinary', 'nutrition',
        'healthy', 'organic', 'fresh', 'ingredient', 'meal'
      ],
      secondary: [
        'preparation', 'chef', 'restaurant', 'dining', 'recipe',
        'utensil', 'equipment', 'appliance', 'tool', 'gadget',
        'diet', 'wellness', 'lifestyle', 'natural', 'supplement',
        'vitamin', 'protein', 'superfood', 'beverage', 'drink'
      ],
      tertiary: [
        'meal prep', 'food storage', 'preservation', 'fermentation',
        'sustainable eating', 'farm to table', 'artisanal', 'gourmet',
        'specialty', 'international', 'fusion', 'traditional',
        'modern cuisine', 'food photography', 'presentation', 'styling',
        'commercial kitchen', 'food safety', 'hygiene'
      ]
    },
  
    abstract: {
      primary: [
        'abstract', 'pattern', 'design', 'background', 'texture',
        'geometric', 'modern', 'contemporary', 'artistic', 'creative'
      ],
      secondary: [
        'gradient', 'color', 'vibrant', 'minimalist', 'futuristic',
        'digital', 'graphic', 'visual', 'aesthetic', 'style',
        'concept', 'innovation', 'technology', 'ai', 'neural',
        'algorithm', 'data', 'network', 'structure', 'composition'
      ],
      tertiary: [
        'hyperpop', 'holographic', 'metallic', 'crystalline', 'fluid',
        'organic', 'parametric', 'generative', 'computational', 'fractal',
        'mathematical', 'symmetry', 'asymmetry', 'balance', 'harmony',
        'contrast', 'brightness', 'saturation', 'hue', 'spectrum'
      ]
    },
  
    nature: {
      primary: [
        'nature', 'natural', 'environment', 'eco', 'sustainable',
        'green', 'organic', 'renewable', 'clean', 'pure'
      ],
      secondary: [
        'environmental', 'ecology', 'conservation', 'biodegradable',
        'recyclable', 'carbon neutral', 'energy', 'solar', 'wind',
        'earth', 'planet', 'climate', 'weather', 'season',
        'material', 'texture', 'surface', 'pattern', 'formation'
      ],
      tertiary: [
        'sustainability', 'eco-friendly', 'green technology', 'renewable energy',
        'carbon footprint', 'environmental protection', 'natural resources',
        'ecosystem', 'biodiversity', 'conservation', 'preservation',
        'restoration', 'regeneration', 'circular economy', 'zero waste',
        'life cycle', 'impact', 'responsibility', 'stewardship'
      ]
    },
  
    architecture: {
      primary: [
        'architecture', 'building', 'construction', 'design', 'interior',
        'home', 'house', 'modern', 'contemporary', 'structure'
      ],
      secondary: [
        'furniture', 'decoration', 'style', 'room', 'space',
        'living', 'bedroom', 'kitchen', 'bathroom', 'office',
        'residential', 'commercial', 'industrial', 'urban', 'planning',
        'development', 'property', 'real estate', 'investment', 'luxury'
      ],
      tertiary: [
        'smart home', 'automation', 'technology', 'security', 'energy efficient',
        'sustainable design', 'green building', 'LEED', 'certification',
        'renovation', 'remodeling', 'restoration', 'improvement',
        'maintenance', 'repair', 'upgrade', 'installation', 'materials',
        'tools', 'equipment'
      ]
    }
  };
  
  // ✅ Universal High-Performance Keywords (Work across all categories)
  export const universalKeywords = {
    quality: [
      'high quality', 'professional', 'premium', 'commercial grade',
      'industry standard', 'top quality', 'superior', 'excellent'
    ],
    technical: [
      'isolated', 'white background', 'clean', 'crisp', 'sharp',
      'detailed', 'clear', 'bright', 'vivid', 'realistic'
    ],
    commercial: [
      'commercial use', 'business ready', 'marketing', 'advertising',
      'promotional', 'corporate', 'brand', 'identity', 'professional use'
    ],
    descriptive: [
      'studio shot', 'product photography', 'professional lighting',
      'perfect composition', 'ideal', 'flawless', 'pristine', 'immaculate'
    ]
  };
  
  // ✅ 2025 Trending Keywords (Based on market research)
  export const trending2025Keywords = [
    'ai integration', 'artificial intelligence', 'machine learning',
    'sustainable', 'eco-friendly', 'carbon neutral', 'renewable',
    'remote work', 'hybrid workplace', 'digital transformation',
    'automation', 'smart technology', 'iot', 'connected devices',
    'minimalist design', 'clean aesthetics', 'modern lifestyle',
    'wellness', 'mindfulness', 'work-life balance', 'productivity',
    'innovation', 'disruptive technology', 'future-ready', 'next-gen'
  ];
  
  // ✅ Style-Specific Keywords Enhancement
  export const styleKeywords = {
    photorealistic: ['photorealistic', 'realistic', 'lifelike', 'authentic', 'natural'],
    cinematic: ['cinematic', 'dramatic', 'movie-style', 'film-like', 'theatrical'],
    minimalist: ['minimalist', 'clean', 'simple', 'uncluttered', 'minimal'],
    vintage: ['vintage', 'retro', 'classic', 'timeless', 'nostalgic'],
    artistic: ['artistic', 'creative', 'expressive', 'unique', 'innovative'],
    documentary: ['documentary', 'authentic', 'real', 'candid', 'genuine'],
    editorial: ['editorial', 'magazine-style', 'publication-ready', 'polished', 'refined']
  };
  
  // ✅ Mood-Specific Keywords Enhancement  
  export const moodKeywords = {
    professional: ['professional', 'business', 'corporate', 'formal', 'serious'],
    calm: ['calm', 'peaceful', 'serene', 'tranquil', 'relaxing'],
    energetic: ['energetic', 'dynamic', 'vibrant', 'active', 'lively'],
    luxurious: ['luxurious', 'premium', 'elegant', 'sophisticated', 'upscale'],
    natural: ['natural', 'organic', 'authentic', 'genuine', 'real'],
    modern: ['modern', 'contemporary', 'current', 'up-to-date', 'trendy'],
    warm: ['warm', 'cozy', 'comfortable', 'inviting', 'friendly']
  };
  
  // ✅ Keyword Generation Algorithm
  export const generateOptimizedKeywords = (category, style, mood, theme, additionalContext = []) => {
    const keywords = new Set(); // Use Set to avoid duplicates
    
    // 1. Primary Keywords (10) - Highest search weight
    const primaryKeywords = commercialKeywordsByCategory[category]?.primary || [];
    primaryKeywords.slice(0, 10).forEach(keyword => keywords.add(keyword));
    
    // 2. Style & Mood Keywords (4-6)
    const styleKWs = styleKeywords[style] || [];
    const moodKWs = moodKeywords[mood] || [];
    [...styleKWs.slice(0, 3), ...moodKWs.slice(0, 3)].forEach(keyword => keywords.add(keyword));
    
    // 3. Secondary Keywords (15-20)
    const secondaryKeywords = commercialKeywordsByCategory[category]?.secondary || [];
    secondaryKeywords.slice(0, 15).forEach(keyword => keywords.add(keyword));
    
    // 4. Universal Quality Keywords (5-7)
    [...universalKeywords.quality.slice(0, 3), ...universalKeywords.technical.slice(0, 4)]
      .forEach(keyword => keywords.add(keyword));
    
    // 5. 2025 Trending Keywords (3-5)
    trending2025Keywords.slice(0, 5).forEach(keyword => keywords.add(keyword));
    
    // 6. Additional Context Keywords
    additionalContext.forEach(keyword => keywords.add(keyword));
    
    // 7. Fill remaining slots with tertiary keywords
    const tertiaryKeywords = commercialKeywordsByCategory[category]?.tertiary || [];
    const remainingSlots = ADOBE_STOCK_LIMITS.MAX_KEYWORDS - keywords.size;
    tertiaryKeywords.slice(0, remainingSlots).forEach(keyword => keywords.add(keyword));
    
    // Convert to array and limit to 49
    const finalKeywords = Array.from(keywords).slice(0, ADOBE_STOCK_LIMITS.MAX_KEYWORDS);
    
    return {
      primary: finalKeywords.slice(0, ADOBE_STOCK_LIMITS.PRIMARY_KEYWORDS),
      secondary: finalKeywords.slice(ADOBE_STOCK_LIMITS.PRIMARY_KEYWORDS, ADOBE_STOCK_LIMITS.PRIMARY_KEYWORDS + ADOBE_STOCK_LIMITS.SECONDARY_KEYWORDS),
      tertiary: finalKeywords.slice(ADOBE_STOCK_LIMITS.PRIMARY_KEYWORDS + ADOBE_STOCK_LIMITS.SECONDARY_KEYWORDS),
      all: finalKeywords,
      count: finalKeywords.length
    };
  };
  
  // ✅ SEO Title Generator for Adobe Stock
  export const generateSEOTitle = (category, theme, style, mood) => {
    const categoryNames = {
      business: 'Business Technology',
      transportation: 'Transportation Logistics',
      food: 'Food Kitchen',
      abstract: 'Abstract Pattern',
      nature: 'Natural Environment',
      architecture: 'Architecture Interior'
    };
    
    const styleAdjectives = {
      photorealistic: 'Professional',
      cinematic: 'Cinematic',
      minimalist: 'Minimalist',
      vintage: 'Vintage',
      artistic: 'Artistic',
      documentary: 'Authentic',
      editorial: 'Editorial'
    };
    
    const moodAdjectives = {
      professional: 'Corporate',
      calm: 'Peaceful',
      energetic: 'Dynamic',
      luxurious: 'Premium',
      natural: 'Organic',
      modern: 'Contemporary',
      warm: 'Cozy'
    };
    
    // Extract main subject from theme
    const mainSubject = theme.split(' ').slice(0, 3).join(' ');
    
    const title = `${styleAdjectives[style] || 'Professional'} ${mainSubject} ${categoryNames[category] || 'Product'} ${moodAdjectives[mood] || 'Commercial'} Photography Isolated White Background`;
    
    // Ensure title doesn't exceed Adobe Stock limit
    return title.length > ADOBE_STOCK_LIMITS.TITLE_MAX_LENGTH 
      ? title.substring(0, ADOBE_STOCK_LIMITS.TITLE_MAX_LENGTH - 3) + '...'
      : title;
  };