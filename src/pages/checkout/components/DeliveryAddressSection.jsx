import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DeliveryAddressSection = ({ selectedAddress, onAddressSelect, onAddNewAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const savedAddresses = [
    {
      id: 1,
      type: 'home',
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      addressLine1: '123 Oak Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      addressLine1: '456 Business Ave',
      addressLine2: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false
    }
  ];

  const handleInputChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAddress = () => {
    if (newAddress.fullName && newAddress.phone && newAddress.addressLine1 && newAddress.city && newAddress.state && newAddress.zipCode) {
      const addressToSave = {
        ...newAddress,
        id: Date.now()
      };
      onAddNewAddress(addressToSave);
      setShowAddForm(false);
      setNewAddress({
        type: 'home',
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
      });
    }
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home': return 'Home';
      case 'work': return 'Building';
      default: return 'MapPin';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
          Delivery Address
        </h3>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add New
        </Button>
      </div>

      {/* Saved Addresses */}
      <div className="space-y-4 mb-6">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-card p-4 cursor-pointer transition-smooth ${
              selectedAddress?.id === address.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-button ${
                  selectedAddress?.id === address.id ? 'bg-primary text-primary-foreground' : 'bg-border-light'
                }`}>
                  <Icon name={getAddressTypeIcon(address.type)} size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-body font-body-medium text-text-primary capitalize">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="bg-success text-success-foreground text-xs font-caption px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="font-body font-body-medium text-text-primary mb-1">
                    {address.fullName}
                  </p>
                  <p className="text-sm text-text-secondary mb-1">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </p>
                  <p className="text-sm text-text-secondary mb-1">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {address.phone}
                  </p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedAddress?.id === address.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedAddress?.id === address.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Form */}
      {showAddForm && (
        <div className="border border-border rounded-card p-4 bg-border-light">
          <h4 className="font-body font-body-medium text-text-primary mb-4">
            Add New Address
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Address Type
              </label>
              <select
                value={newAddress.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={newAddress.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={newAddress.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Address Line 1 *
              </label>
              <Input
                type="text"
                placeholder="Street address"
                value={newAddress.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Address Line 2
              </label>
              <Input
                type="text"
                placeholder="Apartment, suite, etc."
                value={newAddress.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                City *
              </label>
              <Input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                State *
              </label>
              <Input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-caption text-text-secondary mb-2">
                ZIP Code *
              </label>
              <Input
                type="text"
                placeholder="ZIP Code"
                value={newAddress.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => handleInputChange('isDefault', e.target.checked)}
            />
            <label className="text-sm font-caption text-text-secondary">
              Set as default address
            </label>
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <Button variant="primary" onClick={handleSaveAddress}>
              Save Address
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSection;