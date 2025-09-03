import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AppImage from '../../../components/AppImage';

const SearchProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      console.log('Added to cart:', product?.name);
    }, 1000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    console.log('Toggled wishlist:', product?.name);
  };

  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : '$0.00';
  };

  if (!product) return null;

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden hover:shadow-card transition-shadow duration-200 group">
      <Link to={`/product-details?id=${product.id}`} className="block">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <AppImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors duration-200"
          >
            <Icon
              name="Heart"
              size={16}
              className={isWishlisted ? 'text-accent fill-current' : 'text-text-secondary'}
            />
          </button>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 text-xs font-body font-medium rounded-full ${
                product.badge.type === 'sale' ? 'bg-accent text-accent-foreground' :
                product.badge.type === 'new' ? 'bg-primary text-primary-foreground' :
                'bg-success text-success-foreground'
              }`}>
                {product.badge.text}
              </span>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-text-secondary font-body font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Product Info */}
          <div className="mb-3">
            <h3 className="text-sm font-body font-medium text-text-primary line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-text-secondary mb-2">
              {product.category}
            </p>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={
                      i < Math.floor(product.rating)
                        ? 'text-warning fill-current' :'text-border'
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-base font-data font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm font-data text-text-secondary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="w-full"
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Add to Cart</span>
              </div>
            )}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default SearchProductCard;