// src/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Available models for each provider
const AVAILABLE_MODELS = {
  gemini: [
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Best for text generation and analysis',
      maxTokens: 30720,
      inputCost: 0, // Free tier
      outputCost: 0 // Free tier
    },
    {
      id: 'gemini-pro-vision',
      name: 'Gemini Pro Vision',
      description: 'Text and image understanding',
      maxTokens: 30720,
      inputCost: 0,
      outputCost: 0
    },
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      description: 'Latest model with enhanced capabilities',
      maxTokens: 1048576,
      inputCost: 0,
      outputCost: 0
    }
  ],
  openai: [
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient for most tasks',
      maxTokens: 4096,
      inputCost: 0.001, // per 1K tokens
      outputCost: 0.002
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most capable model, higher quality',
      maxTokens: 8192,
      inputCost: 0.03,
      outputCost: 0.06
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Faster GPT-4 with larger context',
      maxTokens: 128000,
      inputCost: 0.01,
      outputCost: 0.03
    },
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: 'Latest GPT-4 optimized model',
      maxTokens: 128000,
      inputCost: 0.005,
      outputCost: 0.015
    }
  ]
};

class AIService {
  constructor() {
    this.provider = 'gemini'; // default provider
    this.model = 'gemini-pro'; // default model
    this.geminiClient = null;
    this.openaiClient = null;
    this.initialized = false;
  }

  // Get default model for provider
  getDefaultModel(provider) {
    const models = AVAILABLE_MODELS[provider];
    return models && models.length > 0 ? models[0].id : null;
  }

  // Get available models for provider
  getAvailableModels(provider = this.provider) {
    return AVAILABLE_MODELS[provider] || [];
  }

  // Get model info
  getModelInfo(provider = this.provider, modelId = this.model) {
    const models = this.getAvailableModels(provider);
    return models.find(model => model.id === modelId) || null;
  }

  // Set model
  setModel(modelId) {
    const modelInfo = this.getModelInfo(this.provider, modelId);
    if (modelInfo) {
      this.model = modelId;
      return { success: true, model: modelInfo };
    }
    return { success: false, error: 'Model not found' };
  }

  // Calculate estimated cost
  calculateCost(usage, provider = this.provider, modelId = this.model) {
    const modelInfo = this.getModelInfo(provider, modelId);
    if (!modelInfo || !usage) return 0;

    const inputCost = (usage.promptTokens || 0) * modelInfo.inputCost / 1000;
    const outputCost = (usage.completionTokens || 0) * modelInfo.outputCost / 1000;
    
    return inputCost + outputCost;
  }

  // Initialize AI clients
  async initialize(provider = 'gemini', apiKey = null, model = null) {
    this.provider = provider;
    this.model = model || this.getDefaultModel(provider);
    
    try {
      if (provider === 'gemini') {
        const key = apiKey || process.env.REACT_APP_GEMINI_API_KEY;
        if (!key) throw new Error('Gemini API key is required');
        
        this.geminiClient = new GoogleGenerativeAI(key);
        this.initialized = true;
        
      } else if (provider === 'openai') {
        const key = apiKey || process.env.REACT_APP_OPENAI_API_KEY;
        if (!key) throw new Error('OpenAI API key is required');
        
        this.openaiClient = new OpenAI({
          apiKey: key,
          dangerouslyAllowBrowser: true // Only for client-side usage
        });
        this.initialized = true;
      }
      
      return { success: true, provider: this.provider };
    } catch (error) {
      console.error('AI Service initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if service is ready
  isReady() {
    return this.initialized && (this.geminiClient || this.openaiClient);
  }

  // Generic AI call method
  async callAI(prompt, options = {}) {
    if (!this.isReady()) {
      throw new Error('AI service not initialized');
    }

    const {
      maxTokens = 1000,
      temperature = 0.7,
      systemPrompt = null
    } = options;

    try {
      if (this.provider === 'gemini') {
        return await this.callGemini(prompt, { maxTokens, temperature, systemPrompt });
      } else if (this.provider === 'openai') {
        return await this.callOpenAI(prompt, { maxTokens, temperature, systemPrompt });
      }
    } catch (error) {
      console.error('AI call failed:', error);
      throw error;
    }
  }

  // Gemini-specific implementation
  async callGemini(prompt, options = {}) {
    const { temperature = 0.7, systemPrompt } = options;
    
    const model = this.geminiClient.getGenerativeModel({ 
      model: this.model,
      generationConfig: {
        temperature,
        topK: 1,
        topP: 1,
        maxOutputTokens: options.maxTokens || 1000,
      }
    });

    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    
    return {
      text: response.text(),
      provider: 'gemini',
      usage: {
        promptTokens: 0, // Gemini doesn't provide token count
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  // OpenAI-specific implementation
  async callOpenAI(prompt, options = {}) {
    const { temperature = 0.7, systemPrompt } = options;
    
    const messages = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: prompt });

    const response = await this.openaiClient.chat.completions.create({
      model: this.model,
      messages,
      temperature,
      max_tokens: options.maxTokens || 1000,
    });

    return {
      text: response.choices[0].message.content,
      provider: 'openai',
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
      }
    };
  }

  // Enhanced prompt generation
  async enhancePrompt(originalPrompt, options = {}) {
    const {
      category = 'general',
      style = 'professional',
      outputMode = 'standard',
      language = 'en'
    } = options;

    const systemPrompt = `You are an expert AI prompt engineer specializing in stock photography and Midjourney prompts. Your task is to enhance and optimize prompts for maximum quality and commercial appeal.

Key requirements:
- Output mode: ${outputMode}
- Category: ${category}
- Style: ${style}
- Language: ${language}
- Focus on commercial stock photography
- Ensure prompts are detailed and specific
- Avoid living creatures (people, animals, plants)
- Emphasize isolated white backgrounds when appropriate
- Include professional lighting and composition details

Enhance the following prompt while maintaining its core intent:`;

    try {
      const response = await this.callAI(originalPrompt, {
        systemPrompt,
        temperature: 0.8,
        maxTokens: 500
      });

      return {
        success: true,
        enhanced: response.text.trim(),
        original: originalPrompt,
        provider: response.provider,
        usage: response.usage
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        enhanced: originalPrompt // fallback to original
      };
    }
  }

  // Generate prompt variations
  async generateVariations(prompt, count = 3, options = {}) {
    const systemPrompt = `Generate ${count} different variations of the following prompt. Each variation should:
- Maintain the core concept and intent
- Use different descriptive words and phrases
- Vary the composition and lighting details
- Keep the same category and style
- Be suitable for stock photography
- Avoid repetition between variations

Return only the variations, numbered 1-${count}:`;

    try {
      const response = await this.callAI(prompt, {
        systemPrompt,
        temperature: 0.9,
        maxTokens: 800
      });

      // Parse variations from response
      const variations = response.text
        .split(/\d+\./)
        .slice(1)
        .map(v => v.trim())
        .filter(v => v.length > 0);

      return {
        success: true,
        variations,
        original: prompt,
        provider: response.provider,
        usage: response.usage
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        variations: [prompt] // fallback to original
      };
    }
  }

  // Analyze prompt quality
  async analyzePrompt(prompt, options = {}) {
    const systemPrompt = `Analyze the following prompt for stock photography quality and commercial appeal. Provide:

1. Quality Score (1-10)
2. Strengths (what works well)
3. Weaknesses (what could be improved)
4. Specific suggestions for improvement
5. Market appeal assessment

Format your response as JSON:
{
  "score": 8,
  "strengths": ["detailed lighting", "clear composition"],
  "weaknesses": ["too generic", "lacks specificity"],
  "suggestions": ["add specific camera settings", "include mood descriptors"],
  "marketAppeal": "high/medium/low with explanation"
}`;

    try {
      const response = await this.callAI(prompt, {
        systemPrompt,
        temperature: 0.5,
        maxTokens: 600
      });

      // Try to parse JSON response
      let analysis;
      try {
        analysis = JSON.parse(response.text);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        analysis = {
          score: 7,
          strengths: ['Professional structure'],
          weaknesses: ['Could be more specific'],
          suggestions: ['Add more descriptive details'],
          marketAppeal: 'Medium - needs more specificity'
        };
      }

      return {
        success: true,
        analysis,
        provider: response.provider,
        usage: response.usage
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        analysis: null
      };
    }
  }

  // Get provider info
  getProviderInfo() {
    return {
      current: this.provider,
      currentModel: this.model,
      initialized: this.initialized,
      available: ['gemini', 'openai'],
      availableModels: this.getAvailableModels(),
      modelInfo: this.getModelInfo()
    };
  }

  // Switch provider
  async switchProvider(newProvider, apiKey = null, model = null) {
    if (this.provider === newProvider && this.initialized) {
      return { success: true, message: 'Already using this provider' };
    }

    const result = await this.initialize(newProvider, apiKey, model);
    return result;
  }
}

// Singleton instance
const aiService = new AIService();

// Export for use in components
export { AVAILABLE_MODELS };
export default aiService;