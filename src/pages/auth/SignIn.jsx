import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Hardcoded credentials for testing
    const validCredentials = [
      { email: 'user@example.com', password: 'password123' },
      { email: 'admin@freshcart.com', password: 'admin123' },
      { email: 'test@test.com', password: 'test123' }
    ];
    
    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );
    
    if (isValid) {
      try {
        await login(email, password);
        navigate(from, { replace: true });
      } catch (error) {
        setError('An unexpected error occurred. Please try again.');
      }
    } else {
      setError('Invalid email or password. Try user@example.com / password123');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-body-medium text-text-primary">
                  Password
                </label>
                <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
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
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-secondary">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-border rounded-button bg-surface hover:bg-border-light transition-smooth"
              >
                <Icon name="Google" size={18} className="mr-2" />
                <span className="text-sm font-body-medium text-text-primary">Google</span>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-border rounded-button bg-surface hover:bg-border-light transition-smooth"
              >
                <Icon name="Facebook" size={18} className="mr-2" />
                <span className="text-sm font-body-medium text-text-primary">Facebook</span>
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default SignIn; 