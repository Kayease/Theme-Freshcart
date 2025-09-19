import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, deliveryFee, tip }) => {
  const items = Array.isArray(cartItems) ? cartItems : [];
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price ?? item.originalPrice ?? 0) * Number(item.quantity ?? 1)), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax + (deliveryFee || 0) + (tip || 0);

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-6">
        Order Summary
      </h3>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-button overflow-hidden bg-border-light flex-shrink-0">
              <Image
                src={item.image || '/images/placeholder.jpg'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-body-medium text-text-primary truncate">
                {item.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {Number(item.quantity ?? 1)} {item.unit || ''}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-data font-data-medium text-text-primary">
                ${(Number(item.price ?? item.originalPrice ?? 0) * Number(item.quantity ?? 1)).toFixed(2)}
              </p>
              <p className="text-sm text-text-secondary">
                ${Number(item.price ?? item.originalPrice ?? 0).toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-caption">
              Subtotal ({items.reduce((n, i) => n + Number(i.quantity ?? 1), 0)} items)
            </span>
            <span className="font-data font-data-medium text-text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-caption">
              Delivery Fee
            </span>
            <span className="font-data font-data-medium text-text-primary">
              ${(deliveryFee || 0).toFixed(2)}
            </span>
          </div>
          
          {tip > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-text-secondary font-caption">
                Delivery Tip
              </span>
              <span className="font-data font-data-medium text-text-primary">
                ${tip.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-caption">
              Tax
            </span>
            <span className="font-data font-data-medium text-text-primary">
              ${tax.toFixed(2)}
            </span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="font-body font-body-semibold text-text-primary">
                Total
              </span>
              <span className="font-data font-data-bold text-lg text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes moved out; summary stays focused on totals */}
      </div>
    </div>
  );
};

export default OrderSummary;