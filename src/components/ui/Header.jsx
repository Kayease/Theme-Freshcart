import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import SearchWithAutocomplete from './SearchWithAutocomplete';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { isAuthenticated, user, logout, cartItemCount, wishlistCount } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);
  const homeDropdownRef = useRef(null);

  const homeStyles = [
    { name: 'Classic Layout', path: '/home-dashboard-1', icon: '🏪', desc: 'Traditional design' },
    { name: 'Modern Gradient', path: '/home-dashboard-2', icon: '🎨', desc: 'Contemporary style' },
    { name: 'Minimal Clean', path: '/home-dashboard-3', icon: '✨', desc: 'Clean & minimal' },
    { name: 'Deal Focused', path: '/home-dashboard-4', icon: '🔥', desc: 'E-commerce deals' }
  ];

  const navigationItems = [
    { name: 'Home', path: '/home-dashboard', icon: 'Home', hasDropdown: true },
    // { name: 'Documentation', path: '/documentation', icon: 'BookOpen' },
    { name: 'Categories', path: '/product-categories-browse', icon: 'Grid3X3' },
    { name: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart', count: cartItemCount },
    { name: 'Orders', path: '/order-history-tracking', icon: 'Package' },
    { name: 'Wishlist', path: '/wishlist-saved-items', icon: 'Heart', count: wishlistCount },
  ];

  const userMenuItems = [
    {
      name: 'Profile',
      icon: 'User',
      action: () => navigate('/user-profile-account-settings')
    },
    {
      name: 'Help',
      icon: 'HelpCircle',
      action: () => navigate('/help')
    },
    {
      name: 'Logout',
      icon: 'LogOut',
      action: () => {
        logout();
        setIsUserDropdownOpen(false);
      }
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (homeDropdownRef.current && !homeDropdownRef.current.contains(event.target)) {
        setIsHomeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SearchWithAutocomplete handles submission and dropdown; keep state for mobile toggle only

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-nav bg-surface border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-nav-height-mobile lg:h-nav-height">

          {/* Logo */}
          <div className="flex items-center gap-x-4">
            <Link to="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="font-heading font-heading-bold text-xl text-primary hidden sm:block">
                FreshCart
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-16">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.path} className="relative" ref={homeDropdownRef}>
                  <button
                    onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-body font-body-medium transition-smooth hover:bg-border-light ${isActivePath(item.path)
                      ? 'text-primary bg-border-light' : 'text-text-primary hover:text-primary'
                      }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.name}</span>
                    <Icon name="ChevronDown" size={14} />
                  </button>

                  {isHomeDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-surface border border-border rounded-card shadow-modal z-dropdown">
                      <div className="py-2">
                        {homeStyles.map((style, index) => (
                          <Link
                            key={index}
                            to={style.path}
                            onClick={() => setIsHomeDropdownOpen(false)}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-text-primary hover:bg-border-light hover:text-primary transition-smooth"
                          >
                            <span className="text-lg">{style.icon}</span>
                            <div>
                              <div className="font-medium">{style.name}</div>
                              <div className="text-xs text-text-secondary">{style.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-body font-body-medium transition-smooth hover:bg-border-light ${isActivePath(item.path)
                    ? 'text-primary bg-border-light' : 'text-text-primary hover:text-primary'
                    }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                  {item.count > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-data font-data-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                      {item.count}
                    </span>
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* Search Bar - Desktop with autocomplete */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8" ref={searchRef}>
            <SearchWithAutocomplete className="w-full" />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="lg:hidden p-2 text-text-primary hover:text-primary transition-smooth"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* Cart Icon - Mobile */}
            <Link
              to="/shopping-cart"
              className="lg:hidden relative p-2 text-text-primary hover:text-primary transition-smooth"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-data font-data-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-text-primary hover:text-primary transition-smooth"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={16} color="white" />
                    )}
                  </div>
                  <Icon name="ChevronDown" size={16} className="hidden sm:block" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-modal z-dropdown">
                    <div className="py-2">
                      {userMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            item.action();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-text-primary hover:bg-border-light hover:text-primary transition-smooth"
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-body font-body-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              >
                <Icon name="LogIn" size={18} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-text-primary hover:text-primary transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="lg:hidden pb-4" ref={searchRef}>
            <SearchWithAutocomplete className="w-full" />
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border z-overlay">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.path}>
                  <div className="flex items-center space-x-3 px-4 py-3 text-base font-body font-body-medium text-text-primary">
                    <Icon name={item.icon} size={20} />
                    <span>{item.name}</span>
                  </div>
                  <div className="ml-8 space-y-1">
                    {homeStyles.map((style, index) => (
                      <Link
                        key={index}
                        to={style.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 rounded-card text-sm font-body transition-smooth text-text-secondary hover:bg-border-light hover:text-primary"
                      >
                        <span>{style.icon}</span>
                        <span>{style.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-card text-base font-body font-body-medium transition-smooth ${isActivePath(item.path)
                    ? 'text-primary bg-border-light' : 'text-text-primary hover:bg-border-light hover:text-primary'
                    }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                  {item.count > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-data font-data-medium px-2 py-1 rounded-full min-w-[20px] text-center ml-auto">
                      {item.count}
                    </span>
                  )}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;