import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import profileStorage from '../utils/profileStorage';
import ToastContainer from '../components/ui/ToastContainer';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Cart state and functions
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Derived state for cart and wishlist counts
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const wishlistCount = wishlist.length;
  const navigate = useNavigate();
  const toast = useToast();

  const refreshUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const baseUser = JSON.parse(storedUser);
        const storedProfile = profileStorage.getStoredProfile();
        const merged = storedProfile ? { ...baseUser, ...storedProfile } : baseUser;
        setUser(merged);
        localStorage.setItem('user', JSON.stringify(merged));
      }
    } catch {}
  };

  // Check if user is logged in on mount and load cart/wishlist data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const baseUser = JSON.parse(storedUser);
        // Merge with profile storage if present (avatar and details overrides)
        const storedProfile = profileStorage.getStoredProfile();
        const merged = storedProfile ? { ...baseUser, ...storedProfile } : baseUser;
        setUser(merged);
        if (storedProfile) {
          localStorage.setItem('user', JSON.stringify(merged));
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }

    // Load cart from localStorage (works for both guest and logged-in users)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }

    // Load wishlist from localStorage (works for both guest and logged-in users)
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('wishlist');
      }
    }

    const onProfileUpdated = () => refreshUserFromStorage();
    window.addEventListener('profile:updated', onProfileUpdated);
    window.addEventListener('storage', onProfileUpdated);

    setLoading(false);
    return () => {
      window.removeEventListener('profile:updated', onProfileUpdated);
      window.removeEventListener('storage', onProfileUpdated);
    };
  }, []);
  
  // Order history management
  const addOrder = (orderDetails) => {
    if (!user) return;
    
    setUser(prevUser => {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...orderDetails
      };
      
      const updatedUser = {
        ...prevUser,
        orderHistory: [...(prevUser.orderHistory || []), newOrder]
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Order placed successfully!');
      
      // Clear cart after successful order
      setCart([]);
      localStorage.removeItem('cart');
      
      return updatedUser;
    });
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlist]);

  const login = async (email, password) => {
    try {
      const registeredUserRaw = localStorage.getItem('registeredUser');
      if (!registeredUserRaw) {
        toast.info('No account found. Please register.');
        navigate('/auth/signup');
        return { success: false, error: 'User not registered' };
      }
      const registeredUser = JSON.parse(registeredUserRaw);
      if (registeredUser.email === email && registeredUser.password === password) {
        const sessionUser = { ...registeredUser };
        delete sessionUser.password;
        // Merge profile storage fields
        const storedProfile = profileStorage.getStoredProfile();
        const merged = storedProfile ? { ...sessionUser, ...storedProfile } : sessionUser;
        setUser(merged);
        localStorage.setItem('user', JSON.stringify(merged));
        toast.success('Login successful! Welcome back.');
        navigate('/home-dashboard-1');
        return { success: true };
      }
      toast.error('Invalid email or password');
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        profileImage: null,
        addresses: [],
        paymentMethods: [],
        orderHistory: []
      };
      // Persist registration
      localStorage.setItem('registeredUser', JSON.stringify(newUser));
      // Auto-login after first registration
      const sessionUser = { ...newUser };
      delete sessionUser.password;
      const storedProfile = profileStorage.getStoredProfile();
      const merged = storedProfile ? { ...sessionUser, ...storedProfile } : sessionUser;
      setUser(merged);
      localStorage.setItem('user', JSON.stringify(merged));
      toast.success('Registration successful! Welcome to FreshCart.');
      navigate('/home-dashboard-1');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const registeredUserRaw = localStorage.getItem('registeredUser');
      if (!registeredUserRaw) {
        toast.error('No registered account found.');
        return { success: false, error: 'No registered user' };
      }
      const registeredUser = JSON.parse(registeredUserRaw);
      if (registeredUser.password !== currentPassword) {
        toast.error('Current password is incorrect');
        return { success: false, error: 'Incorrect current password' };
      }

      const updatedRegistered = { ...registeredUser, password: newPassword };
      localStorage.setItem('registeredUser', JSON.stringify(updatedRegistered));

      // Do not store password in session user
      const storedUserRaw = localStorage.getItem('user');
      if (storedUserRaw) {
        try {
          const sessionUser = JSON.parse(storedUserRaw);
          localStorage.setItem('user', JSON.stringify(sessionUser));
        } catch {}
      }

      toast.success('Password updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update password');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // preserve any remembered email for convenience
    navigate('/home-dashboard');
  };

  // Cart functions (work for both guest and logged-in users)
  const addToCart = (productOrId, quantity = 1) => {
    // Handle both product objects and product IDs
    let product;
    if (typeof productOrId === 'object') {
      product = productOrId;
    } else {
      // If it's an ID, try to find the product from wishlist first, then products data
      product = wishlist.find(item => item.id === productOrId);
      if (!product) {
        try {
          const productsData = require('../data/products.json');
          product = productsData.products.find(p => p.id === productOrId);
          if (!product) {
            // Fallback if product not found
            product = { id: productOrId, name: 'Product', price: 0 };
          }
        } catch (error) {
          // Fallback if products data not available
          product = { id: productOrId, name: 'Product', price: 0 };
        }
      }
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart!`);
        // Update quantity if product already in cart
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        // Add new product to cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCart(prevCart => {
      let updatedCart;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        updatedCart = prevCart.filter(item => item.id !== productId);
        toast.info('Item removed from cart');
      } else {
        // Update quantity
        updatedCart = prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity } 
            : item
        );
        toast.success('Cart updated');
      }
      
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  // Wishlist functions (work for both guest and logged-in users)
  const addToWishlist = (productOrId) => {
    // Handle both product objects and product IDs
    let product;
    if (typeof productOrId === 'object') {
      product = productOrId;
    } else {
      // If it's an ID, try to find the product from products data
      try {
        const productsData = require('../data/products.json');
        product = productsData.products.find(p => p.id === productOrId);
        if (!product) {
          // Fallback if product not found
          product = { id: productOrId, name: 'Product', price: 0 };
        }
      } catch (error) {
        // Fallback if products data not available
        product = { id: productOrId, name: 'Product', price: 0 };
      }
    }
    
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, remove it (toggle behavior)
        const updatedWishlist = prevWishlist.filter(item => item.id !== product.id);
        toast.info(`${product.name} removed from wishlist`);
        return updatedWishlist;
      } else {
        // Add new item to wishlist
        toast.success(`${product.name} added to wishlist!`);
        return [...prevWishlist, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      toast.info(`${product.name} removed from wishlist`);
    }
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (productId, quantity = 1) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product, quantity);
      removeFromWishlist(productId);
    }
  };

  // User address management
  const addAddress = (address) => {
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        addresses: [...(prevUser.addresses || []), { id: Date.now().toString(), ...address }]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Address added successfully!');
      return updatedUser;
    });
  };

  const updateAddress = (addressId, updatedAddress) => {
    setUser(prevUser => {
      const updatedAddresses = prevUser.addresses.map(addr => 
        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
      );
      const updatedUser = { ...prevUser, addresses: updatedAddresses };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Address updated successfully!');
      return updatedUser;
    });
  };

  const deleteAddress = (addressId) => {
    setUser(prevUser => {
      const updatedAddresses = prevUser.addresses.filter(addr => addr.id !== addressId);
      const updatedUser = { ...prevUser, addresses: updatedAddresses };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Address removed successfully!');
      return updatedUser;
    });
  };

  // Payment methods management
  const addPaymentMethod = (paymentMethod) => {
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        paymentMethods: [...(prevUser.paymentMethods || []), { id: Date.now().toString(), ...paymentMethod }]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Payment method added successfully!');
      return updatedUser;
    });
  };

  const updatePaymentMethod = (paymentId, updatedPayment) => {
    setUser(prevUser => {
      const updatedPayments = prevUser.paymentMethods.map(payment => 
        payment.id === paymentId ? { ...payment, ...updatedPayment } : payment
      );
      const updatedUser = { ...prevUser, paymentMethods: updatedPayments };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Payment method updated successfully!');
      return updatedUser;
    });
  };

  const deletePaymentMethod = (paymentId) => {
    setUser(prevUser => {
      const updatedPayments = prevUser.paymentMethods.filter(payment => payment.id !== paymentId);
      const updatedUser = { ...prevUser, paymentMethods: updatedPayments };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Payment method removed successfully!');
      return updatedUser;
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    // Order management
    addOrder,
    // Address management
    addAddress,
    updateAddress,
    deleteAddress,
    // Payment method management
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    changePassword,
    // Cart state and functions
    cart,
    cartItemCount,
    cartTotal,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    // Wishlist state and functions
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    toggleWishlist,
    // Toast functions
    toast
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* Global toast container mounted once at root */}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </AuthContext.Provider>
  );
};

export default AuthContext;