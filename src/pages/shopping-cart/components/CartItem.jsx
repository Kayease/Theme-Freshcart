import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onMoveToWishlist }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const calculateItemTotal = () => {
    const discountedPrice = item.originalPrice - (item.originalPrice * item.discount / 100);
    return (discountedPrice * item.quantity).toFixed(2);
  };

  const getDiscountedPrice = () => {
    return (item.originalPrice - (item.originalPrice * item.discount / 100)).toFixed(2);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-4 shadow-card">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-card overflow-hidden bg-border-light">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="flex-1">
              <h3 className="font-body font-body-medium text-text-primary text-base mb-1 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-text-secondary text-sm mb-2">{item.brand}</p>
              
              {/* Price Information */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-heading font-heading-bold text-primary text-lg">
                  ${getDiscountedPrice()}
                </span>
                {item.discount > 0 && (
                  <>
                    <span className="text-text-secondary text-sm line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-data font-data-medium">
                      {item.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                <Icon 
                  name={item.inStock ? "CheckCircle" : "XCircle"} 
                  size={16} 
                  className={item.inStock ? "text-success" : "text-error"} 
                />
                <span className={`text-sm font-caption ${item.inStock ? "text-success" : "text-error"}`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="font-heading font-heading-bold text-primary text-lg">
                ${calculateItemTotal()}
              </p>
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-caption text-text-secondary">Quantity:</span>
              <div className="flex items-center border border-border rounded-button overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-border-light disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-12 h-8 flex items-center justify-center text-text-primary font-data font-data-medium border-x border-border">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={!item.inStock}
                  className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-border-light disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onMoveToWishlist(item.id)}
                className="text-sm"
                iconName="Heart"
                iconSize={14}
              >
                Save for Later
              </Button>
              <Button
                variant="ghost"
                onClick={() => onRemoveItem(item.id)}
                className="text-sm text-error hover:text-error"
                iconName="Trash2"
                iconSize={14}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;