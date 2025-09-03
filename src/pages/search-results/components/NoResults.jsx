import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoResults = ({ query, onTryAgain }) => {
  const suggestions = [
    'Check your spelling',
    'Try different keywords',
    'Use more general terms',
    'Browse our categories instead'
  ];

  const popularProducts = [
    { name: 'Fresh Organic Apples', price: '$4.99', image: '/api/placeholder/200/200' },
    { name: 'Whole Milk', price: '$3.49', image: '/api/placeholder/200/200' },
    { name: 'Free Range Eggs', price: '$5.99', image: '/api/placeholder/200/200' },
    { name: 'Artisan Bread', price: '$2.99', image: '/api/placeholder/200/200' }
  ];

  const popularCategories = [
    { name: 'Fresh Produce', icon: 'Apple', path: '/product-categories-browse?category=produce' },
    { name: 'Dairy & Eggs', icon: 'Milk', path: '/product-categories-browse?category=dairy' },
    { name: 'Meat & Seafood', icon: 'Fish', path: '/product-categories-browse?category=meat' },
    { name: 'Bakery', icon: 'Croissant', path: '/product-categories-browse?category=bakery' },
    { name: 'Beverages', icon: 'Coffee', path: '/product-categories-browse?category=beverages' },
    { name: 'Snacks', icon: 'Cookie', path: '/product-categories-browse?category=snacks' }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* No Results Icon */}
      <div className="w-24 h-24 bg-border/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="SearchX" size={48} className="text-text-secondary" />
      </div>

      {/* Main Message */}
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
        No results found
      </h2>
      <p className="text-text-secondary mb-8">
        {query ? (
          <>We couldn't find any products matching "<strong>{query}</strong>"</>
        ) : (
          'Try adjusting your search or filters'
        )}
      </p>

      {/* Suggestions */}
      <div className="bg-surface border border-border rounded-card p-6 mb-8">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Search Tips
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Products */}
      <div className="mb-8">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Popular Products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularProducts.map((product, index) => (
            <Link
              key={index}
              to={`/product-details?id=${index + 1}`}
              className="bg-surface border border-border rounded-card p-4 hover:shadow-card transition-shadow"
            >
              <div className="aspect-square bg-border/30 rounded-card mb-3 flex items-center justify-center">
                <Icon name="Package" size={32} className="text-text-secondary" />
              </div>
              <h4 className="text-sm font-body font-medium text-text-primary mb-1 line-clamp-2">
                {product.name}
              </h4>
              <p className="text-sm font-data font-bold text-primary">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularCategories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="bg-surface border border-border rounded-card p-4 hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={category.icon} size={24} className="text-primary" />
              </div>
              <h4 className="text-sm font-body font-medium text-text-primary">
                {category.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onTryAgain}
          className="flex items-center space-x-2"
        >
          <Icon name="RotateCcw" size={16} />
          <span>Try Again</span>
        </Button>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/product-categories-browse'}
          className="flex items-center space-x-2"
        >
          <Icon name="Grid3X3" size={16} />
          <span>Browse All Categories</span>
        </Button>
      </div>
    </div>
  );
};

export default NoResults;