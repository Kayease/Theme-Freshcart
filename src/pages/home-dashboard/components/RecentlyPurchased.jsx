import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const RecentlyPurchased = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Mock recently purchased products for returning users
  const recentProducts = [
    {
      id: 101,
      name: "Organic Whole Wheat Bread",
      brand: "Baker\'s Choice",
      price: 4.99,
      originalPrice: null,
      weight: "1 loaf",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 89,
      stock: 15,
      isNew: false,
      isOrganic: true,
      isWishlisted: false,
      lastPurchased: "2024-01-15"
    },
    {
      id: 102,
      name: "Greek Yogurt",
      brand: "Organic Valley",
      price: 5.99,
      originalPrice: 6.99,
      weight: "32 oz",
      image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      stock: 22,
      isNew: false,
      isOrganic: true,
      isWishlisted: true,
      lastPurchased: "2024-01-12"
    },
    {
      id: 103,
      name: "Organic Carrots",
      brand: "Fresh Farms",
      price: 2.49,
      originalPrice: null,
      weight: "2 lbs",
      image: "https://images.pixabay.com/photo/2016/08/09/10/30/carrots-1581279_1280.jpg?w=300&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 78,
      stock: 30,
      isNew: false,
      isOrganic: true,
      isWishlisted: false,
      lastPurchased: "2024-01-10"
    },
    {
      id: 104,
      name: "Almond Milk",
      brand: "Pure Pantry",
      price: 3.99,
      originalPrice: 4.49,
      weight: "64 fl oz",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 234,
      stock: 18,
      isNew: false,
      isOrganic: false,
      isWishlisted: false,
      lastPurchased: "2024-01-08"
    }
  ];

  const handleAddToCart = async (product, quantity) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems(prev => {
      const isWishlisted = prev.some(item => item.id === product.id);
      if (isWishlisted) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });

    // Update product wishlist status
    product.isWishlisted = !product.isWishlisted;
  };

  const handleReorderAll = () => {
    recentProducts.forEach(product => {
      if (product.stock > 0) {
        handleAddToCart(product, 1);
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-surface py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Buy Again
          </h2>
          <p className="text-text-secondary font-body mt-1">
            Items you've purchased recently
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleReorderAll}
            className="flex items-center space-x-2 bg-primary text-primary-foreground font-body font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            <Icon name="ShoppingCart" size={16} />
            <span>Reorder All</span>
          </button>
          
          <button className="flex items-center space-x-2 text-primary font-body font-medium hover:underline transition-all duration-200">
            <span>View Order History</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
            
            {/* Last Purchased Badge */}
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-blue-100 text-blue-700 text-xs font-data font-medium px-2 py-1 rounded flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>Bought {formatDate(product.lastPurchased)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reorder Section */}
      <div className="mt-8 bg-border-light rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="RotateCcw" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary">
                Quick Reorder
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Reorder your essentials with one click
              </p>
            </div>
          </div>
          
          <button
            onClick={handleReorderAll}
            className="bg-primary text-primary-foreground font-body font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Reorder Essentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentlyPurchased;