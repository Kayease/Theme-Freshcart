import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HeroSlider from './components/HeroSlider';
import CategoryCards from './components/CategoryCards';
import FeaturedBrands from './components/FeaturedBrands';
import PopularProducts from './components/PopularProducts';
import RecentlyPurchased from './components/RecentlyPurchased';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import emailhook from '../../hooks/emailhook';

const HomeStyle1 = () => {
  const { toast } = useAuth();
  const { toasts, removeToast } = toast;

  // Newsletter state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailhook.validateEmailStrict(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Newsletter subscription
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Validate email
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsSubscribing(true);

    try {
      // Check if email already exists in localStorage
      const subscribedEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');

      if (subscribedEmails.includes(email.toLowerCase())) {
        toast.error('This email is already subscribed to our newsletter!');
        return;
      }

      // Add email to localStorage
      subscribedEmails.push(email.toLowerCase());
      localStorage.setItem('newsletterEmails', JSON.stringify(subscribedEmails));

      // Show success message
      toast.success('Successfully subscribed to our newsletter!');

      // Clear email field
      setEmail('');

    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Home | FreshCart" description="Discover fresh products, featured brands, and popular picks." />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Breadcrumb />

        <section className="mb-12">
          <HeroSlider />
        </section>

        {/* Enhanced Categories */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
              🛒 Shop by Category
            </h2>
            <p className="text-text-secondary font-body">
              Discover fresh products in every category
            </p>
          </div>
          <CategoryCards />
        </section>

        <section className="mb-12">
          <FeaturedBrands />
        </section>

        {/* Popular Products */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
              ⭐ Popular Products
            </h2>
            <p className="text-text-secondary font-body">
              Most loved items by our customers
            </p>
          </div>
          <PopularProducts />
        </section>

        {/* Buy Again */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  🔄 Buy Again
                </h2>
                <p className="text-text-secondary font-body">
                  Items you've purchased recently
                </p>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                View All →
              </button>
            </div>
            <RecentlyPurchased />
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-heading font-bold mb-3">
              📧 Stay Updated with Fresh Deals
            </h2>
            <p className="font-body mb-6 opacity-90 text-lg">
              Get exclusive offers, seasonal recipes, and fresh product updates delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 rounded-lg text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-white shadow-sm ${emailError ? 'border-2 border-red-400' : ''}`}
                  disabled={isSubscribing}
                />
                {emailError && (
                  <p className="text-red-300 text-sm mt-2 text-left">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full sm:w-auto bg-white text-primary font-body font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubscribing ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default HomeStyle1;