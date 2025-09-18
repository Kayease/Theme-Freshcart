import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Footer from '../../components/ui/Footer';
import Image from '../../components/AppImage';
import productsData from '../../data/products.json';
import SEO from '../../components/SEO';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get all brands from our dataset
    setBrands(productsData.brands);
  }, []);

  const handleBrandClick = (brandName) => {
    navigate(`/search?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Brands | FreshCart" description="Explore all our featured and partner brands." />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Breadcrumb />

        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              All Brands
            </h1>
            <p className="text-text-secondary font-body">
              Discover quality products from our trusted brand partners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-surface border border-border rounded-lg p-6 hover:shadow-card hover:border-primary transition-all duration-200 cursor-pointer group"
                onClick={() => handleBrandClick(brand.name)}
              >
                <div className="text-center">
                  <div className="w-full h-24 mb-4 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={brand.logo || '/images/placeholder.jpg'}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-text-secondary font-caption">
                    {brand.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrandsPage;