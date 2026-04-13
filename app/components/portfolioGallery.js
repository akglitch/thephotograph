'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from './PortfolioData';

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    // Give the high-end animation exactly enough time to play out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const categories = portfolioData.categories.map((category) => ({
    ...category,
    count:
      category.id === 'all'
        ? portfolioData.images.length
        : portfolioData.images.filter((img) => img.category === category.id).length,
  }));

  const filteredImages =
    activeCategory === 'all'
      ? portfolioData.images
      : portfolioData.images.filter((img) => img.category === activeCategory);

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

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
    const currentIndex = portfolioData.images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + portfolioData.images.length) % portfolioData.images.length;
    setSelectedImage(portfolioData.images[nextIndex]);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-[0.2em] leading-none font-light uppercase"
              >
                The Archive
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-6">
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                className="text-xs uppercase tracking-[0.6em] text-[#888]"
              >
                Kaytee
              </motion.p>
            </div>
            
            {/* Minimal loading progress line */}
            <motion.div 
              className="absolute bottom-0 left-0 h-[1px] bg-[#333]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section className={`relative overflow-hidden bg-[#050505] text-[#e5e5e5] min-h-screen font-sans transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mx-auto max-w-8xl px-6 py-32 sm:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 border-b border-[#222] pb-12">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.3em] text-[#888] mb-6"
            >
              Curated Collection
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-widest leading-none font-light uppercase"
            >
              The Archive
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 md:mt-0 flex flex-wrap gap-8"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all duration-500 hover:text-white relative ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-[#666]'
                }`}
              >
                {category.name}
                <span className={`absolute left-0 bottom-0 h-[1px] bg-white transition-all duration-500 ${activeCategory === category.id ? 'w-full' : 'w-0'}`}></span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 gap-y-16 space-y-16">
          {filteredImages.map((image, index) => (
            <motion.article
              key={image.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
              className="group break-inside-avoid cursor-pointer overflow-hidden"
              onClick={() => openLightbox(image)}
            >
              <div className="relative w-full mb-6 overflow-hidden bg-[#111]">
                {!loadedImages.has(image.id) && (
                  <div className="absolute inset-0 z-10 bg-[#0a0a0a] animate-pulse" />
                )}
                
                {/* Artist Tag - Vertical Signature */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-left -rotate-90">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/80 transition-all duration-700 whitespace-nowrap">
                    Kaytee &copy; {new Date().getFullYear()}
                  </p>
                </div>

                {/* Dynamically size based on aspect ratios or just use intrinsic sizing. For masonry, standard images with auto height works best. */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] grayscale-[30%] group-hover:grayscale-0"
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>
              
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-white uppercase tracking-wider">{image.title}</h3>
                  <p className="text-sm text-[#888] font-light max-w-sm">{image.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#666]">{image.category}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="mt-40 pt-20 border-t border-[#222] text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#888] mb-6">Inquiries</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-widest font-light mb-12">Private Commissions</h2>
          <button className="text-xs uppercase tracking-[0.2em] text-white border border-[#333] px-12 py-5 hover:bg-white hover:text-black transition-colors duration-500">
            Contact Studio
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] px-4 py-8"
            onClick={closeLightbox}
          >
            {/* Top Minimal Header */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
              <p className="text-xs uppercase tracking-[0.2em] text-[#888]">{selectedImage.id.toString().padStart(3, '0')} / {portfolioData.images.length.toString().padStart(3, '0')}</p>
              <button
                onClick={closeLightbox}
                className="text-xs uppercase tracking-[0.2em] text-white hover:text-[#888] transition-colors"
              >
                Close [esc]
              </button>
            </div>

            {/* Navigations */}
            <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20 hidden md:block">
               <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="text-xs uppercase tracking-[0.2em] text-white hover:text-[#888] transition-colors mix-blend-difference">Prev</button>
            </div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden md:block">
               <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="text-xs uppercase tracking-[0.2em] text-white hover:text-[#888] transition-colors mix-blend-difference">Next</button>
            </div>

            {/* Central Image Wrapper */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-[85vh] max-w-7xl group"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Artist Tag - Subtle Branding */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-center -rotate-90 hidden lg:block">
                <p className="text-[10px] uppercase tracking-[0.8em] text-white/10 whitespace-nowrap">
                  Authenticated Original — Kaytee
                </p>
              </div>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Bottom Info Footer */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-end md:items-center z-20 gap-4">
              <div>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wider mb-2">{selectedImage.title}</h3>
                <p className="text-sm text-[#888] font-light max-w-xl">{selectedImage.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-[#666] mb-1">{selectedImage.location}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#444]">{selectedImage.camera}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}
