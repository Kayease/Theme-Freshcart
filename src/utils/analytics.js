// Analytics utility for tracking user interactions
class Analytics {
  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  // Initialize analytics (Google Analytics, etc.)
  init(trackingId) {
    if (!this.isEnabled || !trackingId) return;

    // Google Analytics 4
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', trackingId);
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isEnabled) return;
    
    if (window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_path: path,
        page_title: title
      });
    }
  }

  // Track events
  trackEvent(action, category, label, value) {
    if (!this.isEnabled) return;

    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // E-commerce tracking
  trackPurchase(transactionId, items, value, currency = 'USD') {
    if (!this.isEnabled) return;

    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
      });
    }
  }

  trackAddToCart(item) {
    this.trackEvent('add_to_cart', 'ecommerce', item.name, item.price);
  }

  trackRemoveFromCart(item) {
    this.trackEvent('remove_from_cart', 'ecommerce', item.name, item.price);
  }

  trackViewItem(item) {
    this.trackEvent('view_item', 'ecommerce', item.name, item.price);
  }

  trackSearch(query) {
    this.trackEvent('search', 'engagement', query);
  }
}

export default new Analytics();