import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import SEO from '../../components/SEO';
import emailhook from '../../hooks/emailhook';
import { useAuth } from '../../contexts/AuthContext';
import ToastContainer from '../../components/ui/ToastContainer';

const HelpPage = () => {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get('section') || 'faq';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useAuth();
  const { toasts, removeToast } = toast;

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

  // Validation helpers (mirror SignIn/SignUp behavior)
  const isValidEmail = (value) => emailhook.validateEmailStrict(value);
  // 1 to 4 words, letters only per word, single spaces between
  const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+){0,3})$/;
  // Reasonable subject: 3-120 allowed chars, not only spaces
  const subjectRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ'&()\-.,!? ]{3,120}$/;
  const lettersCount = message.replace(/\s/g, '').length; // exclude spaces

  const validateContactForm = () => {
    const newErrors = {};
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const currentLetters = lettersCount;

    if (!trimmedName || !nameRegex.test(trimmedName)) {
      newErrors.name = 'Enter full name (1-4 words, letters only).';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.email = 'Use a valid non-temporary email address';
    }

    if (!trimmedSubject) {
      newErrors.subject = 'Subject is required';
    } else if (!subjectRegex.test(trimmedSubject)) {
      newErrors.subject = '3-120 chars. Letters, numbers and basic punctuation only';
    }

    if (currentLetters === 0) {
      newErrors.message = 'Message is required';
    } else if (currentLetters > 200) {
      newErrors.message = 'Max 200 letters (excluding spaces)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  const handleSendMessage = async () => {
    if (isSubmitting) return;
    if (!validateContactForm()) return;
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      try { toast.success('Thank you! Your message has been sent.'); } catch { }
      resetForm();
      setIsSubmitting(false);
    }, 1500);
  };

  const getFilteredItems = () => {
    let items = [];

    switch (activeSection) {
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
      <SEO title="Help Center | FreshCart" description="Find answers about orders, account, payments, and more." />
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === section.id
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
                <h2 className="text-2xl font-heading font-heading-bold text-text-primary ">
                  Contact Support
                </h2>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                    Send us a message
                  </h3>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        maxLength={20}
                        value={name}
                        onChange={(e) => {
                          const v = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]/g, '').replace(/\s+/g, ' ');
                          
                          setName(v);
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value.replace(/\s+/g, ''));
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Order issue"
                        value={subject}
                        maxLength={120}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\s+/g, ' ').replace(/^\s+/, '');
                          setSubject(v);
                          if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.subject ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="I need help with my order..."
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.message ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      ></textarea>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${lettersCount > 200 ? 'text-red-600' : 'text-text-secondary'}`}>Letters used (excluding spaces): {Math.min(lettersCount, 999)}/200</p>
                        {errors.message && (
                          <p className="text-xs text-red-600">{errors.message}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || lettersCount > 200}
                      className={`px-6 py-2 rounded-button font-body-medium transition-colors w-full ${isSubmitting || lettersCount > 200 ? 'bg-primary/60 text-primary-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Icon name="Loader" size={16} className="animate-spin mr-2" />
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </form>
                </div>

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
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default HelpPage; 