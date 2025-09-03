import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';
import Footer from '../../components/ui/Footer';
import { IMAGES } from '../../utils/imageMap';
const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Organic Gala Apples",
    brand: "Fresh Farms",
    price: {
      current: 4.99,
      original: 5.99,
    },
    discount: 17,
    unit: "2 lbs bag",
    priceUnit: "lb",
    pricePerUnit: 2.50,
    rating: 4.6,
    reviewCount: 75,
    availability: "In Stock",
    stockCount: 25,
    maxQuantity: 10,
    origin: "Washington, USA",
    storage: "Refrigerate",
    expiryInfo: "Best before: 7 days from delivery",
    images: [
      IMAGES.PRODUCTS.APPLES,
      IMAGES.PRODUCTS.HONEYCRISP_APPLES,
      IMAGES.PRODUCTS.BANANAS,
      IMAGES.PRODUCTS.APPLES
    ],
    highlights: [
      "USDA Organic Certified",
      "Non-GMO Project Verified",
      "Locally sourced when possible",
      "Perfect for snacking and baking",
      "Rich in fiber and vitamin C"
    ],
    description: `Our premium organic Gala apples are hand-picked at peak ripeness to ensure maximum flavor and nutritional value. These crisp, sweet apples are perfect for snacking, lunch boxes, or your favorite recipes. Grown without synthetic pesticides or fertilizers, our organic apples are not only delicious but also better for you and the environment.\n\nGala apples are known for their distinctive sweet flavor with hints of vanilla and their satisfying crunch. They're an excellent source of dietary fiber, vitamin C, and antioxidants. Whether you're enjoying them fresh or using them in your favorite apple pie recipe, these organic Gala apples will exceed your expectations.`,
    features: [
      "Hand-picked at peak ripeness",
      "Grown without synthetic pesticides",
      "Perfect balance of sweet and tart",
      "Excellent for both eating and cooking",
      "Sustainably farmed"
    ],
    variants: [
      { id: 1, name: "2 lbs", priceModifier: 0 },
      { id: 2, name: "5 lbs", priceModifier: 2.50 },
      { id: 3, name: "10 lbs", priceModifier: 4.99 }
    ],
    nutrition: [
      { name: "Calories", amount: "52 kcal", dailyValue: "3%" },
      { name: "Carbohydrates", amount: "14g", dailyValue: "5%" },
      { name: "Dietary Fiber", amount: "2.4g", dailyValue: "10%" },
      { name: "Sugars", amount: "10g", dailyValue: "-" },
      { name: "Protein", amount: "0.3g", dailyValue: "1%" },
      { name: "Fat", amount: "0.2g", dailyValue: "0%" },
      { name: "Vitamin C", amount: "4.6mg", dailyValue: "8%" },
      { name: "Potassium", amount: "107mg", dailyValue: "3%" }
    ],
    ingredients: [
      "Organic Gala Apples"
    ],
    allergens: []
  };

  // Mock related products
  const mockRelatedProducts = [
    {
      id: 2,
      name: "Organic Honeycrisp Apples",
      image: IMAGES.PRODUCTS.HONEYCRISP_APPLES,
      price: { current: 5.99, original: 6.99 },
      discount: 14,
      unit: "2 lbs bag",
      rating: 4.8,
      reviewCount: 92
    },
    {
      id: 3,
      name: "Organic Bananas",
      image: IMAGES.PRODUCTS.BANANAS,
      price: { current: 2.99, original: null },
      unit: "2 lbs bunch",
      rating: 4.5,
      reviewCount: 156
    },
    {
      id: 4,
      name: "Organic Oranges",
      image: IMAGES.PRODUCTS.ORANGES,
      price: { current: 4.49, original: 4.99 },
      discount: 10,
      unit: "3 lbs bag",
      rating: 4.4,
      reviewCount: 68
    },
    {
      id: 5,
      name: "Organic Grapes",
      image: IMAGES.PRODUCTS.GRAPES,
      price: { current: 6.99, original: null },
      unit: "2 lbs bag",
      rating: 4.7,
      reviewCount: 84
    }
  ];

  // Custom breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Fresh Produce', path: '/product-categories-browse', icon: 'Apple' },
    { label: 'Fruits', path: '/product-categories-browse?category=fruits', icon: 'Cherry' },
    { label: mockProduct.name, path: `/product-details?id=${productId}`, icon: 'Package', isActive: true }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = async (cartData) => {
    console.log('Adding to cart:', cartData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Product added to cart successfully!');
  };

  const handleAddToWishlist = (product, isAdding) => {
    console.log(isAdding ? 'Adding to wishlist:' : 'Removing from wishlist:', product);
    alert(isAdding ? 'Added to wishlist!' : 'Removed from wishlist!');
  };

  const handleRelatedProductAddToCart = (product) => {
    console.log('Adding related product to cart:', product);
    alert(`${product.name} added to cart!`);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb customItems={breadcrumbItems} />

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
              images={mockProduct.images} 
              productName={mockProduct.name} 
            />
          </div>

          {/* Product Information & Actions */}
          <div className="space-y-8">
            <ProductInfo product={mockProduct} />
            <ProductActions 
              product={mockProduct}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={mockProduct} />
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews product={mockProduct} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts 
            products={mockRelatedProducts}
            onAddToCart={handleRelatedProductAddToCart}
          />
        </div>
      </main>

      {/* Sticky Add to Cart - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <p className="text-sm font-body text-text-secondary">
              {mockProduct.name}
            </p>
            <p className="font-heading font-heading-bold text-lg text-primary">
              ${mockProduct.price.current}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAddToWishlist(mockProduct, true)}
              className="p-3 border border-border rounded-lg hover:bg-gray-50 transition-smooth"
            >
              <Icon name="Heart" size={20} />
            </button>
            <button
              onClick={() => handleAddToCart({ product: mockProduct, quantity: 1 })}
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