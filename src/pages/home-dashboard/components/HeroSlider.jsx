import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Fresh Organic Produce",
      subtitle: "Farm to Table in 30 Minutes",
      description: "Get the freshest organic fruits and vegetables delivered to your doorstep with our express delivery service.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
      ctaText: "Shop Now",
      ctaLink: "/product-categories-browse",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      id: 2,
      title: "Premium Dairy Products",
      subtitle: "Fresh from Local Farms",
      description: "Discover our selection of premium dairy products sourced directly from trusted local farms.",
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?w=800&h=400&fit=crop",
      ctaText: "Explore Dairy",
      ctaLink: "/product-categories-browse",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: "Weekend Special Offers",
      subtitle: "Up to 40% Off",
      description: "Don't miss our weekend specials on pantry essentials, snacks, and household items.",
      image: "https://images.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg?w=800&h=400&fit=crop",
      ctaText: "View Offers",
      ctaLink: "/product-categories-browse",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-card">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`${slide.bgColor} w-full h-full relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 flex items-center h-full px-6 md:px-12">
                <div className="flex-1 text-white">
                  <h2 className="text-2xl md:text-4xl font-heading font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-body font-semibold mb-3">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm md:text-base font-body mb-6 max-w-md opacity-90">
                    {slide.description}
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => window.location.href = slide.ctaLink}
                  >
                    {slide.ctaText}
                  </Button>
                </div>
                <div className="hidden md:block flex-1">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white' :'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <Icon 
            name={isAutoPlaying ? "Pause" : "Play"} 
            size={14} 
            className="text-gray-800" 
          />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;