import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          color: 'bg-success text-success-foreground',
          icon: 'CheckCircle',
          text: 'Delivered'
        };
      case 'out_for_delivery':
        return {
          color: 'bg-warning text-warning-foreground',
          icon: 'Truck',
          text: 'Out for Delivery'
        };
      case 'preparing':
        return {
          color: 'bg-accent text-accent-foreground',
          icon: 'Clock',
          text: 'Preparing'
        };
      case 'confirmed':
        return {
          color: 'bg-primary text-primary-foreground',
          icon: 'CheckCircle2',
          text: 'Confirmed'
        };
      case 'cancelled':
        return {
          color: 'bg-error text-error-foreground',
          icon: 'XCircle',
          text: 'Cancelled'
        };
      default:
        return {
          color: 'bg-border text-text-secondary',
          icon: 'Clock',
          text: 'Processing'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-data font-data-medium ${config.color} ${className}`}>
      <Icon name={config.icon} size={12} />
      <span>{config.text}</span>
    </span>
  );
};

export default OrderStatusBadge;