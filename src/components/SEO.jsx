import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title = 'FreshCart - Modern React E-commerce Theme',
  description = 'Premium React e-commerce theme with modern design, responsive layout, and complete shopping functionality. Perfect for online stores, marketplaces, and retail websites.',
  keywords = 'react, ecommerce, theme, shopping cart, online store, marketplace, retail, responsive, modern',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  author = 'Kayease Global',
  robots = 'index, follow',
  canonical = '',
  structuredData = null
}) => {
  // Vite uses import.meta.env for env variables; REACT_APP_* not auto injected
  const siteUrl = (import.meta.env.VITE_SITE_URL || import.meta.env.VITE_APP_SITE_URL || 'https://freshcart-theme.com');
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="FreshCart" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@freshcart" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2D7D32" />
      <meta name="msapplication-TileColor" content="#2D7D32" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Pre-built SEO configurations
export const ProductSEO = ({ product }) => {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `${window.location.origin}/product-details?id=${product.id}`,
      "priceCurrency": "USD",
      "price": product.price.current,
      "availability": product.availability === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <SEO
      title={`${product.name} - ${product.brand} | FreshCart`}
      description={`Buy ${product.name} from ${product.brand}. ${product.description.substring(0, 150)}...`}
      keywords={`${product.name}, ${product.brand}, organic, fresh, grocery, online shopping`}
      type="product"
      structuredData={structuredData}
    />
  );
};

export const CategorySEO = ({ category, productCount }) => (
  <SEO
    title={`${category} - Fresh Products | FreshCart`}
    description={`Shop fresh ${category.toLowerCase()} online. Browse ${productCount}+ premium quality products with fast delivery.`}
    keywords={`${category}, fresh ${category.toLowerCase()}, organic, grocery, online shopping`}
  />
);

export default SEO;