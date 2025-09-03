import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const QuantitySelector = ({ 
  initialQuantity = 1, 
  minQuantity = 1, 
  maxQuantity = 10, 
  onQuantityChange,
  disabled = false 
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || minQuantity;
    const clampedValue = Math.max(minQuantity, Math.min(maxQuantity, value));
    setQuantity(clampedValue);
    onQuantityChange?.(clampedValue);
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-body-medium text-text-primary">Quantity:</span>
      
      <div className="flex items-center border border-border rounded-lg overflow-hidden">
        <button
          onClick={handleDecrease}
          disabled={disabled || quantity <= minQuantity}
          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          aria-label="Decrease quantity"
        >
          <Icon name="Minus" size={16} />
        </button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
          disabled={disabled}
          className="w-16 text-center py-2 border-none outline-none font-data font-data-medium text-text-primary disabled:opacity-50"
        />
        
        <button
          onClick={handleIncrease}
          disabled={disabled || quantity >= maxQuantity}
          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          aria-label="Increase quantity"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      
      {maxQuantity && (
        <span className="text-xs text-text-secondary font-caption">
          Max: {maxQuantity}
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;