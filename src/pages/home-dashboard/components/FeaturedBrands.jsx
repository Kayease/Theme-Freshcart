import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import productsData from '../../../data/products.json';

const FeaturedBrands = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter featured brands from our dataset and add creative styling
    const featuredBrands = productsData.brands.filter(brand => brand.featured).map(brand => ({
      ...brand,
      icon: getBrandIcon(brand.name),
      color: getBrandColor(brand.name),
      gradient: getBrandGradient(brand.name)
    }));
    setBrands(featuredBrands);
  }, []);

  // Get brand-specific icons
  const getBrandIcon = (brandName) => {
    const iconMap = {
      'FreshMart': 'ShoppingCart',
      'Organic Valley': 'Leaf',
      'Farm Fresh': 'Sun',
      'Green Garden': 'Flower',
      'Healthy Choice': 'Heart',
      'Premium Foods': 'Crown',
      'Natural Harvest': 'TreePine',
      'Golden Fields': 'Wheat',
      'Ocean Fresh': 'Fish',
      'Mountain View': 'Mountain',
      'Sunrise Farms': 'Sunrise',
      'Garden Fresh': 'Sprout',
      'Pure Life': 'Droplet',
      'Eco Friendly': 'Recycle',
      'Farm to Table': 'Truck'
    };
    return iconMap[brandName] || 'Store';
  };

  // Get brand-specific colors
  const getBrandColor = (brandName) => {
    const colorMap = {
      'FreshMart': 'text-green-600',
      'Organic Valley': 'text-emerald-600',
      'Farm Fresh': 'text-orange-600',
      'Green Garden': 'text-lime-600',
      'Healthy Choice': 'text-red-600',
      'Premium Foods': 'text-purple-600',
      'Natural Harvest': 'text-amber-600',
      'Golden Fields': 'text-yellow-600',
      'Ocean Fresh': 'text-blue-600',
      'Mountain View': 'text-slate-600',
      'Sunrise Farms': 'text-pink-600',
      'Garden Fresh': 'text-teal-600',
      'Pure Life': 'text-cyan-600',
      'Eco Friendly': 'text-green-500',
      'Farm to Table': 'text-indigo-600'
    };
    return colorMap[brandName] || 'text-gray-600';
  };

  // Get brand-specific gradient backgrounds
  const getBrandGradient = (brandName) => {
    const gradientMap = {
      'FreshMart': 'from-green-50 to-emerald-50',
      'Organic Valley': 'from-emerald-50 to-green-50',
      'Farm Fresh': 'from-orange-50 to-amber-50',
      'Green Garden': 'from-lime-50 to-green-50',
      'Healthy Choice': 'from-red-50 to-pink-50',
      'Premium Foods': 'from-purple-50 to-violet-50',
      'Natural Harvest': 'from-amber-50 to-yellow-50',
      'Golden Fields': 'from-yellow-50 to-orange-50',
      'Ocean Fresh': 'from-blue-50 to-cyan-50',
      'Mountain View': 'from-slate-50 to-gray-50',
      'Sunrise Farms': 'from-pink-50 to-rose-50',
      'Garden Fresh': 'from-teal-50 to-cyan-50',
      'Pure Life': 'from-cyan-50 to-blue-50',
      'Eco Friendly': 'from-green-50 to-emerald-50',
      'Farm to Table': 'from-indigo-50 to-purple-50'
    };
    return gradientMap[brandName] || 'from-gray-50 to-slate-50';
  };

  const handleBrandClick = (brandName) => {
    navigate(`/search-results?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
          🌟 Featured Brands
        </h2>
        <p className="text-text-secondary font-body text-lg">
          Trusted partners bringing you quality products
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`bg-gradient-to-br ${brand.gradient} border border-white/20 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
            onClick={() => handleBrandClick(brand.name)}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div className="text-center relative z-10">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/80 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <Icon
                  name={brand.icon}
                  size={28}
                  className={`${brand.color} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <h3 className={`font-heading font-bold text-text-primary text-sm mb-2 group-hover:${brand.color.replace('text-', 'text-')} transition-colors duration-300`}>
                {brand.name}
              </h3>
              <p className="text-xs text-text-secondary font-caption leading-tight mb-3">
                {brand.description}
              </p>
              <div className="flex items-center justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${i < 4 ? brand.color.replace('text-', 'bg-') : 'bg-gray-300'} group-hover:scale-125 transition-transform duration-200`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrands;