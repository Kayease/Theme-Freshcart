import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedCount, 
  wishlists, 
  currentWishlistId, 
  onBulkAddToCart, 
  onBulkRemove, 
  onBulkMoveToWishlist 
}) => {
  const [showMoveDropdown, setShowMoveDropdown] = useState(false);

  const handleMoveToWishlist = (targetWishlistId) => {
    onBulkMoveToWishlist(targetWishlistId);
    setShowMoveDropdown(false);
  };

  const availableWishlists = wishlists.filter(w => w.id !== currentWishlistId);

  return (
    <div className="bg-primary text-primary-foreground rounded-card p-4 mb-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} />
          </div>
          <div>
            <h3 className="font-heading font-heading-bold text-lg">
              {selectedCount} items selected
            </h3>
            <p className="text-primary-foreground text-opacity-80 text-sm">
              Choose an action to apply to all selected items
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onBulkAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:bg-opacity-90"
          >
            Add to Cart
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowMoveDropdown(!showMoveDropdown)}
              iconName="Move"
              iconPosition="left"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:bg-opacity-90"
            >
              Move to
            </Button>

            {showMoveDropdown && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-card shadow-modal z-dropdown">
                <div className="py-2">
                  {availableWishlists.length > 0 ? (
                    availableWishlists.map((wishlist) => (
                      <button
                        key={wishlist.id}
                        onClick={() => handleMoveToWishlist(wishlist.id)}
                        className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-border-light transition-colors"
                      >
                        <Icon name="Heart" size={14} className="mr-2" />
                        {wishlist.name}
                        <span className="ml-auto text-xs text-text-secondary">
                          ({wishlist.itemCount})
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-text-secondary">
                      No other wishlists available
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={onBulkRemove}
            iconName="Trash2"
            iconPosition="left"
            className="bg-error text-error-foreground hover:bg-error hover:bg-opacity-90"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;