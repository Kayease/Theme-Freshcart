import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getAvailabilityColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'text-success';
      case 'low stock':
        return 'text-warning';
      case 'out of stock':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'CheckCircle';
      case 'low stock':
        return 'AlertTriangle';
      case 'out of stock':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-text-primary mb-2">
          {product.name}
        </h1>
        <p className="text-text-secondary font-body text-sm">
          Brand: <span className="font-body-medium">{product.brand}</span>
        </p>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-heading font-heading-bold text-primary">
            ${product.price.current}
          </span>
          {product.price.original && product.price.original !== product.price.current && (
            <span className="text-lg text-text-secondary line-through">
              ${product.price.original}
            </span>
          )}
          {product.discount && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-body-medium">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-text-secondary text-sm font-body">
          Unit: {product.unit} | Price per {product.priceUnit}: ${product.pricePerUnit}
        </p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-text-primary font-body-medium ml-2">
            {product.rating}
          </span>
        </div>
        <span className="text-text-secondary text-sm font-body">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={getAvailabilityIcon(product.availability)} 
          size={18} 
          className={getAvailabilityColor(product.availability)}
        />
        <span className={`font-body-medium ${getAvailabilityColor(product.availability)}`}>
          {product.availability}
        </span>
        {product.availability.toLowerCase() === 'low stock' && (
          <span className="text-text-secondary text-sm font-body">
            (Only {product.stockCount} left)
          </span>
        )}
      </div>

      {/* Product Highlights */}
      {product.highlights && product.highlights.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-heading font-heading-semibold text-text-primary">
            Key Features
          </h3>
          <ul className="space-y-1">
            {product.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm font-body text-text-secondary">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Origin and Storage Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary" />
          <div>
            <p className="text-xs font-caption text-text-secondary">Origin</p>
            <p className="text-sm font-body-medium text-text-primary">{product.origin}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Thermometer" size={16} className="text-text-secondary" />
          <div>
            <p className="text-xs font-caption text-text-secondary">Storage</p>
            <p className="text-sm font-body-medium text-text-primary">{product.storage}</p>
          </div>
        </div>
      </div>

      {/* Expiry Information */}
      {product.expiryInfo && (
        <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <Icon name="Calendar" size={16} className="text-yellow-600" />
          <div>
            <p className="text-sm font-body-medium text-yellow-800">
              {product.expiryInfo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;