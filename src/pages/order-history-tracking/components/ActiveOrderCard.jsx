import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const ActiveOrderCard = ({ order, onTrackOrder, onContactDriver }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currency = (n) => `$${Number(n || 0).toFixed(2)}`;

  const getProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 25;
      case 'preparing': return 50;
      case 'processing': return 50; // treat processing as preparing
      case 'proceeding': return 50; // alias (typo) just in case
      case 'out_for_delivery': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };
  const progressSteps = [
    { key: 'confirmed', label: 'Confirmed', icon: 'CheckCircle2' },
    { key: 'preparing', label: 'Preparing', icon: 'Clock' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: 'Truck' },
    { key: 'delivered', label: 'Delivered', icon: 'CheckCircle' }
  ];

  const isStepCompleted = (stepKey) => {
    const stepOrder = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentStatus = (order.status || '').toLowerCase();
    const currentIndex = stepOrder.indexOf(currentStatus);
    const stepIndex = stepOrder.indexOf(stepKey);
    if (currentIndex === -1) {
      // When status is unknown (e.g., 'processing'), show Confirmed as completed by default
      return stepKey === 'confirmed';
    }
    return stepIndex <= currentIndex;
  };

  const isStepActive = (stepKey) => {
    const current = (order.status || '').toLowerCase();
    if (current === 'processing' || current === 'proceeding') {
      return stepKey === 'preparing';
    }
    return stepKey === current;
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-4 mb-4">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-heading font-heading-semibold text-lg text-text-primary">
              Order #{order.id}
            </h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{order.orderDate}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>ETA: {order.estimatedDelivery}</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-data font-data-medium text-lg text-text-primary">
            ${Number(order.total || 0).toFixed(2)}
          </p>
          <p className="text-sm text-text-secondary">{order.itemCount} items</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          {progressSteps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-smooth ${isStepCompleted(step.key)
                  ? 'bg-primary text-primary-foreground'
                  : isStepActive(step.key)
                    ? (step.key === 'preparing' ? 'bg-warning text-warning-foreground' : 'bg-accent text-accent-foreground')
                    : 'bg-border text-text-secondary'
                }`}>
                <Icon name={step.icon} size={16} />
              </div>
              <span className={`text-xs font-caption text-center ${isStepCompleted(step.key) || isStepActive(step.key)
                ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-border-light rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-smooth"
            style={{ width: `${getProgressPercentage(order.status)}%` }}
          />
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-4 p-3 bg-border-light rounded-card">
        <div className="flex items-start space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-body font-body-medium text-text-primary">
              Delivering to:
            </p>
            <p className="text-sm text-text-secondary">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="primary"
          onClick={() => onTrackOrder(order.id)}
          iconName="MapPin"
          iconPosition="left"
          className="flex-1"
        >
          Track Order
        </Button>

        {order.status.toLowerCase() === 'out_for_delivery' && order.driverInfo && (
          <Button
            variant="outline"
            onClick={() => onContactDriver(order.driverInfo)}
            iconName="Phone"
            iconPosition="left"
            className="flex-1"
          >
            Contact Driver
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="flex-1"
        >
          {isExpanded ? 'Less Details' : 'More Details'}
        </Button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-border-light rounded-card overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-body-medium text-text-primary">
                    {item.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Qty: {Number(item.quantity || 1)} × {currency(item.price)}
                  </p>
                </div>
                <p className="text-sm font-data font-data-medium text-text-primary">
                  {currency(Number(item.quantity || 1) * Number(item.price || 0))}
                </p>
              </div>
            ))}
          </div>

          {/* Billing Summary */}
          <div className="mt-4 p-3 bg-border-light rounded-card">
            {(() => {
              const subtotal = (order.items || []).reduce((s, i) => s + Number(i.price || 0) * Number(i.quantity || 1), 0);
              const tax = subtotal * 0.08;
              const deliveryFee = Number(order.deliveryFee ?? order.timeSlot?.price ?? 0);
              const tip = Number(order.tip || 0);
              const total = Number(order.total ?? (subtotal + tax + deliveryFee + tip));
              return (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-text-secondary">Subtotal</span><span className="text-text-primary">{currency(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Tax</span><span className="text-text-primary">{currency(tax)}</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Delivery Fee</span><span className="text-text-primary">{currency(deliveryFee)}</span></div>
                  {tip > 0 && (<div className="flex justify-between"><span className="text-text-secondary">Tip</span><span className="text-text-primary">{currency(tip)}</span></div>)}
                  <div className="border-t border-border pt-2 flex justify-between"><span className="font-body font-body-medium text-text-primary">Total</span><span className="font-data font-data-medium text-primary">{currency(total)}</span></div>
                </div>
              );
            })()}
          </div>

          {order.driverInfo && (
            <div className="mt-4 p-3 bg-border-light rounded-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-body-medium text-text-primary">
                    {order.driverInfo.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {order.driverInfo.phone} • {order.driverInfo.vehicle}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => onContactDriver(order.driverInfo)}
                  iconName="Phone"
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveOrderCard;