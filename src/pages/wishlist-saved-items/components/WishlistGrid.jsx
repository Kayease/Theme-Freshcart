import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistGrid = ({ 
  items, 
  viewMode, 
  selectedItems, 
  onSelectItem, 
  onAddToCart, 
  onRemoveFromWishlist, 
  onMoveToWishlist,
  wishlists,
  currentWishlistId 
}) => {
  const [showMoveDropdown, setShowMoveDropdown] = useState(null);

  const handleMoveClick = (itemId) => {
    setShowMoveDropdown(showMoveDropdown === itemId ? null : itemId);
  };

  const handleMoveToWishlist = (itemId, targetWishlistId) => {
    onMoveToWishlist(itemId, targetWishlistId);
    setShowMoveDropdown(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={12} className="text-warning fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-border" />);
    }

    return stars;
  };

  const formatSavedDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getPriceChangeIndicator = (item) => {
    if (!item.priceChanged) return null;
    
    const priceDiff = item.savedPrice - item.price;
    const isDropped = priceDiff > 0;
    
    return (
      <div className={`flex items-center gap-1 text-xs ${
        isDropped ? 'text-success' : 'text-error'
      }`}>
        <Icon name={isDropped ? 'TrendingDown' : 'TrendingUp'} size={12} />
        <span>${Math.abs(priceDiff).toFixed(2)}</span>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-surface border border-border rounded-card p-4 shadow-card">
            <div className="flex items-start gap-4">
              {/* Selection Checkbox */}
              <div className="flex items-center pt-2">
                <button
                  onClick={() => onSelectItem(item.id)}
                  className={`w-5 h-5 border-2 border-border rounded ${
                    selectedItems.includes(item.id) 
                      ? 'bg-primary border-primary' :'hover:border-primary'
                  } transition-colors`}
                >
                  {selectedItems.includes(item.id) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </button>
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-card overflow-hidden bg-border-light">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-body font-body-medium text-text-primary text-base mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-1">{item.brand}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-xs text-text-secondary">({item.reviewCount})</span>
                    </div>
                  </div>

                  {/* Price and Status */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-heading-bold text-primary text-lg">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-sm text-text-secondary line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {getPriceChangeIndicator(item)}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Icon 
                        name={item.inStock ? "CheckCircle" : "XCircle"} 
                        size={14} 
                        className={item.inStock ? "text-success" : "text-error"} 
                      />
                      <span className={`text-xs ${item.inStock ? "text-success" : "text-error"}`}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      Saved {formatSavedDate(item.savedDate)}
                    </span>
                  </div>

                  {/* Notifications */}
                  {item.priceDropped && (
                    <div className="flex items-center gap-1 bg-success bg-opacity-10 text-success text-xs px-2 py-1 rounded-button">
                      <Icon name="TrendingDown" size={12} />
                      Price Drop!
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={item.inStock ? "primary" : "outline"}
                    size="sm"
                    disabled={!item.inStock}
                    onClick={() => onAddToCart(item.id)}
                    iconName={item.inStock ? "ShoppingCart" : "Bell"}
                    iconPosition="left"
                  >
                    {item.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>

                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveClick(item.id)}
                      iconName="Move"
                      iconPosition="left"
                    >
                      Move
                    </Button>
                    
                    {showMoveDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-card shadow-modal z-dropdown">
                        <div className="py-2">
                          {wishlists.filter(w => w.id !== currentWishlistId).map((wishlist) => (
                            <button
                              key={wishlist.id}
                              onClick={() => handleMoveToWishlist(item.id, wishlist.id)}
                              className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-border-light transition-colors"
                            >
                              <Icon name="Heart" size={14} className="mr-2" />
                              {wishlist.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    iconName="Trash2"
                    iconPosition="left"
                    className="text-error hover:text-error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-surface border border-border rounded-card shadow-card group">
          <div className="relative">
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <button
                onClick={() => onSelectItem(item.id)}
                className={`w-5 h-5 border-2 border-white rounded shadow-sm ${
                  selectedItems.includes(item.id) 
                    ? 'bg-primary border-primary' :'bg-white hover:border-primary'
                } transition-colors`}
              >
                {selectedItems.includes(item.id) && (
                  <Icon name="Check" size={12} className="text-white" />
                )}
              </button>
            </div>

            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-t-card">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Price Drop Badge */}
            {item.priceDropped && (
              <div className="absolute top-2 right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-button font-data font-data-medium">
                Price Drop!
              </div>
            )}

            {/* Stock Status */}
            {!item.inStock && (
              <div className="absolute bottom-2 right-2 bg-error text-error-foreground text-xs px-2 py-1 rounded-button font-data font-data-medium">
                Out of Stock
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-body font-body-medium text-text-primary mb-2 line-clamp-2">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(item.rating)}
              </div>
              <span className="text-xs text-text-secondary">({item.reviewCount})</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-heading font-heading-bold text-primary text-lg">
                  ${item.price.toFixed(2)}
                </span>
                {item.discount > 0 && (
                  <span className="text-sm text-text-secondary line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {getPriceChangeIndicator(item)}
            </div>

            <div className="text-xs text-text-secondary mb-3">
              Saved {formatSavedDate(item.savedDate)}
            </div>

            <div className="space-y-2">
              <Button
                variant={item.inStock ? "primary" : "outline"}
                fullWidth
                disabled={!item.inStock}
                onClick={() => onAddToCart(item.id)}
                iconName={item.inStock ? "ShoppingCart" : "Bell"}
                iconPosition="left"
              >
                {item.inStock ? "Add to Cart" : "Notify Me"}
              </Button>

              <div className="flex items-center gap-1">
                <div className="relative flex-1">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleMoveClick(item.id)}
                    iconName="Move"
                    iconPosition="left"
                  >
                    Move
                  </Button>
                  
                  {showMoveDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-surface border border-border rounded-card shadow-modal z-dropdown">
                      <div className="py-2">
                        {wishlists.filter(w => w.id !== currentWishlistId).map((wishlist) => (
                          <button
                            key={wishlist.id}
                            onClick={() => handleMoveToWishlist(item.id, wishlist.id)}
                            className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-border-light transition-colors"
                          >
                            <Icon name="Heart" size={14} className="mr-2" />
                            {wishlist.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => onRemoveFromWishlist(item.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;