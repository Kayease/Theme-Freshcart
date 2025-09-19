import React, { useState } from 'react';
import emailhook from '../../hooks/emailhook';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import SEO from 'components/SEO';
import { getRememberedEmail, setRememberedEmail, getRegisteredUser, setRegisteredUser } from '../../utils/authStorage';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, toast } = useAuth();
  const { toasts, removeToast } = toast;
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to home 1
  const from = location.state?.from?.pathname || '/home-dashboard-1';

  const disposableDomains = emailhook.disposableDomains;
  const allowedDomains = emailhook.allowedDomains;

  const isValidEmail = (value) => emailhook.validateEmailStrict(value);

  // Prefill email if remembered
  React.useEffect(() => {
    const remembered = getRememberedEmail();
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

  // Forgot password modal state
  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState('email'); // 'email' | 'otp' | 'reset'
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpGeneratedOtp, setFpGeneratedOtp] = useState('');
  const [fpMessage, setFpMessage] = useState('');
  const [fpNewPass, setFpNewPass] = useState('');
  const [fpConfirmPass, setFpConfirmPass] = useState('');
  const [fpShowNew, setFpShowNew] = useState(false);
  const [fpShowConfirm, setFpShowConfirm] = useState(false);
  const [fpUpdating, setFpUpdating] = useState(false);
  const isResetValid = strongPassword.test(fpNewPass) && fpNewPass === fpConfirmPass;

  const handlePasswordUpdate = () => {
    if (!isResetValid) {
      setFpMessage('Enter a valid password and ensure both fields match.');
      return;
    }
    setFpUpdating(true);
    setFpMessage('');
    setTimeout(() => {
      try {
        const reg = getRegisteredUser();
        if (!reg) { setFpMessage('No registered user found.'); setFpUpdating(false); return; }
        if (reg.email?.toLowerCase() !== fpEmail.toLowerCase()) { setFpMessage('Email not found.'); setFpUpdating(false); return; }
        if (reg.password === fpNewPass) { setFpMessage('New password cannot be the same as the old password.'); setFpUpdating(false); return; }
        reg.password = fpNewPass;
        setRegisteredUser(reg);
        setFpMessage('Password updated. You can now sign in.');
        try { toast.success('Password reset successful'); } catch { }
        setFpUpdating(false);
        setTimeout(() => setShowForgot(false), 1000);
      } catch (e) {
        setFpUpdating(false);
        setFpMessage('Failed to update password.');
      }
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const stored = localStorage.getItem('registeredUser');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address from a non-temporary domain.');
      setIsLoading(false);
      return;
    }
    if (!stored) {
      setIsLoading(false);
      navigate('/auth/signup', { replace: true });
      return;
    }

    try {
      // simulate 2s processing for UX consistency
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await login(email, password);
      if (result.success) {
        // toast.success('Logged in successfully');
        if (rememberMe) setRememberedEmail(email); else setRememberedEmail('');
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Sign In | FreshCart" description="Sign in to your FreshCart account to continue shopping." />
      <Header />

      <main className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary">
            Sign in to your FreshCart account
          </p>
        </div>

        <div className="bg-surface border border-border rounded-card p-6 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-body-medium text-text-primary mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ''))}
                required
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-body-medium text-text-primary">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setFpStep('email'); setFpMessage(''); setFpEmail(''); setFpOtp(''); setFpGeneratedOtp(''); setFpNewPass(''); setFpConfirmPass(''); }}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ''))}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Icon name="Loader" size={16} className="animate-spin mr-2" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </Button>
          </form>


        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-primary hover:underline font-body-medium">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForgot(false)}></div>
          <div className="relative bg-surface border border-border rounded-card shadow-modal w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">Reset Password</h3>
              <button onClick={() => setShowForgot(false)} className="text-text-secondary hover:text-text-primary">
                <Icon name="X" size={16} />
              </button>
            </div>
            {fpStep === 'email' && (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">Enter your registered email. We'll generate a demo OTP.</p>
                <Input type="email" value={fpEmail} onChange={(e) => setFpEmail(e.target.value)} placeholder="your@email.com" />
                {fpMessage && <p className="text-sm text-destructive">{fpMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowForgot(false)}>Cancel</Button>
                  <Button onClick={() => {
                    if (!emailhook.validateEmailStrict(fpEmail)) { setFpMessage('Enter a valid email.'); return; }
                    const reg = getRegisteredUser();
                    if (!reg || reg.email?.toLowerCase() !== fpEmail.toLowerCase()) { setFpMessage('User does not exist. Please register.'); return; }
                    const otp = String(Math.floor(100000 + Math.random() * 900000));
                    setFpGeneratedOtp(otp);
                    setFpStep('otp');
                    setFpMessage('');
                    try { toast?.info?.('Demo OTP generated. Check the modal.'); } catch { }
                  }}>Send OTP</Button>
                </div>
              </div>
            )}
            {fpStep === 'otp' && (
              <div className="space-y-4">
                <div className="p-3 bg-border-light border border-border rounded-card text-sm">
                  Demo OTP (theme only): <span className="font-body-medium">{fpGeneratedOtp}</span>
                </div>
                <Input type="text" value={fpOtp} onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, ''))} placeholder="Enter 6-digit OTP" maxLength="6" />
                {fpMessage && <p className="text-sm text-destructive">{fpMessage}</p>}
                <div className="flex justify-between">
                  <button className="text-xs text-primary hover:underline" onClick={() => { const otp = String(Math.floor(100000 + Math.random() * 900000)); setFpGeneratedOtp(otp); }}>Resend OTP</button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowForgot(false)}>Cancel</Button>
                    <Button onClick={() => {
                      if (fpOtp !== fpGeneratedOtp) { setFpMessage('Invalid OTP. Please try again.'); return; }
                      setFpStep('reset');
                      setFpMessage('');
                    }}>Verify</Button>
                  </div>
                </div>
              </div>
            )}
            {fpStep === 'reset' && (
              <div className="space-y-4">
                <div className="relative">
                  <Input type={fpShowNew ? 'text' : 'password'} value={fpNewPass} onChange={(e) => setFpNewPass(e.target.value.replace(/\s+/g, ''))} placeholder="New password" className="pr-10" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlePasswordUpdate(); } }} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary" onClick={() => setFpShowNew(v => !v)} aria-label={fpShowNew ? 'Hide password' : 'Show password'}>
                    <Icon name={fpShowNew ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                <div className="relative">
                  <Input type={fpShowConfirm ? 'text' : 'password'} value={fpConfirmPass} onChange={(e) => setFpConfirmPass(e.target.value.replace(/\s+/g, ''))} placeholder="Confirm new password" className="pr-10" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlePasswordUpdate(); } }} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary" onClick={() => setFpShowConfirm(v => !v)} aria-label={fpShowConfirm ? 'Hide password' : 'Show password'}>
                    <Icon name={fpShowConfirm ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                <p className="text-xs text-text-secondary">Must be at least 8 characters and include upper, lower, number, and symbol.</p>
                {fpMessage && <p className="text-sm text-destructive">{fpMessage}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowForgot(false)} disabled={fpUpdating}>Cancel</Button>
                  <Button onClick={handlePasswordUpdate} disabled={fpUpdating || !isResetValid}>
                    {fpUpdating ? (
                      <span className="flex items-center">
                        <Icon name="Loader" size={16} className="animate-spin mr-2" />
                        Updating...
                      </span>
                    ) : 'Update Password'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
            {/* Toast container is mounted globally in AuthProvider now */}
    </div>
  );
};

export default SignIn; 