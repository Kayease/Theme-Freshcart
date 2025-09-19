import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';
import Button from '../../components/ui/Button';
import FilterChip from './components/FilterChip';
import SortDropdown from './components/SortDropdown';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import CategoryBreadcrumb from './components/CategoryBreadcrumb';
import productsData from '../../data/products.json';

const ProductCategoriesBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    categories: [],
    brands: [],
    rating: [],
    inStock: false
  });

  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';

  // Sync URL params (brand/category) into sidebar filters for auto-tick behavior
  useEffect(() => {
    const brandParam = (searchParams.get('brand') || '').trim();
    const categoryParam = (searchParams.get('category') || '').trim();
    setFilters(prev => {
      const next = { ...prev };
      if (brandParam && !prev.brands.includes(brandParam)) {
        next.brands = [...prev.brands, brandParam];
      }
      if (categoryParam && !prev.categories.includes(categoryParam)) {
        next.categories = [...prev.categories, categoryParam];
      }
      return next;
    });
  }, [searchParams]);


  useEffect(() => {
    // Load products from our dataset instead of mock data
    const loadProducts = () => {
      try {
        // Use the imported products data
        const allProducts = productsData.products;
        
        const filtered = allProducts.filter(product => {
          if (category && product.category !== category) return false;
          if (subcategory && product.subcategory !== subcategory) return false;
          return true;
        });
        
        setProducts(filtered);
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    
    // Short timeout to simulate API call
    setLoading(true);
    setTimeout(loadProducts, 300);
  }, [category, subcategory]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by subcategory
    if (subcategory) {
      filtered = filtered.filter(product => product.subcategory === subcategory);
    }

    // Search query from header
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    // Brand from URL (e.g., when clicking brand suggestion)
    const brandParam = (searchParams.get('brand') || '').trim();
    if (brandParam) {
      filtered = filtered.filter(p => p.brand === brandParam);
    }

    // Filter by price range
    if (filters.priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.priceRange.max));
    }

    // Filter by selected categories (multi)
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Filter by rating
    if (filters.rating.length > 0) {
      filtered = filtered.filter(product => {
        return filters.rating.some(rating => {
          const minRating = parseInt(rating);
          return product.rating >= minRating && product.rating < minRating + 1;
        });
      });
    }

    // Filter by in stock
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort products
    switch (currentSort) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default: // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, currentSort, category, subcategory, searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      categories: [],
      brands: [],
      rating: [],
      inStock: false
    });

    // Clear category and subcategory from URL
    setSearchParams({});
  };

  const getActiveFilters = () => {
    const active = [];

    if (category) {
      active.push({ type: 'category', value: category });
    }

    if (subcategory) {
      active.push({ type: 'subcategory', value: subcategory });
    }

    if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
      const priceLabel = `$${filters.priceRange.min || '0'} - $${filters.priceRange.max || '∞'}`;
      active.push({ type: 'price', value: priceLabel });
    }

    filters.categories.forEach(cat => {
      active.push({ type: 'categories', value: cat });
    });

    filters.brands.forEach(brand => {
      active.push({ type: 'brand', value: brand });
    });

    filters.rating.forEach(rating => {
      active.push({ type: 'rating', value: `${rating}+ Stars` });
    });

    if (filters.inStock) {
      active.push({ type: 'inStock', value: 'In Stock Only' });
    }

    return active;
  };

  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case 'category':
        setSearchParams(params => {
          params.delete('category');
          return params;
        });
        break;
      case 'subcategory':
        setSearchParams(params => {
          params.delete('subcategory');
          return params;
        });
        break;
      case 'price':
        setFilters(prev => ({
          ...prev,
          priceRange: { min: '', max: '' }
        }));
        break;
      case 'brand':
        setFilters(prev => ({
          ...prev,
          brands: prev.brands.filter(brand => brand !== value)
        }));
        break;
      case 'categories':
        setFilters(prev => ({
          ...prev,
          categories: prev.categories.filter(cat => cat !== value)
        }));
        break;
      case 'rating':
        setFilters(prev => ({
          ...prev,
          rating: prev.rating.filter(r => r !== value.split('+')[0])
        }));
        break;
      case 'inStock':
        setFilters(prev => ({
          ...prev,
          inStock: false
        }));
        break;
      default:
        break;
    }
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;
  const availableBrands = [...new Set(products.map(product => product.brand))];
  const availableCategories = [...new Set(products.map(product => product.category))];

  return (
    <div className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <SEO title={`${subcategory || category || 'All Products'} | FreshCart`} description={`Browse ${subcategory || category || 'all products'} on FreshCart.`} />
      <Header />

      <main className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 flex-grow">
        <CategoryBreadcrumb category={category} subcategory={subcategory} />

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-full max-w-[300px] xl:max-w-[340px] flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              availableBrands={availableBrands}
              availableCategories={availableCategories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h1 className="text-2xl font-heading font-heading-bold text-text-primary mb-4 sm:mb-0">
                {subcategory || category || 'All Products'}
              </h1>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                  className="lg:hidden"
                  onClick={() => setIsFilterSidebarOpen(true)}
                >
                  Filters
                </Button>

                <SortDropdown
                  value={currentSort}
                  onChange={setCurrentSort}
                />
              </div>
            </div>



            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-text-secondary">Filters:</span>
                  {activeFilters.map((filter, index) => (
                    <FilterChip
                      key={index}
                      label={filter.value}
                      onRemove={() => handleRemoveFilter(filter.type, filter.value)}
                    />
                  ))}
                  <button
                    onClick={handleClearAllFilters}
                    className="text-sm text-primary hover:underline font-body-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        availableBrands={availableBrands}
        availableCategories={availableCategories}
        isMobile
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
      />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default ProductCategoriesBrowse;