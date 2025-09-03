import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  availableBrands = [], 
  isMobile = false, 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    dietary: true,
    rating: true,
    availability: true
  });

  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || '',
    max: filters.priceRange?.max || ''
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFilterChange('priceRange', newRange);
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onFilterChange(filterType, newValues);
  };

  const dietaryOptions = [
    { value: 'organic', label: 'Organic' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'keto', label: 'Keto Friendly' },
    { value: 'low-sodium', label: 'Low Sodium' }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-body font-body-medium text-text-primary">{title}</h3>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} 
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const filterContent = (
    <>
      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="text-sm"
          />
        </div>
      </FilterSection>
      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brand">
        {availableBrands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={(filters.brands || []).includes(brand)}
              onChange={(e) => handleCheckboxChange('brands', brand, e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary font-caption">{brand}</span>
          </label>
        ))}
      </FilterSection>
      {/* Dietary Preferences */}
      <FilterSection title="Dietary Preferences" sectionKey="dietary">
        {dietaryOptions.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={(filters.dietary || []).includes(option.value)}
              onChange={(e) => handleCheckboxChange('dietary', option.value, e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary font-caption">{option.label}</span>
          </label>
        ))}
      </FilterSection>
      {/* Rating */}
      <FilterSection title="Customer Rating" sectionKey="rating">
        {ratings.map((rating) => (
          <label key={rating} className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={(filters.rating || []).includes(rating.toString())}
              onChange={(e) => handleCheckboxChange('rating', rating.toString(), e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex items-center space-x-1">
              {[...Array(rating)].map((_, i) => (
                <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
              ))}
              <span className="text-sm text-text-primary font-caption">& up</span>
            </div>
          </label>
        ))}
      </FilterSection>
      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-primary font-caption">In Stock Only</span>
        </label>
      </FilterSection>
    </>
  );

  // Mobile version
  if (isMobile) {
    if (!isOpen) return null;
    
    return (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-surface z-50 shadow-xl flex flex-col mt-[60px] sm:mt-[70px]">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading font-heading-bold text-lg text-text-primary">Filters</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-border-light transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {filterContent}
          </div>
          
          <div className="p-4 border-t border-border">
            <Button onClick={onClose} fullWidth>Apply Filters</Button>
          </div>
        </div>
      </>
    );
  }

  // Desktop version
  return (
    <div className="sticky top-24 bg-surface border border-border rounded-card p-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
      {filterContent}
    </div>
  );
};

export default FilterSidebar;