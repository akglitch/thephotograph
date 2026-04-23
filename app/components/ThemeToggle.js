'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const themes = ['light', 'dark', 'midnight'];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = themes.includes(theme) ? theme : resolvedTheme || 'dark';
  const currentIndex = themes.indexOf(currentTheme);

  const toggleTheme = () => {
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-center gap-4">
      <div className="relative group">
        {/* The "Wheel" indicator */}
        <div className="absolute inset-0 -m-1 rounded-full border border-border/20 scale-110" />
        <motion.div 
          className="absolute inset-0 -m-1 rounded-full border-t-2 border-foreground/40 scale-110"
          animate={{ rotate: currentIndex * 120 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        
        <button
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center border border-border bg-background hover:bg-muted transition-colors duration-500 rounded-full overflow-hidden shadow-xl"
          aria-label="Toggle theme"
          title={`Theme: ${currentTheme}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTheme}
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="absolute"
            >
              {currentTheme === 'light' && (
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {currentTheme === 'dark' && (
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {currentTheme === 'midnight' && (
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
      
      {/* Label for current theme (subtle) */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTheme}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground font-medium"
        >
          {currentTheme}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
