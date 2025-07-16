// src/components/AI/AISettings.js
import React, { useState, useEffect } from 'react';
import { Bot, Key, Settings, Check, X, AlertCircle, Zap, Cpu, DollarSign } from 'lucide-react';
import aiService, { AVAILABLE_MODELS } from '../../services/aiService';

const AISettings = ({ isOpen, onClose, t }) => {
  const [provider, setProvider] = useState('gemini');
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [apiKey, setApiKey] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [providerInfo, setProviderInfo] = useState({});

  useEffect(() => {
    if (isOpen) {
      const info = aiService.getProviderInfo();
      setProviderInfo(info);
      setProvider(info.current);
      setSelectedModel(info.currentModel || aiService.getDefaultModel(info.current));
    }
  }, [isOpen]);

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    setApiKey('');
    setStatus({ type: '', message: '' });
    // Set default model for new provider
    const defaultModel = aiService.getDefaultModel(newProvider);
    setSelectedModel(defaultModel);
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
  };

  const getCurrentModels = () => {
    return AVAILABLE_MODELS[provider] || [];
  };

  // Remove unused function - we can access model info directly from getCurrentModels()

  const handleInitialize = async () => {
    if (!apiKey.trim()) {
      setStatus({
        type: 'error',
        message: 'API key is required'
      });
      return;
    }

    setIsInitializing(true);
    setStatus({ type: 'loading', message: 'Initializing AI service...' });

    try {
      const result = await aiService.initialize(provider, apiKey, selectedModel);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: `Successfully connected to ${provider.toUpperCase()} with ${selectedModel}!`
        });
        
        // Save to localStorage (optional)
        localStorage.setItem('ai_provider', provider);
        localStorage.setItem('ai_model', selectedModel);
        
        // Close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to initialize AI service'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Connection failed'
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleTest = async () => {
    if (!aiService.isReady()) {
      setStatus({
        type: 'error',
        message: 'Please initialize AI service first'
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Testing AI connection...' });

    try {
      const result = await aiService.callAI('Hello, this is a test message. Please respond with "AI service is working correctly!"', {
        maxTokens: 50,
        temperature: 0.3
      });

      if (result.text) {
        setStatus({
          type: 'success',
          message: 'AI service is working correctly!'
        });
      } else {
        setStatus({
          type: 'error',
          message: 'AI service test failed'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Test failed: ${error.message}`
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'success':
        return <Check className="text-green-500" size={16} />;
      case 'error':
        return <X className="text-red-500" size={16} />;
      case 'loading':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'loading':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Bot className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure your AI provider</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Provider Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Choose AI Provider
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleProviderChange('gemini')}
              className={`p-4 rounded-xl border-2 transition-all ${
                provider === 'gemini'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-medium">Gemini</div>
                <div className="text-xs text-gray-500">Google AI</div>
              </div>
            </button>
            
            <button
              onClick={() => handleProviderChange('openai')}
              className={`p-4 rounded-xl border-2 transition-all ${
                provider === 'openai'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-medium">OpenAI</div>
                <div className="text-xs text-gray-500">GPT Models</div>
              </div>
            </button>
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Cpu size={14} className="inline mr-1" />
            Choose Model
          </label>
          <div className="space-y-2">
            {getCurrentModels().map((model) => (
              <div
                key={model.id}
                onClick={() => handleModelChange(model.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{model.name}</h4>
                      {model.inputCost === 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Max tokens: {model.maxTokens.toLocaleString()}</span>
                      {model.inputCost > 0 && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />
                          ${model.inputCost}/1K tokens
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedModel === model.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedModel === model.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Key size={14} className="inline mr-1" />
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`Enter your ${provider.toUpperCase()} API key`}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mb-4 p-3 rounded-xl border flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm">{status.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleInitialize}
            disabled={isInitializing || !apiKey.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isInitializing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Connecting...
              </>
            ) : (
              <>
                <Settings size={16} />
                Initialize
              </>
            )}
          </button>
          
          {providerInfo.initialized && (
            <button
              onClick={handleTest}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Zap size={16} />
              Test
            </button>
          )}
        </div>

        {/* Provider Status */}
        {providerInfo.initialized && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-800">
              <Check size={14} />
              <span className="text-sm font-medium">
                Connected to {providerInfo.current?.toUpperCase()}
              </span>
            </div>
            {providerInfo.currentModel && (
              <div className="mt-1 text-xs text-green-700">
                Using model: {providerInfo.modelInfo?.name || providerInfo.currentModel}
              </div>
            )}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600">
            <strong>Need API keys?</strong>
            <br />
            • Gemini: Get free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
            <br />
            • OpenAI: Get API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>
            <br />
            <br />
            <strong>💡 Cost Info:</strong>
            <br />
            • You pay directly to the AI provider
            <br />
            • This app doesn't charge for AI usage
            <br />
            • Your API key is stored locally only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISettings;