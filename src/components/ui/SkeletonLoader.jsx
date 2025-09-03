import React from 'react';

const SkeletonLoader = ({ 
  variant = 'rectangular', 
  width = '100%', 
  height = '20px', 
  className = '',
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

// Pre-built skeleton components
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <SkeletonLoader variant="rectangular" height="200px" className="mb-4" />
    <SkeletonLoader variant="text" className="mb-2" />
    <SkeletonLoader variant="text" width="60%" className="mb-2" />
    <div className="flex justify-between items-center">
      <SkeletonLoader variant="text" width="40%" />
      <SkeletonLoader variant="rectangular" width="80px" height="32px" />
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-lg p-6">
    <SkeletonLoader variant="rectangular" height="120px" className="mb-4" />
    <SkeletonLoader variant="text" className="mb-2" />
    <SkeletonLoader variant="text" width="50%" />
  </div>
);

export const HeaderSkeleton = () => (
  <div className="bg-white border-b p-4">
    <div className="flex justify-between items-center">
      <SkeletonLoader variant="rectangular" width="120px" height="32px" />
      <SkeletonLoader variant="rectangular" width="300px" height="40px" />
      <div className="flex space-x-4">
        <SkeletonLoader variant="circular" width="40px" height="40px" />
        <SkeletonLoader variant="circular" width="40px" height="40px" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;