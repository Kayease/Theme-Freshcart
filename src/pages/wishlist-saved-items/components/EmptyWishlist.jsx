import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyWishlist = ({ onStartShopping, wishlistName }) => {
  const popularProducts = [
    {
      id: 1,
      name: "Fresh Organic Bananas",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop",
      category: "Bakery"
    },
    {
      id: 3,
      name: "Premium Olive Oil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&h=150&fit=crop",
      category: "Pantry"
    }
  ];

  const categories = [
    { name: "Fruits & Vegetables", icon: "Apple", color: "text-green-600" },
    { name: "Dairy & Eggs", icon: "Milk", color: "text-blue-600" },
    { name: "Meat & Seafood", icon: "Fish", color: "text-red-600" },
    { name: "Bakery", icon: "Bread", color: "text-yellow-600" },
    { name: "Pantry", icon: "Package", color: "text-purple-600" },
    { name: "Beverages", icon: "Coffee", color: "text-orange-600" }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-32 h-32 bg-border-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Heart" size={64} className="text-text-secondary" />
        </div>
        
        <h2 className="font-heading font-heading-bold text-2xl text-text-primary mb-2">
          Your {wishlistName} is Empty
        </h2>
        <p className="text-text-secondary font-caption max-w-md mx-auto mb-8">
          Save your favorite items for later! Add products to your wishlist and never lose track of what you want to buy.
        </p>

        <Button
          variant="primary"
          onClick={onStartShopping}
          iconName="ShoppingBag"
          iconPosition="left"
          size="lg"
        >
          Start Shopping
        </Button>
      </div>

      {/* Popular Products */}
      <div className="mb-12">
        <h3 className="font-heading font-heading-bold text-xl text-text-primary mb-6">
          Popular Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-surface border border-border rounded-card p-4 hover:shadow-card transition-shadow">
              <div className="w-20 h-20 bg-border-light rounded-card mx-auto mb-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-body font-body-medium text-text-primary mb-1">
                {product.name}
              </h4>
              <p className="text-text-secondary text-sm mb-2">{product.category}</p>
              <p className="font-heading font-heading-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Browse Categories */}
      <div>
        <h3 className="font-heading font-heading-bold text-xl text-text-primary mb-6">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={onStartShopping}
              className="flex flex-col items-center p-4 bg-surface border border-border rounded-card hover:shadow-card hover:border-primary transition-all"
            >
              <div className={`w-12 h-12 rounded-full bg-border-light flex items-center justify-center mb-2 ${category.color}`}>
                <Icon name={category.icon} size={24} />
              </div>
              <span className="text-sm font-caption text-text-primary text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;