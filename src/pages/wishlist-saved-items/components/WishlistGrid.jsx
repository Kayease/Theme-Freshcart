import React from 'react';
import WishlistProductCard from './WishlistProductCard';

/**
 * WishlistGrid - Displays wishlist items in grid or list view
 * 
 * Features:
 * - Reuses WishlistProductCard component for consistency
 * - Supports both grid and list view modes
 * - Handles item selection for bulk operations
 * 
 * Backend Integration Notes:
 * - Replace localStorage with API calls for wishlist data
 * - Implement proper error handling and loading states
 * - Add pagination for large wishlists
 * - Use proper authentication and authorization
 */
const WishlistGrid = ({
  items,
  viewMode,
  selectedItems,
  onSelectItem,
  onAddToCart,
  onRemoveFromWishlist
}) => {
  // Handle empty state
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No items in your wishlist</p>
      </div>
    );
  }

  // List view layout
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <WishlistProductCard
            key={item.id}
            product={item}
            viewMode="list"
            isSelected={selectedItems.includes(item.id)}
            onSelect={onSelectItem}
            onAddToCart={onAddToCart}
            onRemoveFromWishlist={onRemoveFromWishlist}
          />
        ))}
      </div>
    );
  }

  // Grid view layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <WishlistProductCard
          key={item.id}
          product={item}
          viewMode="grid"
          isSelected={selectedItems.includes(item.id)}
          onSelect={onSelectItem}
          onAddToCart={onAddToCart}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;