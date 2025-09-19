import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({
  subtotal,
  discount,
  tax,
  deliveryFee,
  total,
  itemCount,
  onProceedToCheckout,
}) => {

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6 shadow-card sticky top-24">
      <h2 className="font-heading font-heading-bold text-xl text-text-primary mb-6">
        Order Summary
      </h2>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-caption">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-data font-data-medium text-text-primary">
            ${formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-success font-caption">Discount Applied</span>
            <span className="font-data font-data-medium text-success">
              -${formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-caption">Estimated Tax</span>
          <span className="font-data font-data-medium text-text-primary">
            ${formatPrice(tax)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-caption">Delivery Fee</span>
          <span className="font-data font-data-medium text-text-primary">
            ${formatPrice(deliveryFee)}
          </span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="font-heading font-heading-bold text-lg text-text-primary">
              Total
            </span>
            <span className="font-heading font-heading-bold text-xl text-primary">
              ${formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 py-3 bg-border-light rounded-button">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs font-caption text-text-secondary">SSL Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-xs font-caption text-text-secondary">Safe Payment</span>
          </div>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={onProceedToCheckout}
        className="mb-4"
        iconName="ArrowRight"
        iconPosition="right"
      >
        Proceed to Checkout
      </Button>

      {/* Continue Shopping */}
      <Button
        variant="ghost"
        fullWidth
        onClick={() => window.location.href = '/product-categories-browse'}
        iconName="ArrowLeft"
        iconPosition="left"
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default OrderSummary;