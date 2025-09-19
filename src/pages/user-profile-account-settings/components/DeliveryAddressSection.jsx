import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';
import addressStorage from '../../../utils/addressStorage';
import { countries, getCountryName } from '../../../utils/countryStateData';

const DeliveryAddressSection = () => {
  const { toast } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    fullName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipCode: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // OTP verification modal state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpStep, setOtpStep] = useState('start'); // start | otp
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpGenerated, setOtpGenerated] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [otpBusy, setOtpBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'add' | 'edit' | 'delete'

  // Load addresses from local storage
  useEffect(() => {
    const storedAddresses = addressStorage.getStoredAddresses();
    setAddresses(storedAddresses);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Reset state when country changes
    if (field === 'country') {
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.address.trim()) {
      errors.address = 'Street address is required';
    } else if (formData.address.trim().length < 5) {
      errors.address = 'Street address must be at least 5 characters';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters';
    }

    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (!formData.state) {
      errors.state = 'State/Province is required';
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = 'ZIP/Postal code is required';
    } else {
      // Basic ZIP validation based on country
      const zipPatterns = {
        'US': /^\d{5}(-\d{4})?$/,
        'CA': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        'GB': /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/,
        'AU': /^\d{4}$/,
        'DE': /^\d{5}$/,
        'FR': /^\d{5}$/,
        'IT': /^\d{5}$/,
        'ES': /^\d{5}$/,
        'NL': /^\d{4} [A-Za-z]{2}$/,
        'BE': /^\d{4}$/,
        'CH': /^\d{4}$/
      };

      // Phone number validation (similar to PersonalInfoSection)
      if (formData.phone) {
        // Remove all non-digit except +
        const phone = formData.phone.trim();
        // Extract country code and national number
        let cc = '';
        let national = '';
        let e164 = '';
        if (phone.startsWith('+')) {
          // e.g. +12345678900
          const match = phone.match(/^\+(\d{1,3})(\d{6,15})$/);
          if (match) {
            cc = match[1];
            national = match[2];
            e164 = `+${cc}${national}`;
          } else {
            // Try to split country code and national number
            const ccMatch = phone.match(/^\+(\d{1,3})/);
            if (ccMatch) {
              cc = ccMatch[1];
              national = phone.replace('+' + cc, '').replace(/\D/g, '');
              e164 = `+${cc}${national}`;
            } else {
              national = phone.replace(/\D/g, '');
              e164 = `+${national}`;
            }
          }
        } else {
          // No +, treat as national number
          national = phone.replace(/\D/g, '');
          cc = '';
          e164 = `+${national}`;
        }
        const ccDigits = cc;
        if (!national) {
          errors.phone = 'Phone number is required';
        } else if (cc && (ccDigits.length < 1 || ccDigits.length > 3)) {
          errors.phone = 'Invalid country code';
        } else if (national.length < 6 || national.length > 14) {
          errors.phone = 'Enter a valid phone number';
        } else if (!/^\+\d{6,15}$/.test(e164)) {
          errors.phone = 'Enter a valid phone number';
        }
      }

      const pattern = zipPatterns[formData.country];
      if (pattern && !pattern.test(formData.zipCode.trim())) {
        errors.zipCode = 'Invalid ZIP/Postal code format for selected country';
      }
    }

    if (formData.phone && !/^[\+]?[\d\s\-\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Invalid phone number format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const startOtpVerification = (action) => {
    setPendingAction(action);
    setOtpOpen(true);
    setOtpStep('start');
    setOtpEmail('');
    setOtpCode('');
    setOtpGenerated('');
    setOtpMessage('');
  };

  const handleAddAddress = () => {
    if (!validateForm()) return;
    startOtpVerification('add');
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setFormData({
      type: address.type,
      fullName: address.fullName || '',
      address: address.address,
      address2: address.address2 || '',
      city: address.city,
      state: address.state,
      country: address.country || 'US',
      zipCode: address.zipCode,
      phone: address.phone || ''
    });
    setShowAddForm(false);
  };

  const handleSaveEdit = () => {
    if (!validateForm()) return;
    startOtpVerification('edit');
  };

  const handleDeleteAddress = (id) => {
    setPendingAction({ type: 'delete', id });
    startOtpVerification('delete');
  };

  const handleSetDefault = (id) => {
    const success = addressStorage.setDefaultAddress(id);
    if (success) {
      const updatedAddresses = addressStorage.getStoredAddresses();
      setAddresses(updatedAddresses);
      toast.success('Default address updated successfully');
    } else {
      toast.error('Failed to update default address');
    }
  };

  const executePendingAction = () => {
    if (!pendingAction) return;

    if (pendingAction === 'add') {
      const newAddress = addressStorage.addStoredAddress(formData);
      if (newAddress) {
        const updatedAddresses = addressStorage.getStoredAddresses();
        setAddresses(updatedAddresses);
        setFormData({
          type: 'Home',
          fullName: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          country: 'US',
          zipCode: '',
          phone: ''
        });
        setFormErrors({});
        setShowAddForm(false);
        toast.success('Address added successfully');
      } else {
        toast.error('Failed to add address');
      }
    } else if (pendingAction === 'edit') {
      const updatedAddress = addressStorage.updateStoredAddress(editingAddress, formData);
      if (updatedAddress) {
        const updatedAddresses = addressStorage.getStoredAddresses();
        setAddresses(updatedAddresses);
        setEditingAddress(null);
        setFormData({
          type: 'Home',
          fullName: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          country: 'US',
          zipCode: '',
          phone: ''
        });
        setFormErrors({});
        toast.success('Address updated successfully');
      } else {
        toast.error('Failed to update address');
      }
    } else if (pendingAction.type === 'delete') {
      const success = addressStorage.deleteStoredAddress(pendingAction.id);
      if (success) {
        const updatedAddresses = addressStorage.getStoredAddresses();
        setAddresses(updatedAddresses);
        toast.success('Address deleted successfully');
      } else {
        toast.error('Failed to delete address');
      }
    }

    setPendingAction(null);
  };

  const resetForm = () => {
    setFormData({
      type: 'Home',
      fullName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: 'US',
      zipCode: '',
      phone: ''
    });
    setFormErrors({});
    setShowAddForm(false);
    setEditingAddress(null);
  };


  return (
    <div className="space-y-6">
      {/* Address List */}
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

        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No delivery addresses added yet</p>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 mx-auto"
            >
              <Icon name="Plus" size={16} />
              <span>Add Your First Address</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-card p-4 ${address.isDefault ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
              >
                {editingAddress === address.id ? (
                  <div className="space-y-4">
                    <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
                      Edit Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          Address Type *
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
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter full name"
                          className={formErrors.fullName ? 'border-red-500' : ''}
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-sm text-error">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          Street Address *
                        </label>
                        <Input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter street address"
                          className={formErrors.address ? 'border-red-500' : ''}
                        />
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-error">{formErrors.address}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          Address Line 2
                        </label>
                        <Input
                          type="text"
                          value={formData.address2}
                          onChange={(e) => handleInputChange('address2', e.target.value)}
                          placeholder="Apartment, suite, unit, etc. (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          City *
                        </label>
                        <Input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter city"
                          className={formErrors.city ? 'border-red-500' : ''}
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-sm text-error">{formErrors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          Country *
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {countries.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          State/Province *
                        </label>
                        <Input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="Enter state/province"
                          className={formErrors.state ? 'border-red-500' : ''}
                        />
                        {formErrors.state && (
                          <p className="mt-1 text-sm text-error">{formErrors.state}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          ZIP/Postal Code *
                        </label>
                        <Input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="Enter ZIP/postal code"
                          className={formErrors.zipCode ? 'border-red-500' : ''}
                        />
                        {formErrors.zipCode && (
                          <p className="mt-1 text-sm text-error">{formErrors.zipCode}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-text-primary mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter phone number (optional)"
                          className={formErrors.phone ? 'border-red-500' : ''}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-error">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingAddress(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSaveEdit}
                        loading={submitting}
                        disabled={submitting}
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
                        {address.fullName && (
                          <p className="text-sm font-body-medium text-text-primary mb-1">
                            {address.fullName}
                          </p>
                        )}
                        <p className="text-sm text-text-secondary">
                          {address.address}
                        </p>
                        {address.address2 && (
                          <p className="text-sm text-text-secondary">
                            {address.address2}
                          </p>
                        )}
                        <p className="text-sm text-text-secondary">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {getCountryName(address.country)}
                        </p>
                        {address.phone && (
                          <p className="text-sm text-text-secondary">
                            {address.phone}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefault(address.id)}
                            className="text-primary hover:bg-primary hover:text-primary-foreground"
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
        )}
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
            Add New Address
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Address Type *
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
                  Full Name *
                </label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                  className={formErrors.fullName ? 'border-red-500' : ''}
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-sm text-error">{formErrors.fullName}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Street Address *
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                  className={formErrors.address ? 'border-red-500' : ''}
                />
                {formErrors.address && (
                  <p className="mt-1 text-sm text-error">{formErrors.address}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Address Line 2
                </label>
                <Input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleInputChange('address2', e.target.value)}
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  City *
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  className={formErrors.city ? 'border-red-500' : ''}
                />
                {formErrors.city && (
                  <p className="mt-1 text-sm text-error">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  State/Province *
                </label>
                <Input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state/province"
                  className={formErrors.state ? 'border-red-500' : ''}
                />
                {formErrors.state && (
                  <p className="mt-1 text-sm text-error">{formErrors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  ZIP/Postal Code *
                </label>
                <Input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Enter ZIP/postal code"
                  className={formErrors.zipCode ? 'border-red-500' : ''}
                />
                {formErrors.zipCode && (
                  <p className="mt-1 text-sm text-error">{formErrors.zipCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number (optional)"
                  className={formErrors.phone ? 'border-red-500' : ''}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-error">{formErrors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddAddress}
                loading={submitting}
                disabled={submitting}
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {otpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { if (!otpBusy) setOtpOpen(false); }}></div>
          <div className="relative bg-surface border border-border rounded-card shadow-modal w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">Verify Your Email</h3>
              <button onClick={() => { if (!otpBusy) setOtpOpen(false); }} className="text-text-secondary hover:text-text-primary" aria-label="Close">
                <Icon name="X" size={16} />
              </button>
            </div>
            {otpStep === 'start' && (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">To save this address, please confirm your email address.</p>
                <Input
                  type="email"
                  value={otpEmail}
                  onChange={(e) => { setOtpEmail(e.target.value.trim()); if (otpMessage) setOtpMessage(''); }}
                  placeholder="your@email.com"
                />
                {otpMessage && <p className="text-sm text-destructive">{otpMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOtpOpen(false)} disabled={otpBusy}>Cancel</Button>
                  <Button onClick={() => {
                    if (!otpEmail.trim()) { setOtpMessage('Please enter your email'); return; }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otpEmail.trim())) { setOtpMessage('Please enter a valid email'); return; }
                    setOtpBusy(true);
                    setTimeout(() => {
                      const otp = String(Math.floor(100000 + Math.random() * 900000));
                      setOtpGenerated(otp);
                      setOtpStep('otp');
                      setOtpMessage('');
                      setOtpBusy(false);
                      toast.info('Demo OTP generated (shown in modal)');
                    }, 800);
                  }} disabled={otpBusy}>
                    {otpBusy ? (
                      <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Sending...</span>
                    ) : 'Send OTP'}
                  </Button>
                </div>
              </div>
            )}
            {otpStep === 'otp' && (
              <div className="space-y-4">
                <div className="p-3 bg-border-light border border-border rounded-card text-sm">
                  Demo OTP (theme only): <span className="font-body-medium">{otpGenerated}</span>
                </div>
                <Input type="text" value={otpCode} onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); if (otpMessage) setOtpMessage(''); }} placeholder="Enter 6-digit OTP" maxLength="6" />
                {otpMessage && <p className="text-sm text-destructive">{otpMessage}</p>}
                <div className="flex justify-between">
                  <button className="text-xs text-primary hover:underline" onClick={() => { const otp = String(Math.floor(100000 + Math.random() * 900000)); setOtpGenerated(otp); }}>Resend OTP</button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setOtpOpen(false)} disabled={otpBusy}>Cancel</Button>
                    <Button onClick={() => {
                      if (otpCode !== otpGenerated) { setOtpMessage('Invalid OTP. Please try again.'); return; }
                      setOtpBusy(true);
                      setTimeout(() => {
                        setOtpBusy(false);
                        setOtpOpen(false);
                        executePendingAction();
                      }, 500);
                    }} disabled={otpBusy || otpCode.length !== 6}>
                      {otpBusy ? (
                        <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Verifying...</span>
                      ) : 'Verify & Save'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSection;