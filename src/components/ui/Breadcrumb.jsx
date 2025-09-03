import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  // Default breadcrumb mapping based on routes
  const routeMapping = {
    '/home-dashboard': { label: 'Home', icon: 'Home' },
    '/product-categories-browse': { label: 'Categories', icon: 'Grid3X3' },
    '/product-details': { label: 'Product Details', icon: 'Package' },
    '/shopping-cart': { label: 'Shopping Cart', icon: 'ShoppingCart' },
    '/checkout': { label: 'Checkout', icon: 'CreditCard' },
    '/order-history-tracking': { label: 'Order History', icon: 'Package' },
  };

  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/home-dashboard', icon: 'Home' }];

    if (location.pathname !== '/home-dashboard') {
      const currentRoute = routeMapping[location.pathname];
      if (currentRoute) {
        breadcrumbs.push({
          label: currentRoute.label,
          path: location.pathname,
          icon: currentRoute.icon,
          isActive: true
        });
      }
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't render breadcrumbs on home page unless there are custom items
  if (location.pathname === '/home-dashboard' && !customItems) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption py-3 overflow-x-auto" aria-label="Breadcrumb">
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

export default Breadcrumb;