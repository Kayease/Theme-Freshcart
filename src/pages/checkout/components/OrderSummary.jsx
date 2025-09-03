import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, pricing, deliveryFee, tip }) => {
  const mockCartItems = [
    {
      id: 1,
      name: 'Fresh Organic Bananas',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
      price: 3.99,
      quantity: 2,
      unit: 'bunch',
      category: 'Fruits'
    },
    {
      id: 2,
      name: 'Whole Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      price: 4.49,
      quantity: 1,
      unit: 'gallon',
      category: 'Dairy'
    },
    {
      id: 3,
      name: 'Fresh Bread Loaf',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      price: 2.99,
      quantity: 1,
      unit: 'loaf',
      category: 'Bakery'
    },
    {
      id: 4,
      name: 'Organic Spinach',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      price: 3.49,
      quantity: 1,
      unit: 'bag',
      category: 'Vegetables'
    }
  ];

  const items = cartItems || mockCartItems;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-body-medium text-text-primary truncate">
                {item.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {item.quantity} {item.unit}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-data font-data-medium text-text-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-text-secondary">
                ${item.price.toFixed(2)} each
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
              Subtotal ({items.length} items)
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

        {/* Savings Info */}
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-card">
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={16} className="text-success" />
            <span className="text-sm text-success font-caption">
              You saved $5.50 on this order!
            </span>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-card">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-primary" />
            <span className="text-sm text-primary font-caption">
              Estimated delivery: 45-60 minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;