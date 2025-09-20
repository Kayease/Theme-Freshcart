import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { IMAGES } from '../../utils/imageMap';
import productsData from '../../data/products.json';
import emailhook from '../../hooks/emailhook';

const HomeStyle3 = () => {
  const { addToCart, addToWishlist, toast } = useAuth();
  const { toasts, removeToast } = toast;
  const navigate = useNavigate();

  // Newsletter state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '24/7', label: 'Support' },
    { number: '99%', label: 'Satisfaction' }
  ];

  const products = useMemo(() => {
    const sorted = [...productsData.products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 4);
  }, []);

  // Get real categories from products data
  const categories = useMemo(() => {
    const categoryMap = new Map();

    // Count products per category
    productsData.products.forEach(product => {
      const categoryName = product.category;
      if (categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, categoryMap.get(categoryName) + 1);
      } else {
        categoryMap.set(categoryName, 1);
      }
    });

    // Get category icons and colors
    const categoryConfig = {
      'Dairy & Eggs': { icon: '🥛', color: 'bg-blue-50 hover:bg-blue-100' },
      'Fruits & Vegetables': { icon: '🍎', color: 'bg-red-50 hover:bg-red-100' },
      'Meat & Seafood': { icon: '🥩', color: 'bg-pink-50 hover:bg-pink-100' },
      'Bakery': { icon: '🍞', color: 'bg-yellow-50 hover:bg-yellow-100' },
      'Pantry Staples': { icon: '🥫', color: 'bg-orange-50 hover:bg-orange-100' },
      'Beverages': { icon: '🥤', color: 'bg-purple-50 hover:bg-purple-100' },
      'Snacks': { icon: '🍿', color: 'bg-indigo-50 hover:bg-indigo-100' },
      'Frozen Foods': { icon: '🧊', color: 'bg-cyan-50 hover:bg-cyan-100' }
    };

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count: `${count}+`,
      icon: categoryConfig[name]?.icon || '🛒',
      color: categoryConfig[name]?.color || 'bg-gray-50 hover:bg-gray-100'
    }));
  }, []);

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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Minimal Style */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              New: Same-day delivery available
            </div>
            <h1 className="text-6xl lg:text-8xl font-heading font-bold mb-8 leading-tight">
              Grocery Shopping
              <br />
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
              Experience the future of grocery shopping with our curated selection of premium products,
              delivered fresh to your door with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button onClick={() => navigate('/product-categories-browse')} className="flex items-center text-text-primary font-medium text-lg transition-all border border-primary hover:bg-primary hover:text-white px-12 py-4 rounded-lg">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products - Minimal Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              ⭐ Popular Products
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Most loved items by our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative mb-4" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                    <button
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                      }}
                    >
                      <Icon name="Heart" size={12} className="text-red-500" />
                    </button>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 cursor-pointer" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}>{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Again - Minimal Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                🔄 Buy Again
              </h2>
              <p className="text-text-secondary">
                Items you've purchased recently
              </p>
            </div>
            <button onClick={() => navigate('/product-categories-browse')} className="text-primary hover:text-primary/80 font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Organic Bananas', price: '$3.99', image: IMAGES.PRODUCTS.BANANAS },
              { name: 'Whole Milk', price: '$4.99', image: IMAGES.PRODUCTS.MILK },
              { name: 'Artisan Bread', price: '$2.49', image: IMAGES.PRODUCTS.BREAD },
              { name: 'Farm Eggs', price: '$6.99', image: IMAGES.PRODUCTS.EGGS },
              { name: 'Greek Yogurt', price: '$5.49', image: IMAGES.PRODUCTS.YOGURT },
              { name: 'Olive Oil', price: '$12.99', image: IMAGES.PRODUCTS.OLIVE_OIL }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all cursor-pointer group">
                <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-3 cursor-pointer" onClick={() => navigate(`/product-details?id=${index + 100}&name=${encodeURIComponent(item.name)}`)} />
                <h4 className="font-medium text-sm mb-2 line-clamp-2 cursor-pointer" onClick={() => navigate(`/product-details?id=${index + 100}&name=${encodeURIComponent(item.name)}`)}>{item.name}</h4>
                <p className="text-primary font-bold mb-3">{item.price}</p>
                <button
                  onClick={() => addToCart({ id: `buyagain-${index}`, name: item.name, price: parseFloat(item.price.replace('$', '')), image: item.image })}
                  className="w-full bg-gray-100 hover:bg-primary hover:text-white text-text-primary text-sm py-2 rounded-lg transition-all group-hover:scale-105"
                >
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Minimal Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              🛒 Shop by Category
            </h2>
            <p className="text-text-secondary">
              Discover fresh products in every category
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`${category.color} rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105`} onClick={() => navigate(`/product-categories-browse?category=${encodeURIComponent(category.name)}`)}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-heading font-bold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-text-secondary">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Minimal */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Stay in the Loop
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Get the latest updates on new products, exclusive deals, and seasonal offers
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-6 py-4 rounded-lg text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-white ${emailError ? 'border-2 border-red-400' : ''
                  }`}
                disabled={isSubscribing}
              />
              {emailError && (
                <p className="text-red-300 text-sm mt-2 text-left">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center"
            >
              {isSubscribing ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </section>

      <Footer />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default HomeStyle3;