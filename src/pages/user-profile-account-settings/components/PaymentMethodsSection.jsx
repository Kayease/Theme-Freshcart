import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodsSection = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      cardType: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      cardType: 'mastercard',
      lastFour: '5555',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentType, setPaymentType] = useState('card');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });

  const handleCardInputChange = (field, value) => {
    setCardForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPaymentMethod = () => {
    if (paymentType === 'card') {
      const newCard = {
        id: Date.now(),
        type: 'card',
        cardType: getCardType(cardForm.cardNumber),
        lastFour: cardForm.cardNumber.slice(-4),
        expiryMonth: cardForm.expiryMonth,
        expiryYear: cardForm.expiryYear,
        isDefault: paymentMethods.length === 0
      };
      setPaymentMethods(prev => [...prev, newCard]);
    }
    setShowAddForm(false);
    setCardForm({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: ''
    });
  };

  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    if (firstDigit === '3') return 'amex';
    return 'unknown';
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleSetDefaultPaymentMethod = (id) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Payment Methods
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Payment</span>
        </Button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-card p-4 ${
              method.isDefault ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-border rounded flex items-center justify-center">
                  {method.type === 'card' ? (
                    <Icon name={getCardIcon(method.cardType)} size={20} className="text-text-secondary" />
                  ) : (
                    <Icon name="Wallet" size={20} className="text-text-secondary" />
                  )}
                </div>
                <div>
                  {method.type === 'card' ? (
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-body font-medium text-text-primary capitalize">
                          {method.cardType}
                        </span>
                        <span className="text-sm text-text-secondary">
                          •••• {method.lastFour}
                        </span>
                        {method.isDefault && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-body font-medium text-text-primary">
                          PayPal
                        </span>
                        {method.isDefault && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {method.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefaultPaymentMethod(method.id)}
                    className="text-primary hover:bg-primary/10"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePaymentMethod(method.id)}
                  className="text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="mt-6 border border-border rounded-card p-4">
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Add Payment Method
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPaymentType('card')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${
                  paymentType === 'card' ?'border-primary bg-primary/10 text-primary' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="CreditCard" size={16} />
                <span>Credit/Debit Card</span>
              </button>
              <button
                onClick={() => setPaymentType('paypal')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${
                  paymentType === 'paypal' ?'border-primary bg-primary/10 text-primary' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Wallet" size={16} />
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {paymentType === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <Input
                  type="text"
                  value={cardForm.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  value={cardForm.cardholderName}
                  onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    Month
                  </label>
                  <select
                    value={cardForm.expiryMonth}
                    onChange={(e) => handleCardInputChange('expiryMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    Year
                  </label>
                  <select
                    value={cardForm.expiryYear}
                    onChange={(e) => handleCardInputChange('expiryYear', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = String(new Date().getFullYear() + i).slice(-2);
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    CVV
                  </label>
                  <Input
                    type="text"
                    value={cardForm.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentType === 'paypal' && (
            <div className="text-center py-8">
              <Icon name="Wallet" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary mb-4">
                You'll be redirected to PayPal to complete the setup
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddForm(false);
                setCardForm({
                  cardNumber: '',
                  expiryMonth: '',
                  expiryYear: '',
                  cvv: '',
                  cardholderName: ''
                });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddPaymentMethod}
            >
              Add Payment Method
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;