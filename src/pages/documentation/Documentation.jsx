import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';

const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'key-features', title: 'Key Features' },
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
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🛒 E-commerce Ready</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Shopping cart functionality</li>
                                        <li>• Product catalog & search</li>
                                        <li>• Wishlist management</li>
                                        <li>• Order tracking</li>
                                        <li>• Checkout process</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">⚡ Performance</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• Lighthouse Score 95+</li>
                                        <li>• Code splitting & lazy loading</li>
                                        <li>• Optimized images</li>
                                        <li>• PWA support</li>
                                        <li>• SEO optimized</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🎨 Design & UX</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• 4 homepage styles</li>
                                        <li>• Dark/Light mode</li>
                                        <li>• Mobile-first responsive</li>
                                        <li>• Smooth animations</li>
                                        <li>• Modern UI components</li>
                                    </ul>
                                </div>
                                <div className="bg-surface-secondary p-3 sm:p-4 rounded-lg border border-border-primary">
                                    <h3 className="font-heading font-heading-bold text-text-primary mb-2 text-sm sm:text-base">🔧 Developer Experience</h3>
                                    <ul className="text-xs sm:text-sm space-y-1">
                                        <li>• React 18 with hooks</li>
                                        <li>• Redux Toolkit</li>
                                        <li>• Tailwind CSS</li>
                                        <li>• TypeScript ready</li>
                                        <li>• Well-documented code</li>
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
                                <h4 className="font-heading font-heading-bold text-text-primary text-xs sm:text-sm mb-1">Added</h4>
                                <ul className="text-xs sm:text-sm space-y-1 mb-3">
                                    <li>• Initial release of FreshCart React theme</li>
                                    <li>• 4 different homepage styles</li>
                                    <li>• Complete e-commerce functionality</li>
                                    <li>• Responsive design for all devices</li>
                                    <li>• Modern React 18 with hooks</li>
                                    <li>• Redux Toolkit for state management</li>
                                    <li>• Tailwind CSS for styling</li>
                                    <li>• Authentication system</li>
                                    <li>• Shopping cart functionality</li>
                                    <li>• Wishlist management</li>
                                    <li>• Order tracking</li>
                                    <li>• Product search and filtering</li>
                                </ul>
                                <h4 className="font-heading font-heading-bold text-text-primary text-xs sm:text-sm mb-1">Technical Stack</h4>
                                <ul className="text-xs sm:text-sm space-y-1">
                                    <li>• React 18, Redux Toolkit, React Router v6</li>
                                    <li>• Tailwind CSS, Framer Motion</li>
                                    <li>• React Hook Form, Axios, Date-fns</li>
                                    <li>• Lucide React Icons</li>
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
