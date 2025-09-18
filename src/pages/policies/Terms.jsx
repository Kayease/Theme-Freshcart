import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SEO from '../../components/SEO';

const Terms = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Terms of Service', path: '/terms', icon: 'FileText', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Terms of Service | FreshCart" description="Review FreshCart theme Terms of Service." />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <Breadcrumb customItems={breadcrumbItems} />

        <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-4">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-text-primary">
          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">1. Overview</h2>
            <p className="font-body">
              This is a demo theme for illustrative purposes only. All pages, flows, and policies are sample content to
              help you evaluate UI/UX. Do not treat the information as legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">2. Use of the Theme</h2>
            <p className="font-body">
              You may use this theme to preview interactions and page designs. Integration with your backend and real
              business logic is your responsibility. The authors are not liable for any loss arising from use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">3. Accounts</h2>
            <p className="font-body">
              The sign up, sign in, and password reset flows are simulated using localStorage for a realistic demo.
              Do not store sensitive data. Replace with your production auth when going live.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">4. Intellectual Property</h2>
            <p className="font-body">
              All trademarks, logos, and brand names used in the demo are for mock purposes. Replace with your own assets
              and verify usage rights for any third‑party materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">5. Limitation of Liability</h2>
            <p className="font-body">
              The theme is provided "as is" without warranty of any kind. The authors shall not be liable for any
              direct, indirect, incidental, or consequential damages arising from the use of this theme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-heading-semibold mb-2">6. Changes to Terms</h2>
            <p className="font-body">
              These sample Terms may be updated for clarity. For your real store, consult your legal counsel.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;


