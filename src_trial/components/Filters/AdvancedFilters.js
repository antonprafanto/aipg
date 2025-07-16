// src/components/Filters/AdvancedFilters.js - COMPLETE FILE

import React, { useState } from 'react';
import { Filter, TrendingUp, DollarSign, Users, X } from 'lucide-react';
import { categoryMetrics } from '../../data/categories';

const AdvancedFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  language, 
  t,
  isVisible,
  setIsVisible 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    demand: null,
    roi: null,
    competition: null
  });

  // Get all categories that match current filters
  const getFilteredCategories = () => {
    const categories = Object.keys(categoryMetrics);
    return categories.filter(category => {
      const metrics = categoryMetrics[category];
      
      // Apply demand filter
      if (activeFilters.demand && metrics.demand !== activeFilters.demand) {
        return false;
      }
      
      // Apply ROI filter
      if (activeFilters.roi && metrics.roi !== activeFilters.roi) {
        return false;
      }
      
      // Apply competition filter
      if (activeFilters.competition && metrics.competition !== activeFilters.competition) {
        return false;
      }
      
      return true;
    });
  };

  const setFilter = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? null : value
    };
    setActiveFilters(newFilters);
    
    // Auto-select first matching category if current doesn't match
    const filteredCategories = getFilteredCategories();
    if (filteredCategories.length > 0 && !filteredCategories.includes(selectedCategory)) {
      setSelectedCategory(filteredCategories[0]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({ demand: null, roi: null, competition: null });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== null);
  const filteredCategories = getFilteredCategories();

  if (!isVisible) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">
            {language === 'en' ? 'Advanced Filters' : 'Filter Lanjutan'}
          </h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {filteredCategories.length} {language === 'en' ? 'matches' : 'cocok'}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Filter Options */}
      <div className="space-y-4">
        {/* Demand Level Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Demand Level' : 'Level Permintaan'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['very-high', 'high', 'medium'].map(level => (
              <button
                key={level}
                onClick={() => setFilter('demand', level)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeFilters.demand === level
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                }`}
              >
                {level.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* ROI Level Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={14} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">ROI Level</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['excellent', 'very-good', 'good'].map(level => (
              <button
                key={level}
                onClick={() => setFilter('roi', level)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeFilters.roi === level
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}
              >
                {level.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Competition Level Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Competition Level' : 'Level Kompetisi'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['low', 'medium', 'high'].map(level => (
              <button
                key={level}
                onClick={() => setFilter('competition', level)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeFilters.competition === level
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            {language === 'en' ? 'Quick Filters' : 'Filter Cepat'}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilters({ demand: 'very-high', roi: 'excellent', competition: null })}
              className="px-3 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-full hover:bg-red-100 transition-colors"
            >
              🔥 {language === 'en' ? 'High Performers' : 'Performa Tinggi'}
            </button>
            <button
              onClick={() => setActiveFilters({ demand: null, roi: null, competition: 'low' })}
              className="px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full hover:bg-green-100 transition-colors"
            >
              ✅ {language === 'en' ? 'Low Competition' : 'Kompetisi Rendah'}
            </button>
            <button
              onClick={() => setActiveFilters({ demand: 'high', roi: 'very-good', competition: 'medium' })}
              className="px-3 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
            >
              💰 {language === 'en' ? 'Best ROI' : 'ROI Terbaik'}
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {language === 'en' ? 'Clear all filters' : 'Hapus semua filter'}
            </button>
          </div>
        )}
      </div>

      {/* Filtered Categories Preview */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            {language === 'en' ? 'Matching Categories:' : 'Kategori yang Cocok:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {filteredCategories.map(category => (
              <span 
                key={category}
                className={`px-2 py-1 text-xs rounded-full ${
                  category === selectedCategory
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;