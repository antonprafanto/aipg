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
    <div className="bg-white backdrop-blur-md rounded-2xl p-4 border border-gray-200 shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-gray-800 font-medium"
      >
        <div className="flex items-center gap-2">
          <Icon size={16} />
          {title}
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="mt-3 text-gray-600 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;