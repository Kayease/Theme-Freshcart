import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import OrderStatusBadge from './OrderStatusBadge';

const HistoryOrderCard = ({ order, onReorder, onViewReceipt, onRateOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(order.rating || 0);

  const handleRatingSubmit = () => {
    onRateOrder(order.id, rating);
    setShowRating(false);
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={interactive ? () => setRating(index + 1) : undefined}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-smooth`}
        disabled={!interactive}
      >
        <Icon
          name={index < rating ? "Star" : "Star"}
          size={16}
          className={index < rating ? "text-accent fill-current" : "text-border"}
        />
      </button>
    ));
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
            {order.deliveredDate && (
              <span className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} />
                <span>Delivered {order.deliveredDate}</span>
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-data font-data-medium text-lg text-text-primary">
            ${order.total.toFixed(2)}
          </p>
          <p className="text-sm text-text-secondary">{order.itemCount} items</p>
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

      {/* Rating Section */}
      {order.status.toLowerCase() === 'delivered' && (
        <div className="mb-4 p-3 bg-border-light rounded-card">
          {!showRating && !order.rating ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-body-medium text-text-primary">
                How was your order?
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRating(true)}
                iconName="Star"
                iconPosition="left"
              >
                Rate Order
              </Button>
            </div>
          ) : showRating ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-body font-body-medium text-text-primary">
                  Rate this order:
                </span>
                <div className="flex space-x-1">
                  {renderStars(true)}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleRatingSubmit}
                  disabled={rating === 0}
                >
                  Submit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRating(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body font-body-medium text-text-primary">
                Your rating:
              </span>
              <div className="flex space-x-1">
                {renderStars(false)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="primary"
          onClick={() => onReorder(order.items)}
          iconName="ShoppingCart"
          iconPosition="left"
          className="flex-1"
        >
          Reorder
        </Button>
        
        <Button
          variant="outline"
          onClick={() => onViewReceipt(order.id)}
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Download Receipt
        </Button>
        
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
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-data font-data-medium text-text-primary">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReorder([item])}
                    iconName="Plus"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-border-light rounded-card">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-body font-body-medium text-text-primary">
                  Delivered to:
                </p>
                <p className="text-sm text-text-secondary">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryOrderCard;