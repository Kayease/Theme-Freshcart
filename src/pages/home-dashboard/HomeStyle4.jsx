import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { IMAGES } from '../../utils/imageMap';
import productsData from '../../data/products.json';

const HomeStyle4 = () => {
  const { addToCart, addToWishlist, toast } = useAuth();
  const { toasts, removeToast } = toast;
  const navigate = useNavigate();

  const deals = [
    { title: 'Flash Sale', discount: '50% OFF', product: 'Fresh Fruits', time: '2h 30m left', bg: 'bg-red-500' },
    { title: 'Daily Deal', discount: '30% OFF', product: 'Dairy Products', time: '12h left', bg: 'bg-blue-500' },
    { title: 'Weekend Special', discount: '25% OFF', product: 'Bakery Items', time: '1d 5h left', bg: 'bg-purple-500' }
  ];

  const popularProducts = useMemo(() => {
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
      'Dairy & Eggs': { icon: '🥛', color: 'hover:bg-blue-50' },
      'Fruits & Vegetables': { icon: '🍎', color: 'hover:bg-red-50' },
      'Meat & Seafood': { icon: '🥩', color: 'hover:bg-pink-50' },
      'Bakery': { icon: '🍞', color: 'hover:bg-yellow-50' },
      'Pantry Staples': { icon: '🥫', color: 'hover:bg-orange-50' },
      'Beverages': { icon: '🥤', color: 'hover:bg-purple-50' },
      'Snacks': { icon: '🍿', color: 'hover:bg-indigo-50' },
      'Frozen Foods': { icon: '🧊', color: 'hover:bg-cyan-50' }
    };

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count: `${count}+`,
      icon: categoryConfig[name]?.icon || '🛒',
      color: categoryConfig[name]?.color || 'hover:bg-gray-50'
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - E-commerce Style */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                🔥 Limited Time Offer
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Fresh Groceries
                <br />
                <span className="text-primary">Up to 50% Off</span>
              </h1>
              <p className="text-lg text-text-secondary mb-8">
                Shop premium quality groceries at unbeatable prices. Free delivery on orders over $50.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={() => navigate('/product-categories-browse')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all">
                  Shop Now
                </button>
                <button onClick={() => navigate('/product-categories-browse')} className="border border-gray-300 hover:border-primary text-text-primary hover:text-primary px-8 py-3 rounded-lg font-medium transition-all">
                  View Deals
                </button>
              </div>
              <div className="flex items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center">
                  <Icon name="Truck" size={16} className="mr-2 text-primary" />
                  Free Delivery
                </div>
                <div className="flex items-center">
                  <Icon name="Shield" size={16} className="mr-2 text-primary" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <Icon name="RotateCcw" size={16} className="mr-2 text-primary" />
                  Easy Returns
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8">
                <img
                  src={IMAGES.BANNERS.HERO_GROCERIES_WIDE}
                  alt="Fresh Groceries"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="Star" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">4.9/5</div>
                      <div className="text-sm text-text-secondary">Customer Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">⚡ Flash Deals</h2>
            <p className="text-text-secondary">Limited time offers - grab them before they're gone!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <div key={index} className={`${deal.bg} text-white rounded-2xl p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="text-sm opacity-90 mb-2">{deal.title}</div>
                  <div className="text-3xl font-bold mb-2">{deal.discount}</div>
                  <div className="text-lg mb-4">{deal.product}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm opacity-90">⏰ {deal.time}</div>
                    <button onClick={() => navigate('/product-categories-browse')} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">🛒 Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div key={index} className={`bg-gray-50 ${category.color} rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md`} onClick={() => navigate(`/product-categories-browse?category=${encodeURIComponent(category.name)}`)}>
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm mb-1">{category.name}</div>
                <div className="text-xs text-text-secondary">{category.count} items</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products - Deal Style */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">⭐ Popular Products</h2>
            <p className="text-text-secondary">Most loved items by our customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all group">
                <div className="relative mb-4 cursor-pointer" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Popular
                  </span>
                  <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                  <button
                    className="absolute top-10 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                  >
                    <Icon name="Heart" size={16} className="text-red-500" />
                  </button>
                </div>
                <h3 className="font-heading font-bold mb-2 cursor-pointer" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}>{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  </div>
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

      {/* Buy Again - Deal Style */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">🔄 Buy Again</h2>
              <p className="text-text-secondary">Items you've purchased recently - Quick reorder</p>
            </div>
            <button className="bg-white hover:bg-gray-50 text-primary px-6 py-2 rounded-lg font-medium shadow-sm transition-all">
              View All Orders
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
            {popularProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-3 text-center hover:shadow-lg transition-all cursor-pointer group">
                <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-lg mb-2 cursor-pointer" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)} />
                <h4 className="font-medium text-sm mb-1 cursor-pointer" onClick={() => navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`)}>{product.name}</h4>
                <p className="text-primary font-bold text-sm mb-1">${product.price.toFixed(2)}</p>
                <p className="text-xs text-text-secondary mb-2">Recently viewed</p>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-accent hover:bg-accent/90 text-white text-xs py-1.5 rounded transition-all group-hover:scale-105"
                >
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default HomeStyle4;