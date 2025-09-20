import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';

const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'key-features', title: 'Key Features' },
    { id: 'pages-features', title: 'Pages & Features' },
    { id: 'ecommerce-functionality', title: 'E-commerce Functionality' },
    { id: 'user-authentication', title: 'User Authentication' },
    { id: 'shopping-cart-wishlist', title: 'Shopping Cart & Wishlist' },
    { id: 'order-management', title: 'Order Management' },
    { id: 'product-catalog', title: 'Product Catalog' },
    { id: 'search-filtering', title: 'Search & Filtering' },
    { id: 'user-profile', title: 'User Profile & Settings' },
    { id: 'installation', title: 'Installation' },
    { id: 'folder-structure', title: 'Folder Structure' },
    { id: 'theming-customization', title: 'Theming & Customization' },
    { id: 'performance-best-practices', title: 'Performance & Best Practices' },
    { id: 'accessibility', title: 'Accessibility' },
    { id: 'internationalization', title: 'Internationalization (i18n)' },
    { id: 'pwa-offline', title: 'PWA & Offline' },
    { id: 'support-updates', title: 'Support & Updates' },
    { id: 'changelog', title: 'Changelog' },
    { id: 'credits-licensing', title: 'Credits & Licensing' }
];

const Documentation = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background text-text-primary">
            <SEO title="Documentation – FreshCart Theme" description="Comprehensive documentation for the FreshCart premium React e-commerce theme." />
            <Header />
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-16 grid gap-6 lg:gap-12 lg:grid-cols-[260px_1fr]">
                {/* Mobile Navigation Toggle */}
                <div className="lg:hidden mb-4">
                    <button 
                        onClick={() => setMobileNavOpen(!mobileNavOpen)}
                        className="flex items-center gap-2 text-sm font-body text-text-secondary hover:text-primary transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Table of Contents
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`${mobileNavOpen ? 'block' : 'hidden'} lg:block sticky top-24 self-start space-y-4 lg:space-y-4`}>
                    <div className="text-xs font-data tracking-wide text-text-secondary mb-2 uppercase">Contents</div>
                    <ul className="space-y-2 bg-surface-secondary lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-none border-border-primary">
                        {sections.map(s => (
                            <li key={s.id}>
                                <a 
                                    href={`#${s.id}`} 
                                    className="text-sm font-body text-text-secondary hover:text-primary transition-colors block py-1"
                                    onClick={() => setMobileNavOpen(false)}
                                >
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="max-w-none lg:max-w-3xl">
                    {/* Overview */}
                    <section id="overview" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Overview</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <p>FreshCart is a premium React e-commerce theme designed for modern online stores, grocery markets, and retail businesses. Built with React 18, Redux Toolkit, and Tailwind CSS, it offers exceptional performance and user experience.</p>
                            <p>The theme includes 4 different homepage styles, complete e-commerce functionality, and advanced features like PWA support, dark mode, and internationalization.</p>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">What's Included</h3>
                                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                                    <li>Complete React source code</li>
                                    <li>8+ unique page layouts</li>
                                    <li>50+ reusable components</li>
                                    <li>4 homepage style variations</li>
                                    <li>Comprehensive documentation</li>
                                    <li>6 months premium support</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Key Features */}
                    <section id="key-features" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Key Features</h2>
                        <div className="space-y-4 sm:space-y-6 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🛒 Complete E-commerce</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Full shopping cart system</li>
                                        <li>• Product catalog with 13+ products</li>
                                        <li>• Advanced search & filtering</li>
                                        <li>• Wishlist management</li>
                                        <li>• Order tracking & history</li>
                                        <li>• Checkout with address & payment</li>
                                        <li>• User authentication system</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">⚡ Performance & SEO</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Lighthouse Score 95+</li>
                                        <li>• Code splitting & lazy loading</li>
                                        <li>• Smart image optimization</li>
                                        <li>• PWA with offline support</li>
                                        <li>• SEO optimized components</li>
                                        <li>• Fast loading animations</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🎨 Design & UX</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• 4 unique homepage styles</li>
                                        <li>• Dark/Light mode toggle</li>
                                        <li>• Mobile-first responsive design</li>
                                        <li>• Smooth Framer Motion animations</li>
                                        <li>• Modern UI component library</li>
                                        <li>• Intuitive navigation</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🔧 Developer Experience</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• React 18 with modern hooks</li>
                                        <li>• Context API for state management</li>
                                        <li>• Tailwind CSS with custom design system</li>
                                        <li>• Modular component architecture</li>
                                        <li>• Comprehensive documentation</li>
                                        <li>• Easy customization</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pages & Features */}
                    <section id="pages-features" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Pages & Features</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">🏠 Homepage Variants</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Classic Layout - Traditional grocery store</li>
                                        <li>• Modern Gradient - Vibrant styling</li>
                                        <li>• Minimal Clean - Whitespace focused</li>
                                        <li>• Deal Focused - Conversion optimized</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">🛍️ Shopping Pages</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Product Categories Browse</li>
                                        <li>• Product Details with Gallery</li>
                                        <li>• Shopping Cart with Promo Codes</li>
                                        <li>• Advanced Search Results</li>
                                        <li>• Wishlist Management</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">👤 User Pages</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Sign In / Sign Up</li>
                                        <li>• User Profile & Settings</li>
                                        <li>• Order History & Tracking</li>
                                        <li>• Address Management</li>
                                        <li>• Payment Methods</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">💳 Checkout Process</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Multi-step checkout flow</li>
                                        <li>• Delivery address selection</li>
                                        <li>• Time slot booking</li>
                                        <li>• Payment method selection</li>
                                        <li>• Order confirmation</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">📱 Additional Pages</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Help & Support</li>
                                        <li>• Terms & Privacy Policy</li>
                                        <li>• Shipping & Returns</li>
                                        <li>• 404 Not Found</li>
                                        <li>• Landing Page</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">🎯 Special Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Real-time search suggestions</li>
                                        <li>• Voice search capability</li>
                                        <li>• Barcode scanning</li>
                                        <li>• PDF invoice generation</li>
                                        <li>• Order reordering</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* E-commerce Functionality */}
                    <section id="ecommerce-functionality" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">E-commerce Functionality</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Product Management</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• 13+ pre-loaded products across 8 categories</li>
                                        <li>• Product variants and pricing</li>
                                        <li>• Stock management and availability</li>
                                        <li>• Product ratings and reviews</li>
                                        <li>• Dynamic product information</li>
                                        <li>• Related products suggestions</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Shopping Experience</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Add to cart with quantity selection</li>
                                        <li>• Cart persistence across sessions</li>
                                        <li>• Promo code system (SAVE10, FRESH20, NEWUSER)</li>
                                        <li>• Delivery time slot selection</li>
                                        <li>• Minimum order progress tracking</li>
                                        <li>• Guest checkout support</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Order Processing</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Multi-step checkout process</li>
                                        <li>• Address validation and management</li>
                                        <li>• Payment method integration ready</li>
                                        <li>• Order confirmation and tracking</li>
                                        <li>• PDF invoice generation</li>
                                        <li>• Order history and reordering</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Customer Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• User registration and authentication</li>
                                        <li>• Profile management with avatar upload</li>
                                        <li>• Wishlist with bulk operations</li>
                                        <li>• Order tracking with status updates</li>
                                        <li>• Address book management</li>
                                        <li>• Payment method storage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Installation */}
                    <section id="installation" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Installation</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <h3 className="font-heading font-heading-bold text-text-primary text-base sm:text-lg">Prerequisites</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Node.js 16+ installed</li>
                                <li>npm or yarn package manager</li>
                                <li>Basic knowledge of React</li>
                            </ul>

                            <h3 className="font-heading font-heading-bold text-text-primary mt-4 sm:mt-6 text-base sm:text-lg">Quick Start</h3>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`# Extract the theme files
unzip freshcart-react-theme.zip
cd freshcart-react-theme

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000`}
                                </pre>
                            </div>

                            <h3 className="font-heading font-heading-bold text-text-primary mt-4 sm:mt-6 text-base sm:text-lg">Build for Production</h3>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`# Build optimized version
npm run build

# Preview production build
npm run preview`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* User Authentication */}
                    <section id="user-authentication" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">User Authentication</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Sign Up Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Email validation with domain checking</li>
                                        <li>• Strong password requirements</li>
                                        <li>• Name validation with regex patterns</li>
                                        <li>• Terms and conditions agreement</li>
                                        <li>• Real-time form validation</li>
                                        <li>• Auto-login after registration</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Sign In Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Email and password authentication</li>
                                        <li>• Remember me functionality</li>
                                        <li>• Password visibility toggle</li>
                                        <li>• Forgot password with OTP</li>
                                        <li>• Session persistence</li>
                                        <li>• Redirect after login</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Password Recovery</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Email-based OTP generation</li>
                                        <li>• 6-digit verification code</li>
                                        <li>• Password reset with validation</li>
                                        <li>• Secure password requirements</li>
                                        <li>• Demo OTP for testing</li>
                                        <li>• Step-by-step recovery process</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Session Management</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• LocalStorage-based sessions</li>
                                        <li>• Guest user support</li>
                                        <li>• Cart and wishlist persistence</li>
                                        <li>• Profile data synchronization</li>
                                        <li>• Automatic logout on session end</li>
                                        <li>• Cross-tab session sharing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Shopping Cart & Wishlist */}
                    <section id="shopping-cart-wishlist" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Shopping Cart & Wishlist</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Shopping Cart Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Add/remove items with quantity control</li>
                                        <li>• Real-time price calculations</li>
                                        <li>• Promo code application system</li>
                                        <li>• Delivery time slot selection</li>
                                        <li>• Move items to wishlist</li>
                                        <li>• Minimum order progress tracking</li>
                                        <li>• Tax and delivery fee calculations</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Wishlist Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Add/remove items to wishlist</li>
                                        <li>• Grid and list view modes</li>
                                        <li>• Sort by date, price, name</li>
                                        <li>• Bulk operations (select all, bulk add to cart)</li>
                                        <li>• Price drop notifications</li>
                                        <li>• Move items to cart</li>
                                        <li>• Persistent storage</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Promo Code System</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• SAVE10 - 10% off (min $50 order)</li>
                                        <li>• FRESH20 - $20 off (min $100 order)</li>
                                        <li>• NEWUSER - 15% off (min $30 order)</li>
                                        <li>• Real-time validation</li>
                                        <li>• Minimum order requirements</li>
                                        <li>• Percentage and fixed discounts</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Delivery Options</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Standard delivery - $4.99</li>
                                        <li>• Express delivery - $9.99</li>
                                        <li>• Scheduled delivery - $2.99</li>
                                        <li>• Time slot selection</li>
                                        <li>• Delivery instructions</li>
                                        <li>• Tip addition option</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Order Management */}
                    <section id="order-management" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Order Management</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Order Tracking</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Real-time order status updates</li>
                                        <li>• Order tracking modal</li>
                                        <li>• Delivery driver information</li>
                                        <li>• Estimated delivery times</li>
                                        <li>• Order history with filters</li>
                                        <li>• Search orders by ID or items</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Order History</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Complete order history</li>
                                        <li>• Order status filtering</li>
                                        <li>• Date range filtering</li>
                                        <li>• Order reordering functionality</li>
                                        <li>• PDF invoice generation</li>
                                        <li>• Order rating system</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Invoice Generation</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Professional PDF invoices</li>
                                        <li>• Company branding and logo</li>
                                        <li>• Itemized order details</li>
                                        <li>• Tax and fee breakdown</li>
                                        <li>• Customer and seller information</li>
                                        <li>• Downloadable PDF format</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Order Actions</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Reorder previous orders</li>
                                        <li>• Contact driver functionality</li>
                                        <li>• Order cancellation</li>
                                        <li>• Order modification</li>
                                        <li>• Return request initiation</li>
                                        <li>• Order rating and feedback</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Product Catalog */}
                    <section id="product-catalog" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Product Catalog</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Product Categories</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Dairy & Eggs (3 products)</li>
                                        <li>• Fruits & Vegetables (6 products)</li>
                                        <li>• Meat & Seafood (1 product)</li>
                                        <li>• Bakery (1 product)</li>
                                        <li>• Pantry Staples (2 products)</li>
                                        <li>• Beverages, Snacks, Frozen Foods</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Product Details</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• High-quality product images</li>
                                        <li>• Product specifications</li>
                                        <li>• Nutritional information</li>
                                        <li>• Storage instructions</li>
                                        <li>• Origin and brand details</li>
                                        <li>• Customer reviews and ratings</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Product Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Dynamic pricing with discounts</li>
                                        <li>• Stock availability tracking</li>
                                        <li>• Product variants and options</li>
                                        <li>• Related products suggestions</li>
                                        <li>• Product highlights and features</li>
                                        <li>• Allergen information</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Brand Management</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• 8 featured brands</li>
                                        <li>• Brand-specific product filtering</li>
                                        <li>• Brand logos and descriptions</li>
                                        <li>• Featured brand highlighting</li>
                                        <li>• Brand-based product grouping</li>
                                        <li>• Brand search functionality</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Search & Filtering */}
                    <section id="search-filtering" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Search & Filtering</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Search Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Real-time search suggestions</li>
                                        <li>• Voice search capability</li>
                                        <li>• Barcode scanning option</li>
                                        <li>• Search by product name, brand, category</li>
                                        <li>• Recent searches history</li>
                                        <li>• Search result highlighting</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Filtering Options</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Price range filtering</li>
                                        <li>• Category-based filtering</li>
                                        <li>• Brand filtering</li>
                                        <li>• Rating-based filtering</li>
                                        <li>• Stock availability filtering</li>
                                        <li>• Dietary preference filtering</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Sorting Options</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Sort by relevance</li>
                                        <li>• Sort by price (low to high)</li>
                                        <li>• Sort by price (high to low)</li>
                                        <li>• Sort by customer rating</li>
                                        <li>• Sort by newest arrivals</li>
                                        <li>• Sort by popularity</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Advanced Features</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Active filter display</li>
                                        <li>• Clear all filters option</li>
                                        <li>• Filter persistence across pages</li>
                                        <li>• Mobile-optimized filter sidebar</li>
                                        <li>• Filter result counts</li>
                                        <li>• URL-based filter sharing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* User Profile & Settings */}
                    <section id="user-profile" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">User Profile & Settings</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Personal Information</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Profile photo upload</li>
                                        <li>• Name and contact details</li>
                                        <li>• Email and phone management</li>
                                        <li>• Date of birth</li>
                                        <li>• Profile completion tracking</li>
                                        <li>• Data validation and formatting</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Address Management</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Multiple delivery addresses</li>
                                        <li>• Default address selection</li>
                                        <li>• Address validation</li>
                                        <li>• Add/edit/delete addresses</li>
                                        <li>• Address book organization</li>
                                        <li>• Quick address selection</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Payment Methods</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Credit/debit card storage</li>
                                        <li>• Payment method management</li>
                                        <li>• Default payment selection</li>
                                        <li>• Secure payment data handling</li>
                                        <li>• Payment method validation</li>
                                        <li>• Quick checkout options</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm">Account Security</h3>
                                    <ul className="text-xs space-y-1">
                                        <li>• Password change functionality</li>
                                        <li>• Current password verification</li>
                                        <li>• Strong password requirements</li>
                                        <li>• Security settings management</li>
                                        <li>• Account activity tracking</li>
                                        <li>• Privacy settings control</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Folder Structure */}
                    <section id="folder-structure" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Folder Structure</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <p>FreshCart follows a clean, organized folder structure for easy navigation and maintenance:</p>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`freshcart-react-theme/
├── public/
│   ├── images/          # Product & category images
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── components/     # Reusable UI components
│   │   └── ui/        # Base UI components
│   ├── pages/         # Page components
│   │   ├── home-dashboard/
│   │   ├── shopping-cart/
│   │   ├── product-details/
│   │   └── checkout/
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── i18n/          # Internationalization
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── package.json
└── README.md`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Theming & Customization */}
                    <section id="theming-customization" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Theming & Customization</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <h3 className="font-heading font-heading-bold text-text-primary text-base sm:text-lg">Color Customization</h3>
                            <p>Customize colors by editing the Tailwind config file:</p>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2D7D32',      // Main brand color
        secondary: '#558B2F',    // Secondary color
        accent: '#FF8F00',       // Accent color
      }
    }
  }
}`}
                                </pre>
                            </div>

                            <h3 className="font-heading font-heading-bold text-text-primary mt-4 sm:mt-6 text-base sm:text-lg">Typography</h3>
                            <p>Change fonts by updating the font families in tailwind.config.js:</p>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`fontFamily: {
  'heading': ['Inter', 'sans-serif'],
  'body': ['Source Sans Pro', 'sans-serif'],
  'caption': ['Roboto', 'sans-serif'],
  'data': ['JetBrains Mono', 'monospace']
}`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Performance & Best Practices */}
                    <section id="performance-best-practices" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Performance & Best Practices</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Performance Features</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Code splitting with React.lazy()</li>
                                        <li>• Image lazy loading</li>
                                        <li>• Bundle optimization</li>
                                        <li>• Tree shaking</li>
                                        <li>• Service worker caching</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Best Practices</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Component-based architecture</li>
                                        <li>• Custom hooks for logic reuse</li>
                                        <li>• Proper error boundaries</li>
                                        <li>• Accessibility compliance</li>
                                        <li>• SEO optimization</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Performance Metrics</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• Lighthouse Score: 95+</li>
                                    <li>• First Contentful Paint:  1.5s</li>
                                    <li>• Largest Contentful Paint:  2.5s</li>
                                    <li>• Cumulative Layout Shift:  0.1</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Accessibility */}
                    <section id="accessibility" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Accessibility</h2>
                        <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                            <p>FreshCart is built with accessibility in mind, following WCAG 2.1 AA guidelines:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Semantic HTML structure</li>
                                <li>Proper ARIA labels and roles</li>
                                <li>Keyboard navigation support</li>
                                <li>Screen reader compatibility</li>
                                <li>High contrast color ratios</li>
                                <li>Focus management</li>
                            </ul>
                        </div>
                    </section>

                    {/* Internationalization */}
                    <section id="internationalization" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Internationalization (i18n)</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <p>FreshCart supports multiple languages out of the box using react-i18next:</p>
                            <h3 className="font-heading font-heading-bold text-text-primary text-base sm:text-lg">Supported Languages</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>English (default)</li>
                                <li>Spanish</li>
                                <li>French</li>
                            </ul>
                            <h3 className="font-heading font-heading-bold text-text-primary mt-3 sm:mt-4 text-base sm:text-lg">Adding New Languages</h3>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <pre className="text-xs sm:text-sm font-mono text-text-primary overflow-x-auto">
                                    {`// 1. Add translation file in src/i18n/locales/
// 2. Import in src/i18n/index.js
// 3. Use in components:
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('welcome.title')}</h1>;`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* PWA & Offline */}
                    <section id="pwa-offline" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">PWA & Offline</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <p>FreshCart includes Progressive Web App features for enhanced user experience:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Service worker for offline functionality</li>
                                <li>Web app manifest for installability</li>
                                <li>Offline page caching</li>
                                <li>Background sync capabilities</li>
                                <li>Push notification support</li>
                            </ul>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">PWA Features</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• Install prompt for mobile/desktop</li>
                                    <li>• Offline browsing capability</li>
                                    <li>• Fast loading with caching</li>
                                    <li>• App-like experience</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Support & Updates */}
                    <section id="support-updates" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Support & Updates</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Premium Support Included</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• 6 months premium support</li>
                                    <li>• Email support: support@kayeaseglobal.com</li>
                                    <li>• Response time: 24-48 hours</li>
                                    <li>• Installation assistance</li>
                                    <li>• Customization guidance</li>
                                </ul>
                            </div>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Regular Updates</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• Bug fixes and improvements</li>
                                    <li>• New features and components</li>
                                    <li>• Security updates</li>
                                    <li>• Browser compatibility updates</li>
                                    <li>• Free lifetime updates</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Changelog */}
                    <section id="changelog" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Changelog</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Version 1.0.0 - January 15, 2024</h3>
                                <h4 className="font-heading font-heading-bold text-text-primary text-xs sm:text-sm mb-1">Complete E-commerce Features</h4>
                                <ul className="text-xs sm:text-sm space-y-1 mb-3">
                                    <li>• 4 unique homepage styles (Classic, Modern, Minimal, Deal-focused)</li>
                                    <li>• Complete shopping cart with promo codes and delivery options</li>
                                    <li>• Advanced wishlist with bulk operations and sorting</li>
                                    <li>• User authentication with sign up, sign in, and password recovery</li>
                                    <li>• Order management with tracking, history, and PDF invoices</li>
                                    <li>• Product catalog with 13+ products across 8 categories</li>
                                    <li>• Advanced search with voice search and barcode scanning</li>
                                    <li>• User profile with address and payment method management</li>
                                    <li>• Multi-step checkout process with address validation</li>
                                    <li>• Real-time search suggestions and filtering</li>
                                    <li>• PWA support with offline functionality</li>
                                    <li>• Dark/Light mode toggle</li>
                                </ul>
                                <h4 className="font-heading font-heading-bold text-text-primary text-xs sm:text-sm mb-1">Technical Features</h4>
                                <ul className="text-xs sm:text-sm space-y-1 mb-3">
                                    <li>• React 18 with modern hooks and Context API</li>
                                    <li>• Tailwind CSS with custom design system</li>
                                    <li>• Framer Motion for smooth animations</li>
                                    <li>• React Hook Form for form validation</li>
                                    <li>• i18next for internationalization (3 languages)</li>
                                    <li>• Smart image optimization and lazy loading</li>
                                    <li>• SEO optimized components</li>
                                    <li>• Mobile-first responsive design</li>
                                    <li>• Accessibility compliance (WCAG 2.1 AA)</li>
                                    <li>• Performance optimized (Lighthouse Score 95+)</li>
                                </ul>
                                <h4 className="font-heading font-heading-bold text-text-primary text-xs sm:text-sm mb-1">Pages & Components</h4>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• 25+ pages including landing, documentation, and all e-commerce pages</li>
                                    <li>• 50+ reusable UI components</li>
                                    <li>• Complete authentication flow</li>
                                    <li>• Product details with image gallery and reviews</li>
                                    <li>• Order tracking with status updates</li>
                                    <li>• Help, policies, and legal pages</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Credits & Licensing */}
                    <section id="credits-licensing" className="mb-8 sm:mb-12 lg:mb-14 scroll-mt-20 sm:scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl font-heading font-heading-bold mb-3 sm:mb-4">Credits & Licensing</h2>
                        <div className="space-y-3 sm:space-y-4 font-body text-text-secondary leading-relaxed">
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Theme License</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• Commercial license included</li>
                                    <li>• Use for unlimited personal/commercial projects</li>
                                    <li>• Modify and customize as needed</li>
                                    <li>• No attribution required</li>
                                </ul>
                            </div>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Third-party Libraries</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• React - MIT License</li>
                                    <li>• Tailwind CSS - MIT License</li>
                                    <li>• Framer Motion - MIT License</li>
                                    <li>• Lucide React - ISC License</li>
                                    <li>• All images are for demo purposes only</li>
                                </ul>
                            </div>
                            <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">Credits</h3>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• Developed by Kayease Global</li>
                                    <li>• Design inspiration from modern e-commerce trends</li>
                                    <li>• Icons by Lucide</li>
                                    <li>• Images from Unsplash (demo only)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div className="text-xs text-text-secondary font-data mt-12 sm:mt-16 lg:mt-20">© {new Date().getFullYear()} FreshCart Theme by Kayease Global. All rights reserved.</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Documentation;
