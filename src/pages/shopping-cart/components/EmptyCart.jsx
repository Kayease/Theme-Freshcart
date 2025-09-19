import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProductCard from '../../product-categories-browse/components/ProductCard';
import productsData from '../../../data/products.json';

const EmptyCart = ({ onStartShopping }) => {
  const navigate = useNavigate();

  const popularProducts = useMemo(() => {
    try {
      const list = (productsData.products || [])
        .filter(p => typeof p.price === 'number')
        .sort((a, b) => b.price - a.price)
        .slice(0, 4);
      return list;
    } catch {
      return [];
    }
  }, []);

  const quickCategories = useMemo(() => {
    const names = Array.from(new Set((productsData.categories || []).map(c => c.name))).slice(0, 6);
    const iconMap = {
      'Fruits & Vegetables': 'Apple',
      'Dairy & Eggs': 'Milk',
      'Meat & Seafood': 'Fish',
      'Bakery': 'Cookie',
      'Beverages': 'Coffee',
      'Snacks': 'Candy'
    };
    return names.map(n => ({ name: n, icon: iconMap[n] || 'Tag', color: 'text-primary' }));
  }, []);

  const goToCategory = (categoryName) => {
    if (!categoryName) return;
    navigate(`/product-categories-browse?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Empty Cart Illustration */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-border-light rounded-full flex items-center justify-center">
            <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
          </div>

          <h1 className="font-heading font-heading-bold text-2xl text-text-primary mb-2">
            Your cart is empty
          </h1>
          <p className="text-text-secondary font-caption mb-6 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up with fresh groceries!
          </p>

          <Button
            variant="primary"
            onClick={onStartShopping}
            iconName="ArrowRight"
            iconPosition="right"
            className="mb-8"
          >
            Start Shopping
          </Button>
        </div>

        {/* Quick Categories */}
        <div className="mb-8">
          <h2 className="font-heading font-heading-bold text-xl text-text-primary mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => goToCategory(category.name)}
                className="bg-surface border border-border rounded-card p-4 hover:border-primary hover:shadow-card transition-smooth group"
              >
                <div className="text-center">
                  <Icon
                    name={category.icon}
                    size={32}
                    className={`mx-auto mb-2 ${category.color} group-hover:scale-110 transition-smooth`}
                  />
                  <span className="text-sm font-caption text-text-primary group-hover:text-primary">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Products */}
        <div>
          <h2 className="font-heading font-heading-bold text-xl text-text-primary mb-4">
            Popular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-surface border border-border rounded-card p-6">
          <h3 className="font-heading font-heading-bold text-lg text-text-primary mb-4 text-center">
            Why Shop with FreshCart?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <h4 className="font-body font-body-medium text-text-primary mb-2">Fast Delivery</h4>
              <p className="text-sm font-caption text-text-secondary">
                Get your groceries delivered in as fast as 30 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Leaf" size={24} className="text-primary" />
              </div>
              <h4 className="font-body font-body-medium text-text-primary mb-2">Fresh Quality</h4>
              <p className="text-sm font-caption text-text-secondary">
                Hand-picked fresh produce and quality guaranteed products
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h4 className="font-body font-body-medium text-text-primary mb-2">Safe & Secure</h4>
              <p className="text-sm font-caption text-text-secondary">
                Secure payments and contactless delivery options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;