import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import PromoCodeInput from './components/PromoCodeInput';
import EmptyCart from './components/EmptyCart';
import RecentlyViewed from './components/RecentlyViewed';
import MinimumOrderProgress from './components/MinimumOrderProgress';
import Footer from '../../components/ui/Footer';

// Local image constants
const PRODUCT_IMAGES = {
  bananas: '/assets/images/products/fruits/bananas.jpg',
  bread: '/assets/images/products/bakery/bread.jpg',
  milk: '/assets/images/products/dairy/milk.jpg',
  eggs: '/assets/images/products/dairy/eggs.jpg'
};
const ShoppingCart = () => {
  const navigate = useNavigate();

  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Bananas (2 lbs)",
      brand: "FreshFarms",
      price: 3.99,
      originalPrice: 4.99,
      discount: 20,
      quantity: 2,
      image: PRODUCT_IMAGES.bananas,
      inStock: true
    },
    {
      id: 2,
      name: "Whole Wheat Bread Loaf",
      brand: "Baker\'s Choice",
      price: 2.49,
      originalPrice: 2.49,
      discount: 0,
      quantity: 1,
      image: PRODUCT_IMAGES.bread,
      inStock: true
    },
    {
      id: 3,
      name: "Fresh Milk 1 Gallon",
      brand: "Dairy Fresh",
      price: 4.99,
      originalPrice: 5.49,
      discount: 9,
      quantity: 1,
      image: PRODUCT_IMAGES.milk,
      inStock: true
    },
    {
      id: 4,
      name: "Organic Free-Range Eggs (12 pack)",
      brand: "Farm Fresh",
      price: 6.99,
      originalPrice: 7.99,
      discount: 13,
      quantity: 1,
      image: PRODUCT_IMAGES.eggs,
      inStock: false
    }
  ]);

  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('standard');

  // Valid promo codes
  const validPromoCodes = {
    'SAVE10': { discount: 10, type: 'percentage', minOrder: 50 },
    'FRESH20': { discount: 20, type: 'fixed', minOrder: 100 },
    'NEWUSER': { discount: 15, type: 'percentage', minOrder: 30 }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.originalPrice - (item.originalPrice * item.discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = selectedDeliverySlot === 'express' ? 9.99 : selectedDeliverySlot === 'scheduled' ? 2.99 : 4.99;
  const total = subtotal - promoDiscount + tax + deliveryFee;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Handle cart operations
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleMoveToWishlist = (itemId) => {
    console.log('Moving item to wishlist:', encodeURIComponent(itemId));
    // This would typically dispatch an action to add to wishlist and remove from cart
    handleRemoveItem(itemId);
  };

  const handleApplyPromoCode = (code, remove = false) => {
    if (remove) {
      setAppliedPromoCode('');
      setPromoDiscount(0);
      return { success: true };
    }

    const promoCode = validPromoCodes[code];

    if (!promoCode) {
      return { success: false, message: 'Invalid promo code' };
    }

    if (subtotal < promoCode.minOrder) {
      return {
        success: false,
        message: `Minimum order of $${promoCode.minOrder.toFixed(2)} required for this promo code`
      };
    }

    const discount = promoCode.type === 'percentage'
      ? (subtotal * promoCode.discount / 100)
      : promoCode.discount;

    setAppliedPromoCode(code);
    setPromoDiscount(discount);

    return { success: true, discount };
  };

  const handleDeliverySlotChange = (slotId) => {
    setSelectedDeliverySlot(slotId);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  const handleStartShopping = () => {
    navigate('/product-categories-browse');
  };

  const handleAddToCart = (productId) => {
    console.log('Adding product to cart from recently viewed:', productId);
    // This would typically dispatch an action to add the product to cart
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Shopping Cart', path: '/shopping-cart', icon: 'ShoppingCart', isActive: true }
  ];

  // If cart is empty, show empty cart component
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb customItems={breadcrumbItems} />
        </div>
        <EmptyCart onStartShopping={handleStartShopping} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />

        <div className="mt-6">
          <h1 className="font-heading font-heading-bold text-3xl text-text-primary mb-2">
            Shopping Cart
          </h1>
          <p className="text-text-secondary font-caption mb-8">
            Review your items and proceed to checkout
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Minimum Order Progress */}
              <MinimumOrderProgress currentTotal={subtotal} />

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>

              {/* Promo Code */}
              <PromoCodeInput
                onApplyPromoCode={handleApplyPromoCode}
                appliedPromoCode={appliedPromoCode}
                promoDiscount={promoDiscount}
              />

              {/* Recently Viewed - Mobile */}
              <div className="lg:hidden">
                <RecentlyViewed onAddToCart={handleAddToCart} />
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                discount={promoDiscount}
                tax={tax}
                deliveryFee={deliveryFee}
                total={total}
                itemCount={itemCount}
                onProceedToCheckout={handleProceedToCheckout}
                selectedDeliverySlot={selectedDeliverySlot}
                onDeliverySlotChange={handleDeliverySlotChange}
              />
            </div>
          </div>

          {/* Recently Viewed - Desktop */}
          <div className="hidden lg:block">
            <RecentlyViewed onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;