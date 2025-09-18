import React, { Suspense, lazy } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';
// Lazy load home style variants too
const HomeStyle1 = lazy(() => import('pages/home-dashboard/HomeStyle1'));
const HomeStyle2 = lazy(() => import('pages/home-dashboard/HomeStyle2'));
const HomeStyle3 = lazy(() => import('pages/home-dashboard/HomeStyle3'));
const HomeStyle4 = lazy(() => import('pages/home-dashboard/HomeStyle4'));

// Lazy load components for better performance
const HomeDashboard = lazy(() => import('pages/home-dashboard'));
const LandingHome = lazy(() => import('pages/landing/HomeLanding'));
const Documentation = lazy(() => import('pages/documentation/Documentation'));
const ProductCategoriesBrowse = lazy(() => import('pages/product-categories-browse'));
const ShoppingCart = lazy(() => import('pages/shopping-cart'));
const OrderHistoryTracking = lazy(() => import('pages/order-history-tracking'));
const ProductDetails = lazy(() => import('pages/product-details'));
const Checkout = lazy(() => import('pages/checkout'));
const UserProfileAccountSettings = lazy(() =>
  import('pages/user-profile-account-settings')
);
const SearchResults = lazy(() => import('pages/search-results'));
const WishlistSavedItems = lazy(() => import('pages/wishlist-saved-items'));
const HelpPage = lazy(() => import('pages/help'));
const SignIn = lazy(() => import('pages/auth/SignIn'));
const SignUp = lazy(() => import('pages/auth/SignUp'));
const NotFound = lazy(() => import('pages/NotFound'));
// Policies
const Terms = lazy(() => import('pages/policies/Terms'));
const Privacy = lazy(() => import('pages/policies/Privacy'));
const Shipping = lazy(() => import('pages/policies/Shipping'));
const Returns = lazy(() => import('pages/policies/Returns'));

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 border-4 border-border rounded-full animate-spin border-t-primary mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-text-secondary font-body text-sm">Loading page...</p>
            </div>
          </div>
        }
      >
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<LandingHome />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/home-dashboard-1" element={<HomeStyle1 />} />
          <Route path="/home-dashboard-2" element={<HomeStyle2 />} />
          <Route path="/home-dashboard-3" element={<HomeStyle3 />} />
          <Route path="/home-dashboard-4" element={<HomeStyle4 />} />

          <Route
            path="/product-categories-browse"
            element={<ProductCategoriesBrowse />}
          />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/order-history-tracking" element={<OrderHistoryTracking />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/user-profile-account-settings"
            element={<UserProfileAccountSettings />}
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/wishlist-saved-items" element={<WishlistSavedItems />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Policies */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />

          {/* Auth routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
