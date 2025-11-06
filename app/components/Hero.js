'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  // Premium background images rotation
  const backgroundImages = [
    "/img.webp",
    "/img2.jpg", 
    "/img3.jpg",
    "/img4.jpg"
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1 : 1.1
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" }
            }}
          >
            <Image
              src={image}
              alt="Premium photography background"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Container with Perfect Spacing */}
      <div className="relative z-20 h-full flex flex-col">
        
        {/* Top Spacer - Pushes content down below navigation */}
        <div className="flex-1 min-h-[120px]"></div>

        {/* Main Content - Perfectly Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 text-center w-full">
            
            {/* Premium Badge - Above Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-4 text-sm uppercase tracking-widest text-white/80">
                <div className="w-16 h-px bg-white/50"></div>
                AWARD-WINNING PHOTOGRAPHY
                <div className="w-16 h-px bg-white/50"></div>
              </div>
            </motion.div>

            {/* Main Headline - Perfect Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-none">
                <span className="block mb-2">CAPTURING</span>
                <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-2">
                  Timeless
                </span>
                <span className="block">MOMENTS</span>
              </h1>
            </motion.div>

            {/* Subheadline - Optimal Line Length */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16 max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Transforming fleeting moments into eternal memories through the art of photography. 
                Where emotion meets composition, and every frame tells a story worth preserving.
              </p>
            </motion.div>

            {/* CTA Buttons - Perfectly Spaced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
            
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Dedicated Space */}
        <div className="flex-1 min-h-[120px] flex flex-col justify-end pb-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Background Image Indicator - Perfectly Centered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="flex gap-3"
            >
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    currentImage === index 
                      ? 'bg-white scale-110 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </motion.div>

            {/* Scroll Indicator - Clear Separation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center"
            >
              <div className="text-white/70 text-sm uppercase tracking-widest mb-4 font-light">
                Discover More
              </div>
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center mx-auto backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-white/80 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Non-interfering */}
      <div className="absolute top-20 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
      <div className="absolute top-20 right-8 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
      <div className="absolute bottom-20 left-8 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
      <div className="absolute bottom-20 right-8 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>
    </section>
  );
}