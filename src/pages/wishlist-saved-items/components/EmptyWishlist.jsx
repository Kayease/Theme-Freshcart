import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import productsData from '../../../data/products.json';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const EmptyWishlist = ({ onStartShopping }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useAuth();

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

  const popularProducts = useMemo(() => {
    try {
      const list = (productsData.products || [])
        .filter(p => typeof p.price === 'number')
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);
      return list;
    } catch {
      return [];
    }
  }, []);

  const goToCategory = (categoryName) => {
    if (!categoryName) return;
    navigate(`/product-categories-browse?category=${encodeURIComponent(categoryName)}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={12} className="text-warning fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-border" />);
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-32 h-32 bg-border-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Heart" size={64} className="text-text-secondary" />
        </div>

        <h2 className="font-heading font-heading-bold text-2xl text-text-primary mb-2">
          Your Wishlist is Empty
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

      {/* Browse Categories */}
      <div>
        <h3 className="font-heading font-heading-bold text-xl text-text-primary mb-6">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading font-heading-bold text-xl text-text-primary mb-6">
            Popular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="bg-surface border border-border rounded-card p-3 hover:shadow-card transition-shadow group">
                <Link to={`/product-details?id=${product.id}`}>
                  <div className="relative mb-3">
                    <div className="aspect-square overflow-hidden rounded-card bg-border-light">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {product.discount > 0 && (
                      <div className="absolute top-1 right-1 bg-error text-error-foreground text-xs px-1.5 py-0.5 rounded-button font-data font-data-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                </Link>
                <div className="space-y-2">
                  <Link to={`/product-details?id=${product.id}`} className='flex flex-col gap-2 items-start'>
                    <h4 className="font-body font-body-medium text-text-primary text-sm line-clamp-2">
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-1">
                      {renderStars(product.rating || 4.0)}
                      <span className="text-xs text-text-secondary ml-1">({product.rating || 4.0})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-heading font-heading-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-text-secondary line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </Link>


                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => addToCart(product)}
                      iconName="ShoppingCart"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addToWishlist(product)}
                      iconName="Heart"
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      }


    </div >
  );
};

export default EmptyWishlist;