import React, { useState } from 'react';
import Icon from './AppIcon';
import { useAuth } from '../contexts/AuthContext';

const AddToCartButton = ({ product, className = '', size = 'default', variant = 'primary' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useAuth();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product);
      setTimeout(() => setIsAdding(false), 800);
    } catch (error) {
      setIsAdding(false);
    }
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-text-primary',
    accent: 'bg-accent hover:bg-accent/90 text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
        rounded-lg font-medium transition-all duration-200 
        flex items-center justify-center space-x-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
      `}
    >
      {isAdding ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Adding...</span>
        </>
      ) : (
        <>
          <Icon name="ShoppingCart" size={16} />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;