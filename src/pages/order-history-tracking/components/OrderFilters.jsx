import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  dateRange,
  onDateRangeChange,
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'processing', label: 'Processing' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_year', label: 'Last Year' }
  ];

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || dateRange !== 'all';

  return (
    <div className="bg-surface border border-border rounded-card shadow-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-heading-semibold text-lg text-text-primary">
          Filter Orders
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search orders, items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-card bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-card bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                <Icon name="Search" size={12} />
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                <Icon name="Filter" size={12} />
                <span>{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                <button
                  onClick={() => onStatusFilterChange('all')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {dateRange !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                <Icon name="Calendar" size={12} />
                <span>{dateRangeOptions.find(opt => opt.value === dateRange)?.label}</span>
                <button
                  onClick={() => onDateRangeChange('all')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;