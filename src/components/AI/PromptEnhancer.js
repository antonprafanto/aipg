// src/components/AI/PromptEnhancer.js
import React, { useState } from 'react';
import { 
  Sparkles, 
  BarChart3, 
  RefreshCw, 
  Copy, 
  Check, 
  X, 
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import useAI from '../../hooks/useAI';

const PromptEnhancer = ({ 
  prompt, 
  onEnhanced, 
  settings, 
  t, 
  className = '' 
}) => {
  const [enhanced, setEnhanced] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [variations, setVariations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('enhance');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const { 
    isReady, 
    provider, 
    currentModel,
    isProcessing, 
    enhancePrompt, 
    analyzePrompt, 
    generateVariations 
  } = useAI();

  const handleEnhance = async () => {
    if (!prompt.trim()) return;

    const options = {
      category: settings.selectedCategory,
      style: settings.selectedStyle,
      outputMode: settings.outputMode,
      language: settings.language
    };

    const result = await enhancePrompt(prompt, options);
    
    if (result.success) {
      setEnhanced(result.enhanced);
      if (onEnhanced) {
        onEnhanced(result.enhanced);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    const result = await analyzePrompt(prompt);
    
    if (result.success) {
      setAnalysis(result.analysis);
      setActiveTab('analyze');
    }
  };

  const handleVariations = async () => {
    if (!prompt.trim()) return;

    const result = await generateVariations(prompt, 3);
    
    if (result.success) {
      setVariations(result.variations);
      setActiveTab('variations');
    }
  };

  const copyToClipboard = async (text, index = null) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score) => {
    if (score >= 8) return <TrendingUp size={16} />;
    if (score >= 6) return <Target size={16} />;
    return <ArrowRight size={16} />;
  };

  if (!isReady) {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <div className="p-3 bg-gray-100 rounded-xl inline-block mb-3">
            <Sparkles className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            AI Enhancement Available
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Configure your AI provider to unlock prompt enhancement features
          </p>
          <div className="text-xs text-gray-400">
            Supports: Gemini • OpenAI • Real-time enhancement
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Sparkles className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">AI Enhancement</h3>
              <p className="text-sm text-gray-500">
                Powered by {provider.toUpperCase()} {currentModel && `• ${currentModel}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowRight 
              size={16} 
              className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleEnhance}
            disabled={isProcessing || !prompt.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-xl transition-all text-sm font-medium"
          >
            {isProcessing && activeTab === 'enhance' ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Zap size={14} />
            )}
            Enhance
          </button>
          
          <button
            onClick={handleAnalyze}
            disabled={isProcessing || !prompt.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl transition-all text-sm font-medium"
          >
            {isProcessing && activeTab === 'analyze' ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <BarChart3 size={14} />
            )}
            Analyze
          </button>
          
          <button
            onClick={handleVariations}
            disabled={isProcessing || !prompt.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl transition-all text-sm font-medium"
          >
            {isProcessing && activeTab === 'variations' ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            Variations
          </button>
        </div>
      </div>

      {/* Results */}
      {isExpanded && (
        <div className="p-4">
          {/* Enhanced Prompt */}
          {enhanced && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-purple-500" />
                <h4 className="font-medium text-gray-900">Enhanced Prompt</h4>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-gray-800 text-sm leading-relaxed mb-3">
                  {enhanced}
                </p>
                <button
                  onClick={() => copyToClipboard(enhanced, 'enhanced')}
                  className="flex items-center gap-2 px-3 py-1 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg transition-colors text-sm"
                >
                  {copiedIndex === 'enhanced' ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                  Copy Enhanced
                </button>
              </div>
            </div>
          )}

          {/* Analysis */}
          {analysis && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-blue-500" />
                <h4 className="font-medium text-gray-900">Quality Analysis</h4>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                {/* Score */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(analysis.score)}`}>
                    {getScoreIcon(analysis.score)}
                    <span className="font-medium">{analysis.score}/10</span>
                  </div>
                  <span className="text-sm text-gray-600">Quality Score</span>
                </div>

                {/* Strengths */}
                {analysis.strengths && analysis.strengths.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                    <ul className="text-sm text-gray-700">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {analysis.weaknesses && analysis.weaknesses.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-red-700 mb-2">Areas for Improvement</h5>
                    <ul className="text-sm text-gray-700">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions && analysis.suggestions.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-blue-700 mb-2">Suggestions</h5>
                    <ul className="text-sm text-gray-700">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Market Appeal */}
                {analysis.marketAppeal && (
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-700 mb-1">Market Appeal</h5>
                    <p className="text-sm text-gray-700">{analysis.marketAppeal}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Variations */}
          {variations.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw size={16} className="text-green-500" />
                <h4 className="font-medium text-gray-900">Variations</h4>
              </div>
              <div className="space-y-3">
                {variations.map((variation, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            Variation {index + 1}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {variation}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(variation, `variation-${index}`)}
                        className="flex items-center gap-1 px-2 py-1 bg-white border border-green-200 hover:bg-green-50 rounded-lg transition-colors text-xs"
                      >
                        {copiedIndex === `variation-${index}` ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptEnhancer;