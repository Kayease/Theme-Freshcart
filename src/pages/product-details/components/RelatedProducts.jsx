import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-heading-bold text-text-primary">
          Related Products
        </h2>
        <Link
          to="/product-categories-browse"
          className="text-primary hover:text-primary/80 text-sm font-body-medium transition-smooth"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <Link to={`/product-details?id=${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-body-medium">
                  {product.discount}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button
                className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-smooth"
                aria-label="Add to wishlist"
              >
                <Icon name="Heart" size={14} />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <Link
                to={`/product-details?id=${product.id}`}
                className="block hover:text-primary transition-smooth"
              >
                <h3 className="font-body-medium text-text-primary text-sm line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs text-text-secondary font-body">
                {product.unit}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-text-secondary font-caption">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-heading font-heading-bold text-primary">
                  ${product.price.current}
                </span>
                {product.price.original && product.price.original !== product.price.current && (
                  <span className="text-xs text-text-secondary line-through">
                    ${product.price.original}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={() => onAddToCart?.(product)}
                className="mt-2"
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;