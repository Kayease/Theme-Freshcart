import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const SearchSuggestions = ({ query, suggestions, onSuggestionClick }) => {
  const popularSearches = [
    'Fresh apples',
    'Organic vegetables',
    'Whole milk',
    'Chicken breast',
    'Bread',
    'Bananas',
    'Eggs',
    'Pasta'
  ];

  const categoryShortcuts = [
    { name: 'Fresh Produce', icon: 'Apple', path: '/product-categories-browse?category=produce' },
    { name: 'Dairy & Eggs', icon: 'Milk', path: '/product-categories-browse?category=dairy' },
    { name: 'Meat & Seafood', icon: 'Fish', path: '/product-categories-browse?category=meat' },
    { name: 'Bakery', icon: 'Croissant', path: '/product-categories-browse?category=bakery' },
    { name: 'Beverages', icon: 'Coffee', path: '/product-categories-browse?category=beverages' },
    { name: 'Snacks', icon: 'Cookie', path: '/product-categories-browse?category=snacks' }
  ];

  if (!query?.trim()) {
    return (
      <div className="absolute top-full left-0 right-0 bg-surface border border-border rounded-card mt-1 shadow-modal z-dropdown">
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Popular Searches
            </h3>
            <div className="space-y-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(search)}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-border/30 rounded-button transition-colors"
                >
                  <Icon name="TrendingUp" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{search}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Browse Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categoryShortcuts.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="flex items-center space-x-2 p-2 hover:bg-border/30 rounded-button transition-colors"
                >
                  <Icon name={category.icon} size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-surface border border-border rounded-card mt-1 shadow-modal z-dropdown">
      <div className="p-2">
        {suggestions?.length > 0 ? (
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion.text)}
                className="flex items-center space-x-3 w-full p-2 hover:bg-border/30 rounded-button transition-colors"
              >
                <Icon name="Search" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{suggestion.text}</span>
                {suggestion.count && (
                  <span className="text-xs text-text-secondary ml-auto">
                    {suggestion.count} results
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center">
            <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              No suggestions found for "{query}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestions;