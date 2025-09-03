import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

// Minimal header used only on the marketing landing page
const LandingHeader = () => {
  return (
    <header className="w-full z-nav bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
            <Icon name="ShoppingBag" size={20} color="white" />
          </div>
            <span className="font-heading font-heading-bold text-lg text-text-primary group-hover:text-primary transition-colors hidden sm:inline">FreshCart</span>
        </Link>
        <nav className="flex items-center space-x-3">
          <Link
            to="/documentation"
            className="px-5 py-2.5 rounded-button bg-primary text-primary-foreground text-sm font-body font-body-medium shadow-card hover:bg-primary/90 transition-smooth"
          >
            Documentation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
