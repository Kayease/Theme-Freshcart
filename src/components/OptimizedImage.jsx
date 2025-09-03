// Backwards compatibility wrapper around new SmartImage
import React from 'react';
import SmartImage from './SmartImage';

const OptimizedImage = props => <SmartImage {...props} />;

export default OptimizedImage;
