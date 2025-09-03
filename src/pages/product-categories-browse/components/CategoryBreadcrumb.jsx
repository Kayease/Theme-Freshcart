import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryBreadcrumb = ({ category, subcategory }) => {
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Categories', path: '/product-categories-browse', icon: 'Grid3X3' }
  ];

  if (category) {
    breadcrumbItems.push({
      label: category,
      path: `/product-categories-browse?category=${encodeURIComponent(category)}`,
      icon: 'Package'
    });
  }

  if (subcategory) {
    breadcrumbItems.push({
      label: subcategory,
      path: `/product-categories-browse?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`,
      icon: 'Package',
      isActive: true
    });
  } else if (category) {
    breadcrumbItems[breadcrumbItems.length - 1].isActive = true;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption py-3 overflow-x-auto bg-background" aria-label="Category Breadcrumb">
      <ol className="flex items-center space-x-2 min-w-max">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-text-secondary mx-2 flex-shrink-0" 
              />
            )}
            
            {item.isActive ? (
              <span className="flex items-center space-x-1 text-primary font-caption-normal">
                <Icon name={item.icon} size={14} />
                <span className="truncate">{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name={item.icon} size={14} />
                <span className="truncate hover:underline">{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;