import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ onAddToCart }) => {
  const recentlyViewedItems = [
    {
      id: 1,
      name: "Fresh Avocados (3 pack)",
      brand: "FreshFarms",
      price: 4.99,
      originalPrice: 5.99,
      discount: 17,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.3,
      unit: "per 3 pack"
    },
    {
      id: 2,
      name: "Greek Yogurt Vanilla",
      brand: "Dairy Fresh",
      price: 3.49,
      originalPrice: 3.49,
      discount: 0,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.7,
      unit: "per container"
    },
    {
      id: 3,
      name: "Organic Spinach",
      brand: "Green Valley",
      price: 2.99,
      originalPrice: 3.49,
      discount: 14,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.5,
      unit: "per bunch"
    },
    {
      id: 4,
      name: "Artisan Pasta",
      brand: "Italian Kitchen",
      price: 4.99,
      originalPrice: 4.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.4,
      unit: "per package"
    },
    {
      id: 5,
      name: "Almond Milk",
      brand: "Nut Goodness",
      price: 3.99,
      originalPrice: 4.49,
      discount: 11,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.2,
      unit: "per carton"
    },
    {
      id: 6,
      name: "Strawberries (1 lb)",
      brand: "Berry Best",
      price: 3.99,
      originalPrice: 4.99,
      discount: 20,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop",
      inStock: true,
      rating: 4.6,
      unit: "per lb"
    }
  ];

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
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-heading-bold text-xl text-text-primary mb-1">
            Recently Viewed
          </h2>
          <p className="text-text-secondary font-caption">
            Items you've recently looked at
          </p>
        </div>
        <Icon name="Clock" size={20} className="text-text-secondary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {recentlyViewedItems.map((item) => (
          <div key={item.id} className="bg-background border border-border rounded-card p-3 hover:shadow-card transition-shadow group">
            <div className="relative mb-3">
              <div className="aspect-square overflow-hidden rounded-card bg-border-light">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {item.discount > 0 && (
                <div className="absolute top-1 right-1 bg-error text-error-foreground text-xs px-1.5 py-0.5 rounded-button font-data font-data-medium">
                  -{item.discount}%
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-body font-body-medium text-text-primary text-sm line-clamp-2">
                {item.name}
              </h3>

              <div className="flex items-center gap-1">
                {renderStars(item.rating)}
                <span className="text-xs text-text-secondary ml-1">({item.rating})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-heading font-heading-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
                {item.discount > 0 && (
                  <span className="text-xs text-text-secondary line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onAddToCart(item.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="text-xs"
                >
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Add to wishlist:', item.id)}
                  iconName="Heart"
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;