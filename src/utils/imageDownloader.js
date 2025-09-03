// Image downloader utility - Run this script to download all images locally
const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
};

// All images used in the theme
const images = {
  // Products
  products: [
    { url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop', name: 'avocados.jpg' },
    { url: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop', name: 'salmon.jpg' },
    { url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop', name: 'honey.jpg' },
    { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', name: 'bread.jpg' },
    { url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop', name: 'bananas.jpg' },
    { url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop', name: 'milk.jpg' },
    { url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop', name: 'eggs.jpg' },
    { url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', name: 'apples.jpg' },
    { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', name: 'yogurt.jpg' },
    { url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', name: 'olive-oil.jpg' },
    { url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop', name: 'honeycrisp-apples.jpg' },
    { url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop', name: 'oranges.jpg' },
    { url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop', name: 'grapes.jpg' }
  ],
  
  // Categories
  categories: [
    { url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop', name: 'fresh-fruits.jpg' },
    { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop', name: 'vegetables.jpg' },
    { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop', name: 'dairy.jpg' },
    { url: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?w=200&h=150&fit=crop', name: 'dairy-eggs.jpg' },
    { url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=150&fit=crop', name: 'meat-seafood.jpg' },
    { url: 'https://images.unsplash.com/photo-1544961503-7ad532c2e1aa?w=200&h=150&fit=crop', name: 'beverages.jpg' },
    { url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=200&h=150&fit=crop', name: 'snacks.jpg' },
    { url: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?w=200&h=150&fit=crop', name: 'health-beauty.jpg' }
  ],
  
  // Banners/Hero
  banners: [
    { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop', name: 'hero-groceries.jpg' },
    { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop', name: 'hero-groceries-square.jpg' },
    { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=500&fit=crop', name: 'hero-groceries-wide.jpg' }
  ]
};

async function downloadAllImages() {
  try {
    // Download products
    for (const img of images.products) {
      await downloadImage(img.url, `public/images/products/${img.name}`);
    }
    
    // Download categories
    for (const img of images.categories) {
      await downloadImage(img.url, `public/images/categories/${img.name}`);
    }
    
    // Download banners
    for (const img of images.banners) {
      await downloadImage(img.url, `public/images/banners/${img.name}`);
    }
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Run if called directly
if (require.main === module) {
  downloadAllImages();
}

module.exports = { downloadAllImages, images };