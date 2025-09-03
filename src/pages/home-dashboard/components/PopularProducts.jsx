import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const PopularProducts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const products = [
    {
      id: 1,
      name: "Organic Bananas",
      brand: "Fresh Farms",
      price: 2.99,
      originalPrice: 3.49,
      weight: "2 lbs",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 128,
      stock: 15,
      isNew: false,
      isOrganic: true,
      isWishlisted: false
    },
    {
      id: 2,
      name: "Fresh Whole Milk",
      brand: "Organic Valley",
      price: 4.29,
      originalPrice: null,
      weight: "1 gallon",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?w=300&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 89,
      stock: 8,
      isNew: false,
      isOrganic: true,
      isWishlisted: true
    },
    {
      id: 3,
      name: "Atlantic Salmon Fillet",
      brand: "Ocean\'s Best",
      price: 12.99,
      originalPrice: 15.99,
      weight: "1 lb",
      image: "https://images.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_1280.jpg?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 56,
      stock: 5,
      isNew: true,
      isOrganic: false,
      isWishlisted: false
    },
    {
      id: 4,
      name: "Artisan Sourdough Bread",
      brand: "Baker\'s Choice",
      price: 5.49,
      originalPrice: null,
      weight: "1 loaf",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 234,
      stock: 12,
      isNew: false,
      isOrganic: false,
      isWishlisted: false
    },
    {
      id: 5,
      name: "Organic Baby Spinach",
      brand: "Green Garden",
      price: 3.99,
      originalPrice: 4.99,
      weight: "5 oz",
      image: "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?w=300&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 67,
      stock: 20,
      isNew: false,
      isOrganic: true,
      isWishlisted: false
    },
    {
      id: 6,
      name: "Premium Ground Coffee",
      brand: "Pure Pantry",
      price: 8.99,
      originalPrice: 10.99,
      weight: "12 oz",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?w=300&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 145,
      stock: 0,
      isNew: true,
      isOrganic: false,
      isWishlisted: true
    },
    {
      id: 7,
      name: "Free-Range Eggs",
      brand: "Happy Hens",
      price: 4.99,
      originalPrice: null,
      weight: "12 count",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 98,
      stock: 25,
      isNew: false,
      isOrganic: true,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Organic Avocados",
      brand: "Fresh Farms",
      price: 6.99,
      originalPrice: 7.99,
      weight: "4 count",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192_1280.jpg?w=300&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 76,
      stock: 18,
      isNew: false,
      isOrganic: true,
      isWishlisted: false
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

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="bg-border-light hover:bg-border text-text-primary font-body font-medium px-6 py-3 rounded-lg transition-colors duration-200">
          Load More Products
        </button>
      </div>
    </div>
  );
};

export default PopularProducts;