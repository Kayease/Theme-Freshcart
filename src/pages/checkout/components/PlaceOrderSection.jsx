import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PlaceOrderSection = ({ 
  selectedAddress, 
  selectedTimeSlot, 
  selectedPayment, 
  total, 
  onPlaceOrder 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedTimeSlot || !selectedPayment || !acceptedTerms) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder();
      navigate('/order-history-tracking');
    }, 3000);
  };

  const isOrderReady = selectedAddress && selectedTimeSlot && selectedPayment && acceptedTerms;

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-6">
        Place Your Order
      </h3>

      {/* Order Validation */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            selectedAddress ? 'bg-success text-success-foreground' : 'bg-border text-text-secondary'
          }`}>
            {selectedAddress ? (
              <Icon name="Check" size={12} />
            ) : (
              <Icon name="MapPin" size={12} />
            )}
          </div>
          <span className={`text-sm font-caption ${
            selectedAddress ? 'text-success' : 'text-text-secondary'
          }`}>
            Delivery address selected
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            selectedTimeSlot ? 'bg-success text-success-foreground' : 'bg-border text-text-secondary'
          }`}>
            {selectedTimeSlot ? (
              <Icon name="Check" size={12} />
            ) : (
              <Icon name="Clock" size={12} />
            )}
          </div>
          <span className={`text-sm font-caption ${
            selectedTimeSlot ? 'text-success' : 'text-text-secondary'
          }`}>
            Delivery time selected
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            selectedPayment ? 'bg-success text-success-foreground' : 'bg-border text-text-secondary'
          }`}>
            {selectedPayment ? (
              <Icon name="Check" size={12} />
            ) : (
              <Icon name="CreditCard" size={12} />
            )}
          </div>
          <span className={`text-sm font-caption ${
            selectedPayment ? 'text-success' : 'text-text-secondary'
          }`}>
            Payment method selected
          </span>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <Input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
          />
          <div className="text-sm text-text-secondary font-caption">
            I agree to the{' '}
            <button className="text-primary hover:underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button className="text-primary hover:underline">
              Privacy Policy
            </button>
            . I understand that my order will be processed according to these terms.
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 mb-6 p-3 bg-success/10 border border-success/20 rounded-card">
        <Icon name="Shield" size={16} className="text-success" />
        <p className="text-sm text-success font-caption">
          Your order is protected by SSL encryption
        </p>
      </div>

      {/* Total and Place Order Button */}
      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-body font-body-semibold text-text-primary">
            Total Amount
          </span>
          <span className="text-2xl font-data font-data-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handlePlaceOrder}
          disabled={!isOrderReady || isProcessing}
          loading={isProcessing}
          iconName={isProcessing ? undefined : "ShoppingBag"}
          iconPosition="left"
        >
          {isProcessing ? 'Processing Order...' : 'Place Order'}
        </Button>

        {!isOrderReady && (
          <p className="text-sm text-error font-caption mt-2 text-center">
            Please complete all required steps above
          </p>
        )}
      </div>

      {/* Order Processing Message */}
      {isProcessing && (
        <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-card">
          <div className="flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-body font-body-medium text-primary">
                Processing your order...
              </p>
              <p className="text-xs text-primary/80 font-caption">
                Please don't close this page
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderSection;