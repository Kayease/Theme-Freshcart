import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * WishlistProductCard - Specialized product card for wishlist items
 * 
 * Features:
 * - Selection checkbox for bulk operations
 * - Remove from wishlist functionality
 * - Move to cart functionality
 * - Wishlist-specific styling and layout
 * 
 * Backend Integration Notes:
 * - Replace localStorage/sessionStorage with API calls
 * - Implement proper error handling for network requests
 * - Add loading states for async operations
 * - Use proper authentication tokens
 */
const WishlistProductCard = ({
  product,
  isSelected = false,
  onSelect,
  onRemoveFromWishlist,
  onAddToCart,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, removeFromWishlist, wishlist } = useAuth();

  // Check if product is in wishlist (for wishlist button state)
  const isInWishlist = wishlist.some(item => item.id === product.id);

  /**
   * Handle add to cart action
   * TODO: Replace with API call to backend
   * API Endpoint: POST /api/cart/add
   * Payload: { productId, quantity, userId }
   */
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      if (onAddToCart) {
        onAddToCart(product.id);
      } else {
        addToCart(product, 1);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // TODO: Show error toast notification
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  /**
   * Handle remove from wishlist action
   * TODO: Replace with API call to backend
   * API Endpoint: DELETE /api/wishlist/remove
   * Payload: { productId, userId }
   */
  const handleRemoveFromWishlist = () => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
    } else {
      removeFromWishlist(product.id);
    }
  };

  /**
   * Render star rating component
   * TODO: Consider caching this component for performance
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={viewMode === 'list' ? 12 : 14}
          className="text-warning fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          name="Star"
          size={viewMode === 'list' ? 12 : 14}
          className="text-warning fill-current opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating || 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={viewMode === 'list' ? 12 : 14}
          className="text-border"
        />
      );
    }

    return stars;
  };

  /**
   * Format saved date for display
   * TODO: Use proper date formatting library (date-fns, moment.js)
   */
  const formatSavedDate = (dateString) => {
    if (!dateString) return 'Recently saved';

    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  /**
   * Calculate discount percentage
   * TODO: Move to utility function for reusability
   */
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // List view layout
  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-card p-4 shadow-card">
        <div className="flex items-start gap-4">
          {/* Selection Checkbox */}
          <div className="flex items-center pt-2">
            <button
              onClick={() => onSelect && onSelect(product.id)}
              className={`w-5 h-5 border-2 border-border rounded ${isSelected
                ? 'bg-primary border-primary'
                : 'hover:border-primary'
                } transition-colors`}
              aria-label={isSelected ? 'Deselect item' : 'Select item'}
            >
              {isSelected && (
                <Icon name="Check" size={12} className="text-white" />
              )}
            </button>
          </div>

          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link to={`/product-details?id=${product.id}`}>
              <div className="w-20 h-20 rounded-card overflow-hidden bg-border-light">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link to={`/product-details?id=${product.id}`}>
                  <h3 className="font-body font-body-medium text-text-primary text-base mb-1 line-clamp-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-text-secondary text-sm mb-1">{product.brand}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviewCount || product.reviews || 0})
                  </span>
                </div>
              </div>

              {/* Price and Status */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-heading-bold text-primary text-lg">
                    ${(product.price || 0).toFixed(2)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="text-sm text-text-secondary line-through">
                      ${(product.originalPrice || 0).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Icon
                    name={product.inStock !== false ? "CheckCircle" : "XCircle"}
                    size={14}
                    className={product.inStock !== false ? "text-success" : "text-error"}
                  />
                  <span className={`text-xs ${product.inStock !== false ? "text-success" : "text-error"}`}>
                    {product.inStock !== false ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  Saved {formatSavedDate(product.savedDate)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={product.inStock !== false ? "primary" : "outline"}
                size="sm"
                disabled={product.inStock === false}
                loading={isAddingToCart}
                onClick={handleAddToCart}
                iconName={product.inStock !== false ? "ShoppingCart" : "Bell"}
                iconPosition="left"
              >
                <span className="hidden sm:inline">
                  {product.inStock !== false ? "Add to Cart" : "Notify Me"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFromWishlist}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error"
              >
                <span className="hidden sm:inline">
                  Remove
                </span>

              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout
  return (
    <div className="bg-surface border border-border rounded-card shadow-card group flex flex-col">
      <div className="relative">
        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={() => onSelect && onSelect(product.id)}
            className={`w-5 h-5 border-2 border-white rounded shadow-sm ${isSelected
              ? 'bg-primary border-primary'
              : 'bg-white hover:border-primary'
              } transition-colors`}
            aria-label={isSelected ? 'Deselect item' : 'Select item'}
          >
            {isSelected && (
              <Icon name="Check" size={12} className="text-white" />
            )}
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product-details?id=${product.id}`}>
          <div className="overflow-hidden rounded-t-card h-[200px]">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {discountPercentage > 0 && (
            <span className="bg-error text-error-foreground text-xs font-data font-data-medium px-2 py-1 rounded-button">
              -{discountPercentage}%
            </span>
          )}
          {product.inStock === false && (
            <span className="bg-error text-error-foreground text-xs font-data font-data-medium px-2 py-1 rounded-button">
              Out of Stock
            </span>
          )}
          {product.priceDropped && (
            <span className="bg-success text-success-foreground text-xs font-data font-data-medium px-2 py-1 rounded-button">
              Price Drop!
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product-details?id=${product.id}`}>
          <h3 className="font-body font-body-medium text-text-primary mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-text-secondary">
            ({product.reviewCount || product.reviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-heading font-heading-bold text-primary text-lg">
              ${(product.price || 0).toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-sm text-text-secondary line-through">
                ${(product.originalPrice || 0).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-text-secondary mb-3">
          Saved {formatSavedDate(product.savedDate)}
        </div>

        <div className="space-y-2 mt-auto">
          <Button
            variant={product.inStock !== false ? "primary" : "outline"}
            fullWidth
            disabled={product.inStock === false}
            loading={isAddingToCart}
            onClick={handleAddToCart}
            iconName={product.inStock !== false ? "ShoppingCart" : "Bell"}
            iconPosition="left"
          >
            {product.inStock !== false ? "Add to Cart" : "Notify Me"}
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleRemoveFromWishlist}
            iconName="Trash2"
            iconPosition="left"
            className="text-error hover:text-error"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;
