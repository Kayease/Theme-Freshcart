import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => (
  <footer className="bg-text-primary text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl">FreshCart</span>
          </div>
          <p className="text-gray-300 font-body text-sm leading-relaxed">
            Your trusted partner for fresh groceries delivered fast. Quality products, competitive prices, exceptional service.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/product-categories-browse" className="text-gray-300 hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="/shopping-cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link></li>
            <li><Link to="/order-history-tracking" className="text-gray-300 hover:text-white transition-colors">Orders</Link></li>
            <li><Link to="/wishlist-saved-items" className="text-gray-300 hover:text-white transition-colors">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
            <li><Link to="/help?section=contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/help?section=orders" className="text-gray-300 hover:text-white transition-colors">Delivery Info</Link></li>
            <li><Link to="/help?section=orders" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4">Contact Info</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📞 1-800-FRESH-99</p>
            <p>✉️ support@freshcart.com</p>
            <p>📍 123 Fresh Street, City, ST 12345</p>
            <p>🕒 Mon-Sun: 6AM - 11PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-300 text-sm font-caption">
          © {new Date().getFullYear()} FreshCart. All rights reserved. | Privacy Policy | Terms of Service
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;


