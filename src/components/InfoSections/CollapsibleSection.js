// src/components/InfoSections/CollapsibleSection.js
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({ 
  icon: Icon, 
  title, 
  children, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
      >
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-gray-600 dark:text-gray-400" />
          {title}
        </div>
        {isExpanded ? 
          <ChevronUp size={16} className="text-gray-500 dark:text-gray-400" /> : 
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
        }
      </button>
      {isExpanded && (
        <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm space-y-2 transition-colors duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;