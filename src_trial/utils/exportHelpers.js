// src/utils/exportHelpers.js - Enhanced Export Functionality for Adobe Stock

// ✅ CSV Export for Adobe Stock Metadata
export const exportToCSV = (promptsWithMetadata, filename = 'adobe-stock-prompts') => {
    const headers = [
      'Title',
      'Prompt',
      'Category', 
      'Style',
      'Mood',
      'Primary Keywords (1-10)',
      'Secondary Keywords (11-30)', 
      'Tertiary Keywords (31-49)',
      'All Keywords',
      'Keyword Count',
      'Content Type',
      'Generated Date',
      'SEO Score'
    ];
  
    const rows = promptsWithMetadata.map(item => {
      const keywords = item.keywords || {};
      return [
        `"${item.title || ''}"`,
        `"${item.prompt || ''}"`,
        item.category || '',
        item.style || '',
        item.mood || '',
        `"${(keywords.primary || []).join(', ')}"`,
        `"${(keywords.secondary || []).join(', ')}"`,
        `"${(keywords.tertiary || []).join(', ')}"`,
        `"${(keywords.all || []).join(', ')}"`,
        keywords.count || 0,
        item.contentType || 'photo',
        new Date().toISOString().split('T')[0],
        calculateSEOScore(keywords)
      ];
    });
  
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    downloadFile(csvContent, `${filename}-${Date.now()}.csv`, 'text/csv');
  };
  
  // ✅ Adobe Stock Submission Format Export
  export const exportAdobeStockFormat = (promptsWithMetadata, filename = 'adobe-stock-submission') => {
    const adobeFormat = promptsWithMetadata.map((item, index) => ({
      file_number: index + 1,
      title: item.title || '',
      description: item.prompt || '',
      keywords: (item.keywords?.all || []).slice(0, 49).join(', '), // Adobe Stock limit
      category: item.category || '',
      content_type: item.contentType || 'photo',
      model_release: 'Not Required',
      property_release: 'Not Required',
      editorial_use: 'No',
      adult_content: 'No',
      submission_date: new Date().toISOString(),
      keyword_count: item.keywords?.count || 0,
      seo_score: calculateSEOScore(item.keywords),
      market_performance: getMarketPerformanceData(item.category)
    }));
  
    const jsonContent = JSON.stringify(adobeFormat, null, 2);
    downloadFile(jsonContent, `${filename}-${Date.now()}.json`, 'application/json');
  };
  
  // ✅ Batch TXT Export (Prompts Only)
  export const exportPromptsTXT = (prompts, filename = 'prompts-batch') => {
    const content = prompts.map((prompt, index) => 
      `=== PROMPT ${index + 1} ===\n${prompt}\n`
    ).join('\n');
    
    downloadFile(content, `${filename}-${Date.now()}.txt`, 'text/plain');
  };
  
  // ✅ Enhanced TXT Export with Metadata
  export const exportDetailedTXT = (promptsWithMetadata, filename = 'detailed-prompts') => {
    const content = promptsWithMetadata.map((item, index) => {
      const keywords = item.keywords || {};
      return `
  === PROMPT ${index + 1} ===
  Title: ${item.title || 'Untitled'}
  Category: ${item.category || 'Unknown'}
  Style: ${item.style || 'Unknown'}
  Mood: ${item.mood || 'Unknown'}
  Content Type: ${item.contentType || 'photo'}
  
  Prompt:
  ${item.prompt || ''}
  
  SEO Optimized Keywords (${keywords.count || 0}/49):
  ${(keywords.all || []).join(', ')}
  
  Primary Keywords (Highest Search Weight):
  ${(keywords.primary || []).join(', ')}
  
  Secondary Keywords (Medium Search Weight):
  ${(keywords.secondary || []).join(', ')}
  
  Tertiary Keywords (Supporting Keywords):
  ${(keywords.tertiary || []).join(', ')}
  
  Generated: ${new Date().toLocaleString()}
  SEO Score: ${calculateSEOScore(keywords)}/100
  
  ---
  `;
    }).join('\n');
    
    downloadFile(content, `${filename}-${Date.now()}.txt`, 'text/plain');
  };
  
  // ✅ Keyword-Only Export (for direct Adobe Stock use)
  export const exportKeywordsOnly = (keywordsArray, filename = 'keywords-only') => {
    const content = keywordsArray.join(', ');
    downloadFile(content, `${filename}-${Date.now()}.txt`, 'text/plain');
  };
  
  // ✅ Portfolio Analysis Export
  export const exportPortfolioAnalysis = (promptsWithMetadata, filename = 'portfolio-analysis') => {
    const analysis = {
      summary: {
        total_prompts: promptsWithMetadata.length,
        categories: [...new Set(promptsWithMetadata.map(p => p.category))],
        styles: [...new Set(promptsWithMetadata.map(p => p.style))], 
        moods: [...new Set(promptsWithMetadata.map(p => p.mood))],
        average_keywords: Math.round(
          promptsWithMetadata.reduce((sum, p) => sum + (p.keywords?.count || 0), 0) / promptsWithMetadata.length
        ),
        average_seo_score: Math.round(
          promptsWithMetadata.reduce((sum, p) => sum + calculateSEOScore(p.keywords), 0) / promptsWithMetadata.length
        )
      },
      category_breakdown: getCategoryBreakdown(promptsWithMetadata),
      keyword_frequency: getKeywordFrequency(promptsWithMetadata),
      performance_metrics: getPerformanceMetrics(promptsWithMetadata),
      generated_date: new Date().toISOString()
    };
  
    const jsonContent = JSON.stringify(analysis, null, 2);
    downloadFile(jsonContent, `${filename}-${Date.now()}.json`, 'application/json');
  };
  
  // ✅ Helper Functions
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  
  const calculateSEOScore = (keywords) => {
    if (!keywords || !keywords.all) return 0;
    
    let score = 0;
    
    // Keyword count scoring (0-30 points)
    const keywordCount = keywords.count || 0;
    if (keywordCount >= 40) score += 30;
    else if (keywordCount >= 25) score += 20;
    else if (keywordCount >= 15) score += 15;
    else if (keywordCount >= 5) score += 10;
    
    // Primary keyword quality (0-25 points)
    const primaryCount = keywords.primary?.length || 0;
    if (primaryCount >= 8) score += 25;
    else if (primaryCount >= 5) score += 15;
    else if (primaryCount >= 3) score += 10;
    
    // Secondary keyword coverage (0-20 points)
    const secondaryCount = keywords.secondary?.length || 0;
    if (secondaryCount >= 15) score += 20;
    else if (secondaryCount >= 10) score += 15;
    else if (secondaryCount >= 5) score += 10;
    
    // Keyword diversity (0-15 points)
    const uniqueWords = new Set((keywords.all || []).join(' ').toLowerCase().split(' ')).size;
    if (uniqueWords >= 50) score += 15;
    else if (uniqueWords >= 30) score += 10;
    else if (uniqueWords >= 20) score += 5;
    
    // Commercial relevance (0-10 points)
    const commercialKeywords = ['professional', 'commercial', 'business', 'corporate', 'quality'];
    const hasCommercial = keywords.all?.some(kw => 
      commercialKeywords.some(ck => kw.toLowerCase().includes(ck))
    );
    if (hasCommercial) score += 10;
    
    return Math.min(score, 100);
  };
  
  const getMarketPerformanceData = (category) => {
    const performanceMap = {
      business: { demand: 'very-high', roi: 'excellent', competition: 'high' },
      transportation: { demand: 'high', roi: 'very-good', competition: 'medium' },
      food: { demand: 'high', roi: 'good', competition: 'medium' },
      abstract: { demand: 'very-high', roi: 'excellent', competition: 'high' },
      nature: { demand: 'medium', roi: 'good', competition: 'low' },
      architecture: { demand: 'high', roi: 'very-good', competition: 'medium' }
    };
    
    return performanceMap[category] || { demand: 'medium', roi: 'good', competition: 'medium' };
  };
  
  const getCategoryBreakdown = (prompts) => {
    const breakdown = {};
    prompts.forEach(prompt => {
      const category = prompt.category || 'unknown';
      if (!breakdown[category]) {
        breakdown[category] = { count: 0, avg_keywords: 0, avg_seo_score: 0 };
      }
      breakdown[category].count++;
      breakdown[category].avg_keywords += (prompt.keywords?.count || 0);
      breakdown[category].avg_seo_score += calculateSEOScore(prompt.keywords);
    });
    
    // Calculate averages
    Object.keys(breakdown).forEach(category => {
      const data = breakdown[category];
      data.avg_keywords = Math.round(data.avg_keywords / data.count);
      data.avg_seo_score = Math.round(data.avg_seo_score / data.count);
    });
    
    return breakdown;
  };
  
  const getKeywordFrequency = (prompts) => {
    const frequency = {};
    prompts.forEach(prompt => {
      (prompt.keywords?.all || []).forEach(keyword => {
        frequency[keyword] = (frequency[keyword] || 0) + 1;
      });
    });
    
    // Return top 20 most frequent keywords
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .reduce((obj, [keyword, count]) => {
        obj[keyword] = count;
        return obj;
      }, {});
  };
  
  const getPerformanceMetrics = (prompts) => {
    const metrics = {
      high_seo_scores: prompts.filter(p => calculateSEOScore(p.keywords) >= 80).length,
      optimal_keyword_count: prompts.filter(p => (p.keywords?.count || 0) >= 40).length,
      commercial_ready: prompts.filter(p => 
        p.keywords?.all?.some(kw => 
          ['professional', 'commercial', 'business'].some(ck => kw.includes(ck))
        )
      ).length
    };
    
    return {
      ...metrics,
      quality_percentage: Math.round((metrics.high_seo_scores / prompts.length) * 100),
      optimization_percentage: Math.round((metrics.optimal_keyword_count / prompts.length) * 100),
      commercial_percentage: Math.round((metrics.commercial_ready / prompts.length) * 100)
    };
  };