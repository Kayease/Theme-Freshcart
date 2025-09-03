// Centralized configuration & constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'FreshCart';
export const API_BASE_URL = import.meta.env.VITE_API_BASE || 'https://api.example.com';

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' }
];

export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'EUR', symbol: '€', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', locale: 'en-GB' }
];

export const DEFAULT_CURRENCY = CURRENCIES[0];

export const FEATURE_FLAGS = {
  reviews: true,
  subscriptions: false,
  multiVendor: false,
};
