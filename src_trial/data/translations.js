// TRANSLATIONS
export const translations = {
  en: {
    title: "Adobe Stock & Midjourney AI Prompt Generator",
    subtitle:
      "Generate high-quality, detailed prompts for stock photography, video, and Midjourney based on July 2025 trending categories and latest AI model parameters",

    themeSelection: "Theme Selection",
    autoRandom: "Auto Random",
    selectedTheme: "Selected Theme",
    manualThemeMode: "Manual Theme Mode",
    themeTooltip: "Choose specific theme or auto random for variety",

    // ✨ NEW: Manual keyword translations
    manualKeyword: "Manual Keyword",
    manualKeywordInput: "Type your custom keyword",
    manualKeywordPlaceholder:
      "e.g., modern smartphone, luxury car, coffee beans...",
    manualKeywordHint:
      "Type any keyword you want - system will generate prompts around your custom theme!",
    manualKeywordActive: "Manual Keyword Active",
    manualKeywordEmpty: "No keyword entered yet",

    supportBanner: {
      title: "Love this tool? Support development!",
      subtitle: "Help keep servers running & features growing",
      button: "💝 Donate",
    },

    aboutApp: "About App",
    aboutContent: {
      line1: "🎯 Research-Based: Built on Adobe Stock market analysis showing $4.65B to $8.54B growth (2024-2033)",
      line2: "🤖 AI-Optimized: 47.85% of Adobe Stock is now AI-generated - we're ahead of the curve", 
      line3: "💰 ROI-Focused: 6 categories selected based on proven commercial performance data",
      line4: "📊 Evergreen Strategy: Focus on sustainable, non-seasonal content with consistent sales",
      line5: "🚫 Zero Living Creatures: Compliant with no-people, no-animals, no-plants policy",
      line6: "✨ Quality Standards: Meets Adobe's technical requirements (4-100MP, sRGB, isolated)",
      line7: "🔍 SEO Optimized: High-performing keywords and metadata structures included",
      line8: "💼 Commercial Grade: Ready for enhanced licensing and business applications"
    },

    howToUse: "How to Use",
    howToContent: {
      step1: "Choose output mode (Standard/Midjourney)",
      step2: "Select category, style, and mood",
      step3: "Adjust advanced settings if needed",
      step4a:
        "Generate Prompts - Uses YOUR selected settings with unique variations",
      step4b:
        "Random All Categories - Completely randomizes everything for maximum variety",
      step5: "Copy individual or export all",
      step6: "Use in your AI tools!",
    },

    mjParams: "MJ Parameters",
    mjParamsContent: {
      ar: "Aspect ratio (16:9, 1:1, etc.)",
      v: "Version (7 latest, 6.1 default)",
      chaos: "Randomness (0-100)",
      s: "Stylize level (0-1000)",
      q: "Quality (.25, .5, 1, 2, 4)",
      weird: "Unusual aesthetics (0-3000)",
      raw: "Less stylized output",
      tile: "Seamless patterns",
      niji: "Anime style model",
    },

    proTips: "Pro Tips",
    tipsContent: {
      line1:
        "💡 Updated: Enhanced with July 2025 trending business objects & isolated backgrounds",
      line2:
        "🎨 Midjourney: V7 requires personalization unlock, V6.1 is default",
      line3:
        "📐 Aspect Ratios: 16:9 for landscapes, 9:16 for mobile, 1:1 for social",
      line4: "🎲 Each generation is unique - no more repeated prompts!",
      line5: "🎯 True randomization ensures fresh results every time",
      line6:
        "🚫 Enhanced Negative Prompts: Auto-excludes all living creatures, text, logos, watermarks",
      line7:
        "📱 Clean Assets: Perfect for business use with isolated white backgrounds",
      line8:
        "⚠️ Important: If any living creatures appear in generated images, please remove manually",
    },

    outputMode: "Output Mode",
    standardMode: {
      title: "Standard Mode",
      subtitle: "Adobe Stock optimized prompts",
    },
    midjourneyMode: {
      title: "Midjourney Mode",
      subtitle: "Discord /imagine format with parameters",
    },

    mjSettings: "Midjourney V7 Settings",
    version: "Version",
    aspectRatio: "Aspect Ratio",
    quality: "Quality",
    chaos: "Chaos",
    stylize: "Stylize",
    weird: "Weird",
    excludeElements: "Exclude Elements (--no)",
    excludePlaceholder: "blur, distortion, vintage, dark lighting...",
    excludeHelp:
      "Additional elements to avoid (auto-excludes: people, animals, plants, text, logos, watermarks)",
    mockupMode: "Mockup Mode",
    cleanFresh: "Clean & Fresh",
    photoOnly: "Photo Only",
    brightMode: "Bright Mode",
    clearAll: "Clear",
    rawMode: "Raw Mode (--raw)",
    tilePattern: "Tile Pattern (--tile)",
    nijiAnime: "Niji Anime (--niji 6)",

    categories: {
      business: "Business & Technology",
      transportation: "Transportation & Logistics", // NEW CATEGORY
      food: "Food & Nutrition",
      abstract: "Abstract & Patterns",
      nature: "Nature & Environmental", // Updated name
      architecture: "Architecture & Interiors"
    },
    

    category: "Category",
    contentType: "Content Type",
    photo: "Photo",
    video: "Video",
    style: "Style",
    mood: "Mood",
    promptCount: "Prompt Count",

    support: "Support",
    randomAll: "Random All Categories",
    randomAllTooltip:
      "Completely randomize ALL settings and generate unique mixed category prompts",
    settings: "Settings",
    generating: "Generating...",
    generatePrompts: "Generate Prompts",
    generateTooltip:
      "Generate unique prompts using YOUR settings - never repeats!",

    generatedPrompts: "Generated",
    standardPrompts: "Standard",
    midjourneyPrompts: "Midjourney",
    prompts: "Prompts",
    copyAll: "Copy All",
    exportTxt: "Export TXT",

    thankYou: {
      title: "Great! Your prompts are ready!",
      subtitle: "Found this helpful? Consider supporting the project",
      button: "🙏 Support Project",
    },

    footer: {
      description:
        "🎯 July 2025 Trending Assets • 🚫 No living creatures • ✨ Isolated white backgrounds • 🤖 Latest AI parameters • 💼 Business-ready prompts",
      freeMessage: "This tool is free & open for everyone!",
      supportMessage: "Your support helps maintain servers & add new features",
      coffeeButton: "🎁 Buy me a coffee",
    },

    notifications: {
      randomized:
        "🎲 All settings randomized & generating unique mixed category prompts...",
      settingsApplied: "✅ Settings applied successfully!",
      allCopied: "📋 All prompts copied to clipboard!",
      uniqueGeneration:
        "✨ Generated completely unique prompts with July 2025 trending assets - no repetition!",

      themeMode: "Theme Mode",
      autoRandom: "Auto Random",
      manual: "Manual",
      predefinedTheme: "Predefined Theme",
      warningText:
        "Generated prompts exclude all living creatures. If any appear in results, please remove manually.",
    },

    advancedSettings: "Advanced Settings",
    technicalSpecs: "Technical Specs",
    contentPreferences: "Content Preferences",
    qualityPriority: "Quality Priority",
    focusStyle: "Focus Style",
    colorEnhancement: "Color Enhancement",
    lightingPreference: "Lighting Preference",
    compositionStyle: "Composition Style",
    marketFocus: "Market Focus",
    cancel: "Cancel",
    applyGenerate: "Apply & Generate",

    vibrant: "Vibrant",
    natural: "Natural",
    muted: "Muted",

    styles: {
      photorealistic: "Photorealistic",
      cinematic: "Cinematic",
      minimalist: "Minimalist",
      vintage: "Vintage",
      artistic: "Artistic",
      documentary: "Documentary",
      editorial: "Editorial",
    },

    moods: {
      professional: "Professional",
      calm: "Calm",
      energetic: "Energetic",
      luxurious: "Luxurious",
      natural: "Natural",
      modern: "Modern",
      warm: "Warm",
    },

    floatingSupport: "Support this amazing tool ❤️",
  },

  id: {
    title: "Generator Prompt AI Adobe Stock & Midjourney",
    subtitle:
      "Buat prompt berkualitas tinggi dan detail untuk fotografi stok, video, dan Midjourney berdasarkan kategori trending Juli 2025 dan parameter model AI terbaru",

    themeSelection: "Pilihan Tema",
    autoRandom: "Otomatis Random",
    selectedTheme: "Tema Terpilih",
    manualThemeMode: "Mode Tema Manual",
    themeTooltip: "Pilih tema spesifik atau otomatis random untuk variasi",

    // ✨ NEW: Manual keyword translations - Indonesian
    manualKeyword: "Keyword Manual",
    manualKeywordInput: "Ketik keyword kustommu",
    manualKeywordPlaceholder:
      "contoh: smartphone modern, mobil mewah, biji kopi...",
    manualKeywordHint:
      "Ketik keyword apapun yang kamu mau - sistem akan generate prompt seputar tema kustommu!",
    manualKeywordActive: "Keyword Manual Aktif",
    manualKeywordEmpty: "Belum ada keyword yang dimasukkan",

    supportBanner: {
      title: "Suka tools ini? Dukung pengembangan!",
      subtitle: "Bantu server tetap jalan & fitur terus berkembang",
      button: "💝 Donasi",
    },

    aboutApp: "Tentang Aplikasi",
    aboutContent: {
      line1: "🎯 Berbasis Riset: Dibangun berdasarkan analisis pasar Adobe Stock $4,65B ke $8,54B (2024-2033)",
      line2: "🤖 Optimasi AI: 47,85% Adobe Stock kini AI-generated - kami di depan kurva",
      line3: "💰 Fokus ROI: 6 kategori dipilih berdasarkan data performa komersial terbukti", 
      line4: "📊 Strategi Evergreen: Fokus konten berkelanjutan non-musiman dengan penjualan konsisten",
      line5: "🚫 Tanpa Makhluk Hidup: Patuh kebijakan no-people, no-animals, no-plants",
      line6: "✨ Standar Kualitas: Memenuhi persyaratan teknis Adobe (4-100MP, sRGB, isolated)",
      line7: "🔍 Optimasi SEO: Termasuk keyword berkinerja tinggi dan struktur metadata",
      line8: "💼 Kelas Komersial: Siap enhanced licensing dan aplikasi bisnis"
    },
    
    howToUse: "Cara Menggunakan",
    howToContent: {
      step1: "Pilih mode output (Standard/Midjourney)",
      step2: "Pilih kategori, gaya, dan mood",
      step3: "Atur pengaturan lanjutan jika diperlukan",
      step4a: "Buat Prompt - Menggunakan pengaturan ANDA dengan variasi unik",
      step4b:
        "Random Semua Kategori - Randomize semuanya untuk variasi maksimal",
      step5: "Copy individual atau export semua",
      step6: "Gunakan di tools AI Anda!",
    },

    mjParams: "Parameter MJ",
    mjParamsContent: {
      ar: "Rasio aspek (16:9, 1:1, dll.)",
      v: "Versi (7 terbaru, 6.1 default)",
      chaos: "Keacakan (0-100)",
      s: "Level stylize (0-1000)",
      q: "Kualitas (.25, .5, 1, 2, 4)",
      weird: "Estetika tidak biasa (0-3000)",
      raw: "Output kurang stylized",
      tile: "Pola seamless",
      niji: "Model gaya anime",
    },

    proTips: "Tips Pro",
    tipsContent: {
      line1:
        "💡 Update: Diperkaya dengan objek bisnis trending Juli 2025 & background isolated",
      line2:
        "🎨 Midjourney: V7 butuh unlock personalisasi, V6.1 adalah default",
      line3:
        "📐 Rasio Aspek: 16:9 untuk landscape, 9:16 untuk mobile, 1:1 untuk sosial",
      line4: "🎲 Setiap generasi unik - tidak ada lagi prompt berulang!",
      line5: "🎯 Randomisasi sejati memastikan hasil fresh setiap saat",
      line6:
        "🚫 Negative Prompt Canggih: Otomatis kecualikan semua makhluk hidup, text, logo, watermark",
      line7:
        "📱 Asset Bersih: Sempurna untuk bisnis dengan background putih isolated",
      line8:
        "⚠️ Penting: Jika ada makhluk hidup muncul di gambar hasil, mohon dihapus manual",
    },

    outputMode: "Mode Output",
    standardMode: {
      title: "Mode Standard",
      subtitle: "Prompt dioptimalkan Adobe Stock",
    },
    midjourneyMode: {
      title: "Mode Midjourney",
      subtitle: "Format Discord /imagine dengan parameter",
    },

    mjSettings: "Pengaturan Midjourney V7",
    version: "Versi",
    aspectRatio: "Rasio Aspek",
    quality: "Kualitas",
    chaos: "Chaos",
    stylize: "Stylize",
    weird: "Weird",
    excludeElements: "Elemen Dikecualikan (--no)",
    excludePlaceholder: "blur, distortion, vintage, pencahayaan gelap...",
    excludeHelp:
      "Elemen tambahan yang dihindari (otomatis dikecualikan: orang, hewan, tumbuhan, text, logo, watermark)",
    mockupMode: "Mode Mockup",
    cleanFresh: "Bersih & Fresh",
    photoOnly: "Hanya Foto",
    brightMode: "Mode Terang",
    clearAll: "Hapus",
    rawMode: "Mode Raw (--raw)",
    tilePattern: "Pola Tile (--tile)",
    nijiAnime: "Niji Anime (--niji 6)",

    categories: {
      business: "Bisnis & Teknologi",
      transportation: "Transportasi & Logistik", // KATEGORI BARU  
      food: "Makanan & Nutrisi",
      abstract: "Abstrak & Pola",
      nature: "Alam & Lingkungan", // Updated name
      architecture: "Arsitektur & Interior"
    },

    category: "Kategori",
    contentType: "Tipe Konten",
    photo: "Foto",
    video: "Video",
    style: "Gaya",
    mood: "Mood",
    promptCount: "Jumlah Prompt",

    support: "Dukung",
    randomAll: "Random Semua Kategori",
    randomAllTooltip:
      "Randomize semua pengaturan dan buat prompt kategori campur otomatis",
    settings: "Pengaturan",
    generating: "Membuat...",
    generatePrompts: "Buat Prompt",
    generateTooltip:
      "Buat prompt unik menggunakan pengaturan ANDA - tidak pernah berulang!",

    generatedPrompts: "Prompt",
    standardPrompts: "Standard",
    midjourneyPrompts: "Midjourney",
    prompts: "yang Dibuat",
    copyAll: "Copy Semua",
    exportTxt: "Export TXT",

    thankYou: {
      title: "Hebat! Prompt Anda sudah siap!",
      subtitle: "Merasa terbantu? Pertimbangkan untuk mendukung proyek ini",
      button: "🙏 Dukung Proyek",
    },

    footer: {
      description:
        "🎯 Asset Trending Juli 2025 • 🚫 Tanpa makhluk hidup • ✨ Background putih isolated • 🤖 Parameter AI terbaru • 💼 Prompt siap bisnis",
      freeMessage: "Tools ini gratis & terbuka untuk semua!",
      supportMessage:
        "Dukungan Anda membantu maintenance server & menambah fitur baru",
      coffeeButton: "🎁 Belikan saya kopi",
    },

    notifications: {
      randomized:
        "🎲 Semua pengaturan di-random & membuat prompt kategori campur...",
      settingsApplied: "✅ Pengaturan berhasil diterapkan!",
      allCopied: "📋 Semua prompt berhasil di-copy ke clipboard!",
      uniqueGeneration:
        "✨ Berhasil membuat prompt unik dengan asset trending Juli 2025 - tidak ada pengulangan!",

      themeMode: "Mode Tema",
      autoRandom: "Otomatis Random",
      manual: "Manual",
      predefinedTheme: "Tema yang Dipilih",
      warningText:
        "Prompt yang dibuat mengecualikan semua makhluk hidup. Jika ada yang muncul di hasil, mohon dihapus manual.",
    },

    advancedSettings: "Pengaturan Lanjutan",
    technicalSpecs: "Spesifikasi Teknis",
    contentPreferences: "Preferensi Konten",
    qualityPriority: "Prioritas Kualitas",
    focusStyle: "Gaya Fokus",
    colorEnhancement: "Peningkatan Warna",
    lightingPreference: "Preferensi Pencahayaan",
    compositionStyle: "Gaya Komposisi",
    marketFocus: "Fokus Pasar",
    cancel: "Batal",
    applyGenerate: "Terapkan & Buat",

    vibrant: "Vibrant",
    natural: "Natural",
    muted: "Muted",

    styles: {
      photorealistic: "Fotorealistik",
      cinematic: "Sinematik",
      minimalist: "Minimalis",
      vintage: "Vintage",
      artistic: "Artistik",
      documentary: "Dokumenter",
      editorial: "Editorial",
    },

    moods: {
      professional: "Profesional",
      calm: "Tenang",
      energetic: "Energik",
      luxurious: "Mewah",
      natural: "Alami",
      modern: "Modern",
      warm: "Hangat",
    },

    floatingSupport: "Dukung tools keren ini ❤️",
  },
};
