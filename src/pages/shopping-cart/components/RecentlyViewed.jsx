import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ onAddToCart }) => {
  const recentlyViewedProducts = [
    {
      id: 1,
      name: "Premium Avocados (4 pack)",
      price: 6.99,
      originalPrice: 8.99,
      discount: 22,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop",
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: "Organic Greek Yogurt 500g",
      price: 4.49,
      originalPrice: 4.49,
      discount: 0,
      image: "https://images.unsplash.com/photo-1571212515416-fca0bf4c0b8e?w=200&h=200&fit=crop",
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: "Fresh Atlantic Salmon Fillet",
      price: 12.99,
      originalPrice: 15.99,
      discount: 19,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=200&fit=crop",
      rating: 4.3,
      inStock: false
    },
    {
      id: 4,
      name: "Artisan Sourdough Bread",
      price: 5.99,
      originalPrice: 5.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&h=200&fit=crop",
      rating: 4.7,
      inStock: true
    },
    {
      id: 5,
      name: "Organic Baby Spinach 200g",
      price: 3.99,
      originalPrice: 4.99,
      discount: 20,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop",
      rating: 4.4,
      inStock: true
    }
  ];

  const handleAddToCart = (productId) => {
    onAddToCart(productId);
  };

  const handleViewProduct = (productId) => {
    console.log('Viewing product:', productId);
    // Navigate to product details page
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-heading-bold text-xl text-text-primary flex items-center gap-2">
          <Icon name="Clock" size={20} />
          Recently Viewed
        </h2>
        <Button
          variant="ghost"
          onClick={() => console.log('View all recently viewed')}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-sm"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {recentlyViewedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-background border border-border rounded-card p-4 hover:shadow-card transition-smooth group"
          >
            {/* Product Image */}
            <div className="relative aspect-square mb-3 rounded-card overflow-hidden bg-border-light">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-slow cursor-pointer"
                onClick={() => handleViewProduct(product.id)}
              />
              
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-data font-data-medium">
                  {product.discount}% OFF
                </div>
              )}

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-data font-data-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 
                className="font-body font-body-medium text-text-primary text-sm line-clamp-2 cursor-pointer hover:text-primary transition-smooth"
                onClick={() => handleViewProduct(product.id)}
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs font-caption text-text-secondary ml-1">
                  ({product.rating})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-heading font-heading-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-text-secondary text-xs line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant={product.inStock ? "primary" : "ghost"}
                fullWidth
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
                iconName={product.inStock ? "Plus" : "AlertCircle"}
                iconSize={14}
                className="text-sm mt-3"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => console.log('Clear recently viewed')}
            iconName="Trash2"
            iconSize={14}
            className="text-sm"
          >
            Clear History
          </Button>
          <Button
            variant="ghost"
            onClick={() => console.log('Browse more products')}
            iconName="Search"
            iconSize={14}
            className="text-sm"
          >
            Discover More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;