// src/hooks/useAI.js
import { useState, useEffect, useCallback } from 'react';
import aiService from '../services/aiService';
import notificationManager from '../utils/notificationManager';

const useAI = () => {
  const [isReady, setIsReady] = useState(false);
  const [provider, setProvider] = useState('gemini');
  const [currentModel, setCurrentModel] = useState('gemini-pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUsage, setLastUsage] = useState(null);

  // Check AI service status on mount
  useEffect(() => {
    const checkStatus = () => {
      const ready = aiService.isReady();
      const info = aiService.getProviderInfo();
      
      setIsReady(ready);
      setProvider(info.current);
      setCurrentModel(info.currentModel);
    };

    checkStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize AI service
  const initialize = useCallback(async (providerName, apiKey, modelId) => {
    try {
      const result = await aiService.initialize(providerName, apiKey, modelId);
      
      if (result.success) {
        setIsReady(true);
        setProvider(providerName);
        setCurrentModel(modelId || aiService.getDefaultModel(providerName));
        notificationManager.success(`AI service connected to ${providerName.toUpperCase()}!`);
        return result;
      } else {
        notificationManager.error(`Failed to connect: ${result.error}`);
        return result;
      }
    } catch (error) {
      notificationManager.error(`Connection error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }, []);

  // Enhance prompt using AI
  const enhancePrompt = useCallback(async (prompt, options = {}) => {
    if (!isReady) {
      notificationManager.warning('Please configure AI service first');
      return { success: false, error: 'AI service not ready' };
    }

    setIsProcessing(true);
    
    try {
      const result = await aiService.enhancePrompt(prompt, options);
      
      if (result.success) {
        setLastUsage(result.usage);
        notificationManager.success('Prompt enhanced successfully!');
      } else {
        notificationManager.error(`Enhancement failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      notificationManager.error(`Enhancement error: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, [isReady]);

  // Generate variations using AI
  const generateVariations = useCallback(async (prompt, count = 3, options = {}) => {
    if (!isReady) {
      notificationManager.warning('Please configure AI service first');
      return { success: false, error: 'AI service not ready' };
    }

    setIsProcessing(true);
    
    try {
      const result = await aiService.generateVariations(prompt, count, options);
      
      if (result.success) {
        setLastUsage(result.usage);
        notificationManager.success(`Generated ${result.variations.length} variations!`);
      } else {
        notificationManager.error(`Variation generation failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      notificationManager.error(`Variation error: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, [isReady]);

  // Analyze prompt using AI
  const analyzePrompt = useCallback(async (prompt, options = {}) => {
    if (!isReady) {
      notificationManager.warning('Please configure AI service first');
      return { success: false, error: 'AI service not ready' };
    }

    setIsProcessing(true);
    
    try {
      const result = await aiService.analyzePrompt(prompt, options);
      
      if (result.success) {
        setLastUsage(result.usage);
        notificationManager.info(`Prompt analyzed - Score: ${result.analysis.score}/10`);
      } else {
        notificationManager.error(`Analysis failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      notificationManager.error(`Analysis error: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, [isReady]);

  // Switch provider
  const switchProvider = useCallback(async (newProvider, apiKey, modelId) => {
    setIsProcessing(true);
    
    try {
      const result = await aiService.switchProvider(newProvider, apiKey, modelId);
      
      if (result.success) {
        setProvider(newProvider);
        setCurrentModel(modelId || aiService.getDefaultModel(newProvider));
        setIsReady(true);
        notificationManager.success(`Switched to ${newProvider.toUpperCase()}`);
      } else {
        notificationManager.error(`Switch failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      notificationManager.error(`Switch error: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Get provider info
  const getProviderInfo = useCallback(() => {
    return aiService.getProviderInfo();
  }, []);

  // Test AI connection
  const testConnection = useCallback(async () => {
    if (!isReady) {
      notificationManager.warning('Please configure AI service first');
      return { success: false, error: 'AI service not ready' };
    }

    setIsProcessing(true);
    
    try {
      const result = await aiService.callAI('Test message', {
        maxTokens: 20,
        temperature: 0.3
      });
      
      if (result.text) {
        notificationManager.success('AI connection test successful!');
        return { success: true, response: result.text };
      } else {
        notificationManager.error('AI connection test failed');
        return { success: false, error: 'No response from AI' };
      }
    } catch (error) {
      notificationManager.error(`Test failed: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, [isReady]);

  return {
    // State
    isReady,
    provider,
    currentModel,
    isProcessing,
    lastUsage,
    
    // Actions
    initialize,
    enhancePrompt,
    generateVariations,
    analyzePrompt,
    switchProvider,
    testConnection,
    getProviderInfo
  };
};

export default useAI;