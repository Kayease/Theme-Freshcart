import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load cart from localStorage (works for both guest and logged-in users)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Load wishlist from localStorage (works for both guest and logged-in users)
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        profileImage: null
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Cart functions (work for both guest and logged-in users)
  const addToCart = (product, quantity = 1) => {
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
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist functions (work for both guest and logged-in users)
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.warning(`${product.name} is already in your wishlist!`);
        return prevWishlist;
      } else {
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

  const moveToCart = (productId, quantity = 1) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product, quantity);
      removeFromWishlist(productId);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    // Cart state and functions
    cart,
    cartItemCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    // Wishlist state and functions
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    // Toast functions
    toast
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 