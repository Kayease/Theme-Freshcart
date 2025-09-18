import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Footer from '../../components/ui/Footer';
import ToastContainer from '../../components/ui/ToastContainer';
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

  const categories = [
    {
      name: 'Fresh Fruits',
      count: '120+ items',
      image: IMAGES.CATEGORIES.FRESH_FRUITS,
      color: 'bg-green-100',
    },
    {
      name: 'Vegetables',
      count: '80+ items',
      image: IMAGES.CATEGORIES.VEGETABLES,
      color: 'bg-orange-100',
    },
    {
      name: 'Dairy Products',
      count: '45+ items',
      image: IMAGES.CATEGORIES.DAIRY,
      color: 'bg-blue-100',
    },
    {
      name: 'Bakery',
      count: '60+ items',
      image: IMAGES.PRODUCTS.BREAD,
      color: 'bg-yellow-100',
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() =>
                  navigate(
                    `/product-categories-browse?category=${encodeURIComponent(
                      category.name
                    )}`
                  )
                }
              >
                <div
                  className={`${category.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-heading font-bold text-lg mb-2">{category.name}</h3>
                  <p className="text-text-secondary text-sm">{category.count}</p>
                </div>
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
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
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
                  <button
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    onClick={e => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                  >
                    <Icon name="Heart" size={16} />
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
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
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
            {[
              { name: 'Bananas', price: '$2.99', image: IMAGES.PRODUCTS.BANANAS },
              { name: 'Milk', price: '$3.49', image: IMAGES.PRODUCTS.MILK },
              { name: 'Bread', price: '$2.99', image: IMAGES.PRODUCTS.BREAD },
              { name: 'Eggs', price: '$4.99', image: IMAGES.PRODUCTS.EGGS },
              { name: 'Apples', price: '$3.99', image: IMAGES.PRODUCTS.APPLES },
              { name: 'Yogurt', price: '$1.99', image: IMAGES.PRODUCTS.YOGURT },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                <p className="text-primary font-bold text-sm mb-2">{item.price}</p>
                <button
                  onClick={() =>
                    addToCart({
                      id: `buyagain-${index}`,
                      name: item.name,
                      price: parseFloat(item.price.replace('$', '')),
                      image: item.image,
                    })
                  }
                  className="w-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs py-1 rounded transition-all"
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default HomeStyle2;
