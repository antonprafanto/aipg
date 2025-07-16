// src/components/AI/UsageTracker.js
import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign, Zap, TrendingUp } from 'lucide-react';
import aiService from '../../services/aiService';

const UsageTracker = ({ lastUsage, provider, t }) => {
  const [totalUsage, setTotalUsage] = useState({
    requests: 0,
    tokens: 0,
    estimatedCost: 0
  });

  useEffect(() => {
    // Load usage from localStorage
    const savedUsage = localStorage.getItem(`ai_usage_${provider}`);
    if (savedUsage) {
      setTotalUsage(JSON.parse(savedUsage));
    }
  }, [provider]);

  useEffect(() => {
    // Update usage when new request comes in
    if (lastUsage) {
      const newUsage = {
        requests: totalUsage.requests + 1,
        tokens: totalUsage.tokens + (lastUsage.totalTokens || 0),
        estimatedCost: totalUsage.estimatedCost + calculateCost(lastUsage, provider)
      };
      
      setTotalUsage(newUsage);
      localStorage.setItem(`ai_usage_${provider}`, JSON.stringify(newUsage));
    }
  }, [lastUsage, provider, totalUsage]);

  const calculateCost = (usage, provider) => {
    // Use aiService's built-in cost calculation
    try {
      return aiService.calculateCost(usage, provider);
    } catch (error) {
      // Fallback calculation
      if (provider === 'openai') {
        const inputCost = (usage.promptTokens || 0) * 0.001 / 1000;
        const outputCost = (usage.completionTokens || 0) * 0.002 / 1000;
        return inputCost + outputCost;
      } else if (provider === 'gemini') {
        return 0;
      }
      return 0;
    }
  };

  const resetUsage = () => {
    const emptyUsage = { requests: 0, tokens: 0, estimatedCost: 0 };
    setTotalUsage(emptyUsage);
    localStorage.setItem(`ai_usage_${provider}`, JSON.stringify(emptyUsage));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-gray-600" />
          <h3 className="font-medium text-gray-900">AI Usage Today</h3>
        </div>
        <button
          onClick={resetUsage}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-blue-700">Requests</span>
          </div>
          <div className="text-lg font-semibold text-blue-900">{totalUsage.requests}</div>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-xs font-medium text-green-700">Tokens</span>
          </div>
          <div className="text-lg font-semibold text-green-900">{totalUsage.tokens.toLocaleString()}</div>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign size={14} className="text-purple-500" />
            <span className="text-xs font-medium text-purple-700">Est. Cost</span>
          </div>
          <div className="text-lg font-semibold text-purple-900">
            ${totalUsage.estimatedCost.toFixed(4)}
          </div>
        </div>
      </div>

      <div className="mt-3 p-2 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          {provider === 'gemini' && "✨ Gemini has generous free tier"}
          {provider === 'openai' && "💡 OpenAI charges per token usage"}
        </p>
      </div>
    </div>
  );
};

export default UsageTracker;