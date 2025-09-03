import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ product }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' },
  ];

  const mockReviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality and freshness!",
      comment: `These organic apples are absolutely fantastic! They arrived fresh, crisp, and perfectly ripe. The packaging was excellent and kept them in great condition during delivery. I've ordered these multiple times now and they're consistently high quality. Highly recommend for anyone looking for premium organic produce.`,
      helpful: 12,
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      userName: "Mike Chen",
      rating: 4,
      date: "2024-01-12",
      title: "Good value for money",
      comment: `Pretty good apples overall. They taste fresh and have a nice crunch. The only reason I'm giving 4 stars instead of 5 is that a couple of them had small bruises, but nothing major. The delivery was quick and the price is reasonable for organic produce.`,
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "Emma Wilson",
      rating: 5,
      date: "2024-01-10",
      title: "Perfect for baking!",
      comment: `I bought these specifically for making apple pie and they worked perfectly. The texture held up well during baking and the flavor was excellent. Will definitely order again for my next baking project.`,
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      userName: "David Rodriguez",
      rating: 3,
      date: "2024-01-08",
      title: "Average quality",
      comment: `The apples were okay but not exceptional. Some were very good while others were a bit mealy. For the price, I expected more consistent quality. Delivery was fast though.`,
      helpful: 3,
      verified: false
    },
    {
      id: 5,
      userName: "Lisa Thompson",
      rating: 5,
      date: "2024-01-05",
      title: "Kids love them!",
      comment: `My children absolutely love these apples! They're sweet, crunchy, and the perfect size for lunch boxes. Being organic gives me peace of mind about what my kids are eating. Great product!`,
      helpful: 9,
      verified: true
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  const renderRatingDistribution = () => {
    const distribution = [
      { stars: 5, count: 45, percentage: 60 },
      { stars: 4, count: 20, percentage: 27 },
      { stars: 3, count: 8, percentage: 11 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 },
    ];

    return (
      <div className="space-y-2">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center space-x-3">
            <span className="text-sm font-body text-text-secondary w-8">
              {item.stars}★
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm font-body text-text-secondary w-8">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-heading-bold text-text-primary">
          Customer Reviews
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-body text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-body border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <span className="text-4xl font-heading font-heading-bold text-text-primary">
              {product.rating}
            </span>
            <div className="space-y-1">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <p className="text-sm font-body text-text-secondary">
                Based on {product.reviewCount} reviews
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-body-medium text-text-primary">Rating Distribution</h4>
          {renderRatingDistribution()}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-body-medium text-sm">
                  {review.userName.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-body-medium text-text-primary">
                        {review.userName}
                      </span>
                      {review.verified && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Icon name="CheckCircle" size={14} />
                          <span className="text-xs font-caption">Verified Purchase</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-body text-text-secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-body-medium text-text-primary">
                    {review.title}
                  </h4>
                  <p className="font-body text-text-secondary leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {review.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="text-sm font-body">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth">
                    <Icon name="Flag" size={14} />
                    <span className="text-sm font-body">Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {mockReviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${mockReviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;