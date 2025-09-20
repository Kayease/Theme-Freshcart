import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { IMAGES } from '../../utils/imageMap';
import productsData from '../../data/products.json';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const productId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // Function to transform product data to match the expected format
  const transformProductData = (productData) => {
    if (!productData) return null;

    // Calculate discount - only show discount for some products to make it more realistic
    const shouldShowDiscount = Math.random() > 0.6; // 40% chance of showing discount
    const originalPrice = shouldShowDiscount ? productData.price * 1.15 : null; // 15% markup
    const discount = originalPrice ? Math.round(((originalPrice - productData.price) / originalPrice) * 100) : 0;

    return {
      id: productData.id,
      name: productData.name,
      brand: productData.brand,
    price: {
        current: productData.price,
        original: originalPrice,
      },
      discount: discount,
      unit: getUnitForCategory(productData.category),
      priceUnit: "each",
      pricePerUnit: productData.price,
      rating: productData.rating,
      reviewCount: productData.reviews,
      availability: productData.inStock ? "In Stock" : "Out of Stock",
      stockCount: productData.stock,
      maxQuantity: Math.min(productData.stock || 0, 10),
      origin: getOriginForCategory(productData.category),
      storage: getStorageForCategory(productData.category),
      expiryInfo: getExpiryInfoForCategory(productData.category),
      images: getProductImages(productData),
      highlights: getHighlightsForProduct(productData),
      description: getDescriptionForProduct(productData),
      features: getFeaturesForProduct(productData),
      variants: getVariantsForProduct(productData),
      nutrition: getNutritionForProduct(productData),
      ingredients: getIngredientsForProduct(productData),
      allergens: getAllergensForProduct(productData),
      category: productData.category,
      categoryId: productData.categoryId,
      brandId: productData.brandId
    };
  };

  // Helper functions to generate dynamic content
  const getUnitForCategory = (category) => {
    const unitMap = {
      "Dairy & Eggs": "1 unit",
      "Fruits & Vegetables": "1 lb",
      "Meat & Seafood": "1 lb",
      "Bakery": "1 loaf",
      "Pantry Staples": "1 bottle",
      "Beverages": "1 bottle",
      "Snacks": "1 bag",
      "Frozen Foods": "1 package"
    };
    return unitMap[category] || "1 unit";
  };

  const getOriginForCategory = (category) => {
    const originMap = {
      "Dairy & Eggs": "Local Farm, USA",
      "Fruits & Vegetables": "California, USA",
      "Meat & Seafood": "Atlantic Coast, USA",
      "Bakery": "Local Bakery, USA",
      "Pantry Staples": "Italy",
      "Beverages": "Various Origins",
      "Snacks": "USA",
      "Frozen Foods": "USA"
    };
    return originMap[category] || "USA";
  };

  const getStorageForCategory = (category) => {
    const storageMap = {
      "Dairy & Eggs": "Refrigerate",
      "Fruits & Vegetables": "Room temperature or refrigerate",
      "Meat & Seafood": "Refrigerate or freeze",
      "Bakery": "Room temperature",
      "Pantry Staples": "Room temperature",
      "Beverages": "Room temperature or refrigerate",
      "Snacks": "Room temperature",
      "Frozen Foods": "Freeze"
    };
    return storageMap[category] || "Room temperature";
  };

  const getExpiryInfoForCategory = (category) => {
    const expiryMap = {
      "Dairy & Eggs": "Best before: 7 days from delivery",
      "Fruits & Vegetables": "Best before: 5 days from delivery",
      "Meat & Seafood": "Best before: 3 days from delivery",
      "Bakery": "Best before: 3 days from delivery",
      "Pantry Staples": "Best before: 1 year from delivery",
      "Beverages": "Best before: 6 months from delivery",
      "Snacks": "Best before: 3 months from delivery",
      "Frozen Foods": "Best before: 6 months from delivery"
    };
    return expiryMap[category] || "Best before: 7 days from delivery";
  };

  const getProductImages = (productData) => {
    const baseImage = productData.image || '/images/placeholder.jpg';
    return [
      baseImage,
      baseImage, // For now, use the same image multiple times
      baseImage,
      baseImage
    ];
  };

  const getHighlightsForProduct = (productData) => {
    const highlights = [
      "Premium Quality",
      "Fresh Daily",
      "Locally sourced when possible"
    ];

    if (productData.category === "Fruits & Vegetables") {
      highlights.push("Rich in vitamins and minerals", "Perfect for healthy eating");
    } else if (productData.category === "Dairy & Eggs") {
      highlights.push("High in protein", "Fresh from the farm");
    } else if (productData.category === "Meat & Seafood") {
      highlights.push("High quality protein", "Freshly prepared");
    }

    return highlights;
  };

  const getDescriptionForProduct = (productData) => {
    return `${productData.description}\n\nThis premium ${productData.name.toLowerCase()} from ${productData.brand} is carefully selected for quality and freshness. Perfect for your daily needs, this product offers excellent value and taste.`;
  };

  const getFeaturesForProduct = (productData) => {
    const features = ["Premium quality", "Fresh daily"];
    
    if (productData.inStock) {
      features.push("In stock and ready to ship");
    }
    
    if (productData.rating >= 4.5) {
      features.push("Highly rated by customers");
    }

    return features;
  };

  const getVariantsForProduct = (productData) => {
    return [
      { id: 1, name: "1 unit", priceModifier: 0 },
      { id: 2, name: "2 units", priceModifier: parseFloat((productData.price * 0.9).toFixed(2)) },
      { id: 3, name: "3 units", priceModifier: parseFloat((productData.price * 1.7).toFixed(2)) }
    ];
  };

  const getNutritionForProduct = (productData) => {
    return [
      { name: "Calories", amount: "100 kcal", dailyValue: "5%" },
      { name: "Protein", amount: "5g", dailyValue: "10%" },
      { name: "Fat", amount: "2g", dailyValue: "3%" },
      { name: "Carbohydrates", amount: "15g", dailyValue: "5%" },
      { name: "Fiber", amount: "3g", dailyValue: "12%" }
    ];
  };

  const getIngredientsForProduct = (productData) => {
    return [productData.name];
  };

  const getAllergensForProduct = (productData) => {
    const allergenMap = {
      "Dairy & Eggs": ["Dairy", "Eggs"],
      "Bakery": ["Gluten", "Wheat"],
      "Meat & Seafood": ["Fish", "Shellfish"]
    };
    return allergenMap[productData.category] || [];
  };

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!productId) {
          setError('Product ID is required');
          return;
        }

        // Find product in the data
        const foundProduct = productsData.products.find(p => p.id === parseInt(productId));
        
        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        // Transform the product data
        const transformedProduct = transformProductData(foundProduct);
        setProduct(transformedProduct);

        // Get related products (same category, different products)
        const related = productsData.products
          .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
          .slice(0, 4)
          .map(p => {
            const shouldShowDiscount = Math.random() > 0.7; // 30% chance of showing discount
            const originalPrice = shouldShowDiscount ? p.price * 1.15 : null;
            const discount = originalPrice ? Math.round(((originalPrice - p.price) / originalPrice) * 100) : 0;
            
            return {
              id: p.id,
              name: p.name,
              image: p.image || '/images/placeholder.jpg',
              price: { 
                current: p.price, 
                original: originalPrice
              },
              discount: discount,
              unit: getUnitForCategory(p.category),
              rating: p.rating,
              reviewCount: p.reviews
            };
          });

        setRelatedProducts(related);

      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product details');
      } finally {
      setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Generate dynamic breadcrumb items
  const getBreadcrumbItems = () => {
    if (!product) return [];
    
    return [
      { label: 'Home', path: '/home-dashboard', icon: 'Home' },
      { label: product.category, path: `/product-categories-browse?category=${encodeURIComponent(product.category)}`, icon: 'Grid' },
      { label: product.name, path: `/product-details?id=${productId}`, icon: 'Package', isActive: true }
    ];
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product-details?id=${productId}`);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={64} className="mx-auto text-error mb-4" />
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              {error}
            </h1>
            <p className="text-text-secondary mb-6">
              The product you're looking for could not be found.
            </p>
            <Link
              to="/product-categories-browse"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Icon name="Package" size={64} className="mx-auto text-text-secondary mb-4" />
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Product Not Found
            </h1>
            <p className="text-text-secondary mb-6">
              The product you're looking for could not be found.
            </p>
            <Link
              to="/product-categories-browse"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${product.name} | FreshCart`} description={`Details, reviews and offers for ${product.name}.`} />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb customItems={getBreadcrumbItems()} />

        {/* Back Button - Mobile */}
        <div className="lg:hidden mb-4">
          <Link
            to="/product-categories-browse"
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="font-body">Back to Products</span>
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          {/* Product Information & Actions */}
          <div className="space-y-8">
            <ProductInfo product={product} />
            <ProductActions 
              product={product}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts 
            products={relatedProducts}
            onProductClick={handleRelatedProductClick}
          />
        </div>
      </main>

      {/* Sticky Add to Cart - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <p className="text-sm font-body text-text-secondary">
              {product.name}
            </p>
            <p className="font-heading font-heading-bold text-lg text-primary">
              ${product.price.current.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`p-3 border rounded-lg transition-smooth ${
                isInWishlist(product.id) 
                  ? 'border-red-500 bg-red-50 text-red-500' 
                  : 'border-border hover:bg-gray-50'
              }`}
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                } else {
                  const wishlistItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price.current,
                    image: product.images[0],
                    brand: product.brand,
                    category: product.category,
                    unit: product.unit,
                    inStock: product.availability === 'In Stock',
                    rating: product.rating,
                    reviewCount: product.reviewCount
                  };
                  addToWishlist(wishlistItem);
                }
              }}
            >
              <Icon name="Heart" size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => {
                const cartItem = {
                  id: product.id,
                  name: product.name,
                  price: product.price.current,
                  image: product.images[0],
                  brand: product.brand,
                  category: product.category,
                  unit: product.unit,
                  quantity: 1,
                  inStock: product.availability === 'In Stock'
                };
                addToCart(cartItem, 1);
              }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body-medium hover:bg-primary/90 transition-smooth flex items-center space-x-2"
            >
              <Icon name="ShoppingCart" size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;