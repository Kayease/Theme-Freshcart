import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteOrdersSection = ({ favoriteOrders, onReorderFavorite }) => {
  if (!favoriteOrders || favoriteOrders.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Heart" size={20} className="text-accent" />
        <h3 className="font-heading font-heading-semibold text-lg text-text-primary">
          Favorite Orders
        </h3>
        <span className="text-sm text-text-secondary">
          Your most reordered combinations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteOrders.map((favorite) => (
          <div
            key={favorite.id}
            className="border border-border rounded-card p-4 hover:shadow-card transition-smooth"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Repeat" size={16} className="text-primary" />
              <span className="text-sm font-body font-body-medium text-text-primary">
                Ordered {favorite.orderCount} times
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {favorite.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-border-light rounded-card overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body text-text-primary truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {favorite.items.length > 3 && (
                <p className="text-xs text-text-secondary pl-10">
                  +{favorite.items.length - 3} more items
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-data font-data-medium text-text-primary">
                  ${favorite.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-text-secondary">
                  {favorite.items.length} items
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onReorderFavorite(favorite.items)}
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Reorder
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteOrdersSection;