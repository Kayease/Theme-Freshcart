import React from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';


const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-card animate-pulse">
            <div className="aspect-square bg-border-light rounded-t-card"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-border-light rounded"></div>
              <div className="h-3 bg-border-light rounded w-3/4"></div>
              <div className="h-4 bg-border-light rounded w-1/2"></div>
              <div className="h-8 bg-border-light rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-border-light rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="font-heading font-heading-bold text-lg text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-text-secondary font-caption">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;