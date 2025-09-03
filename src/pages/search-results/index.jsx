import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import SearchProductCard from './components/SearchProductCard';
import SearchSuggestions from './components/SearchSuggestions';
import ActiveFilters from './components/ActiveFilters';
import NoResults from './components/NoResults';
import Footer from '../../components/ui/Footer';
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 100],
    brands: [],
    dietary: [],
    rating: 0,
    availability: 'all'
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState(['Fresh apples', 'Organic milk', 'Whole grain bread']);
  
  const searchRef = useRef(null);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      category: 'Fresh Produce',
      price: 4.99,
      originalPrice: 5.99,
      rating: 4.5,
      reviewCount: 234,
      image: '/api/placeholder/300/300',
      inStock: true,
      badge: { type: 'sale', text: '17% OFF' },
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Whole Milk - 1 Gallon',
      category: 'Dairy & Eggs',
      price: 3.49,
      rating: 4.2,
      reviewCount: 156,
      image: '/api/placeholder/300/300',
      inStock: true,
      isWishlisted: true
    },
    {
      id: 3,
      name: 'Free Range Eggs - 12 Count',
      category: 'Dairy & Eggs',
      price: 5.99,
      rating: 4.8,
      reviewCount: 89,
      image: '/api/placeholder/300/300',
      inStock: false,
      isWishlisted: false
    },
    {
      id: 4,
      name: 'Artisan Whole Grain Bread',
      category: 'Bakery',
      price: 2.99,
      rating: 4.3,
      reviewCount: 67,
      image: '/api/placeholder/300/300',
      inStock: true,
      badge: { type: 'new', text: 'NEW' },
      isWishlisted: false
    },
    {
      id: 5,
      name: 'Organic Bananas',
      category: 'Fresh Produce',
      price: 1.99,
      rating: 4.1,
      reviewCount: 345,
      image: '/api/placeholder/300/300',
      inStock: true,
      isWishlisted: false
    },
    {
      id: 6,
      name: 'Wild Caught Salmon',
      category: 'Meat & Seafood',
      price: 12.99,
      rating: 4.7,
      reviewCount: 78,
      image: '/api/placeholder/300/300',
      inStock: true,
      badge: { type: 'organic', text: 'ORGANIC' },
      isWishlisted: true
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load products based on search query and filters
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchParams({ q: suggestion });
    setShowSuggestions(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = [0, 100];
    } else if (filterType === 'rating') {
      newFilters.rating = 0;
    } else if (filterType === 'availability') {
      newFilters.availability = 'all';
    } else if (Array.isArray(newFilters[filterType])) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 100],
      brands: [],
      dietary: [],
      rating: 0,
      availability: 'all'
    });
  };

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }
    
    if (product.price > filters.priceRange[1]) {
      return false;
    }
    
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false;
    }
    
    if (filters.availability === 'instock' && !product.inStock) {
      return false;
    }
    
    if (filters.availability === 'sale' && !product.badge?.type === 'sale') {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'popularity':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const hasResults = sortedProducts.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb />
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search for Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="pl-12 pr-16 py-3 text-base"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-button hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </form>
            
            {showSuggestions && (
              <SearchSuggestions
                query={searchQuery}
                suggestions={[
                  { text: 'Fresh organic apples', count: 24 },
                  { text: 'Apple juice', count: 12 },
                  { text: 'Apple pie', count: 8 }
                ]}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </div>

          {/* Voice Search and Barcode Scanner */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-primary"
            >
              <Icon name="Mic" size={16} />
              <span>Voice Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-primary"
            >
              <Icon name="Camera" size={16} />
              <span>Scan Barcode</span>
            </Button>
          </div>
        </div>

        {/* Search Query and Results Count */}
        {searchQuery && (
          <div className="mb-6">
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Search Results
            </h1>
            <p className="text-text-secondary">
              {loading ? 'Searching...' : `${sortedProducts.length} results found for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="flex items-center space-x-2 bg-surface border border-border rounded-full px-4 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-nav-height">
              <SearchFilters
                onFiltersChange={handleFiltersChange}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Mobile Filter Button and Sort */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span>Filters</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-surface border border-border rounded-card p-4 animate-pulse">
                    <div className="aspect-square bg-border rounded-card mb-3"></div>
                    <div className="h-4 bg-border rounded mb-2"></div>
                    <div className="h-3 bg-border rounded mb-2"></div>
                    <div className="h-4 bg-border rounded"></div>
                  </div>
                ))}
              </div>
            ) : hasResults ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <SearchProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <NoResults
                query={searchQuery}
                onTryAgain={() => {
                  setSearchQuery('');
                  setSearchParams({});
                  handleClearAllFilters();
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-overlay">
          <div className="absolute inset-0 bg-background/80" onClick={() => setShowMobileFilters(false)} />
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            isMobile={true}
            onClose={() => setShowMobileFilters(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;