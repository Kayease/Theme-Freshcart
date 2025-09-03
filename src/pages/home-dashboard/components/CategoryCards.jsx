import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { IMAGES } from '../../../utils/imageMap';

const CategoryCards = () => {
  const scrollRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Fresh Produce",
      icon: "Apple",
      image: IMAGES.CATEGORIES.FRESH_FRUITS,
      itemCount: "500+ items",
      color: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      icon: "Milk",
      image: IMAGES.CATEGORIES.DAIRY_EGGS,
      itemCount: "150+ items",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      name: "Meat & Seafood",
      icon: "Fish",
      image: IMAGES.CATEGORIES.MEAT_SEAFOOD,
      itemCount: "200+ items",
      color: "bg-red-100 text-red-700"
    },
    {
      id: 4,
      name: "Pantry Essentials",
      icon: "Package",
      image: IMAGES.CATEGORIES.VEGETABLES,
      itemCount: "800+ items",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 5,
      name: "Beverages",
      icon: "Coffee",
      image: IMAGES.CATEGORIES.BEVERAGES,
      itemCount: "300+ items",
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 6,
      name: "Snacks",
      icon: "Cookie",
      image: IMAGES.CATEGORIES.SNACKS,
      itemCount: "250+ items",
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: 7,
      name: "Frozen Foods",
      icon: "Snowflake",
      image: IMAGES.CATEGORIES.DAIRY,
      itemCount: "180+ items",
      color: "bg-cyan-100 text-cyan-700"
    },
    {
      id: 8,
      name: "Health & Beauty",
      icon: "Heart",
      image: IMAGES.CATEGORIES.HEALTH_BEAUTY,
      itemCount: "120+ items",
      color: "bg-pink-100 text-pink-700"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-surface">
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
            className="w-10 h-10 bg-border-light hover:bg-border rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-primary" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 bg-border-light hover:bg-border rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={20} className="text-text-primary" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/product-categories-browse?category=${encodeURIComponent(category.name)}`}
              className="flex-shrink-0 w-64 bg-surface border border-border rounded-lg hover:shadow-card transition-all duration-200 hover:border-primary group"
            >
              <div className="p-4">
                <div className="relative h-32 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
                    <Icon name={category.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-caption">
                      {category.itemCount}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-body font-medium">
                    Shop Now
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-primary group-hover:translate-x-1 transition-transform duration-200" 
                  />
                </div>
              </div>
            </Link>
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