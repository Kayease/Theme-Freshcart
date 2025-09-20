import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';
import productsData from '../../../data/products.json';

const RecentlyPurchased = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, toast } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Get recently purchased products from real data
  const recentProducts = useMemo(() => {
    // Simulate recently purchased products by taking top-rated products
    // In a real app, this would come from user's purchase history
    const sorted = [...productsData.products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 4).map((product, index) => ({
      ...product,
      lastPurchased: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Simulate different purchase dates
      isWishlisted: false // Will be updated by isInWishlist check
    }));
  }, []);

  const handleAddToCart = async (product, quantity) => {
    setIsLoading(true);
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        weight: product.weight,
        quantity: quantity
      };

      await addToCart(cartItem, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async (product) => {
    try {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        weight: product.weight
      };

      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(wishlistItem);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              product={{
                ...product,
                isWishlisted: isInWishlist(product.id)
              }}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isLoading={isLoading}
            />

            {/* Last Purchased Badge */}
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                <Icon name="Clock" size={12} />
                <span>Bought {formatDate(product.lastPurchased)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reorder Section */}
      <div className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <Icon name="RotateCcw" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary text-lg">
                Quick Reorder
              </h3>
              <p className="text-sm text-text-secondary">
                Reorder your essentials with one click
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              // Add all recent products to cart
              recentProducts.forEach(product => {
                handleAddToCart(product, 1);
              });
            }}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Icon name="ShoppingCart" size={16} />
                <span>Reorder All</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentlyPurchased;