import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';

const Returns = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Returns & Refunds', path: '/returns', icon: 'RotateCcw', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Returns & Refunds | FreshCart" description="Sample returns and refund policy for the demo theme." />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />
        <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-4">Returns & Refunds</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Return Window</h2>
            <p className="font-body">Non‑perishable items may be returned within 30 days in their original condition. Perishables should be reported within 24 hours for a replacement or credit.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Process</h2>
            <ol className="list-decimal ml-6 space-y-1 font-body">
              <li>Contact support with your order number and item details.</li>
              <li>We will provide a return authorization (demo step).</li>
              <li>Refunds are processed back to the original payment method.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">Exclusions</h2>
            <p className="font-body">For demo purposes, exclusions are minimal. In production, list any non‑returnable categories clearly.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;


