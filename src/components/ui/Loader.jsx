import React from 'react';
import Icon from '../AppIcon';

const Loader = ({ size = 'default', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-surface rounded-card shadow-modal p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className={`${sizeClasses[size]} border-4 border-border rounded-full animate-spin border-t-primary`}></div>
            {/* Inner logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Icon name="ShoppingBag" size={14} color="white" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-heading font-heading-medium text-text-primary mb-1">FreshCart</h3>
            <p className={`text-text-secondary font-body ${textSizeClasses[size]}`}>{text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-border rounded-full animate-spin border-t-primary`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
            <Icon name="ShoppingBag" size={10} color="white" />
          </div>
        </div>
      </div>
      <p className={`text-text-secondary font-body ${textSizeClasses[size]}`}>{text}</p>
    </div>
  );
};

export default Loader;