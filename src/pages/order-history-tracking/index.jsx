import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ActiveOrderCard from './components/ActiveOrderCard';
import HistoryOrderCard from './components/HistoryOrderCard';
import OrderFilters from './components/OrderFilters';
import { useAuth } from '../../contexts/AuthContext';
import OrderTrackingModal from './components/OrderTrackingModal';
import Footer from '../../components/ui/Footer';
import SEO from '../../components/SEO';

const OrderHistoryTracking = () => {
  const navigate = useNavigate();
  const { user, addToCart, toast } = useAuth();
  const [history, setHistory] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Build orders from session
  useEffect(() => {
    const list = user?.orderHistory || [];
    const normalized = list.map(o => ({
      id: o.id || `ORD-${new Date(o.date || Date.now()).getTime()}`,
      status: (o.status || 'processing'),
      orderDate: new Date(o.date || Date.now()).toLocaleString(),
      deliveredDate: o.deliveredDate || undefined,
      total: Number(o.total ?? 0),
      itemCount: (o.items || []).reduce((n, i) => n + Number(i.quantity || 1), 0),
      deliveryAddress: `${o.address?.addressLine1 || ''} ${o.address?.addressLine2 || ''} ${o.address?.city || ''} ${o.address?.state || ''} ${o.address?.zipCode || ''}`.trim(),
      items: (o.items || []).map(i => ({
        name: i.name || 'Item',
        quantity: Number(i.quantity || 1),
        price: Number(i.price ?? 0),
        image: i.image || '/images/placeholder.jpg'
      }))
    })).reverse();
    setHistory(normalized);
    const actives = list.filter(o => (o.status || 'processing').toLowerCase() !== 'delivered' && (o.status || '').toLowerCase() !== 'cancelled')
      .map(o => ({
        id: o.id || `ORD-${new Date(o.date || Date.now()).getTime()}`,
        status: (o.status || 'processing').toLowerCase(),
        orderDate: new Date(o.date || Date.now()).toLocaleString(),
        estimatedDelivery: o.timeSlot?.eta || 'Today',
        total: Number(o.total || 0),
        itemCount: (o.items || []).reduce((n, i) => n + Number(i.quantity || 1), 0),
        deliveryAddress: `${o.address?.addressLine1 || ''} ${o.address?.addressLine2 || ''} ${o.address?.city || ''} ${o.address?.state || ''} ${o.address?.zipCode || ''}`.trim(),
        items: (o.items || []).map(i => ({
          name: i.name,
          quantity: Number(i.quantity || 1),
          price: Number(i.price || 0),
          image: i.image || '/images/placeholder.jpg'
        })),
        driverInfo: o.driverInfo || null
      }));
    setActiveOrders(actives);
  }, [user]);

  const orderHistory = history;

  // Mock favorite orders
  const favoriteOrders = [
    {
      id: "FAV-001",
      orderCount: 8,
      totalPrice: 45.75,
      items: [
        {
          name: "Fresh Organic Bananas",
          quantity: 2,
          price: 3.99,
          image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
        },
        {
          name: "Whole Milk - 1 Gallon",
          quantity: 1,
          price: 4.49,
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
        },
        {
          name: "Fresh Bread Loaf",
          quantity: 1,
          price: 2.99,
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
        },
        {
          name: "Organic Eggs - Dozen",
          quantity: 1,
          price: 6.99,
          image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"
        }
      ]
    },
    {
      id: "FAV-002",
      orderCount: 5,
      totalPrice: 67.25,
      items: [
        {
          name: "Greek Yogurt - 32oz",
          quantity: 2,
          price: 5.99,
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
        },
        {
          name: "Fresh Spinach",
          quantity: 1,
          price: 3.49,
          image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400"
        },
        {
          name: "Organic Chicken Breast",
          quantity: 2,
          price: 12.99,
          image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400"
        }
      ]
    }
  ];

  // Filter orders based on search and filters
  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = !searchQuery ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    // Simple date filtering (in real app, would use proper date comparison)
    const matchesDate = dateRange === 'all' || true; // Simplified for demo

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleTrackOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsTrackingModalOpen(true);
  };

  const handleContactDriver = (driverInfo) => {
    // In real app, would open contact modal or initiate call
    alert(`Contacting ${driverInfo.name} at ${driverInfo.phone}`);
  };

  const handleReorder = (items) => {
    try {
      (items || []).forEach((it) => {
        const product = {
          id: it.id || `${it.name}-${Math.random().toString(36).slice(2)}`,
          name: it.name || 'Item',
          price: Number(it.price ?? 0),
          image: it.image || '/images/placeholder.jpg'
        };
        const qty = Number(it.quantity || 1);
        addToCart(product, qty);
      });
      // toast?.success?.('Items added to cart');
      navigate('/shopping-cart');
    } catch { }
  };

  const handleViewReceipt = async (orderId) => {
    try {
      const order = (user?.orderHistory || []).find(o => (o.id || '').toString() === (orderId || '').toString());
      if (!order) return;

      // Ensure jsPDF is available (load dynamically if needed)
      const ensureJsPDF = () => new Promise((resolve) => {
        if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf.jsPDF); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve(window.jspdf.jsPDF);
        script.onerror = () => resolve(null);
        document.body.appendChild(script);
      });
      const jsPDFCtor = await ensureJsPDF();
      if (!jsPDFCtor) return;

      const doc = new jsPDFCtor({ unit: 'pt', format: 'a4' });
      const currency = (n) => `$${Number(n || 0).toFixed(2)}`;
      const pageWidth = doc.internal.pageSize.getWidth();

      // Brand Header Bar with logo
      doc.setFillColor('#0f8a3d');
      doc.rect(0, 0, pageWidth, 60, 'F');
      doc.setTextColor('#ffffff');
      // Try to draw logo if available
      const loadImageAsDataURL = (src) => new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          } catch { resolve(null); }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
      try {
        const dataUrl = await loadImageAsDataURL('/favicon.ico');
        if (dataUrl) {
          doc.addImage(dataUrl, 'PNG', 20, 14, 32, 32);
        }
      } catch {}
      doc.setFontSize(18);
      doc.text('FreshCart', 60, 38);
      doc.setFontSize(14);
      doc.text('Tax Invoice', pageWidth - 110, 38);
      doc.setTextColor('#000000');

      // Seller / Bill To boxes
      const boxTop = 80; const boxLeft = 24; const boxWidth = (pageWidth - 24 * 2 - 12) / 2; const boxHeight = 120;
      doc.setDrawColor('#e5e7eb');
      doc.rect(boxLeft, boxTop, boxWidth, boxHeight);
      doc.rect(boxLeft + boxWidth + 12, boxTop, boxWidth, boxHeight);
      doc.setFontSize(11);
      doc.text('Sold By:', boxLeft + 8, boxTop + 18);
      doc.text('Bill To:', boxLeft + boxWidth + 20, boxTop + 18);
      doc.setFontSize(9);
      const sellerText = 'FreshCart Stores\n123 Market Street, Downtown\nJaipur, Rajasthan 302021';
      const sellerLines = doc.splitTextToSize(sellerText, boxWidth - 16);
      sellerLines.forEach((t, i) => doc.text(t, boxLeft + 8, boxTop + 36 + i * 12));

      const customerName = order.address?.fullName || user?.name || user?.fullName || 'Customer';
      const billText = [
        customerName,
        `${order.address?.addressLine1 || ''} ${order.address?.addressLine2 || ''}`.trim(),
        `${order.address?.city || ''}, ${order.address?.state || ''} ${order.address?.zipCode || ''}`.trim()
      ].filter(Boolean).join('\n');
      const billLines = doc.splitTextToSize(billText, boxWidth - 16);
      billLines.forEach((t, i) => doc.text(t, boxLeft + boxWidth + 20, boxTop + 36 + i * 12));

      // Order meta box
      const metaTop = boxTop + boxHeight + 12;
      doc.rect(boxLeft, metaTop, pageWidth - 48, 50);
      doc.setFontSize(10);
      doc.text(`Order ID: ${order.id}`, boxLeft + 8, metaTop + 18);
      doc.text(`Order Date: ${new Date(order.date).toLocaleString()}`, boxLeft + 220, metaTop + 18);
      doc.text(`Delivery ETA: ${order.timeSlot?.eta || '—'}`, boxLeft + 8, metaTop + 36);
      doc.text(`Payment: Razorpay`, boxLeft + 220, metaTop + 36);

      // Items table
      const tableTop = metaTop + 70;
      const cols = [
        { key: 'sr', label: 'Sr.', width: 30 },
        { key: 'name', label: 'Item Description', width: pageWidth - 48 - 30 - 60 - 70 - 80 },
        { key: 'qty', label: 'Qty', width: 60, align: 'right' },
        { key: 'price', label: 'MRP', width: 70, align: 'right' },
        { key: 'total', label: 'Total', width: 80, align: 'right' }
      ];
      // Header row
      let y = tableTop;
      doc.setFillColor('#f3f4f6');
      doc.rect(boxLeft, y - 18, pageWidth - 48, 24, 'F');
      let x = boxLeft + 6;
      doc.setFontSize(10);
      cols.forEach(c => { doc.text(c.label, x + (c.align === 'right' ? c.width - 12 : 0), y - 2, { align: c.align || 'left' }); x += c.width; });
      // Body rows
      doc.setFontSize(9);
      (order.items || []).forEach((it, i) => {
        x = boxLeft + 6; y += 18;
        const row = [
          { v: String(i + 1) },
          { v: it.name },
          { v: String(Number(it.quantity || 1)), a: 'right' },
          { v: currency(it.price), a: 'right' },
          { v: currency(Number(it.price) * Number(it.quantity || 1)), a: 'right' }
        ];
        row.forEach((cell, idx) => {
          const col = cols[idx];
          doc.text(cell.v, x + (cell.a === 'right' ? col.width - 12 : 0), y, { align: cell.a || 'left' });
          x += col.width;
        });
        // row line
        doc.setDrawColor('#e5e7eb');
        doc.line(boxLeft, y + 6, pageWidth - 24, y + 6);
      });

      // Totals (prefer saved values)
      const subtotal = Number(order.subtotal ?? (order.items || []).reduce((s, i) => s + Number(i.price || 0) * Number(i.quantity || 1), 0));
      const tax = Number(order.tax ?? subtotal * 0.08);
      const deliveryFee = Number(order.deliveryFee ?? order.timeSlot?.price ?? 0);
      const tip = Number(order.tip || 0);
      const total = Number(order.total ?? (subtotal + tax + deliveryFee + tip));

      // Billing Summary box
      const sumTop = y + 18;
      const sumLeft = boxLeft; const sumWidth = pageWidth - 48;
      doc.rect(sumLeft, sumTop, sumWidth, 84);
      doc.setFontSize(11);
      doc.text('Billing Summary', sumLeft + sumWidth / 2, sumTop + 18, { align: 'center' });
      doc.setFontSize(10);
      const line1 = sumTop + 40;
      doc.text('Subtotal (Before Tax):', sumLeft + 12, line1);
      doc.text(currency(subtotal), sumLeft + sumWidth - 12, line1, { align: 'right' });
      const line2 = line1 + 16;
      doc.text('Delivery Charges:', sumLeft + 12, line2);
      doc.text(currency(deliveryFee), sumLeft + sumWidth - 12, line2, { align: 'right' });
      const line3 = line2 + 16;
      doc.setFontSize(12);
      doc.text('Total Amount:', sumLeft + 12, line3);
      doc.text(currency(total), sumLeft + sumWidth - 12, line3, { align: 'right' });

      // Footer terms
      const footTop = line3 + 32;
      doc.setFontSize(9);
      const terms = [
        'This is a computer generated invoice and does not require a physical signature.',
        'Please check all items at the time of delivery and report any discrepancies immediately.',
        'Return policy as per company terms and conditions.'
      ];
      terms.forEach((t, i) => doc.text(t, sumLeft, footTop + i * 12));

      doc.save(`invoice_${order.id}.pdf`);
    } catch (e) { }
  };

  const handleRateOrder = (orderId, rating) => {
    // In real app, would submit rating to API
    console.log('Rating order:', orderId, 'with', rating, 'stars');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateRange('all');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Order History', path: '/order-history-tracking', icon: 'Package', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Order History | FreshCart" description="Track active orders and browse past purchases." />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-heading-bold text-3xl text-text-primary mb-2">
                Order History & Tracking
              </h1>
              <p className="text-text-secondary">
                Track your current orders and browse your purchase history
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/product-categories-browse')}
              iconName="Plus"
              iconPosition="left"
            >
              New Order
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-body font-body-medium text-sm transition-smooth ${activeTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} />
                  <span>Active Orders</span>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {activeOrders.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-body font-body-medium text-sm transition-smooth ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="History" size={16} />
                  <span>Order History</span>
                  <span className="bg-border text-text-secondary text-xs px-2 py-1 rounded-full">
                    {orderHistory.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'active' ? (
          <div>
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-border-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-text-secondary" />
                </div>
                <h3 className="font-heading font-heading-semibold text-lg text-text-primary mb-2">
                  No Active Orders
                </h3>
                <p className="text-text-secondary mb-6">
                  You don't have any active orders at the moment.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/product-categories-browse')}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <ActiveOrderCard
                    key={order.id}
                    order={order}
                    onTrackOrder={handleTrackOrder}
                    onContactDriver={handleContactDriver}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Filters */}
            <OrderFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onClearFilters={handleClearFilters}
            />

            {/* Order History */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-border-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-text-secondary" />
                </div>
                <h3 className="font-heading font-heading-semibold text-lg text-text-primary mb-2">
                  No Orders Found
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery || statusFilter !== 'all' || dateRange !== 'all' ? 'Try adjusting your filters to find more orders.' : 'You haven\'t placed any orders yet.'}
                </p>
                {searchQuery || statusFilter !== 'all' || dateRange !== 'all' ? (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="X"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => navigate('/product-categories-browse')}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Start Shopping
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <HistoryOrderCard
                    key={order.id}
                    order={order}
                    onReorder={handleReorder}
                    onViewReceipt={handleViewReceipt}
                    onRateOrder={handleRateOrder}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default OrderHistoryTracking;