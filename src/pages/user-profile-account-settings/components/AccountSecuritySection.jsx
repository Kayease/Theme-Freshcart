import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';
import emailhook from '../../../hooks/emailhook';
import profileStorage from '../../../utils/profileStorage';

const AccountSecuritySection = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { user, changePassword, toast } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showField, setShowField] = useState({ current: false, new: false, confirm: false });
  const [submitting, setSubmitting] = useState(false);
  const [lastPasswordChange, setLastPasswordChange] = useState(null);
  // Password verification (email + OTP) modal state
  const [pvOpen, setPvOpen] = useState(false);
  const [pvStep, setPvStep] = useState('start'); // start | otp
  const [pvEmail, setPvEmail] = useState('');
  const [pvOtp, setPvOtp] = useState('');
  const [pvGeneratedOtp, setPvGeneratedOtp] = useState('');
  const [pvMessage, setPvMessage] = useState('');
  const [pvBusy, setPvBusy] = useState(false);

  // Load last password change date from local storage
  useEffect(() => {
    const profile = profileStorage.getStoredProfile();
    if (profile?.lastPasswordChange) {
      setLastPasswordChange(profile.lastPasswordChange);
    }
  }, []);

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (!strongPassword.test(passwordForm.newPassword)) {
      errors.newPassword = 'Min 8 & Max 20 chars, include upper, lower, number, symbol';
    } else if (passwordForm.newPassword === passwordForm.currentPassword) {
      errors.newPassword = 'New password must be different from current password';
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = () => {
    if (!validatePasswordForm()) return;
    // Open verification modal. User must enter their account email and verify via OTP.
    setPvOpen(true);
    setPvStep('start');
    setPvEmail('');
    setPvOtp('');
    setPvGeneratedOtp('');
    setPvMessage('');
  };

  // Removed 2FA and recent login activity per requirements

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-surface border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Password & Security
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Hide' : 'Change Password'}
          </Button>
        </div>

        {showPasswordForm && (
          <div className="border border-border rounded-card p-4 mb-6">
            <h3 className="text-base font-heading font-semibold text-text-primary mb-4">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showField.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value.replace(/\s+/g, ''))}
                    placeholder="••••••••"
                    className={`pr-10 ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowField(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                    aria-label={showField.current ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showField.current ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showField.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value.replace(/\s+/g, ''))}
                    placeholder="••••••••"
                    className={`pr-10 ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowField(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                    aria-label={showField.new ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showField.new ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.newPassword}</p>
                )}
                <p className="mt-1 text-xs text-text-secondary">Min 8 & Max 20 chars, include upper, lower, number, symbol</p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showField.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value.replace(/\s+/g, ''))}
                    placeholder="••••••••"
                    className={`pr-10 ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowField(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                    aria-label={showField.confirm ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showField.confirm ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setPasswordErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePasswordSubmit}
                loading={submitting}
                disabled={submitting}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}

        {/* Last Password Change Section */}
        <div className="border border-border rounded-card p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Clock" size={18} className="text-text-secondary" />
            <h3 className="text-base font-heading font-semibold text-text-primary">
              Password History
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              Last password change:
            </p>
            <p className="text-sm font-body-medium text-text-primary">
              {lastPasswordChange
                ? new Date(lastPasswordChange).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
                : 'Never changed'
              }
            </p>
            {lastPasswordChange && (
              <p className="text-xs text-text-secondary">
                {Math.floor((new Date() - new Date(lastPasswordChange)) / (1000 * 60 * 60 * 24))} days ago
              </p>
            )}
          </div>
        </div>

      </div>
      {/* Password Verification Modal (Email + OTP) */}
      {pvOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { if (!pvBusy) setPvOpen(false); }}></div>
          <div className="relative bg-surface border border-border rounded-card shadow-modal w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">Verify Your Email</h3>
              <button onClick={() => { if (!pvBusy) setPvOpen(false); }} className="text-text-secondary hover:text-text-primary" aria-label="Close">
                <Icon name="X" size={16} />
              </button>
            </div>
            {pvStep === 'start' && (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">To update your password, please confirm your account email.</p>
                <Input
                  type="email"
                  value={pvEmail}
                  onChange={(e) => { setPvEmail(e.target.value.trim()); if (pvMessage) setPvMessage(''); }}
                  placeholder="your@email.com"
                />
                {pvMessage && <p className="text-sm text-destructive">{pvMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setPvOpen(false)} disabled={pvBusy}>Cancel</Button>
                  <Button onClick={() => {
                    const entered = (pvEmail || '').trim().toLowerCase();
                    const currentEmail = String(user?.email || '').trim().toLowerCase();
                    if (!emailhook.validateEmailStrict(entered)) { setPvMessage('Enter a valid email'); return; }
                    if (!currentEmail || entered !== currentEmail) { setPvMessage('Email does not match your account'); return; }
                    setPvBusy(true);
                    setTimeout(() => {
                      const otp = String(Math.floor(100000 + Math.random() * 900000));
                      setPvGeneratedOtp(otp);
                      setPvStep('otp');
                      setPvMessage('');
                      setPvBusy(false);
                      try { toast.info('Demo OTP generated (shown in modal)'); } catch { }
                    }, 800);
                  }} disabled={pvBusy}>
                    {pvBusy ? (
                      <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Sending...</span>
                    ) : 'Send OTP'}
                  </Button>
                </div>
              </div>
            )}
            {pvStep === 'otp' && (
              <div className="space-y-4">
                <div className="p-3 bg-border-light border border-border rounded-card text-sm">
                  Demo OTP (theme only): <span className="font-body-medium">{pvGeneratedOtp}</span>
                </div>
                <Input type="text" value={pvOtp} onChange={(e) => { setPvOtp(e.target.value.replace(/\D/g, '')); if (pvMessage) setPvMessage(''); }} placeholder="Enter 6-digit OTP" maxLength="6" />
                {pvMessage && <p className="text-sm text-destructive">{pvMessage}</p>}
                <div className="flex justify-between">
                  <button className="text-xs text-primary hover:underline" onClick={() => { const otp = String(Math.floor(100000 + Math.random() * 900000)); setPvGeneratedOtp(otp); }}>Resend OTP</button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setPvOpen(false)} disabled={pvBusy}>Cancel</Button>
                    <Button onClick={async () => {
                      if (pvOtp !== pvGeneratedOtp) { setPvMessage('Invalid OTP. Please try again.'); return; }
                      // Proceed to change password
                      setPvBusy(true);
                      setSubmitting(true);
                      try {
                        const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
                        if (result.success) {
                          // Update last password change timestamp
                          const now = new Date().toISOString();
                          profileStorage.updateStoredProfile({ lastPasswordChange: now });
                          setLastPasswordChange(now);

                          setPvBusy(false);
                          setPvOpen(false);
                          setShowPasswordForm(false);
                          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          setPasswordErrors({});
                        } else {
                          setPvBusy(false);
                          setPvMessage(result.error || 'Failed to update password');
                        }
                      } finally {
                        setSubmitting(false);
                      }
                    }} disabled={pvBusy || pvOtp.length !== 6}>
                      {pvBusy ? (
                        <span className="flex items-center"><Icon name="Loader" size={16} className="animate-spin mr-2" />Updating...</span>
                      ) : 'Verify & Update'}
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

export default AccountSecuritySection;