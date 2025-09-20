import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HeroSlider from './components/HeroSlider';
import CategoryCards from './components/CategoryCards';
import FeaturedBrands from './components/FeaturedBrands';
import PopularProducts from './components/PopularProducts';
import RecentlyPurchased from './components/RecentlyPurchased';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';

const HomeStyle1 = () => {

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Home | FreshCart" description="Discover fresh products, featured brands, and popular picks." />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Breadcrumb />

        <section className="mb-12">
          <HeroSlider />
        </section>

        {/* Enhanced Categories */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
              🛒 Shop by Category
            </h2>
            <p className="text-text-secondary font-body">
              Discover fresh products in every category
            </p>
          </div>
          <CategoryCards />
        </section>

        <section className="mb-12">
          <FeaturedBrands />
        </section>

        {/* Popular Products */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
              ⭐ Popular Products
            </h2>
            <p className="text-text-secondary font-body">
              Most loved items by our customers
            </p>
          </div>
          <PopularProducts />
        </section>

        {/* Buy Again */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  🔄 Buy Again
                </h2>
                <p className="text-text-secondary font-body">
                  Items you've purchased recently
                </p>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                View All →
              </button>
            </div>
            <RecentlyPurchased />
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-heading font-bold mb-3">
              📧 Stay Updated with Fresh Deals
            </h2>
            <p className="font-body mb-6 opacity-90 text-lg">
              Get exclusive offers, seasonal recipes, and fresh product updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:flex-1 px-4 py-3 rounded-lg text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
              />
              <button className="w-full sm:w-auto bg-white text-primary font-body font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default HomeStyle1;