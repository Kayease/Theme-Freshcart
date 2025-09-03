import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, count, onRemove, isActive = true }) => {
  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-body font-body-medium transition-smooth ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-border-light text-text-secondary'
    }`}>
      <span>{label}</span>
      {count && (
        <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
      <button
        onClick={onRemove}
        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-smooth"
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
};

export default FilterChip;