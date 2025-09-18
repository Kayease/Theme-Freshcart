import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';

const Privacy = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Privacy Policy', path: '/privacy', icon: 'Shield', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Privacy Policy | FreshCart" description="Understand how data is handled in this demo theme." />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />
        <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">1. Overview</h2>
            <p className="font-body">This theme uses client‑side storage (localStorage) to simulate account and cart functionality for demo purposes only. No data is transmitted to a server by default.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">2. Information We Store</h2>
            <ul className="list-disc ml-6 space-y-1 font-body">
              <li>Demo user profile (name, email) in localStorage</li>
              <li>Cart and wishlist items in localStorage</li>
              <li>Remembered email for convenience if you opt in</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">3. Cookies</h2>
            <p className="font-body">This demo may use basic cookies for UI preferences (e.g., theme). Replace with your real consent and tracking solution in production.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">4. Third‑Party Services</h2>
            <p className="font-body">No third‑party analytics are enabled by default. If you integrate analytics or payment providers, update this policy accordingly.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">5. Your Rights</h2>
            <p className="font-body">Because this is a theme demo with client‑only data, you can clear your data anytime by using your browser’s storage controls.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


