import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryTimeSlot = ({ selectedSlot, onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState('today');

  const deliveryDates = [
    { id: 'today', label: 'Today', date: 'Dec 15', available: true },
    { id: 'tomorrow', label: 'Tomorrow', date: 'Dec 16', available: true },
    { id: 'day-after', label: 'Day After', date: 'Dec 17', available: true }
  ];

  const timeSlots = {
    today: [
      { id: 'today-1', time: '6:00 PM - 8:00 PM', price: 2.99, available: true, popular: false },
      { id: 'today-2', time: '8:00 PM - 10:00 PM', price: 4.99, available: true, popular: true }
    ],
    tomorrow: [
      { id: 'tomorrow-1', time: '8:00 AM - 10:00 AM', price: 1.99, available: true, popular: true },
      { id: 'tomorrow-2', time: '10:00 AM - 12:00 PM', price: 1.99, available: true, popular: false },
      { id: 'tomorrow-3', time: '12:00 PM - 2:00 PM', price: 1.99, available: true, popular: false },
      { id: 'tomorrow-4', time: '2:00 PM - 4:00 PM', price: 1.99, available: true, popular: false },
      { id: 'tomorrow-5', time: '4:00 PM - 6:00 PM', price: 2.99, available: true, popular: false },
      { id: 'tomorrow-6', time: '6:00 PM - 8:00 PM', price: 2.99, available: false, popular: false },
      { id: 'tomorrow-7', time: '8:00 PM - 10:00 PM', price: 4.99, available: true, popular: false }
    ],
    'day-after': [
      { id: 'day-after-1', time: '8:00 AM - 10:00 AM', price: 1.99, available: true, popular: true },
      { id: 'day-after-2', time: '10:00 AM - 12:00 PM', price: 1.99, available: true, popular: false },
      { id: 'day-after-3', time: '12:00 PM - 2:00 PM', price: 1.99, available: true, popular: false },
      { id: 'day-after-4', time: '2:00 PM - 4:00 PM', price: 1.99, available: true, popular: false },
      { id: 'day-after-5', time: '4:00 PM - 6:00 PM', price: 2.99, available: true, popular: false },
      { id: 'day-after-6', time: '6:00 PM - 8:00 PM', price: 2.99, available: true, popular: false },
      { id: 'day-after-7', time: '8:00 PM - 10:00 PM', price: 4.99, available: true, popular: false }
    ]
  };

  const currentSlots = timeSlots[selectedDate] || [];

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-6">
        Delivery Time
      </h3>

      {/* Date Selection */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {deliveryDates.map((date) => (
          <button
            key={date.id}
            onClick={() => setSelectedDate(date.id)}
            disabled={!date.available}
            className={`flex-shrink-0 px-4 py-3 rounded-card border transition-smooth min-w-[100px] ${
              selectedDate === date.id
                ? 'border-primary bg-primary text-primary-foreground'
                : date.available
                ? 'border-border bg-surface text-text-primary hover:border-primary/50' :'border-border bg-border-light text-text-secondary cursor-not-allowed'
            }`}
          >
            <div className="text-center">
              <p className="text-sm font-body font-body-medium">{date.label}</p>
              <p className="text-xs opacity-80">{date.date}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && onSlotSelect(slot)}
            disabled={!slot.available}
            className={`p-4 rounded-card border text-left transition-smooth relative ${
              selectedSlot?.id === slot.id
                ? 'border-primary bg-primary/5'
                : slot.available
                ? 'border-border bg-surface hover:border-primary/50' :'border-border bg-border-light cursor-not-allowed'
            }`}
          >
            {slot.popular && slot.available && (
              <div className="absolute -top-2 left-3 bg-accent text-accent-foreground text-xs font-caption px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Clock" 
                  size={16} 
                  className={slot.available ? 'text-primary' : 'text-text-secondary'} 
                />
                <span className={`text-sm font-body font-body-medium ${
                  slot.available ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {slot.time}
                </span>
              </div>
              
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedSlot?.id === slot.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedSlot?.id === slot.id && (
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-lg font-data font-data-medium ${
                slot.available ? 'text-primary' : 'text-text-secondary'
              }`}>
                ${slot.price}
              </span>
              
              {!slot.available && (
                <span className="text-xs text-error font-caption">
                  Not Available
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {currentSlots.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            No delivery slots available for this date
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryTimeSlot;