import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await onAddToCart(product, quantity);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 group">
      {/* Product Image */}
      <div className="relative">
        <Link to={`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-success text-success-foreground text-xs font-data font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-error text-error-foreground text-xs font-data font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-green-600 text-white text-xs font-data font-bold px-2 py-1 rounded">
              ORGANIC
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
          aria-label={product.isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon
            name="Heart"
            size={16}
            className={product.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`} className="block mb-2">
          <h3 className="font-body font-semibold text-text-primary line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary font-caption mb-2">
          {product.brand} • {product.weight}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-text-secondary font-caption">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-heading font-bold text-text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-secondary font-caption line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {product.stock > 0 ? (
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-sm text-success font-caption">
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Icon name="XCircle" size={14} className="text-error" />
              <span className="text-sm text-error font-caption">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Quantity Selector & Add to Cart */}
        {product.stock > 0 && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={decrementQuantity}
                className="w-8 h-8 flex items-center justify-center hover:bg-border-light transition-colors"
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-sm font-data font-medium">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 flex items-center justify-center hover:bg-border-light transition-colors"
                disabled={quantity >= product.stock}
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              loading={isAddingToCart}
              disabled={isAddingToCart}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-1"
            >
              {isAddingToCart ? 'Adding...' : 'Add'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;