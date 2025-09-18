import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import WishlistGrid from './components/WishlistGrid';
import WishlistManagement from './components/WishlistManagement';
import EmptyWishlist from './components/EmptyWishlist';
import BulkActions from './components/BulkActions';
import RecentlyViewed from './components/RecentlyViewed';
import { useAuth } from '../../contexts/AuthContext';

const WishlistSavedItems = () => {
  const navigate = useNavigate();
  const { wishlist, addToCart, removeFromWishlist, moveToCart } = useAuth();
  

  const [wishlists, setWishlists] = useState([
    { id: 1, name: "Weekly Essentials", itemCount: wishlist.length, isPrivate: false },
    { id: 2, name: "Special Occasions", itemCount: 0, isPrivate: true },
    { id: 3, name: "Gift Ideas", itemCount: 0, isPrivate: false }
  ]);

  const [selectedWishlist, setSelectedWishlist] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('saved_date'); // 'saved_date', 'price', 'name', 'price_drop'
  const [priceDropNotifications, setPriceDropNotifications] = useState(true);

  // Filter items by selected wishlist
  const filteredItems = wishlist.filter(item => item.wishlistId === selectedWishlist || !item.wishlistId);

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

  const handleMoveToWishlist = (itemId, targetWishlistId) => {
    // Update wishlist items
    const updatedWishlist = wishlist.map(item => 
      item.id === itemId ? { ...item, wishlistId: targetWishlistId } : item
    );
    
    // Update wishlist counts
    const item = wishlist.find(i => i.id === itemId);
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

  // Update wishlists when wishlist changes
  useEffect(() => {
    setWishlists(prev => prev.map(w => 
      w.id === selectedWishlist ? { ...w, itemCount: filteredItems.length } : w
    ));
  }, [wishlist, selectedWishlist, filteredItems.length]);

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

  const handleBulkMoveToWishlist = (targetWishlistId) => {
    // Update items in the wishlist context
    const updatedWishlist = wishlist.map(item => 
      selectedItems.includes(item.id) 
        ? { ...item, wishlistId: targetWishlistId }
        : item
    );
    
    // Update wishlist counts
    setWishlists(prev => prev.map(w => {
      const itemsMovingFrom = selectedItems.filter(id => {
        const item = wishlist.find(i => i.id === id);
        return item && item.wishlistId === w.id;
      }).length;
      
      const isTarget = w.id === targetWishlistId;
      const itemsMovingTo = isTarget ? selectedItems.length : 0;
      
      return {
        ...w,
        itemCount: w.itemCount - itemsMovingFrom + (isTarget ? itemsMovingTo : 0)
      };
    }));
    
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
      <SEO title="Wishlist | FreshCart" description="View and manage your saved items and wishlists." />
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