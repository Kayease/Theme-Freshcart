import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryAddressSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = () => {
    if (formData.address && formData.city && formData.state && formData.zipCode) {
      const newAddress = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0
      };
      setAddresses(prev => [...prev, newAddress]);
      setFormData({ type: 'Home', address: '', city: '', state: '', zipCode: '' });
      setShowAddForm(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setFormData({
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode
    });
  };

  const handleSaveEdit = () => {
    setAddresses(prev => prev.map(addr => 
      addr.id === editingAddress ? { ...addr, ...formData } : addr
    ));
    setEditingAddress(null);
    setFormData({ type: 'Home', address: '', city: '', state: '', zipCode: '' });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Delivery Addresses
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Address</span>
        </Button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-card p-4 ${
              address.isDefault ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            {editingAddress === address.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-text-primary mb-2">
                      Address Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-text-primary mb-2">
                      Street Address
                    </label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-text-primary mb-2">
                      City
                    </label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-text-primary mb-2">
                        State
                      </label>
                      <Input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-text-primary mb-2">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingAddress(null);
                      setFormData({ type: 'Home', address: '', city: '', state: '', zipCode: '' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-body font-medium text-text-primary">
                        {address.type}
                      </span>
                      {address.isDefault && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      {address.address}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="text-primary hover:bg-primary/10"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="mt-6 border border-border rounded-card p-4">
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Add New Address
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Address Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Street Address
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  City
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    State
                  </label>
                  <Input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-text-primary mb-2">
                    ZIP Code
                  </label>
                  <Input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ type: 'Home', address: '', city: '', state: '', zipCode: '' });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddAddress}
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSection;