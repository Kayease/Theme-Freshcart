import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import profileStorage from '../../../utils/profileStorage';
import emailhook from '../../../hooks/emailhook';

const PersonalInfoSection = () => {
  const { user, toast } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountryCode: '+1',
    phoneNational: '',
    dateOfBirth: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [originalEmail, setOriginalEmail] = useState('');
  // Email verification modal state
  const [evOpen, setEvOpen] = useState(false);
  const [evStep, setEvStep] = useState('start'); // start | otp
  const [evEmail, setEvEmail] = useState('');
  const [evOtp, setEvOtp] = useState('');
  const [evGeneratedOtp, setEvGeneratedOtp] = useState('');
  const [evMessage, setEvMessage] = useState('');
  const [evBusy, setEvBusy] = useState(false);

  useEffect(() => {
    // Initialize from stored profile or session user
    const stored = profileStorage.getStoredProfile();
    const source = stored || user || {};
    const names = (source.name || '').trim().split(' ');
    const first = source.firstName || names[0] || '';
    const last = source.lastName || names.slice(1).join(' ') || '';
    setFormData({
      firstName: first,
      lastName: last,
      email: source.email || '',
      phone: source.phone || '',
      phoneCountryCode: source.phoneCountryCode || '+1',
      phoneNational: source.phoneNational || (String(source.phone || '').replace(/^\+\d{1,3}/, '').replace(/\D/g, '')),
      dateOfBirth: source.dateOfBirth || ''
    });
    setProfileImage(source.profileImage || null);
    setOriginalEmail(source.email || '');
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName.trim())) newErrors.firstName = 'Enter a valid first name';
    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName.trim())) newErrors.lastName = 'Enter a valid last name';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailhook.validateEmailStrict(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    // Phone validation with country code; national number digits only 6-14 depending on country
    const countryCode = formData.phoneCountryCode || '+1';
    const national = (formData.phoneNational || '').replace(/\D/g, '');
    const ccDigits = countryCode.replace(/\D/g, '');
    const e164 = `+${ccDigits}${national}`;
    // Simple checks: country code 1-3 digits, national length 6-14, starts with +
    if (!national) newErrors.phone = 'Phone number is required';
    else if (ccDigits.length < 1 || ccDigits.length > 3) newErrors.phone = 'Invalid country code';
    else if (national.length < 6 || national.length > 14) newErrors.phone = 'Enter a valid phone number';
    else if (!/^\+\d{6,15}$/.test(e164)) newErrors.phone = 'Enter a valid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const commitSave = (data) => {
    const ccDigits = (data.phoneCountryCode || '+1').replace(/\D/g, '');
    const national = (data.phoneNational || '').replace(/\D/g, '');
    const e164 = `+${ccDigits}${national}`;
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const updated = profileStorage.updateStoredProfile({
      name: fullName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: e164,
      phoneCountryCode: `+${ccDigits}`,
      phoneNational: national,
      dateOfBirth: data.dateOfBirth,
      profileImage: profileImage || null,
    });
    try { toast.success('Profile updated successfully'); } catch { }
    // Mirror into session user
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = { ...parsed, ...updated };
        localStorage.setItem('user', JSON.stringify(merged));
      }
    } catch { }
    try { window.dispatchEvent(new Event('profile:updated')); } catch { }
    setOriginalEmail(data.email);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (validateForm()) {
      // If email changed, run verification flow first
      if (formData.email.trim().toLowerCase() !== originalEmail.trim().toLowerCase()) {
        setEvOpen(true);
        setEvStep('start');
        setEvEmail(formData.email.trim());
        setEvOtp('');
        setEvGeneratedOtp('');
        setEvMessage('');
        return;
      }
      commitSave(formData);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reload from stored
    const stored = profileStorage.getStoredProfile() || {};
    const names = (stored.name || user?.name || '').split(' ');
    setFormData({
      firstName: stored.firstName || names[0] || '',
      lastName: stored.lastName || names.slice(1).join(' ') || '',
      email: stored.email || user?.email || '',
      phone: stored.phone || user?.phone || '',
      dateOfBirth: stored.dateOfBirth || user?.dateOfBirth || ''
    });
    setProfileImage(stored.profileImage || user?.profileImage || null);
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { try { toast.error('Please select an image file'); } catch { } return; }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setProfileImage(dataUrl);
      // Save immediately for persistence
      profileStorage.saveProfileImage(dataUrl);
      try {
        const raw = localStorage.getItem('user');
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.profileImage = dataUrl;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
      } catch { }
      try { toast.success('Profile picture updated'); } catch { }
      try { window.dispatchEvent(new Event('profile:updated')); } catch { }
    };
    reader.readAsDataURL(file);
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
        <div className="md:col-span-2">
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <button type="button" onClick={handleAvatarClick} className="relative w-16 h-16 rounded-full overflow-hidden border border-border flex items-center justify-center bg-border/40 hover:ring-2 hover:ring-primary/30">
              {profileImage ? (
                <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Icon name="User" size={20} className="text-text-secondary" />
              )}
              {isEditing && (
                <span className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-[10px] text-center py-0.5">Change</span>
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
            <p className="text-xs text-text-secondary">Click the avatar to upload a new image (stored locally).</p>
          </div>
        </div>
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
          <div className="flex gap-2">
            <select
              value={formData.phoneCountryCode}
              onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
              disabled={!isEditing}
              className={`border border-border rounded-card px-2 py-2 text-sm ${!isEditing ? 'bg-background' : ''}`}
            >
              {['+1', '+44', '+61', '+81', '+91', '+971', '+49', '+33', '+39', '+86'].map(cc => (
                <option key={cc} value={cc}>{cc}</option>
              ))}
            </select>
            <Input
              type="tel"
              value={formData.phoneNational}
              onChange={(e) => handleInputChange('phoneNational', e.target.value.replace(/\D/g, ''))}
              disabled={!isEditing}
              placeholder="Phone number"
              className={`flex-1 ${!isEditing ? 'bg-background' : ''}`}
            />
          </div>
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

      {/* Email Verification Modal */}
      {evOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { if (!evBusy) setEvOpen(false); }}></div>
          <div className="relative bg-surface border border-border rounded-card shadow-modal w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">Verify New Email</h3>
              <button onClick={() => { if (!evBusy) setEvOpen(false); }} className="text-text-secondary hover:text-text-primary">
                <Icon name="X" size={16} />
              </button>
            </div>
            {evStep === 'start' && (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">We need to verify your new email address: <span className="font-body-medium">{evEmail}</span></p>
                {evMessage && <p className="text-sm text-destructive">{evMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEvOpen(false)} disabled={evBusy}>Cancel</Button>
                  <Button onClick={() => {
                    if (!emailhook.validateEmailStrict(evEmail)) { setEvMessage('Enter a valid email'); return; }
                    setEvBusy(true);
                    setTimeout(() => {
                      const otp = String(Math.floor(100000 + Math.random() * 900000));
                      setEvGeneratedOtp(otp);
                      setEvStep('otp');
                      setEvMessage('');
                      setEvBusy(false);
                      try { toast.info('Demo OTP generated (shown in modal)'); } catch { }
                    }, 800);
                  }} disabled={evBusy}>
                    {evBusy ? (
                      <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Sending...</span>
                    ) : 'Send OTP'}
                  </Button>
                </div>
              </div>
            )}
            {evStep === 'otp' && (
              <div className="space-y-4">
                <div className="p-3 bg-border-light border border-border rounded-card text-sm">
                  Demo OTP (theme only): <span className="font-body-medium">{evGeneratedOtp}</span>
                </div>
                <Input type="text" value={evOtp} onChange={(e) => setEvOtp(e.target.value.replace(/\D/g, ''))} placeholder="Enter 6-digit OTP" maxLength="6" />
                {evMessage && <p className="text-sm text-destructive">{evMessage}</p>}
                <div className="flex justify-between">
                  <button className="text-xs text-primary hover:underline" onClick={() => { const otp = String(Math.floor(100000 + Math.random() * 900000)); setEvGeneratedOtp(otp); }}>Resend OTP</button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEvOpen(false)} disabled={evBusy}>Cancel</Button>
                    <Button onClick={() => {
                      if (evOtp !== evGeneratedOtp) { setEvMessage('Invalid OTP. Please try again.'); return; }
                      setEvBusy(true);
                      setTimeout(() => {
                        setEvBusy(false);
                        setEvOpen(false);
                        try { toast.success('Email verified successfully'); } catch { }
                        // Commit the save with verified email
                        commitSave({ ...formData, email: evEmail });
                      }, 500);
                    }} disabled={evBusy || evOtp.length !== 6}>
                      {evBusy ? (
                        <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Verifying...</span>
                      ) : 'Verify'}
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

export default PersonalInfoSection;