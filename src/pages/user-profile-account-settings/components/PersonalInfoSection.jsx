import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // API call to save data would go here
      console.log('Saving personal info:', formData);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-01-15'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Personal Information
          </h2>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="Edit" size={16} />
            <span>Edit</span>
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center space-x-2"
            >
              <Icon name="X" size={16} />
              <span>Cancel</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              className="flex items-center space-x-2"
            >
              <Icon name="Check" size={16} />
              <span>Save</span>
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            First Name
          </label>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            error={errors.firstName}
            className={!isEditing ? 'bg-background' : ''}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Last Name
          </label>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            error={errors.lastName}
            className={!isEditing ? 'bg-background' : ''}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            error={errors.email}
            className={!isEditing ? 'bg-background' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email}</p>
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
            disabled={!isEditing}
            error={errors.phone}
            className={!isEditing ? 'bg-background' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Date of Birth
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? 'bg-background' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;