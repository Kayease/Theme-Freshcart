// Local image mapping - Use this instead of external URLs
export const IMAGES = {
  // Products
  PRODUCTS: {
    AVOCADOS: '/images/products/avocados.jpg',
    SALMON: '/images/products/salmon.jpg',
    HONEY: '/images/products/honey.jpg',
    BREAD: '/images/products/bread.jpg',
    BANANAS: '/images/products/bananas.jpg',
    MILK: '/images/products/milk.jpg',
    EGGS: '/images/products/eggs.jpg',
    APPLES: '/images/products/apples.jpg',
    YOGURT: '/images/products/yogurt.jpg',
    OLIVE_OIL: '/images/products/olive-oil.jpg',
    HONEYCRISP_APPLES: '/images/products/honeycrisp-apples.jpg',
    ORANGES: '/images/products/oranges.jpg',
    GRAPES: '/images/products/grapes.jpg'
  },
  
  // Categories
  CATEGORIES: {
    FRESH_FRUITS: '/images/categories/fresh-fruits.jpg',
    VEGETABLES: '/images/categories/vegetables.jpg',
    DAIRY: '/images/categories/dairy.jpg',
    DAIRY_EGGS: '/images/categories/dairy-eggs.jpg',
    MEAT_SEAFOOD: '/images/categories/meat-seafood.jpg',
    BEVERAGES: '/images/categories/beverages.jpg',
    SNACKS: '/images/categories/snacks.jpg',
    HEALTH_BEAUTY: '/images/categories/health-beauty.jpg'
  },
  
  // Banners
  BANNERS: {
    HERO_GROCERIES: '/images/banners/hero-groceries.jpg',
    HERO_GROCERIES_SQUARE: '/images/banners/hero-groceries-square.jpg',
    HERO_GROCERIES_WIDE: '/images/banners/hero-groceries-wide.jpg'
  }
};

// Helper function to get image path
export const getImage = (category, name) => {
  return IMAGES[category]?.[name] || '/images/placeholder.svg';
};

export default IMAGES;