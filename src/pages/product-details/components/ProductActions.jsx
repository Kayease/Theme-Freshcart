import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import QuantitySelector from './QuantitySelector';

const ProductActions = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart?.({
        product,
        quantity: selectedQuantity,
        variant: selectedVariant
      });
      // Show success feedback
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist?.(product, !isInWishlist);
  };

  const isOutOfStock = product.availability?.toLowerCase() === 'out of stock';
  const totalPrice = (product.price.current * selectedQuantity).toFixed(2);

  return (
    <div className="space-y-6 border-t border-border pt-6">
      {/* Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-body-medium text-text-primary">
            Size/Variant:
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border text-sm font-body-medium transition-smooth ${
                  selectedVariant?.id === variant.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-text-primary hover:border-primary'
                }`}
              >
                {variant.name}
                {variant.priceModifier && (
                  <span className="ml-1 text-xs">
                    (+${variant.priceModifier})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <QuantitySelector
        initialQuantity={1}
        minQuantity={1}
        maxQuantity={product.maxQuantity || 10}
        onQuantityChange={setSelectedQuantity}
        disabled={isOutOfStock}
      />

      {/* Price Summary */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-body text-text-secondary">
            Unit Price:
          </span>
          <span className="font-body-medium text-text-primary">
            ${product.price.current}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-body text-text-secondary">
            Quantity:
          </span>
          <span className="font-body-medium text-text-primary">
            {selectedQuantity}
          </span>
        </div>
        <div className="border-t border-border pt-2">
          <div className="flex justify-between items-center">
            <span className="font-body-medium text-text-primary">
              Total:
            </span>
            <span className="font-heading font-heading-bold text-lg text-primary">
              ${totalPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          loading={isAddingToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Heart"
            iconPosition="left"
            onClick={handleWishlistToggle}
            className={isInWishlist ? 'text-red-500 border-red-500' : ''}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            iconName="Share2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  text: `Check out this ${product.name} on FreshCart`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} className="text-green-600" />
          <span className="font-body-medium text-green-800">
            Free delivery on orders over $50
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-green-600" />
          <span className="text-sm font-body text-green-700">
            Delivery within 2-4 hours
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={16} className="text-green-600" />
          <span className="text-sm font-body text-green-700">
            Easy returns within 24 hours
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;