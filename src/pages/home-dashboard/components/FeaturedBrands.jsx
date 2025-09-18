import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import productsData from '../../../data/products.json';

const FeaturedBrands = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter featured brands from our dataset
    const featuredBrands = productsData.brands.filter(brand => brand.featured);
    setBrands(featuredBrands);
  }, []);

  const handleBrandClick = (brandName) => {
    navigate(`/search-results?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="bg-surface py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Featured Brands
        </h2>
        <p className="text-text-secondary font-body">
          Trusted partners bringing you quality products
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-card hover:border-primary transition-all duration-200 cursor-pointer group"
            onClick={() => handleBrandClick(brand.name)}
          >
            <div className="text-center">
              <div className="w-full h-16 mb-3 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon name="Store" size={24} className="text-text-secondary" />
                  </div>
                )}
              </div>
              <h3 className="font-heading font-semibold text-text-primary text-sm mb-1 group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs text-text-secondary font-caption leading-tight">
                {brand.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link 
          to="/brands" 
          className="text-primary font-body font-medium hover:underline transition-all duration-200"
        >
          View All Brands
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBrands;