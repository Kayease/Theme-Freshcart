import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import productsData from '../../../data/products.json';

const CategoryCards = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Color mapping for categories
  const colorMap = {
    "Dairy & Eggs": "bg-blue-100 text-blue-700",
    "Fruits & Vegetables": "bg-green-100 text-green-700",
    "Meat & Seafood": "bg-red-100 text-red-700",
    "Bakery": "bg-yellow-100 text-yellow-700",
    "Pantry Staples": "bg-orange-100 text-orange-700",
    "Beverages": "bg-purple-100 text-purple-700",
    "Snacks": "bg-pink-100 text-pink-700",
    "Frozen Foods": "bg-cyan-100 text-cyan-700"
  };

  // Icon mapping for categories
  const iconMap = {
    "Dairy & Eggs": "Milk",
    "Fruits & Vegetables": "Apple",
    "Meat & Seafood": "Fish",
    "Bakery": "Cookie",
    "Pantry Staples": "Package",
    "Beverages": "Coffee",
    "Snacks": "Pizza",
    "Frozen Foods": "Snowflake"
  };

  useEffect(() => {
    // Get categories from our dataset and count products in each category
    const categoryCounts = {};
    productsData.products.forEach(product => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });

    // Format categories for display
    const formattedCategories = productsData.categories.map(category => ({
      id: category.id,
      name: category.name,
      icon: iconMap[category.name] || "Package",
      image: category.image || '/images/placeholder.jpg',
      itemCount: `${categoryCounts[category.name] || 0}+ items`,
      color: colorMap[category.name] || "bg-gray-100 text-gray-700"
    }));

    setCategories(formattedCategories);
  }, []);

  // const handleCategoryClick = (categoryName) => {
  //   navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  // };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/product-categories-browse?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Shop by Category
          </h2>
          <p className="text-text-secondary font-body mt-1">
            Find everything you need in one place
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border hover:bg-primary hover:text-white transition-colors"
          >
            <Icon name="ChevronLeft" className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border hover:bg-primary hover:text-white transition-colors"
          >
            <Icon name="ChevronRight" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 snap-x scroll-smooth"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="snap-start flex-shrink-0 w-[140px] sm:w-[180px] cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="bg-surface border border-border rounded-xl p-4 hover:shadow-card hover:border-primary transition-all duration-200 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                    <Icon name={category.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-text-secondary font-caption">
                    {category.itemCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile scroll indicators */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-2">
          {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-border rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;