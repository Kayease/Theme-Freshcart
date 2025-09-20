import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedCount, 
  onBulkAddToCart, 
  onBulkRemove
}) => {

  return (
    <div className="bg-primary text-primary-foreground rounded-card p-4 mb-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} />
          </div>
          <div>
            <h3 className="font-heading font-heading-bold text-lg">
              {selectedCount} items selected
            </h3>
            <p className="text-primary-foreground text-opacity-80 text-sm">
              Choose an action to apply to all selected items
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onBulkAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:bg-opacity-90"
          >
            Add to Cart
          </Button>

          <Button
            variant="outline"
            onClick={onBulkRemove}
            iconName="Trash2"
            iconPosition="left"
            className="bg-error text-error-foreground hover:bg-error hover:bg-opacity-90"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;