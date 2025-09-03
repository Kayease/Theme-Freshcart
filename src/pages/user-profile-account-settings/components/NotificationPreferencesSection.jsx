import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: {
      email: true,
      push: true,
      sms: false
    },
    promotions: {
      email: true,
      push: false,
      sms: false
    },
    deliveryAlerts: {
      email: false,
      push: true,
      sms: true
    },
    productRecommendations: {
      email: true,
      push: false,
      sms: false
    },
    priceDrops: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleTogglePreference = (category, type) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
    setHasChanges(true);
  };

  const handleSavePreferences = () => {
    // API call to save preferences would go here
    console.log('Saving notification preferences:', preferences);
    setHasChanges(false);
  };

  const handleResetPreferences = () => {
    setPreferences({
      orderUpdates: {
        email: true,
        push: true,
        sms: false
      },
      promotions: {
        email: true,
        push: false,
        sms: false
      },
      deliveryAlerts: {
        email: false,
        push: true,
        sms: true
      },
      productRecommendations: {
        email: true,
        push: false,
        sms: false
      },
      priceDrops: {
        email: true,
        push: true,
        sms: false
      }
    });
    setHasChanges(false);
  };

  const notificationCategories = [
    {
      key: 'orderUpdates',
      title: 'Order Updates',
      description: 'Get notified about order confirmation, preparation, and delivery status',
      icon: 'Package'
    },
    {
      key: 'promotions',
      title: 'Promotions & Offers',
      description: 'Receive exclusive deals, discounts, and special offers',
      icon: 'Tag'
    },
    {
      key: 'deliveryAlerts',
      title: 'Delivery Alerts',
      description: 'Real-time notifications when your delivery is on the way',
      icon: 'Truck'
    },
    {
      key: 'productRecommendations',
      title: 'Product Recommendations',
      description: 'Personalized suggestions based on your shopping history',
      icon: 'Star'
    },
    {
      key: 'priceDrops',
      title: 'Price Drops',
      description: 'Alerts when items in your wishlist go on sale',
      icon: 'TrendingDown'
    }
  ];

  const notificationTypes = [
    { key: 'email', label: 'Email', icon: 'Mail' },
    { key: 'push', label: 'Push', icon: 'Bell' },
    { key: 'sms', label: 'SMS', icon: 'MessageSquare' }
  ];

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Notification Preferences
          </h2>
        </div>
        {hasChanges && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetPreferences}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePreferences}
              className="flex items-center space-x-2"
            >
              <Icon name="Check" size={16} />
              <span>Save Changes</span>
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {notificationCategories.map((category) => (
          <div key={category.key} className="border border-border rounded-card p-4">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-button flex items-center justify-center flex-shrink-0">
                <Icon name={category.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-heading font-semibold text-text-primary mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ml-11">
              {notificationTypes.map((type) => (
                <label
                  key={type.key}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences[category.key][type.key]}
                      onChange={() => handleTogglePreference(category.key, type.key)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                        preferences[category.key][type.key]
                          ? 'bg-primary border-primary' :'bg-surface border-border group-hover:border-primary'
                      }`}
                    >
                      {preferences[category.key][type.key] && (
                        <Icon name="Check" size={12} className="text-primary-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={type.icon} size={16} className="text-text-secondary" />
                    <span className="text-sm font-body text-text-primary">
                      {type.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-border/30 rounded-card">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-body font-medium text-text-primary mb-1">
              Notification Settings
            </p>
            <p className="text-sm text-text-secondary">
              You can manage your notification preferences at any time. Some critical notifications like order confirmations cannot be disabled for your account security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesSection;