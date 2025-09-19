import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import Icon from '../AppIcon';

const SearchWithAutocomplete = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef();
  const navigate = useNavigate();

  const getSuggestions = (q) => {
    const ql = q.toLowerCase();
    const products = (productsData.products || []).filter(p => p.name.toLowerCase().includes(ql)).slice(0, 3).map(p => ({ type: 'product', name: p.name, category: p.category }));
    const categories = Array.from(new Set((productsData.products || []).map(p => p.category)))
      .filter(c => c.toLowerCase().includes(ql)).slice(0, 3).map(c => ({ type: 'category', name: c }));
    const brands = (productsData.brands || []).filter(b => b.name.toLowerCase().includes(ql)).slice(0, 3).map(b => ({ type: 'brand', name: b.name }));
    return { products, categories, brands };
  };

  useEffect(() => {
    if (query.length > 1) {
      const { products, categories, brands } = getSuggestions(query);
      setSuggestions([...products, ...categories, ...brands]);
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
      navigate(`/product-categories-browse?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      navigate(`/product-categories-browse?category=${encodeURIComponent(suggestion.name)}&q=`);
    } else if (suggestion.type === 'brand') {
      navigate(`/product-categories-browse?brand=${encodeURIComponent(suggestion.name)}&q=`);
    } else {
      navigate(`/product-categories-browse?q=${encodeURIComponent(suggestion.name)}`);
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
          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          onFocus={() => { if (query.length > 1) setIsOpen(true); }}
        />
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="px-3 py-2 text-[12px] font-semibold text-gray-500">Products</div>
          {suggestions.filter(s => s.type === 'product').map((s, index) => (
            <button key={`p-${index}`} onClick={() => handleSuggestionClick(s)} className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 ${index === selectedIndex ? 'bg-primary/10' : ''}`}>
              {/* <Icon name="Package" size={16} className="text-gray-400" /> */}
              <span className="font-medium text-sm text-gray-900">{s.name}</span>
              <span className="ml-auto text-xs text-gray-400">in {s.category}</span>
            </button>
          ))}
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">Categories</div>
          {suggestions.filter(s => s.type === 'category').map((s, index) => (
            <button key={`c-${index}`} onClick={() => handleSuggestionClick(s)} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
              <Icon name="Grid3X3" size={16} className="text-gray-400" />
              <span className="font-medium text-sm text-gray-900">{s.name}</span>
            </button>
          ))}
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">Brands</div>
          {suggestions.filter(s => s.type === 'brand').map((s, index) => (
            <button key={`b-${index}`} onClick={() => handleSuggestionClick(s)} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
              <Icon name="Award" size={16} className="text-gray-400" />
              <span className="font-medium text-sm text-gray-900">{s.name}</span>
            </button>
          ))}
          <div className="p-2 border-t border-gray-100">
            <button onClick={handleSearch} className="w-full text-center text-sm font-medium text-primary hover:underline">View more results</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;