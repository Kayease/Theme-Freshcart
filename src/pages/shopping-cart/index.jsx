import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';
import Icon from '../../components/AppIcon';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import PromoCodeInput from './components/PromoCodeInput';
import EmptyCart from './components/EmptyCart';
import MinimumOrderProgress from './components/MinimumOrderProgress';
import CartBulkActions from './components/CartBulkActions';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, addToWishlist } = useAuth();

  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('standard');
  const [selectedItems, setSelectedItems] = useState([]);

  // Valid promo codes
  const validPromoCodes = {
    SAVE10: { discount: 10, type: 'percentage', minOrder: 50 },
    FRESH20: { discount: 20, type: 'fixed', minOrder: 100 },
    NEWUSER: { discount: 15, type: 'percentage', minOrder: 30 },
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const unitPrice = Number(item.price ?? item.originalPrice ?? 0);
      const discount = Number(item.discount ?? 0);
      const discountedPrice = unitPrice - (unitPrice * discount) / 100;
      return total + discountedPrice * Number(item.quantity ?? 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee =
    selectedDeliverySlot === 'express'
      ? 9.99
      : selectedDeliverySlot === 'scheduled'
        ? 2.99
        : 4.99;
  const total = subtotal - promoDiscount + tax + deliveryFee;
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Handle cart operations
  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = itemId => {
    removeFromCart(itemId);
  };

  const handleMoveToWishlist = itemId => {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      addToWishlist(item);
      removeFromCart(itemId);
    }
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
        message: `Minimum order of $${promoCode.minOrder.toFixed(
          2
        )} required for this promo code`,
      };
    }

    const discount =
      promoCode.type === 'percentage'
        ? (subtotal * promoCode.discount) / 100
        : promoCode.discount;

    setAppliedPromoCode(code);
    setPromoDiscount(discount);

    return { success: true, discount };
  };

  const handleDeliverySlotChange = slotId => {
    setSelectedDeliverySlot(slotId);
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  const handleStartShopping = () => {
    navigate('/product-categories-browse');
  };

  // Bulk selection handlers
  const handleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAllItems = () => {
    const allItemIds = cart.map(item => item.id);
    setSelectedItems(
      selectedItems.length === cart.length ? [] : allItemIds
    );
  };

  const handleBulkMoveToWishlist = () => {
    selectedItems.forEach(itemId => {
      const item = cart.find(i => i.id === itemId);
      if (item) {
        addToWishlist(item);
        removeFromCart(itemId);
      }
    });
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(itemId => {
      removeFromCart(itemId);
    });
    setSelectedItems([]);
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    {
      label: 'Shopping Cart',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      isActive: true,
    },
  ];

  // If cart is empty, show empty cart component
  if (cart.length === 0) {
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
      <SEO title="Cart | FreshCart" description="Review your cart and proceed to secure checkout." />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />

        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading font-heading-bold text-3xl text-text-primary mb-2">
                Shopping Cart
              </h1>
              <p className="text-text-secondary font-caption">
                Review your items and proceed to checkout
              </p>
            </div>
          </div>

          {/* Select All Controls */}
          {cart.length > 0 && (
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllItems}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <div className={`w-4 h-4 border border-border rounded ${selectedItems.length === cart.length
                    ? 'bg-primary border-primary'
                    : selectedItems.length > 0
                      ? 'bg-primary border-primary opacity-50' : ''
                    }`}>
                    {selectedItems.length > 0 && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  Select All ({cart.length})
                </button>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <CartBulkActions
              selectedCount={selectedItems.length}
              onBulkMoveToWishlist={handleBulkMoveToWishlist}
              onBulkRemove={handleBulkRemove}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Minimum Order Progress */}
              <MinimumOrderProgress currentTotal={subtotal} />

              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onSelectItem={handleSelectItem}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
