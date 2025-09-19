import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

const ProductCard = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();

  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);

  // Update wishlist state when wishlist changes
  useEffect(() => {
    setIsWishlisted(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />);
    }

    return stars;
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-card hover:shadow-modal transition-smooth group flex flex-col">
      <div className="relative overflow-hidden w-full">
        <Link to={`/product-details?id=${product.id}`}>
          <div className="overflow-hidden rounded-t-card w-full bg-white flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              className="max-h-[180px] sm:max-h-[200px] md:max-h-[220px] object-contain"
            />
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-1.5 sm:p-2 bg-surface bg-opacity-90 rounded-full shadow-card hover:bg-opacity-100 transition-smooth"
          aria-pressed={isWishlisted}
        >
          <Icon
            name="Heart"
            size={14}
            className={isWishlisted ? 'text-error fill-current' : 'text-text-secondary'}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isOrganic && (
            <span className="bg-success text-success-foreground text-[10px] sm:text-xs font-data font-data-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-button">
              Organic
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-error text-error-foreground text-[10px] sm:text-xs font-data font-data-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-button">
              -{product.discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-error text-error-foreground text-[10px] sm:text-xs font-data font-data-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-button">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-3 justify-between flex flex-col flex-1 gap-2">
        <Link to={`/product-details?id=${product.id}`}>
          <h3 className="font-body font-body-medium text-sm sm:text-base text-text-primary line-clamp-2 hover:text-primary transition-smooth">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-text-secondary font-caption">
            ({product.reviews ?? product.reviewCount ?? 0})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-base font-heading font-heading-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-text-secondary line-through font-caption">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.inStock && (
          <Button
            variant="primary"
            fullWidth
            disabled={!product.inStock}
            loading={isAddingToCart}
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="text-sm h-9"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;