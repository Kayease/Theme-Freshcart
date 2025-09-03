import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const ActiveOrderCard = ({ order, onTrackOrder, onContactDriver }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 25;
      case 'preparing': return 50;
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
    const currentIndex = stepOrder.indexOf(order.status.toLowerCase());
    const stepIndex = stepOrder.indexOf(stepKey);
    return stepIndex <= currentIndex;
  };

  const isStepActive = (stepKey) => {
    return stepKey === order.status.toLowerCase();
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
            ${order.total.toFixed(2)}
          </p>
          <p className="text-sm text-text-secondary">{order.itemCount} items</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          {progressSteps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-smooth ${
                isStepCompleted(step.key) 
                  ? 'bg-primary text-primary-foreground' 
                  : isStepActive(step.key)
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-border text-text-secondary'
              }`}>
                <Icon name={step.icon} size={16} />
              </div>
              <span className={`text-xs font-caption text-center ${
                isStepCompleted(step.key) || isStepActive(step.key)
                  ? 'text-text-primary' :'text-text-secondary'
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

      {/* Order Items Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {order.items.slice(0, 4).map((item, index) => (
            <div key={index} className="flex-shrink-0 w-12 h-12 bg-border-light rounded-card overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="flex-shrink-0 w-12 h-12 bg-border-light rounded-card flex items-center justify-center">
              <span className="text-xs font-data font-data-medium text-text-secondary">
                +{order.items.length - 4}
              </span>
            </div>
          )}
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
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-body-medium text-text-primary">
                    {item.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-data font-data-medium text-text-primary">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
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