import React, { useState } from 'react';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const WishlistButton = ({ product, className = '', size = 'default' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToWishlist, wishlist } = useAuth();
  
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToWishlist = async () => {
    setIsAdding(true);
    try {
      addToWishlist(product);
      setTimeout(() => setIsAdding(false), 500);
    } catch (error) {
      setIsAdding(false);
    }
  };

  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-10 h-10'
  };

  const iconSizes = {
    small: 12,
    default: 16,
    large: 20
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={isAdding}
      className={`
        ${sizeClasses[size]} 
        ${className}
        ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-red-500'}
        rounded-full flex items-center justify-center transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-110 active:scale-95 shadow-sm hover:shadow-md
      `}
    >
      {isAdding ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Icon 
          name={isInWishlist ? "Heart" : "Heart"} 
          size={iconSizes[size]} 
          className={isInWishlist ? "fill-current" : ""}
        />
      )}
    </button>
  );
};

export default WishlistButton;