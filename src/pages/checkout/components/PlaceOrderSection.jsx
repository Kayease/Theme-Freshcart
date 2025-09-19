import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const PlaceOrderSection = ({
  selectedAddress,
  selectedTimeSlot,
  total,
  onPlaceOrder
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { user, toast } = useAuth();


  const handlePlaceOrder = async () => {
    console.log('[Checkout] Proceed to Payment clicked');
    if (!selectedAddress || !selectedTimeSlot || !acceptedTerms) {
      console.log('[Checkout] Blocked: missing selections', { selectedAddress: !!selectedAddress, selectedTimeSlot: !!selectedTimeSlot, acceptedTerms });
      return;
    }

    if (total <= 0) {
      toast?.error?.('Total must be greater than 0');
      return;
    }
    setIsProcessing(true);

    // Minimal from-scratch Razorpay integration using global script
    console.log('[Checkout] Total to charge (display):', total);
    if (!window.Razorpay) {
      console.error('[Checkout] window.Razorpay not available');
      setIsProcessing(false);
      toast?.error?.('Payment could not start. Refresh and try again.');
      return;
    }

    const amountPaise = Math.round(total * 100);
    console.log('[Checkout] Amount in paise:', amountPaise);
    const options = {
      key: 'rzp_test_6v1Ce186CCWa3y',
      currency: 'INR',
      amount: amountPaise,
      name: 'FreshCart',
      image: '/favicon.ico',
      description: 'Order Payment',
      config: {
        display: {
          blocks: {
            upi_block: {
              name: 'UPI',
              instruments: [
                { method: 'upi' },
                { method: 'upi_qr' }
              ]
            }
          },
          sequence: ['block.upi_block'],
          preferences: {
            show_default_blocks: false
          }
        }
      },
      handler: function (response) {
        console.log('[Checkout] Razorpay success handler response:', response);
        onPlaceOrder({
          payment: {
            provider: 'razorpay',
            paymentId: response?.razorpay_payment_id,
            amount: amountPaise
          }
        });
        navigate('/order-history-tracking');
      },
      modal: {
        ondismiss: function () {
          console.warn('[Checkout] Razorpay modal dismissed');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: user?.name || user?.fullName || 'FreshCart User',
        email: user?.email || 'user@example.com'
      },
      theme: { color: '#16a34a' }
    };

    try {
      console.log('[Checkout] Creating Razorpay instance with options:', { ...options, handler: !!options.handler, modal: !!options.modal });
      const rzp = new window.Razorpay(options);
      console.log('[Checkout] Opening Razorpay modal...');
      rzp.open();
    } catch (e) {
      console.error('[Checkout] Error opening Razorpay:', e);
      setIsProcessing(false);
      toast?.error?.('Unable to open payment window.');
    }
  };

  const isOrderReady = selectedAddress && selectedTimeSlot && acceptedTerms;

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-6 hidden lg:block">
        Place Your Order
      </h3>

      {/* Order Validation */}
      <div className="space-y-3 mb-6 hidden lg:block">
        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedAddress ? 'bg-success text-success-foreground' : 'bg-border text-text-secondary'
            }`}>
            {selectedAddress ? (
              <Icon name="Check" size={12} />
            ) : (
              <Icon name="MapPin" size={12} />
            )}
          </div>
          <span className={`text-sm font-caption ${selectedAddress ? 'text-success' : 'text-text-secondary'
            }`}>
            Delivery address selected
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedTimeSlot ? 'bg-success text-success-foreground' : 'bg-border text-text-secondary'
            }`}>
            {selectedTimeSlot ? (
              <Icon name="Check" size={12} />
            ) : (
              <Icon name="Clock" size={12} />
            )}
          </div>
          <span className={`text-sm font-caption ${selectedTimeSlot ? 'text-success' : 'text-text-secondary'
            }`}>
            Delivery time selected
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
            <button onClick={() => navigate('/terms')} className="text-primary hover:underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button onClick={() => navigate('/privacy')} className="text-primary hover:underline">
              Privacy Policy.
            </button>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 mb-6 p-3 bg-success/10 border border-success/20 rounded-card hidden lg:flex">
        <Icon name="Shield" size={16} className="text-success" />
        <p className="text-sm text-success font-caption">
          Your order is protected by SSL encryption
        </p>
      </div>

      {/* Total and Proceed to Payment */}
      <div className="border-t border-border pt-4 ">
        <div className="flex justify-between items-center mb-4 hidden lg:block">
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
          iconName={isProcessing ? undefined : "CreditCard"}
          iconPosition="left"
        >
          {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
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