import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';
import CheckoutProgress from './components/CheckoutProgress';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import DeliveryTimeSlot from './components/DeliveryTimeSlot';
import PaymentMethodSection from './components/PaymentMethodSection';
import OrderSummary from './components/OrderSummary';
import DeliveryInstructions from './components/DeliveryInstructions';
import PlaceOrderSection from './components/PlaceOrderSection';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { user, cartTotal, cart, addOrder, addAddress } = useAuth();
  
  // Form state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [tip, setTip] = useState(0);

  // Initialize with default selections from user profile
  useEffect(() => {
    const defaultAddress = user?.addresses?.[0] || null;
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
      setCompletedSteps([1]);
      setCurrentStep(2);
    }
  }, [user]);

  // Update progress based on selections
  useEffect(() => {
    const newCompletedSteps = [];
    let newCurrentStep = 1;

    if (selectedAddress) {
      newCompletedSteps.push(1);
      newCurrentStep = 2;
    }
    if (selectedTimeSlot) {
      newCompletedSteps.push(2);
      newCurrentStep = 3;
    }
    if (selectedPayment) {
      newCompletedSteps.push(3);
      newCurrentStep = 4;
    }

    setCompletedSteps(newCompletedSteps);
    setCurrentStep(newCurrentStep);
  }, [selectedAddress, selectedTimeSlot, selectedPayment]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = (address) => {
    addAddress(address);
    setSelectedAddress(address);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const handlePlaceOrder = () => {
    addOrder({
      address: selectedAddress,
      timeSlot: selectedTimeSlot,
      payment: selectedPayment,
      instructions: deliveryInstructions,
      tip: tip,
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }))
    });
  };

  // Calculate totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.08;
  const deliveryFee = selectedTimeSlot?.price || 0;
  const total = subtotal + tax + deliveryFee + tip;

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' },
    { label: 'Checkout', path: '/checkout', icon: 'CreditCard', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Checkout | FreshCart" description="Complete your order and schedule delivery." />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />
        
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
            Checkout
          </h1>
          <p className="text-text-secondary font-body">
            Complete your order and get fresh groceries delivered to your door
          </p>
        </div>

        <CheckoutProgress 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Address */}
            <DeliveryAddressSection
              selectedAddress={selectedAddress}
              onAddressSelect={handleAddressSelect}
              onAddNewAddress={handleAddNewAddress}
            />

            {/* Step 2: Delivery Time */}
            <DeliveryTimeSlot
              selectedSlot={selectedTimeSlot}
              onSlotSelect={handleTimeSlotSelect}
            />

            {/* Step 3: Payment Method */}
            <PaymentMethodSection
              selectedPayment={selectedPayment}
              onPaymentSelect={handlePaymentSelect}
            />

            {/* Step 4: Additional Information */}
            <DeliveryInstructions
              instructions={deliveryInstructions}
              onInstructionsChange={setDeliveryInstructions}
              tip={tip}
              onTipChange={setTip}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <OrderSummary
              deliveryFee={deliveryFee}
              tip={tip}
            />

            {/* Place Order */}
            <PlaceOrderSection
              selectedAddress={selectedAddress}
              selectedTimeSlot={selectedTimeSlot}
              selectedPayment={selectedPayment}
              total={total}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>

        {/* Mobile Place Order Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-body font-body-medium text-text-primary">
              Total
            </span>
            <span className="text-xl font-data font-data-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
          <PlaceOrderSection
            selectedAddress={selectedAddress}
            selectedTimeSlot={selectedTimeSlot}
            selectedPayment={selectedPayment}
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>

        {/* Mobile spacing for fixed button */}
        <div className="lg:hidden h-32"></div>
      </main>

      <Footer />

    </div>
  );
};

export default CheckoutPage;