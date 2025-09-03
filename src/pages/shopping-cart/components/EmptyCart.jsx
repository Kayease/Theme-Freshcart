import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ onStartShopping }) => {
  const suggestedProducts = [
    {
      id: 1,
      name: "Fresh Organic Bananas",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
      category: "Bakery"
    },
    {
      id: 3,
      name: "Fresh Milk 1L",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop",
      category: "Dairy"
    },
    {
      id: 4,
      name: "Organic Eggs (12 pack)",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
      category: "Dairy"
    }
  ];

  const quickCategories = [
    { name: "Fruits & Vegetables", icon: "Apple", color: "text-green-600" },
    { name: "Dairy & Eggs", icon: "Milk", color: "text-blue-600" },
    { name: "Meat & Seafood", icon: "Fish", color: "text-red-600" },
    { name: "Bakery", icon: "Cookie", color: "text-orange-600" },
    { name: "Beverages", icon: "Coffee", color: "text-purple-600" },
    { name: "Snacks", icon: "Candy", color: "text-pink-600" }
  ];

  const handleAddToCart = (productId) => {
    console.log('Adding product to cart:', productId);
    // This would typically dispatch an action to add the product to cart
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
                onClick={() => console.log('Navigate to category:', category.name)}
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
            {suggestedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface border border-border rounded-card p-4 hover:shadow-card transition-smooth group"
              >
                <div className="aspect-square mb-3 rounded-card overflow-hidden bg-border-light">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-caption text-text-secondary bg-border-light px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  
                  <h3 className="font-body font-body-medium text-text-primary text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-heading-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product.id)}
                      iconName="Plus"
                      iconSize={14}
                      className="text-xs px-3 py-1"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
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