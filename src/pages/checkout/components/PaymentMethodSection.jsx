import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PaymentMethodSection = ({ selectedPayment, onPaymentSelect }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'card',
      name: 'Credit Card',
      details: '**** **** **** 4532',
      brand: 'visa',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'card',
      name: 'Debit Card',
      details: '**** **** **** 8901',
      brand: 'mastercard',
      isDefault: false
    },
    {
      id: 'paypal',
      type: 'digital',
      name: 'PayPal',
      details: 'john.smith@email.com',
      brand: 'paypal',
      isDefault: false
    },
    {
      id: 'apple-pay',
      type: 'digital',
      name: 'Apple Pay',
      details: 'Touch ID or Face ID',
      brand: 'apple',
      isDefault: false
    },
    {
      id: 'cod',
      type: 'cash',
      name: 'Cash on Delivery',
      details: 'Pay when you receive',
      brand: 'cash',
      isDefault: false
    }
  ];

  const handleInputChange = (field, value) => {
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.expiryDate && newCard.cvv && newCard.cardholderName) {
      const cardToAdd = {
        id: `card-${Date.now()}`,
        type: 'card',
        name: 'Credit Card',
        details: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
        brand: 'visa',
        isDefault: false
      };
      
      setShowAddCard(false);
      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        saveCard: false
      });
    }
  };

  const getPaymentIcon = (brand) => {
    switch (brand) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'paypal': return 'Wallet';
      case 'apple': return 'Smartphone';
      case 'cash': return 'Banknote';
      default: return 'CreditCard';
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
          Payment Method
        </h3>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddCard(!showAddCard)}
        >
          Add Card
        </Button>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-card p-4 cursor-pointer transition-smooth ${
              selectedPayment?.id === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onPaymentSelect(method)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-button ${
                  selectedPayment?.id === method.id ? 'bg-primary text-primary-foreground' : 'bg-border-light'
                }`}>
                  <Icon name={getPaymentIcon(method.brand)} size={16} />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-body font-body-medium text-text-primary">
                      {method.name}
                    </span>
                    {method.isDefault && (
                      <span className="bg-success text-success-foreground text-xs font-caption px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {method.details}
                  </p>
                </div>
              </div>
              
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment?.id === method.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedPayment?.id === method.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Card Form */}
      {showAddCard && (
        <div className="border border-border rounded-card p-4 bg-border-light">
          <h4 className="font-body font-body-medium text-text-primary mb-4">
            Add New Card
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Cardholder Name *
              </label>
              <Input
                type="text"
                placeholder="John Smith"
                value={newCard.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Card Number *
              </label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(newCard.cardNumber)}
                onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                maxLength="19"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-caption text-text-secondary mb-2">
                  Expiry Date *
                </label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={formatExpiryDate(newCard.expiryDate)}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value.replace(/\D/g, ''))}
                  maxLength="5"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-caption text-text-secondary mb-2">
                  CVV *
                </label>
                <Input
                  type="text"
                  placeholder="123"
                  value={newCard.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  maxLength="4"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                checked={newCard.saveCard}
                onChange={(e) => handleInputChange('saveCard', e.target.checked)}
              />
              <label className="text-sm font-caption text-text-secondary">
                Save this card for future purchases
              </label>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <Button variant="primary" onClick={handleAddCard}>
              Add Card
            </Button>
            <Button variant="outline" onClick={() => setShowAddCard(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center space-x-2 mt-4 p-3 bg-success/10 border border-success/20 rounded-card">
        <Icon name="Shield" size={16} className="text-success" />
        <p className="text-sm text-success font-caption">
          Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodSection;