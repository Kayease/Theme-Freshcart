import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

const HelpPage = () => {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get('section') || 'faq';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && helpSections.some(s => s.id === section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const helpSections = [
    { id: 'faq', label: 'Frequently Asked Questions', icon: 'HelpCircle' },
    { id: 'orders', label: 'Orders & Delivery', icon: 'Package' },
    { id: 'account', label: 'Account & Settings', icon: 'User' },
    { id: 'payment', label: 'Payment & Refunds', icon: 'CreditCard' },
    { id: 'contact', label: 'Contact Support', icon: 'MessageCircle' },
  ];

  const faqItems = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by going to Order History in your account dashboard. Click on any order to see real-time delivery status and tracking information.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. For certain locations, we also offer Cash on Delivery.'
    },
    {
      question: 'How can I change or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. Go to Order History and select the order you wish to modify. After 1 hour, please contact customer support.'
    },
    {
      question: 'What is your return policy?',
      answer: 'If you\'re not satisfied with your purchase, you can return items within 30 days. For groceries and perishables, please report any issues within 24 hours of delivery.'
    },
    {
      question: 'How do I save items to my wishlist?',
      answer: 'Click the heart icon on any product to save it to your wishlist. You can view and manage your saved items in the Wishlist section.'
    }
  ];

  const orderItems = [
    {
      question: 'How do delivery time slots work?',
      answer: 'We offer 2-hour delivery windows throughout the day. You can select your preferred time slot during checkout. Availability may vary based on your location and current demand.'
    },
    {
      question: 'What happens if I\'m not home during delivery?',
      answer: 'For contactless delivery, our driver will leave your order at your door and send you a notification. For orders requiring signature, we\'ll attempt delivery again or contact you to arrange an alternative time.'
    },
    {
      question: 'Can I change my delivery address after placing an order?',
      answer: 'You can change your delivery address within 30 minutes of placing your order. After that, please contact customer support for assistance.'
    },
    {
      question: 'How do I track my order status?',
      answer: 'Go to "Order History" in your account to see real-time updates on your order status. You\'ll also receive email and SMS notifications at each stage of the delivery process.'
    },
    {
      question: 'What if items are out of stock?',
      answer: 'You can set your preferences for substitutions during checkout. We can either replace with similar items, refund the amount, or contact you for approval on substitutions.'
    }
  ];

  const accountItems = [
    {
      question: 'How do I create an account?',
      answer: 'Click the "Sign In" button in the top right corner, then select "Create Account". Fill in your details and verify your email address to complete registration.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your email. For security reasons, password reset links expire after 24 hours.'
    },
    {
      question: 'Can I have multiple delivery addresses?',
      answer: 'Yes, you can save multiple delivery addresses in your account settings. During checkout, you can select which address to use for that specific order.'
    },
    {
      question: 'How do I update my personal information?',
      answer: 'Go to "Account Settings" and select "Personal Information". You can update your name, email, phone number, and other details there.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'Go to "Account Settings", scroll to the bottom, and click "Delete Account". Please note this action is permanent and will remove all your data from our system.'
    }
  ];

  const paymentItems = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, Google Pay, and in select areas, Cash on Delivery.'
    },
    {
      question: 'Is it safe to save my payment information?',
      answer: 'Yes, we use industry-standard encryption and security measures. We never store complete credit card numbers on our servers - all payment processing is handled by secure third-party payment processors.'
    },
    {
      question: 'How do refunds work?',
      answer: 'Refunds are processed back to the original payment method. They typically take 3-5 business days to appear in your account, depending on your bank or payment provider.'
    },
    {
      question: 'Can I use multiple payment methods for one order?',
      answer: 'Currently, we only support one payment method per order. However, you can use gift cards in combination with another payment method.'
    },
    {
      question: 'What happens if my payment is declined?',
      answer: 'If your payment is declined, you\'ll be notified immediately and given the option to try a different payment method. Your order will be saved in your cart for 24 hours.'
    }
  ];

  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'MessageSquare',
      action: () => console.log('Open chat'),
      availability: '24/7'
    },
    {
      title: 'Email Support',
      description: 'support@freshcart.com',
      icon: 'Mail',
      action: () => window.location.href = 'mailto:support@freshcart.com',
      availability: '24-48 hour response'
    },
    {
      title: 'Phone Support',
      description: '1-800-FRESH-CART',
      icon: 'Phone',
      action: () => window.location.href = 'tel:1-800-FRESH-CART',
      availability: 'Mon-Fri, 9AM-6PM'
    }
  ];

  const getFilteredItems = () => {
    let items = [];
    
    switch(activeSection) {
      case 'faq':
        items = faqItems;
        break;
      case 'orders':
        items = orderItems;
        break;
      case 'account':
        items = accountItems;
        break;
      case 'payment':
        items = paymentItems;
        break;
      default:
        items = faqItems;
    }
    
    if (searchQuery) {
      return items.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-4">
            Help Center
          </h1>
          <div className="relative">
            <input
              type="search"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-2 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {helpSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-primary hover:bg-border/50'
                  }`}
                >
                  <Icon name={section.icon} size={20} />
                  <span className="font-body">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeSection !== 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-heading-bold text-text-primary mb-6">
                  {helpSections.find(s => s.id === activeSection)?.label}
                </h2>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-surface border border-border rounded-lg p-6"
                    >
                      <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
                        {item.question}
                      </h3>
                      <p className="text-text-secondary">
                        {item.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                    <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
                      No results found
                    </h3>
                    <p className="text-text-secondary">
                      Try adjusting your search terms or browse the categories
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-heading-bold text-text-primary mb-6">
                  Contact Support
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contactMethods.map((method, index) => (
                    <button
                      key={index}
                      onClick={method.action}
                      className="bg-surface border border-border rounded-lg p-6 text-left hover:border-primary transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon name={method.icon} size={24} className="text-primary" />
                        <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                          {method.title}
                        </h3>
                      </div>
                      <p className="text-text-primary mb-2">{method.description}</p>
                      <p className="text-sm text-text-secondary">{method.availability}</p>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                    Send us a message
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-button font-body-medium transition-colors hover:bg-primary/90"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage; 