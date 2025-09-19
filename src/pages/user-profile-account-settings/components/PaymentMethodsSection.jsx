import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';
import paymentStorage from '../../../utils/paymentStorage';
import {
  loadRazorpayScript,
  createRazorpayInstance,
  validateCardNumber,
  getCardType,
  formatCardNumber,
  validateExpiryDate,
  validateCVV,
  createRazorpayCustomer,
  createRazorpayCard,
  deleteRazorpayCard
} from '../../../utils/razorpayConfig';

const PaymentMethodsSection = () => {
  const { toast } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  // Helpers
  const sortMethods = (list) => {
    return [...list].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
    });
  };
  const setMethodsSorted = (list) => setPaymentMethods(sortMethods(list));
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentType, setPaymentType] = useState('card');
  const [formData, setFormData] = useState({
    // Card
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    // PayPal
    email: '',
    // UPI
    upiId: '',
    // Netbanking
    bank: '',
    // Wallets
    walletProvider: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // OTP verification modal state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpStep, setOtpStep] = useState('start'); // start | otp
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpGenerated, setOtpGenerated] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [otpBusy, setOtpBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'add' } | { type: 'delete', id }

  // Load payment methods from local storage
  useEffect(() => {
    const storedPaymentMethods = paymentStorage.getStoredPaymentMethods();
    setMethodsSorted(storedPaymentMethods);
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript();
      setRazorpayLoaded(loaded);
    };
    loadScript();
  }, []);

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '');
    } else if (field === 'cardholderName') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (paymentType === 'card') {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
      } else if (!validateCardNumber(formData.cardNumber)) {
        errors.cardNumber = 'Invalid card number';
      }

      if (!formData.cardholderName.trim()) {
        errors.cardholderName = 'Cardholder name is required';
      } else if (formData.cardholderName.trim().length < 2) {
        errors.cardholderName = 'Cardholder name must be at least 2 characters';
      }

      if (!formData.expiryMonth) {
        errors.expiryMonth = 'Expiry month is required';
      }

      if (!formData.expiryYear) {
        errors.expiryYear = 'Expiry year is required';
      }

      if (formData.expiryMonth && formData.expiryYear) {
        if (!validateExpiryDate(formData.expiryMonth, formData.expiryYear)) {
          errors.expiryDate = 'Card has expired';
        }
      }

      if (!formData.cvv.trim()) {
        errors.cvv = 'CVV is required';
      } else {
        const cardType = getCardType(formData.cardNumber);
        if (!validateCVV(formData.cvv, cardType)) {
          errors.cvv = `Invalid CVV (${cardType === 'amex' ? '4 digits' : '3 digits'})`;
        }
      }
    } else if (paymentType === 'paypal') {
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Invalid email format';
      }
    } else if (paymentType === 'upi') {
      if (!formData.upiId.trim()) {
        errors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9_.-]{2,}@[a-zA-Z]{2,}$/.test(formData.upiId.trim())) {
        errors.upiId = 'Enter a valid UPI ID (e.g., name@bank)';
      }
    } else if (paymentType === 'netbanking') {
      if (!formData.bank) {
        errors.bank = 'Please select a bank';
      }
    } else if (paymentType === 'wallet') {
      if (!formData.walletProvider) {
        errors.walletProvider = 'Please select a wallet';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const startOtpVerification = (action) => {
    // Preserve any existing action object; normalize strings to object form
    const normalized = typeof action === 'string' ? { type: action } : action;
    setPendingAction(normalized);
    setOtpOpen(true);
    setOtpStep('start');
    setOtpEmail('');
    setOtpCode('');
    setOtpGenerated('');
    setOtpMessage('');
  };

  const handleAddPaymentMethod = async () => {
    if (!validateForm()) return;

    if (paymentType === 'card') {
      if (!razorpayLoaded) {
        toast.error('Payment system is loading. Please try again.');
        return;
      }
      startOtpVerification({ type: 'add' });
    } else {
      // UPI, Netbanking, Wallet, PayPal use OTP then save locally
      startOtpVerification({ type: 'add' });
    }
  };

  const handleDeletePaymentMethod = (id) => {
    startOtpVerification({ type: 'delete', id });
  };

  const handleSetDefaultPaymentMethod = (id) => {
    const success = paymentStorage.setDefaultPaymentMethod(id);
    if (success) {
      const updatedPaymentMethods = paymentStorage.getStoredPaymentMethods();
      setMethodsSorted(updatedPaymentMethods);
      toast.success('Default payment method updated successfully');
    } else {
      toast.error('Failed to update default payment method');
    }
  };

  // Optional: lightweight Razorpay method verification for non-card types in test mode
  const runRazorpayVerification = () => {
    return new Promise((resolve) => {
      if (!razorpayLoaded) { resolve(true); return; }
      const instance = createRazorpayInstance({
        amount: 100, // INR 1.00 in paise, test verification only
        notes: { purpose: 'method_verification' },
        modal: { ondismiss: () => resolve(false) },
        handler: () => resolve(true),
        prefill: {
          email: otpEmail || 'user@example.com',
          name: formData.cardholderName || 'User'
        }
      });
      try { instance.open(); } catch { resolve(true); }
    });
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;

    if (pendingAction.type === 'add') {
      setSubmitting(true);
      try {
    if (paymentType === 'card') {
          // Create Razorpay customer if not exists
          let customerId = paymentStorage.getRazorpayCustomerId();
          if (!customerId) {
            const customerResult = await createRazorpayCustomer({
              name: formData.cardholderName,
              email: 'user@example.com'
            });
            if (customerResult.success) {
              customerId = customerResult.customerId;
              paymentStorage.setRazorpayCustomerId(customerId);
            }
          }
          // Create Razorpay card
          const cardResult = await createRazorpayCard({
            customerId,
            cardNumber: formData.cardNumber.replace(/\s/g, ''),
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear,
            cvv: formData.cvv,
            cardholderName: formData.cardholderName
          });
          if (!cardResult.success) throw new Error('Card creation failed');
          const newPaymentMethod = {
        type: 'card',
            cardType: getCardType(formData.cardNumber),
            lastFour: formData.cardNumber.replace(/\s/g, '').slice(-4),
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear,
            cardholderName: formData.cardholderName,
            razorpayCardId: cardResult.cardId,
        isDefault: paymentMethods.length === 0
      };
          const addedMethod = paymentStorage.addStoredPaymentMethod(newPaymentMethod);
          if (!addedMethod) throw new Error('Failed to save payment method');
          // Make newly added method default and move to top
          const list = paymentStorage.getStoredPaymentMethods();
          const updatedMarked = list.map(m => ({ ...m, isDefault: m.id === addedMethod.id }));
          paymentStorage.setStoredPaymentMethods(updatedMarked);
        } else if (paymentType === 'paypal') {
          toast.info('PayPal method coming soon');
          setSubmitting(false);
          setPendingAction(null);
          setOtpOpen(false);
          return;
        } else if (paymentType === 'upi') {
          toast.info('UPI method coming soon');
          setSubmitting(false);
          setPendingAction(null);
          setOtpOpen(false);
          return;
        } else if (paymentType === 'netbanking') {
          toast.info('Netbanking method coming soon');
          setSubmitting(false);
          setPendingAction(null);
          setOtpOpen(false);
          return;
        } else if (paymentType === 'wallet') {
          toast.info('Wallets method coming soon');
          setSubmitting(false);
          setPendingAction(null);
          setOtpOpen(false);
          return;
        }

        const updatedPaymentMethods = paymentStorage.getStoredPaymentMethods();
        setMethodsSorted(updatedPaymentMethods);
        resetForm();
        toast.success('Payment method added successfully');
      } catch (error) {
        toast.error('An error occurred while adding payment method');
      } finally {
        setSubmitting(false);
      }
    } else if (pendingAction.type === 'delete') {
      setSubmitting(true);
      try {
        const paymentMethod = paymentMethods.find(method => method.id === pendingAction.id);
        if (paymentMethod?.razorpayCardId) {
          await deleteRazorpayCard(paymentMethod.razorpayCardId);
        }

        const success = paymentStorage.deleteStoredPaymentMethod(pendingAction.id);
        if (success) {
          const updatedPaymentMethods = paymentStorage.getStoredPaymentMethods();
          setMethodsSorted(updatedPaymentMethods);
          toast.success('Payment method deleted successfully');
        } else {
          toast.error('Failed to delete payment method');
        }
      } catch (error) {
        toast.error('An error occurred while deleting payment method');
      } finally {
        setSubmitting(false);
      }
    }

    setPendingAction(null);
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      email: '',
      upiId: '',
      bank: '',
      walletProvider: ''
    });
    setFormErrors({});
    setShowAddForm(false);
  };

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      case 'discover': return 'CreditCard';
      case 'diners': return 'CreditCard';
      case 'unionpay': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  const getCardBrandColor = (cardType) => {
    switch (cardType) {
      case 'visa': return 'text-blue-600';
      case 'mastercard': return 'text-red-600';
      case 'amex': return 'text-green-600';
      case 'discover': return 'text-orange-600';
      case 'diners': return 'text-purple-600';
      case 'unionpay': return 'text-indigo-600';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods List */}
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
            disabled={!razorpayLoaded}
        >
          <Icon name="Plus" size={16} />
          <span>Add Payment</span>
        </Button>
      </div>

        {!razorpayLoaded && (
          <div className="text-center py-4">
            <div className="flex items-center justify-center space-x-2 text-text-secondary">
              <Icon name="Loader" size={16} className="animate-spin" />
              <span>Loading payment system...</span>
            </div>
          </div>
        )}

        {razorpayLoaded && paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No payment methods added yet</p>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 mx-auto"
            >
              <Icon name="Plus" size={16} />
              <span>Add Your First Payment Method</span>
            </Button>
          </div>
        ) : (
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
                className={`border rounded-card p-4 ${method.isDefault ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-border rounded flex items-center justify-center">
                      {method.type === 'card' && (
                        <Icon name={getCardIcon(method.cardType)} size={20} className={getCardBrandColor(method.cardType)} />
                      )}
                      {method.type === 'paypal' && (
                        <Icon name="Wallet" size={20} className="text-text-secondary" />
                      )}
                      {method.type === 'upi' && (
                        <Icon name="Smartphone" size={20} className="text-text-secondary" />
                      )}
                      {method.type === 'netbanking' && (
                        <Icon name="Banknote" size={20} className="text-text-secondary" />
                      )}
                      {method.type === 'wallet' && (
                    <Icon name="Wallet" size={20} className="text-text-secondary" />
                  )}
                </div>
                <div>
                      {method.type === 'card' && (
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
                            {method.cardholderName} • Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                      )}
                      {method.type === 'paypal' && (
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
                      {method.type === 'upi' && (
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-body font-medium text-text-primary">
                              UPI
                            </span>
                            {method.isDefault && (
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">
                            {method.upiId}
                          </p>
                        </div>
                      )}
                      {method.type === 'netbanking' && (
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-body font-medium text-text-primary">
                              Netbanking
                            </span>
                            {method.isDefault && (
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary capitalize">
                            {method.bank}
                          </p>
                        </div>
                      )}
                      {method.type === 'wallet' && (
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-body font-medium text-text-primary">
                              Wallet
                            </span>
                            {method.isDefault && (
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary capitalize">
                            {method.walletProvider}
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
                        className="text-primary hover:bg-primary hover:text-primary-foreground"
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
        )}
      </div>

      {/* Add Payment Method Form */}
      {showAddForm && (
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Add Payment Method
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPaymentType('card')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${paymentType === 'card'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="CreditCard" size={16} />
                <span>Credit/Debit Card</span>
              </button>
              <button
                onClick={() => setPaymentType('paypal')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${paymentType === 'paypal'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Wallet" size={16} />
                <span>PayPal</span>
              </button>
              <button
                onClick={() => setPaymentType('upi')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${paymentType === 'upi'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
              >
                <Icon name="Smartphone" size={16} />
                <span>UPI</span>
              </button>
              <button
                onClick={() => setPaymentType('netbanking')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${paymentType === 'netbanking'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
              >
                <Icon name="Banknote" size={16} />
                <span>Netbanking</span>
              </button>
              <button
                onClick={() => setPaymentType('wallet')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-button border ${paymentType === 'wallet'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
              >
                <Icon name="Wallet" size={16} />
                <span>Wallets</span>
              </button>
            </div>
          </div>

          {paymentType === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Card Number *
                </label>
                <Input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={formErrors.cardNumber ? 'border-red-500' : ''}
                />
                {formErrors.cardNumber && (
                  <p className="mt-1 text-sm text-error">{formErrors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Cardholder Name *
                </label>
                <Input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className={formErrors.cardholderName ? 'border-red-500' : ''}
                />
                {formErrors.cardholderName && (
                  <p className="mt-1 text-sm text-error">{formErrors.cardholderName}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    Month *
                  </label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${formErrors.expiryMonth || formErrors.expiryDate ? 'border-red-500' : 'border-border'
                      }`}
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  {(formErrors.expiryMonth || formErrors.expiryDate) && (
                    <p className="mt-1 text-sm text-error">{formErrors.expiryMonth || formErrors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    Year *
                  </label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${formErrors.expiryYear || formErrors.expiryDate ? 'border-red-500' : 'border-border'
                      }`}
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
                  {(formErrors.expiryYear || formErrors.expiryDate) && (
                    <p className="mt-1 text-sm text-error">{formErrors.expiryYear || formErrors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    CVV *
                  </label>
                  <Input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength="4"
                    className={formErrors.cvv ? 'border-red-500' : ''}
                  />
                  {formErrors.cvv && (
                    <p className="mt-1 text-sm text-error">{formErrors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {paymentType === 'paypal' && (
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  PayPal Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                )}
              </div> */}
              <div className="text-center py-4">
                <Icon name="Wallet" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  PayPal method coming soon
                </p>
              </div>
            </div>
          )}

          {paymentType === 'upi' && (
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  UPI ID *
                </label>
                <Input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => handleInputChange('upiId', e.target.value)}
                  placeholder="username@bank"
                  className={formErrors.upiId ? 'border-red-500' : ''}
                />
                {formErrors.upiId && (
                  <p className="mt-1 text-sm text-error">{formErrors.upiId}</p>
                )}
              </div> */}

              <div className="text-center py-4">
                <Icon name="Smartphone" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  BHIM UPI, Google Pay, PhonePe, Paytm and more coming soon.
                </p>
              </div>

            </div>
          )}

          {paymentType === 'netbanking' && (
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Select Bank *
                </label>
                <select
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${formErrors.bank ? 'border-red-500' : 'border-border'
                    }`}
                >
                  <option value="">Choose your bank</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="yes">YES Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                  <option value="bob">Bank of Baroda</option>
                </select>
                {formErrors.bank && (
                  <p className="mt-1 text-sm text-error">{formErrors.bank}</p>
                )}
              </div> */}
              <div className="text-center py-4">
                <Icon name="Banknote" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  Netbanking method coming soon
                </p>
              </div>
            </div>
          )}

          {paymentType === 'wallet' && (
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Select Wallet *
                </label>
                <select
                  value={formData.walletProvider}
                  onChange={(e) => handleInputChange('walletProvider', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${formErrors.walletProvider ? 'border-red-500' : 'border-border'
                    }`}
                >
                  <option value="">Choose wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="amazonpay">Amazon Pay</option>
                  <option value="mobikwik">MobiKwik</option>
                  <option value="freecharge">Freecharge</option>
                </select>
                {formErrors.walletProvider && (
                  <p className="mt-1 text-sm text-error">{formErrors.walletProvider}</p>
                )}
              </div> */}
              <div className="text-center py-4">
                <Icon name="Wallet" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  Wallets method coming soon
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddPaymentMethod}
              loading={submitting}
              disabled={submitting || !razorpayLoaded || paymentType === 'paypal' || paymentType === 'upi' || paymentType === 'netbanking' || paymentType === 'wallet'}
            >
              Add Payment Method
            </Button>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {otpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { if (!otpBusy) setOtpOpen(false); }}></div>
          <div className="relative bg-surface border border-border rounded-card shadow-modal w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">Verify Your Email</h3>
              <button onClick={() => { if (!otpBusy) setOtpOpen(false); }} className="text-text-secondary hover:text-text-primary" aria-label="Close">
                <Icon name="X" size={16} />
              </button>
            </div>
            {otpStep === 'start' && (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">To add this payment method, please confirm your email address.</p>
                <Input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => { setOtpEmail(e.target.value.trim()); if (otpMessage) setOtpMessage(''); }}
                  placeholder="your@email.com"
                />
                {otpMessage && <p className="text-sm text-destructive">{otpMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOtpOpen(false)} disabled={otpBusy}>Cancel</Button>
                  <Button onClick={() => {
                    if (!otpEmail.trim()) { setOtpMessage('Please enter your email'); return; }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otpEmail.trim())) { setOtpMessage('Please enter a valid email'); return; }
                    setOtpBusy(true);
                    setTimeout(() => {
                      const otp = String(Math.floor(100000 + Math.random() * 900000));
                      setOtpGenerated(otp);
                      setOtpStep('otp');
                      setOtpMessage('');
                      setOtpBusy(false);
                      toast.info('Demo OTP generated (shown in modal)');
                    }, 800);
                  }} disabled={otpBusy}>
                    {otpBusy ? (
                      <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Sending...</span>
                    ) : 'Send OTP'}
                  </Button>
                </div>
              </div>
            )}
            {otpStep === 'otp' && (
              <div className="space-y-4">
                <div className="p-3 bg-border-light border border-border rounded-card text-sm">
                  Demo OTP (theme only): <span className="font-body-medium">{otpGenerated}</span>
                </div>
                <Input type="text" value={otpCode} onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); if (otpMessage) setOtpMessage(''); }} placeholder="Enter 6-digit OTP" maxLength="6" />
                {otpMessage && <p className="text-sm text-destructive">{otpMessage}</p>}
                <div className="flex justify-between">
                  <button className="text-xs text-primary hover:underline" onClick={() => { const otp = String(Math.floor(100000 + Math.random() * 900000)); setOtpGenerated(otp); }}>Resend OTP</button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setOtpOpen(false)} disabled={otpBusy}>Cancel</Button>
                    <Button onClick={() => {
                      if (otpCode !== otpGenerated) { setOtpMessage('Invalid OTP. Please try again.'); return; }
                      setOtpBusy(true);
                      setTimeout(() => {
                        setOtpBusy(false);
                        setOtpOpen(false);
                        executePendingAction();
                      }, 500);
                    }} disabled={otpBusy || otpCode.length !== 6}>
                      {otpBusy ? (
                        <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Verifying...</span>
                      ) : 'Verify & Save'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;