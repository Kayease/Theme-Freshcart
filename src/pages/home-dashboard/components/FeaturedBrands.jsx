import React from 'react';
import Image from '../../../components/AppImage';

const FeaturedBrands = () => {
  const brands = [
    {
      id: 1,
      name: "Organic Valley",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop",
      description: "Premium organic dairy products"
    },
    {
      id: 2,
      name: "Fresh Farms",
      logo: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?w=120&h=80&fit=crop",
      description: "Farm-fresh produce daily"
    },
    {
      id: 3,
      name: "Ocean\'s Best",
      logo: "https://images.pixabay.com/photo/2016/11/30/15/00/fishing-boat-1873078_1280.jpg?w=120&h=80&fit=crop",
      description: "Premium seafood selection"
    },
    {
      id: 4,
      name: "Baker\'s Choice",
      logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=80&fit=crop",
      description: "Artisan breads & pastries"
    },
    {
      id: 5,
      name: "Green Garden",
      logo: "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?w=120&h=80&fit=crop",
      description: "Organic vegetables & herbs"
    },
    {
      id: 6,
      name: "Pure Pantry",
      logo: "https://images.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_1280.jpg?w=120&h=80&fit=crop",
      description: "Premium pantry essentials"
    }
  ];

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
          >
            <div className="text-center">
              <div className="w-full h-16 mb-3 overflow-hidden rounded-lg bg-gray-50">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
        <button className="text-primary font-body font-medium hover:underline transition-all duration-200">
          View All Brands
        </button>
      </div>
    </div>
  );
};

export default FeaturedBrands;