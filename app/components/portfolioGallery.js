'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from './PortfolioData';

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' or 'grid'
  const containerRef = useRef(null);

  const filteredImages = activeCategory === 'all' 
    ? portfolioData.images 
    : portfolioData.images.filter(img => img.category === activeCategory);

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
    const currentIndex = portfolioData.images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + portfolioData.images.length) % portfolioData.images.length;
    setSelectedImage(portfolioData.images[nextIndex]);
  };

  // Update category counts based on actual data
  const updatedCategories = portfolioData.categories.map(category => ({
    ...category,
    count: category.id === 'all' 
      ? portfolioData.images.length 
      : portfolioData.images.filter(img => img.category === category.id).length
  }));

  return (
    <>
      {/* Main Portfolio Section */}
      <section className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-20">
        <div className="max-w-8xl mx-auto px-6">
          
          {/* Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 text-sm uppercase tracking-widest text-gray-500 mb-6"
            >
              <div className="w-12 h-px bg-gray-300"></div>
              PORTFOLIO COLLECTION
              <div className="w-12 h-px bg-gray-300"></div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              <span className="block">Artistic</span>
              <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Excellence
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              A curated journey through moments frozen in time. Each photograph represents 
              a unique story, emotion, and perspective captured with technical mastery and artistic vision.
            </motion.p>
          </motion.div>

          {/* Enhanced Filter Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-16"
          >
            {/* View Mode Toggle */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'masonry'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 bg-white shadow-md hover:shadow-lg'
                }`}
              >
                Masonry View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 bg-white shadow-md hover:shadow-lg'
                }`}
              >
                Grid View
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {updatedCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-500 ${
                    activeCategory === category.id
                      ? 'text-white bg-gray-900 shadow-2xl'
                      : 'text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {category.name}
                    <span className="text-xs opacity-70">({category.count})</span>
                  </span>
                  
                  {/* Active state indicator */}
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gray-900 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-gray-500 text-sm">
              Showing {filteredImages.length} of {portfolioData.images.length} photographs
              {activeCategory !== 'all' && ` in ${updatedCategories.find(c => c.id === activeCategory)?.name}`}
            </p>
          </motion.div>

          {/* Dynamic Gallery Grid */}
          <motion.div 
            layout
            ref={containerRef}
            className={`${
              viewMode === 'masonry' 
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`}
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer transform hover:scale-[1.02] ${
                    viewMode === 'masonry' ? 'break-inside-avoid' : ''
                  }`}
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
                      priority={index < 8}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Featured Badge */}
                    {image.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </div>
                    )}

                  
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-white">
                        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{image.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>📍 {image.location}</span>
                          <span>📷 {image.camera}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick View Indicator */}
                    <div className="absolute top-14 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                <div className="text-8xl mb-6">📸</div>
                <h3 className="text-3xl font-light text-gray-900 mb-4">Collection Curating</h3>
                <p className="text-gray-600 text-lg mb-8">
                  We're currently preparing new {activeCategory} photographs. 
                  Meanwhile, explore our other stunning collections.
                </p>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  View All Works
                </button>
              </div>
            </motion.div>
          )}

          {/* Portfolio CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-light mb-4">Inspired by What You See?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's collaborate to create your own collection of timeless photographs. 
                Your story deserves to be told through the lens of artistic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  Start Your Project
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  View Pricing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
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

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {portfolioData.images.findIndex(img => img.id === selectedImage.id) + 1} / {portfolioData.images.length}
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                      <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>📍 {selectedImage.location}</span>
                        <span>📷 {selectedImage.camera}</span>
                        <span className="uppercase">#{selectedImage.category}</span>
                        {selectedImage.featured && (
                          <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs">Featured</span>
                        )}
                      </div>
                    </div>
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