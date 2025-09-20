import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

const RelatedProducts = ({ products, onProductClick }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const [loadingStates, setLoadingStates] = useState({});

  const handleAddToCart = async (product) => {
    const loadingKey = `cart-${product.id}`;
    setLoadingStates(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price.current,
        image: product.image,
        brand: product.brand || 'FreshCart',
        category: product.category || 'General',
        unit: product.unit,
        quantity: 1,
        inStock: true
      };
      addToCart(cartItem, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleWishlistToggle = async (product) => {
    const loadingKey = `wishlist-${product.id}`;
    setLoadingStates(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        const wishlistItem = {
          id: product.id,
          name: product.name,
          price: product.price.current,
          image: product.image,
          brand: product.brand || 'FreshCart',
          category: product.category || 'General',
          unit: product.unit,
          inStock: true,
          rating: product.rating,
          reviewCount: product.reviewCount
        };
        addToWishlist(wishlistItem);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-heading-bold text-text-primary">
          Related Products
        </h2>
        <Link
          to="/product-categories-browse"
          className="text-primary hover:text-primary/80 text-sm font-body-medium transition-smooth"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <div 
                className="cursor-pointer"
                onClick={() => onProductClick?.(product.id)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-body-medium">
                  {product.discount}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button
                className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-smooth ${
                  isInWishlist(product.id) 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white/80 hover:bg-white'
                }`}
                onClick={() => handleWishlistToggle(product)}
                disabled={loadingStates[`wishlist-${product.id}`]}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Icon 
                  name="Heart" 
                  size={14} 
                  className={isInWishlist(product.id) ? 'fill-current' : ''}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <div 
                className="cursor-pointer hover:text-primary transition-smooth"
                onClick={() => onProductClick?.(product.id)}
              >
                <h3 className="font-body-medium text-text-primary text-sm line-clamp-2">
                  {product.name}
                </h3>
              </div>

              <p className="text-xs text-text-secondary font-body">
                {product.unit}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-text-secondary font-caption">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-heading font-heading-bold text-primary">
                  ${product.price.current.toFixed(2)}
                </span>
                {product.price.original && product.price.original !== product.price.current && (
                  <span className="text-xs text-text-secondary line-through">
                    ${product.price.original.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={() => handleAddToCart(product)}
                loading={loadingStates[`cart-${product.id}`]}
                disabled={loadingStates[`cart-${product.id}`]}
                className="mt-2"
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;