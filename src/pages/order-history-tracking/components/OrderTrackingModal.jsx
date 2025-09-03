import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderTrackingModal = ({ isOpen, onClose, orderId }) => {
  const [trackingData, setTrackingData] = useState(null);

  // Mock tracking data
  const mockTrackingData = {
    orderId: orderId,
    currentLocation: "Downtown Distribution Center",
    estimatedArrival: "2:30 PM",
    driverLocation: { lat: 40.7128, lng: -74.0060 },
    deliveryAddress: { lat: 40.7589, lng: -73.9851 },
    route: [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7300, lng: -73.9950 },
      { lat: 40.7450, lng: -73.9800 },
      { lat: 40.7589, lng: -73.9851 }
    ],
    updates: [
      {
        time: "1:45 PM",
        status: "Out for delivery",
        description: "Your order is on the way! Driver will arrive soon.",
        icon: "Truck"
      },
      {
        time: "1:30 PM",
        status: "Dispatched",
        description: "Order has been dispatched from our facility.",
        icon: "Package"
      },
      {
        time: "12:45 PM",
        status: "Prepared",
        description: "Your order has been prepared and packed.",
        icon: "CheckCircle"
      },
      {
        time: "12:15 PM",
        status: "Confirmed",
        description: "Order confirmed and being prepared.",
        icon: "CheckCircle2"
      }
    ]
  };

  useEffect(() => {
    if (isOpen && orderId) {
      // Simulate API call
      setTimeout(() => {
        setTrackingData(mockTrackingData);
      }, 500);
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading font-heading-bold text-xl text-text-primary">
              Track Order #{orderId}
            </h2>
            {trackingData && (
              <p className="text-sm text-text-secondary mt-1">
                Current location: {trackingData.currentLocation}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            size="sm"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {!trackingData ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-text-secondary">Loading tracking information...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ETA Card */}
              <div className="bg-primary text-primary-foreground rounded-card p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={24} />
                  <div>
                    <p className="font-heading font-heading-semibold text-lg">
                      Estimated Arrival
                    </p>
                    <p className="text-sm opacity-90">
                      {trackingData.estimatedArrival}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-border-light rounded-card p-4">
                <div className="aspect-video bg-border-light rounded-card flex items-center justify-center mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Order Tracking Map"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${trackingData.driverLocation.lat},${trackingData.driverLocation.lng}&z=14&output=embed`}
                    className="rounded-card"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">Driver Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-text-secondary">Delivery Address</span>
                  </div>
                </div>
              </div>

              {/* Tracking Updates */}
              <div>
                <h3 className="font-heading font-heading-semibold text-lg text-text-primary mb-4">
                  Tracking Updates
                </h3>
                <div className="space-y-4">
                  {trackingData.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index === 0 ? 'bg-primary text-primary-foreground' : 'bg-border text-text-secondary'
                      }`}>
                        <Icon name={update.icon} size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-body font-body-medium text-text-primary">
                            {update.status}
                          </p>
                          <span className="text-sm text-text-secondary">
                            {update.time}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          {trackingData && (
            <Button
              variant="primary"
              iconName="Phone"
              iconPosition="left"
            >
              Contact Driver
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;