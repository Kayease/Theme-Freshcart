import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ActiveOrderCard from './components/ActiveOrderCard';
import HistoryOrderCard from './components/HistoryOrderCard';
import OrderFilters from './components/OrderFilters';
import FavoriteOrdersSection from './components/FavoriteOrdersSection';
import OrderTrackingModal from './components/OrderTrackingModal';
import Footer from '../../components/ui/Footer';

const OrderHistoryTracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Mock data for active orders
  const activeOrders = [
    {
      id: "ORD-2024-001",
      status: "out_for_delivery",
      orderDate: "Dec 15, 2024",
      estimatedDelivery: "2:30 PM Today",
      total: 89.50,
      itemCount: 12,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      driverInfo: {
        name: "Michael Rodriguez",
        phone: "+1 (555) 123-4567",
        vehicle: "Honda Civic - ABC 123"
      },
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
          name: "Organic Chicken Breast",
          quantity: 2,
          price: 12.99,
          image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      status: "preparing",
      orderDate: "Dec 15, 2024",
      estimatedDelivery: "4:00 PM Today",
      total: 45.75,
      itemCount: 8,
      deliveryAddress: "456 Oak Avenue, Brooklyn, NY 11201",
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
          name: "Organic Eggs - Dozen",
          quantity: 1,
          price: 6.99,
          image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"
        }
      ]
    }
  ];

  // Mock data for order history
  const orderHistory = [
    {
      id: "ORD-2024-003",
      status: "delivered",
      orderDate: "Dec 12, 2024",
      deliveredDate: "Dec 12, 2024",
      total: 67.25,
      itemCount: 15,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      rating: 5,
      items: [
        {
          name: "Fresh Strawberries",
          quantity: 2,
          price: 4.99,
          image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
        },
        {
          name: "Avocados - Pack of 4",
          quantity: 1,
          price: 5.99,
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"
        },
        {
          name: "Organic Tomatoes",
          quantity: 3,
          price: 3.99,
          image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400"
        },
        {
          name: "Fresh Salmon Fillet",
          quantity: 1,
          price: 15.99,
          image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400"
        }
      ]
    },
    {
      id: "ORD-2024-004",
      status: "delivered",
      orderDate: "Dec 10, 2024",
      deliveredDate: "Dec 10, 2024",
      total: 123.80,
      itemCount: 22,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      rating: 4,
      items: [
        {
          name: "Organic Apples - 3lb Bag",
          quantity: 1,
          price: 6.99,
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
        },
        {
          name: "Ground Beef - 1lb",
          quantity: 2,
          price: 8.99,
          image: "https://images.unsplash.com/photo-1588347818111-d3b9c4b5e4c5?w=400"
        },
        {
          name: "Pasta - Spaghetti",
          quantity: 3,
          price: 2.49,
          image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400"
        }
      ]
    },
    {
      id: "ORD-2024-005",
      status: "cancelled",
      orderDate: "Dec 8, 2024",
      total: 34.50,
      itemCount: 6,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      items: [
        {
          name: "Orange Juice - 64oz",
          quantity: 2,
          price: 4.99,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400"
        },
        {
          name: "Cereal - Whole Grain",
          quantity: 1,
          price: 5.99,
          image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400"
        }
      ]
    }
  ];

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
    // In real app, would add items to cart and navigate to cart
    console.log('Reordering items:', items);
    navigate('/shopping-cart');
  };

  const handleViewReceipt = (orderId) => {
    // In real app, would download or display receipt
    console.log('Viewing receipt for order:', orderId);
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

        {/* Favorite Orders Section */}
        <FavoriteOrdersSection 
          favoriteOrders={favoriteOrders}
          onReorderFavorite={handleReorder}
        />

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-body font-body-medium text-sm transition-smooth ${
                  activeTab === 'active' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
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
                className={`py-4 px-1 border-b-2 font-body font-body-medium text-sm transition-smooth ${
                  activeTab === 'history' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
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
                  {searchQuery || statusFilter !== 'all' || dateRange !== 'all' ?'Try adjusting your filters to find more orders.' :'You haven\'t placed any orders yet.'}
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