// ✅ BACKWARD COMPATIBLE: Support both old format (for UI) and new format (for generation)

// For UI components (ControlPanel, etc.) - Keep as strings for dropdown labels
export const styles = {
  photorealistic: "Photorealistic, professional photography, sharp focus, detailed textures",
  cinematic: "Cinematic style, dramatic lighting, film grain, professional color grading, dimensional depth",
  minimalist: "Minimalist aesthetic, clean composition, negative space, simple elegance, isolated objects",
  vintage: "Modern vintage style, warm tones, nostalgic feel, contemporary interpretation",
  artistic: "Artistic interpretation, creative composition, unique perspective, visual interest, premium quality",
  documentary: "Documentary style, authentic, candid, real-world photography, professional documentation",
  editorial: "Editorial quality, magazine-style, polished, commercial appeal, business-ready",
};

export const moods = {
  professional: "professional, clean, corporate, sophisticated, business-appropriate",
  calm: "calm, peaceful, serene, tranquil, zen-like, balanced",
  energetic: "dynamic, vibrant, energetic, motivational, engaging",
  luxurious: "luxurious, premium, high-end, elegant, sophisticated",
  natural: "organic, natural, authentic, earthy, genuine",
  modern: "contemporary, sleek, cutting-edge, progressive, innovative",
  warm: "inviting, cozy, comfortable, friendly, approachable",
};

// ✅ NEW: Separate arrays for TRUE randomization in prompt generation
export const styleVariations = {
  photorealistic: [
    "Photorealistic, professional photography, sharp focus, detailed textures",
    "Ultra-realistic rendering, commercial quality, pristine detail capture",
    "Hyper-realistic photography, studio precision, professional documentation",
    "Photographic realism, crisp focus, commercial-grade imagery"
  ],
  cinematic: [
    "Cinematic style, dramatic lighting, film grain, professional color grading, dimensional depth",
    "Film-style composition, theatrical lighting, movie-quality rendering, cinematic atmosphere", 
    "Cinematic excellence, dramatic shadows, professional film aesthetics, storytelling depth",
    "Movie-style photography, cinematic depth, professional storytelling, film-grade quality"
  ],
  minimalist: [
    "Minimalist aesthetic, clean composition, negative space, simple elegance, isolated objects",
    "Clean minimal design, spacious layout, sophisticated simplicity, uncluttered perfection",
    "Minimalist perfection, refined composition, elegant restraint, purposeful spacing",
    "Simple minimalist style, balanced composition, sophisticated restraint, clean elegance"
  ],
  vintage: [
    "Modern vintage style, warm tones, nostalgic feel, contemporary interpretation",
    "Retro-inspired design, classic aesthetics, timeless appeal, heritage quality",
    "Vintage charm, classic photography style, nostalgic atmosphere, refined heritage", 
    "Contemporary vintage, classic quality, timeless sophistication, retro elegance"
  ],
  artistic: [
    "Artistic interpretation, creative composition, unique perspective, visual interest, premium quality",
    "Creative artistic vision, innovative composition, expressive imagery, sophisticated artistry",
    "Artistic excellence, creative direction, visually compelling design, fine art quality",
    "Fine art photography, creative expression, sophisticated artistry, innovative perspective"
  ],
  documentary: [
    "Documentary style, authentic, candid, real-world photography, professional documentation",
    "Journalistic approach, authentic storytelling, professional documentation, truthful capture",
    "Documentary excellence, authentic representation, real-world imagery, professional journalism",
    "Authentic documentary, professional journalism, real-world precision, candid excellence"
  ],
  editorial: [
    "Editorial quality, magazine-style, polished, commercial appeal, business-ready", 
    "Publication-ready imagery, editorial sophistication, professional standards, premium presentation",
    "High-end editorial style, magazine-worthy quality, commercial sophistication, publication excellence",
    "Editorial perfection, commercial elegance, professional publication standards, premium quality"
  ]
};

export const moodVariations = {
  professional: [
    "professional, clean, corporate, sophisticated, business-appropriate",
    "executive-level presentation, polished corporate aesthetics, business excellence", 
    "professional standards, corporate sophistication, business-grade quality",
    "commercial professionalism, corporate elegance, business-ready presentation"
  ],
  calm: [
    "calm, peaceful, serene, tranquil, zen-like, balanced",
    "soothing atmosphere, peaceful ambiance, serene composition, tranquil elegance",
    "zen-inspired calm, peaceful sophistication, balanced harmony, serene quality",
    "tranquil mood, calming presence, peaceful refinement, serene balance"
  ],
  energetic: [
    "dynamic, vibrant, energetic, motivational, engaging",
    "high-energy composition, vibrant dynamism, motivational impact, engaging vitality",
    "energetic excellence, dynamic engagement, powerful motivation, vibrant energy",
    "dynamic vitality, energetic sophistication, vibrant motivation, engaging dynamism"
  ],
  luxurious: [
    "luxurious, premium, high-end, elegant, sophisticated", 
    "luxury excellence, premium sophistication, high-end elegance, opulent quality",
    "sophisticated luxury, elegant premium refinement, luxurious presentation, high-end quality",
    "opulent sophistication, luxury standards, premium elegance, high-end refinement"
  ],
  natural: [
    "organic, natural, authentic, earthy, genuine",
    "natural authenticity, organic composition, genuine character, earthy sophistication",
    "authentic presentation, natural elegance, organic refinement, genuine quality",
    "earthy excellence, natural purity, authentic sophistication, organic elegance"
  ],
  modern: [
    "contemporary, sleek, cutting-edge, progressive, innovative",
    "modern sophistication, contemporary excellence, innovative design, progressive quality",
    "cutting-edge aesthetics, sleek innovation, modern precision, contemporary refinement",
    "progressive elegance, innovative sophistication, modern excellence, contemporary style"
  ],
  warm: [
    "inviting, cozy, comfortable, friendly, approachable",
    "warm atmosphere, cozy elegance, comfortable sophistication, friendly presentation",
    "inviting charm, approachable quality, comfortable refinement, warm sophistication",
    "cozy refinement, warm elegance, friendly sophistication, approachable excellence"
  ]
};

export const lightingConditions = [
  "golden hour lighting",
  "soft natural light",
  "studio lighting with multiple sources",
  "ambient lighting setup",
  "dramatic shadows and highlights",
  "diffused professional lighting",
  "backlit with rim lighting",
  "side lighting for dimension",
  "overhead lighting setup",
  "rim lighting for object separation",
  "window light photography",
  "sunset glow illumination",
  "blue hour lighting",
  "overcast soft lighting",
  "professional product lighting",
  "isolated white background lighting"
];

export const compositions = [
  "rule of thirds composition",
  "centered symmetrical composition",
  "leading lines arrangement",
  "negative space utilization",
  "symmetrical balance layout",
  "diagonal dynamic composition",
  "frame within frame setup",
  "overhead flat lay arrangement",
  "low angle perspective",
  "high angle view",
  "shallow depth of field focus",
  "layered depth composition",
  "isolated object composition",
  "minimalist arrangement"
];

export const colorPalettes = [
  "warm earth tones palette",
  "cool blue professional palette",
  "monochromatic scheme with subtle variations",
  "complementary colors for impact",
  "neutral business tones",
  "vibrant accent colors on neutral base",
  "pastel colors with soft contrast",
  "high contrast for clarity",
  "muted sophisticated colors",
  "analogous color harmony",
  "triadic color scheme",
  "split complementary palette",
  "future dust aesthetic (dark blue with purple-grey)",
  "mocha mousse warm brown luxury tones"
];

export const cameraSettings = [
  "shallow depth of field, f/1.8 aperture",
  "wide aperture f/1.4 for object isolation",
  "sharp focus throughout, f/8 aperture",
  "macro detail photography settings",
  "wide angle perspective capture",
  "telephoto compression effect",
  "medium format quality rendering",
  "tilt-shift selective focus",
  "professional studio camera settings",
  "high resolution capture quality",
  "perfect exposure balance",
  "HDR balanced processing",
  "commercial photography specifications",
  "product photography optimal settings"
];

export const qualityTerms = [
  "ultra-detailed precision",
  "masterpiece quality rendering",
  "professional commercial photography",
  "award-winning composition",
  "magazine quality standards",
  "commercial photography excellence",
  "pristine quality output",
  "premium photography standards",
  "professional studio quality",
  "commercial-ready assets",
  "high-resolution precision",
  "dimensional design quality",
  "business-ready photography",
  "isolated white background perfection",
  "studio-grade professional quality"
];

// ✅ NEW: Random quality endings to replace the hardcoded one
// ✅ NEW: Random quality endings to replace the hardcoded one
export const qualityEndings = [
  "Masterpiece quality, commercial photography, studio lighting, professional composition, high-resolution",
  "Premium commercial quality, professional studio setup, crystal-clear resolution, business-ready assets", 
  "Award-winning photography standards, professional lighting design, ultra-high definition, commercial excellence",
  "Studio-grade professional quality, commercial photography specifications, pristine resolution, market-ready",
  "Professional commercial standards, expert lighting arrangement, high-definition precision, publication-ready",
  "Commercial photography excellence, professional studio environment, ultra-clear resolution, business-grade quality",
  "Professional imaging standards, commercial-quality lighting, high-resolution capture, industry-ready assets",
  "Expert photography quality, commercial studio setup, professional-grade resolution, business-standard imagery"
];

export const mjAspectRatios = [
  {
    value: "1:1",
    label: "Square (1:1)",
    desc: "Perfect for social media posts",
  },
  { value: "16:9", label: "Landscape (16:9)", desc: "Widescreen, cinematic" },
  { value: "9:16", label: "Portrait (9:16)", desc: "Phone screens, stories" },
  { value: "4:3", label: "Traditional (4:3)", desc: "Classic photography" },
  { value: "3:2", label: "Photo (3:2)", desc: "Standard photography" },
  { value: "2:3", label: "Portrait (2:3)", desc: "Book covers, prints" },
  { value: "7:4", label: "HD (7:4)", desc: "Modern screens" },
  { value: "5:4", label: "Print (5:4)", desc: "Common frame ratio" },
];

export const mjVersions = [
  {
    value: "7",
    label: "V7 (Latest)",
    desc: "Best quality, requires personalization",
  },
  { value: "6.1", label: "V6.1 (Default)", desc: "25% faster than V6" },
  { value: "6", label: "V6", desc: "Enhanced prompt accuracy" },
  { value: "5.2", label: "V5.2", desc: "Stable, reliable results" },
  { value: "5.1", label: "V5.1", desc: "Creative variations" },
  { value: "5", label: "V5", desc: "Photorealistic focus" },
];