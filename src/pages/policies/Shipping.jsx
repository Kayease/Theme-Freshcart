import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';

const Shipping = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Shipping Policy', path: '/shipping', icon: 'Truck', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Shipping Policy | FreshCart" description="Sample shipping policy for the demo theme." />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />
        <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-4">Shipping Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Delivery Windows</h2>
            <p className="font-body">We offer 2‑hour delivery windows in supported demo regions. Exact timing is simulated; update with your carrier details for production.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Fees</h2>
            <p className="font-body">Delivery fees in this demo are placeholders and vary by selection (standard, express, scheduled). Configure your real pricing in code.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Geographic Coverage</h2>
            <p className="font-body">The demo assumes limited coverage for example purposes. Replace with your actual serviceable areas.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;


