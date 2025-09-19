// Razorpay configuration and utilities

export const RAZORPAY_CONFIG = {
  keyId: 'rzp_test_6v1Ce186CCWa3y',
  keySecret: 'OX9aV85it0rYG0avnOqOpCTd',
  currency: 'INR',
  name: 'FreshCart',
  description: 'Payment for FreshCart',
  theme: {
    color: '#3B82F6'
  }
};

// Razorpay script loader
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay instance
export const createRazorpayInstance = (options) => {
  return new window.Razorpay({
    key: RAZORPAY_CONFIG.keyId,
    currency: RAZORPAY_CONFIG.currency,
    name: RAZORPAY_CONFIG.name,
    description: RAZORPAY_CONFIG.description,
    theme: RAZORPAY_CONFIG.theme,
    ...options
  });
};

// Card validation utilities
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const luhnCheck = (num) => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  return /^\d{13,19}$/.test(cleaned) && luhnCheck(cleaned);
};

export const getCardType = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const firstDigit = cleaned.charAt(0);
  const firstTwoDigits = cleaned.substring(0, 2);

  if (firstDigit === '4') return 'visa';
  if (firstDigit === '5' || firstTwoDigits >= '22' && firstTwoDigits <= '27') return 'mastercard';
  if (firstTwoDigits === '34' || firstTwoDigits === '37') return 'amex';
  if (firstTwoDigits === '60' || firstTwoDigits === '65') return 'discover';
  if (firstTwoDigits >= '30' && firstTwoDigits <= '35') return 'diners';
  if (firstTwoDigits === '62') return 'unionpay';
  return 'unknown';
};

export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ').substring(0, 19);
};

export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month);
  const expYear = parseInt(year);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  if (expMonth < 1 || expMonth > 12) return false;

  return true;
};

export const validateCVV = (cvv, cardType) => {
  const cleaned = cvv.replace(/\D/g, '');
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleaned);
  }
  return /^\d{3}$/.test(cleaned);
};

// Mock Razorpay API calls (for demo purposes)
export const createRazorpayCustomer = async (customerData) => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        customerId: `cust_${Date.now()}`,
        data: customerData
      });
    }, 1000);
  });
};

export const createRazorpayCard = async (cardData) => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        cardId: `card_${Date.now()}`,
        data: cardData
      });
    }, 1000);
  });
};

export const deleteRazorpayCard = async (cardId) => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Card deleted successfully'
      });
    }, 1000);
  });
};

export default {
  RAZORPAY_CONFIG,
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
};
