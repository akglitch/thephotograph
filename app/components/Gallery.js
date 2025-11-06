'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Premium gallery data with high-quality image descriptions
const galleryData = {
  images: [
    {
      id: 1,
      src: "/img.webp",
      alt: "Elegant portrait of a woman in golden hour light, professional photography",
      category: "portrait",
      title: "Golden Hour Elegance",
      description: "Capturing the perfect moment when natural light creates magic",
      location: 
      "Paris, France",
      camera: "Canon EOS R5"
    },
    {
      id: 2,
      src: "/img2.jpg",
      alt: "Majestic mountain landscape at sunrise with dramatic cloud formations",
      category: "landscape",
      title: "Mountain Majesty",
      description: "The first light of dawn kissing the mountain peaks",
      location: "Swiss Alps",
      camera: "Sony A7R IV"
    },
    {
      id: 3,
      src: "/img3.jpg",
      alt: "Intimate wedding moment between bride and groom in romantic setting",
      category: "wedding",
      title: "Eternal Promise",
      description: "A stolen moment of pure love and connection",
      location: "Tuscany, Italy",
      camera: "Canon EOS R6"
    },
    {
      id: 4,
      src: "/img4.jpg",
      alt: "Professional black and white portrait with dramatic studio lighting",
      category: "portrait",
      title: "Monochrome Soul",
      description: "Stripping away color to reveal true emotion and character",
      location: "New York Studio",
      camera: "Phase One XF"
    },
    {
      id: 5,
      src: "/img5.jpg",
      alt: "Powerful ocean waves crashing against rugged coastal cliffs",
      category: "landscape",
      title: "Ocean's Power",
      description: "The raw, untamed beauty of nature's forces",
      location: "Big Sur, California",
      camera: "Nikon Z7 II"
    },
    {
      id: 6,
      src: "/img6.jpg",
      alt: "Joyful wedding reception with couple dancing under fairy lights",
      category: "wedding",
      title: "Celebration of Love",
      description: "The energy and joy of a wedding celebration in full swing",
      location: "Napa Valley, CA",
      camera: "Sony A7 III"
    },
    {
      id: 7,
      src: "/img7.jpg",
      alt: "Creative fashion portrait with unique styling and composition",
      category: "portrait",
      title: "Urban Poetry",
      description: "Where fashion meets storytelling in the heart of the city",
      location: "London, UK",
      camera: "Fujifilm GFX 100"
    },
    {
      id: 8,
      src: "/img8.jpg",
      alt: "Serene forest landscape with sunbeams filtering through ancient trees",
      category: "landscape",
      title: "Forest Cathedral",
      description: "Nature's sacred spaces where light and shadow dance",
      location: "Black Forest, Germany",
      camera: "Hasselblad X1D"
    },
    {
      id: 9,
      src: "/img9.jpg",
      alt: "Emotional wedding ceremony moment with tearful expressions",
      category: "wedding",
      title: "Sacred Vows",
      description: "The profound moment when two lives become one",
      location: "Santorini, Greece",
      camera: "Canon EOS R5"
    },
    {
      id: 10,
      src: "/img10.jpg",
      alt: "Dynamic street photography portrait in urban environment",
      category: "portrait",
      title: "City Rhythms",
      description: "Capturing the pulse of urban life and its characters",
      location: "Tokyo, Japan",
      camera: "Leica M11"
    }
  ],
  categories: [
    { id: 'all', name: 'All Works', count: 10 },
    { id: 'portrait', name: 'Portraits', count: 4 },
    { id: 'landscape', name: 'Landscapes', count: 3 },
    { id: 'wedding', name: 'Weddings', count: 3 }
  ]
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isGridLoaded, setIsGridLoaded] = useState(false);

  const filteredImages = activeCategory === 'all' 
    ? galleryData.images 
    : galleryData.images.filter(img => img.category === activeCategory);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const navigateLightbox = (direction) => {
    const currentIndex = galleryData.images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + galleryData.images.length) % galleryData.images.length;
    setSelectedImage(galleryData.images[nextIndex]);
  };

  return (
    <>
      {/* Main Gallery Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-8xl mx-auto px-6">
          
          {/* Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 mb-4">
              <div className="w-12 h-px bg-gray-300"></div>
              PORTFOLIO
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Visual <span className="italic font-serif">Storytelling</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated collection of moments captured with artistic vision and technical precision. 
              Each image tells a unique story of emotion, beauty, and human connection.
            </p>
          </motion.div>

          {/* Premium Filter Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {galleryData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'text-white bg-gray-900 shadow-2xl transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="relative z-10">{category.name}</span>
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
                
                {/* Animated underline for active state */}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Premium Masonry Grid */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="break-inside-avoid group relative bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => openLightbox(image)}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    {/* Loading State */}
                    {!loadedImages.has(image.id) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse z-10 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading masterpiece...</div>
                      </div>
                    )}
                    
                    {/* Main Image */}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={800}
                      className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                      onLoad={() => handleImageLoad(image.id)}
                      priority={index < 4}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-white">
                        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{image.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{image.location}</span>
                          <span>{image.camera}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick View Indicator */}
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="max-w-md mx-auto">
                <div className="text-8xl mb-6">🎨</div>
                <h3 className="text-3xl font-light text-gray-900 mb-4">Curating Perfection</h3>
                <p className="text-gray-600 text-lg">
                  New {activeCategory} collection coming soon. 
                  Meanwhile, explore our other photographic works.
                </p>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-light mb-4">Ready to Create Your Story?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Let's collaborate to capture the moments that matter most. 
                Your unique story deserves to be told through exceptional photography.
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Begin Your Journey
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
              >
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 bg-white group-hover:bg-gray-300 transition-colors duration-300 rotate-45 rounded-full"></div>
                  <div className="absolute inset-0 bg-white group-hover:bg-gray-300 transition-colors duration-300 -rotate-45 rounded-full"></div>
                </div>
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group"
              >
                <div className="w-6 h-6 border-l-2 border-t-2 border-white transform -rotate-45 group-hover:border-gray-300 transition-colors duration-300"></div>
              </button>

              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group"
              >
                <div className="w-6 h-6 border-r-2 border-t-2 border-white transform rotate-45 group-hover:border-gray-300 transition-colors duration-300"></div>
              </button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>📍 {selectedImage.location}</span>
                    <span>📷 {selectedImage.camera}</span>
                    <span>#{selectedImage.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}