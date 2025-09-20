import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';
import Icon from '../../components/AppIcon';
import WishlistGrid from './components/WishlistGrid';
import EmptyWishlist from './components/EmptyWishlist';
import BulkActions from './components/BulkActions';
import { useAuth } from '../../contexts/AuthContext';

const WishlistSavedItems = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, moveToCart } = useAuth();

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('saved_date'); // 'saved_date', 'price', 'name', 'price_drop'

  // Use all wishlist items directly
  const filteredItems = wishlist;

  // Handle item operations
  const handleAddToCart = (itemId) => {
    const item = wishlist.find(i => i.id === itemId);
    if (item && item.inStock) {
      moveToCart(itemId);
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAllItems = () => {
    const allItemIds = filteredItems.map(item => item.id);
    setSelectedItems(
      selectedItems.length === filteredItems.length ? [] : allItemIds
    );
  };

  const handleBulkAddToCart = () => {
    selectedItems.forEach(itemId => {
      const item = wishlist.find(i => i.id === itemId);
      if (item && item.inStock) {
        moveToCart(itemId);
      }
    });
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(itemId => {
      removeFromWishlist(itemId);
    });
    setSelectedItems([]);
  };

  const handleStartShopping = () => {
    navigate('/product-categories-browse');
  };

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price_drop':
        return b.priceDropped - a.priceDropped;
      default:
        return new Date(b.savedDate) - new Date(a.savedDate);
    }
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Wishlist', path: '/wishlist-saved-items', icon: 'Heart', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Wishlist | FreshCart" description="View and manage your saved items and wishlists." />
      <Header />

      <main className="max-w-7xl  px-6 sm:px-20 py-6 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />

        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading font-heading-bold text-3xl text-text-primary mb-2">
                My Wishlist
              </h1>
              <p className="text-text-secondary font-caption">
                {filteredItems.length} saved items
              </p>
            </div>
          </div>

          {/* View Controls */}
          {filteredItems.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-border rounded-button overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-surface border border-border rounded-button px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="saved_date">Recently Saved</option>
                      <option value="price">Price: Low to High</option>
                      <option value="name">Name: A to Z</option>
                      <option value="price_drop">Price Drops</option>
                    </select>
                  </div>
              </div>

              {/* Select All */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllItems}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <div className={`w-4 h-4 border border-border rounded ${selectedItems.length === filteredItems.length
                    ? 'bg-primary border-primary'
                    : selectedItems.length > 0
                      ? 'bg-primary border-primary opacity-50' : ''
                    }`}>
                    {selectedItems.length > 0 && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  Select All ({filteredItems.length})
                </button>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <BulkActions
              selectedCount={selectedItems.length}
              onBulkAddToCart={handleBulkAddToCart}
              onBulkRemove={handleBulkRemove}
            />
          )}

          {/* Main Content */}
          {filteredItems.length === 0 ? (
            <EmptyWishlist
              onStartShopping={handleStartShopping}
            />
          ) : (
            <WishlistGrid
              items={sortedItems}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onAddToCart={handleAddToCart}
              onRemoveFromWishlist={handleRemoveFromWishlist}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistSavedItems;