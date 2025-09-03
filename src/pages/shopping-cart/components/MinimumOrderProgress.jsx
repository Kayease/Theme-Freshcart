import React from 'react';
import Icon from '../../../components/AppIcon';

const MinimumOrderProgress = ({ currentTotal, minimumOrder = 25.00 }) => {
  const progress = Math.min((currentTotal / minimumOrder) * 100, 100);
  const remainingAmount = Math.max(minimumOrder - currentTotal, 0);
  const isMinimumMet = currentTotal >= minimumOrder;

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon 
            name={isMinimumMet ? "CheckCircle" : "AlertCircle"} 
            size={18} 
            className={isMinimumMet ? "text-success" : "text-warning"} 
          />
          <span className="font-body font-body-medium text-text-primary">
            Minimum Order
          </span>
        </div>
        <span className="font-data font-data-medium text-text-primary">
          ${minimumOrder.toFixed(2)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-border-light rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isMinimumMet ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className="text-sm font-caption">
        {isMinimumMet ? (
          <div className="flex items-center gap-2 text-success">
            <Icon name="CheckCircle" size={14} />
            <span>Great! You've met the minimum order requirement.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-warning">
            <Icon name="AlertCircle" size={14} />
            <span>
              Add ${remainingAmount.toFixed(2)} more to meet the minimum order requirement.
            </span>
          </div>
        )}
      </div>

      {/* Benefits */}
      {isMinimumMet && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-success text-sm font-caption">
            <Icon name="Truck" size={14} />
            <span>Free delivery unlocked!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimumOrderProgress;