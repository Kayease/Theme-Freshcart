import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import NotificationPreferencesSection from './components/NotificationPreferencesSection';
import AccountSecuritySection from './components/AccountSecuritySection';

const UserProfileAccountSettings = () => {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get('section') || 'personal';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [profileCompletion] = useState(85);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && sidebarItems.some(item => item.key === section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const sidebarItems = [
    { key: 'personal', label: 'Personal Information', icon: 'User' },
    { key: 'addresses', label: 'Delivery Addresses', icon: 'MapPin' },
    { key: 'payment', label: 'Payment Methods', icon: 'CreditCard' },
    { key: 'notifications', label: 'Notifications', icon: 'Bell' },
    { key: 'security', label: 'Account Security', icon: 'Shield' },
    { key: 'preferences', label: 'Preferences', icon: 'Settings' }
  ];

  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    memberSince: '2023'
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'addresses':
        return <DeliveryAddressSection />;
      case 'payment':
        return <PaymentMethodsSection />;
      case 'notifications':
        return <NotificationPreferencesSection />;
      case 'security':
        return <AccountSecuritySection />;
      case 'preferences':
        return <PreferencesSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  const PreferencesSection = () => (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Shopping Preferences
          </h2>
        </div>
        <div className="space-y-4">
          <div className="border border-border rounded-card p-4">
            <h3 className="text-base font-heading font-semibold text-text-primary mb-2">
              Dietary Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Organic', 'Halal', 'Kosher'].map((diet) => (
                <button
                  key={diet}
                  className="px-3 py-1 text-sm border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-card p-4">
            <h3 className="text-base font-heading font-semibold text-text-primary mb-2">
              Favorite Stores
            </h3>
            <div className="space-y-2">
              {['Whole Foods Market', 'Trader Joe\'s', 'Safeway'].map((store) => (
                <div key={store} className="flex items-center justify-between p-2 hover:bg-border/30 rounded">
                  <span className="text-sm text-text-primary">{store}</span>
                  <Icon name="Heart" size={16} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb />
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-nav-height space-y-6">
              {/* Profile Card */}
              <div className="bg-surface border border-border rounded-card p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={24} className="text-primary-foreground" />
                  </div>
                  <h2 className="text-lg font-heading font-semibold text-text-primary">
                    {userInfo.name}
                  </h2>
                  <p className="text-sm text-text-secondary mb-4">
                    {userInfo.email}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-text-primary mb-2">
                      <span>Profile Completion</span>
                      <span>{profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${profileCompletion}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Member since {userInfo.memberSince}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="bg-surface border border-border rounded-card p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-button text-sm font-body transition-colors ${
                          activeSection === item.key
                            ? 'bg-primary text-primary-foreground'
                            : 'text-text-primary hover:bg-border/50 hover:text-primary'
                        }`}
                      >
                        <Icon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-6">
            <div className="bg-surface border border-border rounded-card p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-heading font-semibold text-text-primary">
                    {userInfo.name}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {userInfo.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-body transition-colors ${
                      activeSection === item.key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-primary hover:bg-border/50 hover:text-primary'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {renderActiveSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileAccountSettings;