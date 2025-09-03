import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PromoCodeInput = ({ onApplyPromoCode, appliedPromoCode, promoDiscount }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setMessage('Please enter a promo code');
      setMessageType('error');
      return;
    }

    setIsApplying(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      const result = onApplyPromoCode(promoCode.trim().toUpperCase());
      
      if (result.success) {
        setMessage(`Promo code applied! You saved $${result.discount.toFixed(2)}`);
        setMessageType('success');
        setPromoCode('');
      } else {
        setMessage(result.message || 'Invalid promo code');
        setMessageType('error');
      }
      
      setIsApplying(false);
    }, 1000);
  };

  const handleRemovePromoCode = () => {
    onApplyPromoCode('', true); // Remove promo code
    setMessage('');
    setMessageType('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromoCode();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-4">
      <h3 className="font-body font-body-medium text-text-primary mb-3 flex items-center gap-2">
        <Icon name="Tag" size={18} />
        Promo Code
      </h3>

      {!appliedPromoCode ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                disabled={isApplying}
                className="uppercase"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleApplyPromoCode}
              disabled={isApplying || !promoCode.trim()}
              loading={isApplying}
            >
              Apply
            </Button>
          </div>

          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-button text-sm ${
              messageType === 'success' ?'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
            }`}>
              <Icon 
                name={messageType === 'success' ? "CheckCircle" : "AlertCircle"} 
                size={16} 
              />
              <span className="font-caption">{message}</span>
            </div>
          )}

          {/* Available Promo Codes Hint */}
          <div className="bg-border-light rounded-button p-3">
            <p className="text-xs font-caption text-text-secondary mb-2">Available offers:</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-data font-data-medium text-primary">SAVE10</span>
                <span className="text-xs font-caption text-text-secondary">10% off on orders above $50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-data font-data-medium text-primary">FRESH20</span>
                <span className="text-xs font-caption text-text-secondary">$20 off on orders above $100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-data font-data-medium text-primary">NEWUSER</span>
                <span className="text-xs font-caption text-text-secondary">15% off for new customers</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-button">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div>
              <span className="font-data font-data-medium text-success">{appliedPromoCode}</span>
              <p className="text-xs font-caption text-success">
                You saved ${promoDiscount.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleRemovePromoCode}
            className="text-error hover:text-error"
            iconName="X"
            iconSize={14}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;