import React from 'react';
import LandingHeader from '../../components/ui/LandingHeader';
import Footer from '../../components/ui/Footer';
import SmartImage from '../../components/SmartImage';
import Icon from '../../components/AppIcon';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const externalShowcases = [
    { title: 'React Official', desc: 'Modern library for building user interfaces', href: 'https://react.dev', badge: 'Tech' },
    { title: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid UI development', href: 'https://tailwindcss.com', badge: 'Styling' },
    { title: 'Vite', desc: 'Next generation frontend tooling', href: 'https://vitejs.dev', badge: 'Build' },
    { title: 'i18next', desc: 'Powerful internationalization framework', href: 'https://www.i18next.com', badge: 'Localization' },
    { title: 'Date-fns', desc: 'Modern JavaScript date utility library', href: 'https://date-fns.org', badge: 'Utilities' },
    { title: 'Framer Motion', desc: 'Production-ready motion library for React', href: 'https://www.framer.com/motion/', badge: 'Animation' }
];

const featureHighlights = [
    { icon: 'Zap', title: 'Fast by Default', desc: 'Vite-powered development & granular code splitting for optimal performance.' },
    { icon: 'Smartphone', title: 'Mobile First', desc: 'Adaptive layouts, touch-friendly components & installable PWA.' },
    { icon: 'Moon', title: 'Dark Mode Ready', desc: 'Semantic design tokens + class based theme switching.' },
    { icon: 'Languages', title: 'Multi-Language', desc: 'i18n pipeline prepared for locale expansion & future RTL.' },
    { icon: 'ShieldCheck', title: 'Accessible', desc: 'Color contrast aware palette & structured component semantics.' },
    { icon: 'Image', title: 'Smart Images', desc: 'Lazy loaded, responsive, WebP fallbacks & LQIP placeholders.' },
];

const stats = [
    { label: 'Core Pages', value: '25+' },
    { label: 'Home Variants', value: '4' },
    { label: 'Locales', value: '3' },
    { label: 'Performance Focus', value: '100%' },
];

// Icon-based creative representation for each home variant (replaces preview images for a cleaner look)
const homeVariants = [
    {
        id: 1,
        title: 'Classic Layout',
        desc: 'Balanced grocery storefront with familiar patterns.',
        path: '/home-dashboard-1',
        icon: 'LayoutGrid',
        accent: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
        iconBg: 'bg-emerald-500/15 text-emerald-600'
    },
    {
        id: 2,
        title: 'Modern Gradient',
        desc: 'Vibrant styling and elevated visual hierarchy.',
        path: '/home-dashboard-2',
        icon: 'Brush',
        accent: 'from-fuchsia-500/15 via-fuchsia-500/5 to-transparent',
        iconBg: 'bg-fuchsia-500/15 text-fuchsia-600'
    },
    {
        id: 3,
        title: 'Minimal Clean',
        desc: 'Whitespace-focused, distraction‑free browsing.',
        path: '/home-dashboard-3',
        icon: 'Square',
        accent: 'from-slate-500/15 via-slate-500/5 to-transparent',
        iconBg: 'bg-slate-500/15 text-slate-600'
    },
    {
        id: 4,
        title: 'Deal Focused',
        desc: 'Conversion-centric layout highlighting promotions.',
        path: '/home-dashboard-4',
        icon: 'Flame',
        accent: 'from-amber-500/20 via-amber-500/5 to-transparent',
        iconBg: 'bg-amber-500/15 text-amber-600'
    }
];

const HomeLanding = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-text-primary">
            <SEO title="FreshCart – Premium React E-commerce Theme" description="Modern React + Tailwind e-commerce theme with performance, accessibility & scalability." />
            <LandingHeader />
            <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <SmartImage src="/images/placeholder.jpg" alt="Abstract organic produce collage" className="w-full h-full object-cover opacity-10" sizes="100vw" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(45,125,50,0.18),transparent_60%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs font-data tracking-wide uppercase">React + Tailwind Premium Theme</div>
                    <h1 className="text-4xl md:text-5xl font-heading font-heading-bold tracking-tight mb-6 leading-tight">
                        Build a <span className="text-primary">Premium E‑commerce</span><br className="hidden sm:block" /> Experience Faster
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary font-body leading-relaxed max-w-2xl mx-auto mb-8">FreshCart is a production‑ready React theme focused on performance, accessibility, and extensibility—crafted for ThemeForest standards.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/documentation" className="px-8 py-4 rounded-button bg-primary text-primary-foreground font-body font-body-medium text-sm shadow-card hover:bg-primary/90 transition-smooth">View Documentation</Link>
                        <Link to="/home-dashboard" target='_blank' className="px-8 py-4 rounded-button bg-surface border border-border text-text-primary font-body text-sm hover:shadow-card hover:border-primary transition-smooth">Explore Demo Dashboard</Link>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-80 text-xs font-data">
                        {['Dark Mode', 'PWA', 'i18n', 'Lazy Loading', 'Responsive', 'Accessible'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-border-light rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </section>
            <main className="flex-1">
                {/* Feature Highlights */}
                <section className="py-16 border-t border-border-light bg-surface/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-heading font-heading-bold mb-3">Built for Scale & Quality</h2>
                            <p className="text-text-secondary font-body max-w-2xl mx-auto">A refined architecture and experience layer to accelerate marketplace-grade e‑commerce builds.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featureHighlights.map(f => (
                                <div key={f.title} className="group rounded-card p-6 bg-surface border border-border hover:border-primary/40 shadow-card hover:shadow-modal transition-smooth flex flex-col">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                        <Icon name={f.icon} size={20} />
                                    </div>
                                    <h3 className="font-heading font-heading-medium text-base mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                                    <p className="text-sm text-text-secondary font-body leading-relaxed flex-1">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Home Variants Showcase */}
                <section className="py-20 bg-surface/60 border-t border-border-light">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-heading-bold mb-3">Explore Home Variants</h2>
                                <p className="text-text-secondary font-body max-w-xl">Each starting point showcases a different merchandising & aesthetic strategy. Extend or remix to create unlimited storefront experiences.</p>
                            </div>
                            <Link to="/home-dashboard" className="self-start md:self-auto inline-flex items-center text-sm font-body-medium text-primary hover:underline">
                                View Aggregated Dashboard
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" /></svg>
                            </Link>
                        </div>
                                                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                                                        {homeVariants.map(v => (
                                                                <Link
                                                                    to={v.path}
                                                                    key={v.id}
                                                                    className="group relative rounded-2xl border border-border bg-surface shadow-card hover:shadow-modal hover:border-primary/40 transition-smooth flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                                                                    aria-label={`Open ${v.title}`}
                                                                >
                                                                    <div className={`relative h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br ${v.accent}`}>
                                                                        <div className={`w-14 h-14 ${v.iconBg} rounded-xl flex items-center justify-center backdrop-blur-sm shadow-card group-hover:scale-105 transition-transform`}>
                                                                            <Icon name={v.icon} size={28} />
                                                                        </div>
                                                                        <span className="absolute top-3 left-3 bg-background/80 backdrop-blur px-2 py-1 rounded-full text-[11px] font-data tracking-wide text-text-secondary group-hover:text-primary transition-colors shadow-sm">Variant {v.id}</span>
                                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
                                                                    </div>
                                                                    <div className="p-5 flex flex-col flex-1">
                                                                        <h3 className="font-heading font-heading-medium text-base mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                                                                        <p className="text-xs text-text-secondary font-body leading-relaxed flex-1">{v.desc}</p>
                                                                        <span className="mt-4 inline-flex items-center text-xs font-body-medium text-primary group-hover:underline">Open Variant
                                                                            <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" /></svg>
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                        ))}
                                                </div>
                    </div>
                </section>

                {/* Stats Band */}
                <section className="py-12 bg-gradient-to-r from-primary/90 to-secondary text-primary-foreground">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
                            {stats.map(s => (
                                <div key={s.label} className="space-y-1">
                                    <div className="text-3xl font-heading font-heading-bold tracking-tight drop-shadow-sm">{s.value}</div>
                                    <div className="text-xs font-data uppercase tracking-wide opacity-90">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>




                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-heading-bold mb-2">Ecosystem & Technologies</h2>
                                <p className="text-text-secondary font-body max-w-xl">FreshCart is built upon a high‑quality modern tooling stack. Explore the ecosystem powering the theme.</p>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {externalShowcases.map(card => (
                                <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="group relative rounded-card border border-border bg-surface p-6 flex flex-col shadow-card hover:shadow-modal transition-smooth focus:outline-none focus:ring-2 focus:ring-primary">
                                    <span className="absolute top-4 right-4 px-2 py-1 text-[10px] tracking-wide rounded-full bg-primary text-primary-foreground font-data uppercase opacity-90 group-hover:scale-105 transition-transform">{card.badge}</span>
                                    <h3 className="text-lg font-heading font-heading-medium mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                                    <p className="text-sm text-text-secondary font-body leading-relaxed flex-1">{card.desc}</p>
                                    <span className="mt-4 inline-flex items-center text-sm font-body-medium text-primary group-hover:underline">Visit Site
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" /></svg>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <div className="relative overflow-hidden rounded-2xl border border-border shadow-card bg-gradient-to-br from-surface via-surface to-primary/5 p-10 md:p-14">
                            <h2 className="text-3xl md:text-4xl font-heading font-heading-bold mb-6 tracking-tight">Launch Your Next Store Faster</h2>
                            <p className="text-text-secondary font-body max-w-2xl mx-auto mb-8">Use FreshCart as a strong baseline and extend with marketplace, subscription, or multi‑vendor features—without starting from scratch.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/documentation" className="px-8 py-4 rounded-button bg-primary text-primary-foreground font-body font-body-medium text-sm shadow-card hover:bg-primary/90 transition-smooth">Read the Docs</Link>
                                <Link to="/home-dashboard" target="_blank" className="px-8 py-4 rounded-button bg-surface border border-border text-text-primary font-body text-sm hover:shadow-card hover:border-primary transition-smooth">View Dashboard Demo</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomeLanding;
