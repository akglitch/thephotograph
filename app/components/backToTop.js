'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-12 right-10 z-[90] flex flex-col items-center group mix-blend-difference"
          aria-label="Back to top"
        >
          {/* Vertical Line & Chevron */}
          <div className="relative flex flex-col items-center h-24 mb-4">
             {/* Chevron top */}
             <motion.div 
              className="w-2 h-2 border-t border-l border-foreground rotate-45 mb-[-1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Stem */}
            <motion.div 
              className="w-[1px] flex-grow bg-foreground/20 group-hover:bg-foreground transition-all duration-700 h-full"
            />
            
            {/* Label - Rotated Vertically */}
            <p className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] uppercase tracking-[0.4em] text-foreground/40 group-hover:text-foreground transition-all duration-700 whitespace-nowrap">
              Back to top
            </p>
          </div>

          {/* Progress Dot (Subtle) */}
          <div className="w-[3px] h-[3px] rounded-full bg-foreground/40 group-hover:bg-foreground transition-all duration-500" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
