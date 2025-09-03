import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchWithAutocomplete = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef();
  const navigate = useNavigate();

  const mockSuggestions = [
    { type: 'product', name: 'Organic Apples', category: 'Fruits' },
    { type: 'product', name: 'Fresh Bananas', category: 'Fruits' },
    { type: 'product', name: 'Whole Milk', category: 'Dairy' },
    { type: 'category', name: 'Fresh Produce' },
    { type: 'category', name: 'Dairy Products' },
    { type: 'brand', name: 'Organic Valley' }
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      navigate(`/product-categories-browse?category=${encodeURIComponent(suggestion.name)}`);
    } else {
      navigate(`/search-results?q=${encodeURIComponent(suggestion.name)}`);
    }
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, categories..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                index === selectedIndex ? 'bg-primary/10' : ''
              }`}
            >
              <Icon
                name={suggestion.type === 'category' ? 'Grid3X3' : suggestion.type === 'brand' ? 'Award' : 'Package'}
                size={16}
                className="text-gray-400"
              />
              <div>
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                {suggestion.category && (
                  <div className="text-sm text-gray-500">in {suggestion.category}</div>
                )}
              </div>
              <div className="ml-auto">
                <span className="text-xs text-gray-400 capitalize">{suggestion.type}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;