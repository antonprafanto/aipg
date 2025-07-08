// CREATE new file: src/components/MarketIndicators/MarketIndicators.js

import React from 'react';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { categoryMetrics } from '../../data/categories';

const MarketIndicators = ({ selectedCategory, language, t }) => {
  const metrics = categoryMetrics[selectedCategory];
  
  if (!metrics) return null;

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'very-high': return 'text-red-500 bg-red-50';
      case 'high': return 'text-orange-500 bg-orange-50';  
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getROIColor = (roi) => {
    switch(roi) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'very-good': return 'text-green-500 bg-green-50';
      case 'good': return 'text-blue-500 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getCompetitionColor = (competition) => {
    switch(competition) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Target size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-800">
          {language === 'en' ? 'Market Performance' : 'Performa Pasar'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Demand Level */}
        <div className={`px-3 py-2 rounded-lg ${getDemandColor(metrics.demand)}`}>
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp size={12} />
            <span className="text-xs font-medium">
              {language === 'en' ? 'Demand' : 'Permintaan'}
            </span>
          </div>
          <div className="text-xs capitalize font-semibold">
            {metrics.demand.replace('-', ' ')}
          </div>
        </div>

        {/* ROI Level */}
        <div className={`px-3 py-2 rounded-lg ${getROIColor(metrics.roi)}`}>
          <div className="flex items-center gap-1 mb-1">
            <DollarSign size={12} />
            <span className="text-xs font-medium">ROI</span>
          </div>
          <div className="text-xs capitalize font-semibold">
            {metrics.roi}
          </div>
        </div>

        {/* Competition Level */}
        <div className={`px-3 py-2 rounded-lg ${getCompetitionColor(metrics.competition)}`}>
          <div className="flex items-center gap-1 mb-1">
            <Users size={12} />
            <span className="text-xs font-medium">
              {language === 'en' ? 'Competition' : 'Kompetisi'}
            </span>
          </div>
          <div className="text-xs capitalize font-semibold">
            {metrics.competition}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="px-3 py-2 rounded-lg bg-purple-50 text-purple-600">
          <div className="flex items-center gap-1 mb-1">
            <Target size={12} />
            <span className="text-xs font-medium">
              {language === 'en' ? 'Trending' : 'Trending'}
            </span>
          </div>
          <div className="text-xs font-semibold">
            {metrics.trending ? metrics.trending.length : 0} topics
          </div>
        </div>
      </div>

      {/* Trending Topics List */}
      {metrics.trending && metrics.trending.length > 0 && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex flex-wrap gap-1">
            {metrics.trending.slice(0, 3).map((trend, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {trend.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIndicators;