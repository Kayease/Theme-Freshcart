import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import profileStorage from '../../utils/profileStorage';
import { useAuth } from '../../contexts/AuthContext';
import ToastContainer from '../../components/ui/ToastContainer';
import PersonalInfoSection from './components/PersonalInfoSection';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import AccountSecuritySection from './components/AccountSecuritySection';

const UserProfileAccountSettings = () => {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get('section') || 'personal';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { toast } = useAuth();
  const { toasts, removeToast } = toast;

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
    { key: 'security', label: 'Account Security', icon: 'Shield' }
  ];

  // In the theme, pull user info from local session storage if available
  const [userInfo, setUserInfo] = useState({ name: 'Guest User', email: '', profileImage: null, firstName: '', lastName: '', phone: '', dateOfBirth: '' });
  useEffect(() => {
    const load = () => {
      try {
        const base = (() => {
          const raw = localStorage.getItem('user');
          return raw ? JSON.parse(raw) : {};
        })();
        const stored = profileStorage.getStoredProfile() || {};
        const merged = { ...base, ...stored };
        const names = (merged.name || '').trim().split(' ');
        const first = merged.firstName || names[0] || '';
        const last = merged.lastName || names.slice(1).join(' ') || '';
        const next = {
          name: merged.name || [first, last].filter(Boolean).join(' ') || 'Guest User',
          email: merged.email || '',
          profileImage: merged.profileImage || null,
          firstName: first,
          lastName: last,
          phone: merged.phone || '',
          dateOfBirth: merged.dateOfBirth || ''
        };
        setUserInfo(next);
        // compute completion: 5 inputs
        const filled = [next.firstName, next.lastName, next.email, next.phone, next.dateOfBirth].filter(v => v && String(v).trim().length > 0).length;
        setProfileCompletion(Math.round((filled / 5) * 100));
      } catch { }
    };
    load();
    const onChange = () => load();
    window.addEventListener('storage', onChange);
    window.addEventListener('profile:updated', onChange);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('profile:updated', onChange);
    };
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'addresses':
        return <DeliveryAddressSection />;
      case 'payment':
        return <PaymentMethodsSection />;
      case 'security':
        return <AccountSecuritySection />;
      default:
        return <PersonalInfoSection />;
    }
  };


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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border border-border bg-border/40">
                    {userInfo.profileImage ? (
                      <img src={userInfo.profileImage} alt={userInfo.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="User" size={24} className="text-text-secondary" />
                    )}
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
                </div>
              </div>

              {/* Navigation */}
              <nav className="bg-surface border border-border rounded-card p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-button text-sm font-body transition-colors ${activeSection === item.key
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
                    className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-body transition-colors ${activeSection === item.key
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default UserProfileAccountSettings;