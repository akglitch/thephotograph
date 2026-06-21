'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { galleryImages, categories as categoryNames } from '../data/galleryImages';
import CustomCursor from './customCursor';
import CommentSection from './commentSection';

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showBio, setShowBio] = useState(false);
  
  // Reverse the images so the newest (last in data) appear first
  const displayImages = [...galleryImages].reverse();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (isLoading || showBio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading, showBio]);

  useEffect(() => {
    // Give the high-end animation exactly enough time to play out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const categories = categoryNames.map((cat) => ({
    id: cat.id,
    name: cat.label,
    count: cat.id === 'all' 
      ? displayImages.length 
      : displayImages.filter(img => img.category === cat.id).length
  }));

  const filteredImages =
    activeCategory === 'all'
      ? displayImages
      : displayImages.filter((img) => img.category === activeCategory);

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
    const currentIndex = displayImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + displayImages.length) % displayImages.length;
    setSelectedImage(displayImages[nextIndex]);
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground tracking-[0.2em] leading-none font-light uppercase"
              >
                The Archive
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-6">
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                className="text-xs uppercase tracking-[0.6em] text-muted-foreground"
              >
                Kwaku Ntiri
              </motion.p>
            </div>

            {/* Minimal loading progress line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-border"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        ref={containerRef}
        style={{ position: 'relative' }}
        className={`relative overflow-hidden bg-background text-foreground min-h-screen font-sans transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="mx-auto max-w-8xl px-6 py-32 sm:px-12 lg:px-24">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 border-b border-border pb-12">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
              >
                Curated Collection
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-widest leading-none font-light uppercase"
              >
                The Archive
              </motion.h1>
            </div>

            <div className="flex flex-col items-start md:items-end gap-12">
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                onClick={() => setShowBio(true)}
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-[1px] bg-border group-hover:w-12 group-hover:bg-foreground transition-all duration-500" />
                Studio / About
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap gap-8"
              >
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all duration-500 hover:text-foreground relative ${activeCategory === category.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                    }`}
                >
                  {category.name}
                  <span className={`absolute left-0 bottom-0 h-[1px] bg-foreground transition-all duration-500 ${activeCategory === category.id ? 'w-full' : 'w-0'}`}></span>
                </button>
              ))}
            </motion.div>
          </div>
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
                <div className="relative w-full mb-6 overflow-hidden bg-muted">
                  {!loadedImages.has(image.id) && (
                    <div className="absolute inset-0 z-10 bg-muted animate-pulse" />
                  )}

                  {/* Artist Tag - Vertical Signature */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-left -rotate-90">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 group-hover:text-foreground/80 transition-all duration-700 whitespace-nowrap">
                      Kwaku Ntiri &copy; {new Date().getFullYear()}
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
                    priority={index < 4 || image.src === '/img4.jpg' || image.src === '/20251005_125020.jpg'}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif text-foreground uppercase tracking-wider">{image.title}</h3>
                    <p className="text-sm text-muted-foreground font-light max-w-sm">{image.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{image.category}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Guestbook / Comment Section */}
          <CommentSection />

          {/* Footer Call to Action */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="mt-40 pt-20 border-t border-border text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Inquiries</p>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground uppercase tracking-widest font-light mb-12">Private Commissions</h2>
            
            <div className="flex flex-col items-center justify-center gap-3 mb-12 text-sm text-muted-foreground tracking-widest uppercase">
              <p><a href="mailto:ntirianinakwa@gmail.com" className="hover:text-foreground transition-colors">ntirianinakwa@gmail.com</a></p>
              <p><a href="https://wa.me/233209742331" className="hover:text-foreground transition-colors">+233 209742331</a></p>
              <p>Accra East Legon</p>
            </div>

            <button className="text-xs uppercase tracking-[0.2em] text-foreground border border-border px-12 py-5 hover:bg-foreground hover:text-background transition-colors duration-500">
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
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Top Minimal Header */}
              <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{displayImages.findIndex(img => img.id === selectedImage.id) + 1} / {displayImages.length}</p>
                <button
                  onClick={closeLightbox}
                  className="text-xs uppercase tracking-[0.2em] text-white hover:text-white/60 transition-colors"
                >
                  Close [esc]
                </button>
              </div>

              {/* Navigations */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20 hidden md:block">
                <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="text-xs uppercase tracking-[0.2em] text-white hover:text-white/60 transition-colors mix-blend-difference">Prev</button>
              </div>
              <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden md:block">
                <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="text-xs uppercase tracking-[0.2em] text-white hover:text-white/60 transition-colors mix-blend-difference">Next</button>
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
                  <p className="text-[10px] uppercase tracking-[0.8em] text-foreground/10 whitespace-nowrap">
                    Authenticated Original — Kwaku Ntiri
                  </p>
                </div>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </motion.div>

              {/* Bottom Info Footer */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-end md:items-center z-20 gap-4">
                <div>
                  <h3 className="text-2xl font-serif text-white uppercase tracking-wider mb-2">{selectedImage.title}</h3>
                  <p className="text-sm text-white/70 font-light max-w-xl">{selectedImage.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{selectedImage.category}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">Collection {new Date().getFullYear()}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Editorial Bio Overlay */}
      <AnimatePresence>
        {showBio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex justify-end"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBio(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Content Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full max-w-2xl bg-muted h-full overflow-y-auto p-12 md:p-24 border-l border-border"
            >
              <button 
                onClick={() => setShowBio(false)}
                className="absolute top-12 right-12 text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Close [esc]
              </button>

              <div className="mt-20 space-y-24">
                <section>
                  <div className="mb-12">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">Director & Photographer</p>
                    <h1 className="text-6xl md:text-8xl font-signature text-foreground/90 low-indent">Kwaku Ntiri Aninakwa</h1>
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">The Philosophy</p>
                  <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-12 uppercase tracking-wide">
                    Capturing the <span className="font-editorial">unseen</span> rhythm of the mundane.
                  </h2>
                  <div className="space-y-8 text-sm text-muted-foreground font-light leading-relaxed text-justify-balanced">
                    <p>
                      The Archive is more than a collection of images; it is a clinical yet poetic exploration of existence. 
                      Every frame is a dialogue between light and shadow, a silent witness to the fleeting moments 
                      that define our shared human experience.
                    </p>
                    <p>
                      Based in the intersection of street realism and editorial grace, Kwaku Ntiri&rsquo;s work seeks to find 
                      geometry in chaos and stillness in the rush. We believe that photography is not just 
                      about seeing, but about feeling the weight of the air within the frame.
                    </p>
                  </div>
                </section>

                <section className="pt-12 border-t border-border">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">The Process</p>
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-4">Analog Soul</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Preserving the grain and the honesty of the physical world in every digital capture.</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-4">Digital Precision</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Ultra-high fidelity optimization for the modern era of visual storytelling.</p>
                    </div>
                  </div>
                </section>

                <section className="pt-12 border-t border-border pb-12">
                  <div className="flex justify-between items-end">
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4">Contact Studio</p>
                      <p className="text-sm md:text-base font-serif text-foreground tracking-widest uppercase">
                        <a href="mailto:ntirianinakwa@gmail.com" className="hover:text-muted-foreground transition-colors">ntirianinakwa@gmail.com</a>
                      </p>
                      <p className="text-sm md:text-base font-serif text-foreground tracking-widest uppercase">
                        <a href="https://wa.me/233209742331" className="hover:text-muted-foreground transition-colors">+233 209742331</a>
                      </p>
                      <p className="text-sm md:text-base font-serif text-foreground tracking-widest uppercase">
                        Accra East Legon
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">&copy; {new Date().getFullYear()} THE ARCHIVE</p>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>

  );
}
