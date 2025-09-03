import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilterChips = () => {
    const chips = [];
    
    // Category filters
    filters?.category?.forEach(cat => {
      chips.push({
        type: 'category',
        value: cat,
        label: cat,
        removeKey: cat
      });
    });
    
    // Brand filters
    filters?.brands?.forEach(brand => {
      chips.push({
        type: 'brands',
        value: brand,
        label: brand,
        removeKey: brand
      });
    });
    
    // Dietary filters
    filters?.dietary?.forEach(diet => {
      chips.push({
        type: 'dietary',
        value: diet,
        label: diet,
        removeKey: diet
      });
    });
    
    // Price range
    if (filters?.priceRange && filters.priceRange[1] < 100) {
      chips.push({
        type: 'priceRange',
        value: filters.priceRange,
        label: `Under $${filters.priceRange[1]}`,
        removeKey: 'priceRange'
      });
    }
    
    // Rating filter
    if (filters?.rating > 0) {
      chips.push({
        type: 'rating',
        value: filters.rating,
        label: `${filters.rating}+ stars`,
        removeKey: 'rating'
      });
    }
    
    // Availability filter
    if (filters?.availability && filters.availability !== 'all') {
      const availabilityLabels = {
        instock: 'In Stock',
        sale: 'On Sale'
      };
      
      chips.push({
        type: 'availability',
        value: filters.availability,
        label: availabilityLabels[filters.availability],
        removeKey: 'availability'
      });
    }
    
    return chips;
  };

  const activeChips = getActiveFilterChips();

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-heading font-semibold text-text-primary">
          Active Filters ({activeChips.length})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-primary hover:bg-primary/10"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeChips.map((chip, index) => (
          <div
            key={`${chip.type}-${index}`}
            className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{chip.label}</span>
            <button
              onClick={() => onRemoveFilter(chip.type, chip.removeKey)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;