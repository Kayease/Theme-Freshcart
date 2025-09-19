// Local storage helpers for payment methods

const PAYMENT_KEYS = {
  paymentMethods: 'paymentMethods',
  razorpayCustomerId: 'razorpayCustomerId'
};

export function getStoredPaymentMethods() {
  try {
    const raw = localStorage.getItem(PAYMENT_KEYS.paymentMethods);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setStoredPaymentMethods(paymentMethods) {
  try {
    localStorage.setItem(PAYMENT_KEYS.paymentMethods, JSON.stringify(paymentMethods));
    return true;
  } catch (e) {
    return false;
  }
}

export function addStoredPaymentMethod(paymentMethod) {
  try {
    const paymentMethods = getStoredPaymentMethods();
    const newPaymentMethod = {
      ...paymentMethod,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPaymentMethods = [...paymentMethods, newPaymentMethod];
    setStoredPaymentMethods(updatedPaymentMethods);
    return newPaymentMethod;
  } catch (e) {
    return null;
  }
}

export function updateStoredPaymentMethod(paymentMethodId, updates) {
  try {
    const paymentMethods = getStoredPaymentMethods();
    const updatedPaymentMethods = paymentMethods.map(method => 
      method.id === paymentMethodId 
        ? { ...method, ...updates, updatedAt: new Date().toISOString() }
        : method
    );
    setStoredPaymentMethods(updatedPaymentMethods);
    return updatedPaymentMethods.find(method => method.id === paymentMethodId);
  } catch (e) {
    return null;
  }
}

export function deleteStoredPaymentMethod(paymentMethodId) {
  try {
    const paymentMethods = getStoredPaymentMethods();
    const updatedPaymentMethods = paymentMethods.filter(method => method.id !== paymentMethodId);
    setStoredPaymentMethods(updatedPaymentMethods);
    return true;
  } catch (e) {
    return false;
  }
}

export function setDefaultPaymentMethod(paymentMethodId) {
  try {
    const paymentMethods = getStoredPaymentMethods();
    const updatedPaymentMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === paymentMethodId,
      updatedAt: new Date().toISOString()
    }));
    setStoredPaymentMethods(updatedPaymentMethods);
    return true;
  } catch (e) {
    return false;
  }
}

export function getRazorpayCustomerId() {
  try {
    return localStorage.getItem(PAYMENT_KEYS.razorpayCustomerId);
  } catch (e) {
    return null;
  }
}

export function setRazorpayCustomerId(customerId) {
  try {
    localStorage.setItem(PAYMENT_KEYS.razorpayCustomerId, customerId);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  getStoredPaymentMethods,
  setStoredPaymentMethods,
  addStoredPaymentMethod,
  updateStoredPaymentMethod,
  deleteStoredPaymentMethod,
  setDefaultPaymentMethod,
  getRazorpayCustomerId,
  setRazorpayCustomerId
};
