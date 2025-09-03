import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onFiltersChange, isMobile, onClose }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceRange: [0, 100],
    brands: [],
    dietary: [],
    rating: 0,
    availability: 'all'
  });

  const categories = [
    'Fresh Produce',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Pantry Staples',
    'Beverages',
    'Snacks',
    'Frozen Foods',
    'Bakery'
  ];

  const brands = [
    'Organic Valley',
    'Whole Foods 365',
    'Trader Joe\'s',
    'Kirkland',
    'Great Value',
    'Simply Organic',
    'Nature\'s Own',
    'Ben & Jerry\'s'
  ];

  const dietaryOptions = [
    'Organic',
    'Gluten-Free',
    'Vegetarian',
    'Vegan',
    'Keto',
    'Low-Sodium',
    'Sugar-Free',
    'Non-GMO'
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters };
    
    if (filterType === 'category' || filterType === 'brands' || filterType === 'dietary') {
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: [],
      priceRange: [0, 100],
      brands: [],
      dietary: [],
      rating: 0,
      availability: 'all'
    };
    setActiveFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return activeFilters.category.length > 0 ||
           activeFilters.brands.length > 0 ||
           activeFilters.dietary.length > 0 ||
           activeFilters.rating > 0 ||
           activeFilters.availability !== 'all';
  };

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className={`bg-surface ${isMobile ? 'fixed inset-0 z-overlay' : 'border border-border rounded-card'}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Filters
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      )}

      <div className={`${isMobile ? 'p-4' : 'p-6'} ${isMobile ? 'overflow-y-auto' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          {!isMobile && (
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Filters
            </h2>
          )}
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:bg-primary/10"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.category.includes(category)}
                  onChange={() => handleFilterChange('category', category)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">$0</span>
              <span className="text-sm text-text-secondary">$100+</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={activeFilters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className="text-sm font-body font-medium text-text-primary">
                Up to ${activeFilters.priceRange[1]}
              </span>
            </div>
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="Brand">
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Dietary Preferences */}
        <FilterSection title="Dietary Preferences">
          <div className="space-y-2">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.dietary.includes(option)}
                  onChange={() => handleFilterChange('dietary', option)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Customer Rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={activeFilters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? 'text-warning fill-current' : 'text-border'}
                    />
                  ))}
                  <span className="text-sm text-text-primary ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability Filter */}
        <FilterSection title="Availability">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={activeFilters.availability === 'all'}
                onChange={() => handleFilterChange('availability', 'all')}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-text-primary">All Products</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={activeFilters.availability === 'instock'}
                onChange={() => handleFilterChange('availability', 'instock')}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-text-primary">In Stock Only</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={activeFilters.availability === 'sale'}
                onChange={() => handleFilterChange('availability', 'sale')}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-text-primary">On Sale</span>
            </label>
          </div>
        </FilterSection>
      </div>

      {isMobile && (
        <div className="border-t border-border p-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={onClose}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;