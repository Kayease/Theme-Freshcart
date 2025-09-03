import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import WishlistGrid from './components/WishlistGrid';
import WishlistManagement from './components/WishlistManagement';
import EmptyWishlist from './components/EmptyWishlist';
import BulkActions from './components/BulkActions';
import RecentlyViewed from './components/RecentlyViewed';

const WishlistSavedItems = () => {
  const navigate = useNavigate();
  
  // State management
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Bananas (2 lbs)",
      brand: "FreshFarms",
      price: 3.99,
      originalPrice: 4.99,
      discount: 20,
      savedPrice: 3.49,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.5,
      reviewCount: 234,
      unit: "per 2 lbs",
      savedDate: "2025-01-05",
      priceChanged: true,
      priceDropped: true,
      category: "Fruits",
      wishlistId: 1
    },
    {
      id: 2,
      name: "Whole Wheat Bread Loaf",
      brand: "Baker\'s Choice",
      price: 2.49,
      originalPrice: 2.49,
      discount: 0,
      savedPrice: 2.49,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.2,
      reviewCount: 89,
      unit: "per loaf",
      savedDate: "2025-01-03",
      priceChanged: false,
      priceDropped: false,
      category: "Bakery",
      wishlistId: 1
    },
    {
      id: 3,
      name: "Organic Free-Range Eggs (12 pack)",
      brand: "Farm Fresh",
      price: 6.99,
      originalPrice: 7.99,
      discount: 13,
      savedPrice: 7.49,
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
      inStock: false,
      rating: 4.8,
      reviewCount: 156,
      unit: "per dozen",
      savedDate: "2025-01-02",
      priceChanged: true,
      priceDropped: true,
      category: "Dairy",
      wishlistId: 2
    },
    {
      id: 4,
      name: "Premium Olive Oil",
      brand: "Mediterranean Gold",
      price: 12.99,
      originalPrice: 14.99,
      discount: 13,
      savedPrice: 12.99,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.6,
      reviewCount: 78,
      unit: "per bottle",
      savedDate: "2025-01-01",
      priceChanged: false,
      priceDropped: false,
      category: "Pantry",
      wishlistId: 2
    }
  ]);

  const [wishlists, setWishlists] = useState([
    { id: 1, name: "Weekly Essentials", itemCount: 2, isPrivate: false },
    { id: 2, name: "Special Occasions", itemCount: 2, isPrivate: true },
    { id: 3, name: "Gift Ideas", itemCount: 0, isPrivate: false }
  ]);

  const [selectedWishlist, setSelectedWishlist] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('saved_date'); // 'saved_date', 'price', 'name', 'price_drop'
  const [priceDropNotifications, setPriceDropNotifications] = useState(true);

  // Filter items by selected wishlist
  const filteredItems = wishlistItems.filter(item => item.wishlistId === selectedWishlist);

  // Handle item operations
  const handleAddToCart = (itemId) => {
    const item = wishlistItems.find(i => i.id === itemId);
    if (item && item.inStock) {
      console.log('Adding to cart:', item.name);
      // Navigate to cart or show success message
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
    
    // Update wishlist count
    const item = wishlistItems.find(i => i.id === itemId);
    if (item) {
      setWishlists(prev => prev.map(w => 
        w.id === item.wishlistId ? { ...w, itemCount: w.itemCount - 1 } : w
      ));
    }
  };

  const handleMoveToWishlist = (itemId, targetWishlistId) => {
    setWishlistItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, wishlistId: targetWishlistId } : item
    ));
    
    // Update wishlist counts
    const item = wishlistItems.find(i => i.id === itemId);
    if (item) {
      setWishlists(prev => prev.map(w => {
        if (w.id === item.wishlistId) return { ...w, itemCount: w.itemCount - 1 };
        if (w.id === targetWishlistId) return { ...w, itemCount: w.itemCount + 1 };
        return w;
      }));
    }
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
    const availableItems = selectedItems.filter(id => {
      const item = wishlistItems.find(i => i.id === id);
      return item && item.inStock;
    });
    
    if (availableItems.length > 0) {
      console.log('Adding multiple items to cart:', availableItems);
      setSelectedItems([]);
    }
  };

  const handleBulkRemove = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleBulkMoveToWishlist = (targetWishlistId) => {
    setWishlistItems(prev => prev.map(item => 
      selectedItems.includes(item.id) 
        ? { ...item, wishlistId: targetWishlistId }
        : item
    ));
    setSelectedItems([]);
  };

  const handleShareWishlist = (wishlistId) => {
    const wishlist = wishlists.find(w => w.id === wishlistId);
    if (wishlist) {
      // Mock sharing functionality
      console.log('Sharing wishlist:', wishlist.name);
      // In real app, this would open share dialog or copy link
    }
  };

  const handleCreateWishlist = (name, isPrivate) => {
    const newWishlist = {
      id: Date.now(),
      name,
      itemCount: 0,
      isPrivate
    };
    setWishlists(prev => [...prev, newWishlist]);
  };

  const handleDeleteWishlist = (wishlistId) => {
    if (wishlists.length > 1) {
      setWishlists(prev => prev.filter(w => w.id !== wishlistId));
      setWishlistItems(prev => prev.filter(item => item.wishlistId !== wishlistId));
      
      if (selectedWishlist === wishlistId) {
        setSelectedWishlist(wishlists.find(w => w.id !== wishlistId)?.id || 1);
      }
    }
  };

  const handleRenameWishlist = (wishlistId, newName) => {
    setWishlists(prev => prev.map(w => 
      w.id === wishlistId ? { ...w, name: newName } : w
    ));
  };

  const handleExportWishlist = () => {
    const currentWishlist = wishlists.find(w => w.id === selectedWishlist);
    const items = filteredItems.map(item => ({
      name: item.name,
      brand: item.brand,
      price: item.price,
      category: item.category
    }));
    
    console.log('Exporting wishlist:', currentWishlist?.name, items);
    // In real app, this would generate PDF or email
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

  // Get current wishlist
  const currentWishlist = wishlists.find(w => w.id === selectedWishlist);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />
        
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading font-heading-bold text-3xl text-text-primary mb-2">
                Wishlist & Saved Items
              </h1>
              <p className="text-text-secondary font-caption">
                {currentWishlist?.name} • {filteredItems.length} items
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Price Drop Notifications Toggle */}
              <div className="flex items-center gap-2">
                <Icon name="Bell" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Notifications</span>
                <button
                  onClick={() => setPriceDropNotifications(!priceDropNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    priceDropNotifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    priceDropNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Export Button */}
              <Button
                variant="outline"
                onClick={handleExportWishlist}
                iconName="Download"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Wishlist Management */}
          <WishlistManagement
            wishlists={wishlists}
            selectedWishlist={selectedWishlist}
            onSelectWishlist={setSelectedWishlist}
            onCreateWishlist={handleCreateWishlist}
            onDeleteWishlist={handleDeleteWishlist}
            onRenameWishlist={handleRenameWishlist}
            onShareWishlist={handleShareWishlist}
          />

          {/* View Controls */}
          {filteredItems.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-border rounded-button overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
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
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
                  />
                </div>
              </div>

              {/* Select All */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllItems}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <div className={`w-4 h-4 border border-border rounded ${
                    selectedItems.length === filteredItems.length 
                      ? 'bg-primary border-primary' 
                      : selectedItems.length > 0 
                        ? 'bg-primary border-primary opacity-50' :''
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
              wishlists={wishlists}
              currentWishlistId={selectedWishlist}
              onBulkAddToCart={handleBulkAddToCart}
              onBulkRemove={handleBulkRemove}
              onBulkMoveToWishlist={handleBulkMoveToWishlist}
            />
          )}

          {/* Main Content */}
          {filteredItems.length === 0 ? (
            <EmptyWishlist 
              onStartShopping={handleStartShopping}
              wishlistName={currentWishlist?.name}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-4">
                <WishlistGrid
                  items={sortedItems}
                  viewMode={viewMode}
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onAddToCart={handleAddToCart}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                  onMoveToWishlist={handleMoveToWishlist}
                  wishlists={wishlists}
                  currentWishlistId={selectedWishlist}
                />
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          <div className="mt-12">
            <RecentlyViewed onAddToCart={handleAddToCart} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistSavedItems;