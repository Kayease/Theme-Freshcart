import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSecuritySection = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
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
    if (validatePasswordForm()) {
      // API call to change password
      console.log('Changing password...');
      setShowPasswordForm(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleEnable2FA = () => {
    setIs2FAEnabled(true);
    setShow2FASetup(false);
    // API call to enable 2FA
    console.log('Enabling 2FA...');
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    // API call to disable 2FA
    console.log('Disabling 2FA...');
  };

  const recentLoginSessions = [
    {
      id: 1,
      device: 'iPhone 14 Pro',
      location: 'New York, NY',
      time: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      time: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Safari on MacBook',
      location: 'New York, NY',
      time: '3 days ago',
      current: false
    }
  ];

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
            onClick={() => setShowPasswordForm(true)}
            className="flex items-center space-x-2"
          >
            <Icon name="Edit" size={16} />
            <span>Change Password</span>
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
                <Input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  error={passwordErrors.currentPassword}
                  placeholder="Enter current password"
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.currentPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  error={passwordErrors.newPassword}
                  placeholder="Enter new password"
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.newPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  error={passwordErrors.confirmPassword}
                  placeholder="Confirm new password"
                />
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
              >
                Update Password
              </Button>
            </div>
          </div>
        )}

        {/* Two-Factor Authentication */}
        <div className="border border-border rounded-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-primary" />
              <div>
                <h3 className="text-base font-heading font-semibold text-text-primary">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-text-secondary">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-body ${is2FAEnabled ? 'text-success' : 'text-text-secondary'}`}>
                {is2FAEnabled ? 'Enabled' : 'Disabled'}
              </span>
              {is2FAEnabled ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisable2FA}
                  className="text-error border-error hover:bg-error/10"
                >
                  Disable
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShow2FASetup(true)}
                >
                  Enable 2FA
                </Button>
              )}
            </div>
          </div>

          {show2FASetup && (
            <div className="border-t border-border pt-4">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Smartphone" size={24} className="text-primary" />
                </div>
                <h4 className="text-base font-heading font-semibold text-text-primary mb-2">
                  Set Up Two-Factor Authentication
                </h4>
                <p className="text-sm text-text-secondary mb-4">
                  Scan the QR code with your authenticator app or enter the code manually
                </p>
                <div className="w-32 h-32 bg-border rounded-card mx-auto mb-4 flex items-center justify-center">
                  <span className="text-text-secondary text-sm">QR Code</span>
                </div>
                <p className="text-xs text-text-secondary mb-4">
                  Manual code: ABCD-EFGH-IJKL-MNOP
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShow2FASetup(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleEnable2FA}
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login History Section */}
      <div className="bg-surface border border-border rounded-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Recent Login Activity
          </h2>
        </div>

        <div className="space-y-4">
          {recentLoginSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Monitor" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-body font-medium text-text-primary">
                      {session.device}
                    </span>
                    {session.current && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {session.location} • {session.time}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-error hover:bg-error/10"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSecuritySection;