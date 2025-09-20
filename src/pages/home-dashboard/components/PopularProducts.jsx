import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import productsData from '../../../data/products.json';
import { useAuth } from '../../../contexts/AuthContext';

const PopularProducts = () => {
  const { addToCart, toggleWishlist, wishlist } = useAuth();

  const products = useMemo(() => {
    // Pick a curated subset (e.g., top 8 by rating) from our dataset
    const sorted = [...productsData.products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 8);
  }, []);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
  };

  return (
    <div className="bg-surface py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Popular Products
          </h2>
          <p className="text-text-secondary font-body mt-1">
            Most loved items by our customers
          </p>
        </div>

        <button className="flex items-center space-x-2 text-primary font-body font-medium hover:underline transition-all duration-200">
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;