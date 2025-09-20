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
    </div>
  );
};

export default RecentlyPurchased;