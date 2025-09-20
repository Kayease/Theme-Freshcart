import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { IMAGES } from '../../utils/imageMap';
import productsData from '../../data/products.json';

const HomeStyle2 = () => {
  const { addToCart, addToWishlist, toast } = useAuth();
  const { toasts, removeToast } = toast;
  const navigate = useNavigate();
  const features = [
    { icon: 'Truck', title: 'Free Delivery', desc: 'Orders over $50' },
    { icon: 'Shield', title: 'Secure Payment', desc: '100% protected' },
    { icon: 'RotateCcw', title: 'Easy Returns', desc: '30-day policy' },
    { icon: 'Headphones', title: '24/7 Support', desc: 'Always here to help' },
  ];

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

  const popularProducts = useMemo(() => {
    const sorted = [...productsData.products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      {/* Hero Section - Modern Style */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                Fresh
                <br />
                <span className="text-accent">Groceries</span>
                <br />
                Delivered
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Get farm-fresh produce delivered to your doorstep in under 2 hours
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/product-categories-browse')} className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all">
                  Shop Now
                </button>
                <button onClick={() => navigate('/help?section=contact')} className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-medium text-lg transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-96 h-96 bg-white/10 rounded-full absolute -top-10 -right-10 animate-pulse-slow"></div>
              <img
                src={IMAGES.BANNERS.HERO_GROCERIES_SQUARE}
                alt="Fresh Groceries"
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Card Style */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">🛒 Shop by Category</h2>
            <p className="text-text-secondary text-lg">
              Discover fresh products in every category
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md`}
                onClick={() =>
                  navigate(
                    `/product-categories-browse?category=${encodeURIComponent(
                      category.name
                    )}`
                  )
                }
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-heading font-bold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-text-secondary">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">⭐ Popular Products</h2>
            <p className="text-text-secondary text-lg">
              Most loved items by our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all group"
              >
                <div
                  className="relative mb-4 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`
                    )
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Popular
                  </span>
                  <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                  <button
                    className="absolute top-10 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    onClick={e => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                  >
                    <Icon name="Heart" size={16} className="text-red-500" />
                  </button>
                </div>
                <h3
                  className="font-heading font-bold mb-2 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`
                    )
                  }
                >
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition-all"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Again */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">🔄 Buy Again</h2>
            <p className="text-text-secondary text-lg">Items you've purchased recently</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularProducts.slice(0, 6).map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 text-center hover:shadow-lg transition-all cursor-pointer group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-20 object-cover rounded-lg mb-2 cursor-pointer"
                  onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}
                />
                <h4
                  className="font-medium text-sm mb-1 cursor-pointer"
                  onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}
                >
                  {product.name}
                </h4>
                <p className="text-primary font-bold text-sm mb-2">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs py-1 rounded transition-all group-hover:scale-105"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy customers who trust us for their daily groceries
          </p>
          <button onClick={() => navigate('/product-categories-browse')} className="bg-white text-accent hover:bg-gray-100 px-12 py-4 rounded-full font-bold text-lg transition-all">
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default HomeStyle2;
