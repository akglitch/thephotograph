'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = ['light', 'dark', 'midnight'];

export default function ThemeToggle({
  variant = 'default',
  className = '',
  size = 'sm',
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-7 h-7 rounded-full border border-transparent shrink-0"
        aria-hidden="true"
      />
    );
  }

  const currentTheme = themes.includes(theme) ? theme : resolvedTheme || 'dark';
  const currentIndex = themes.indexOf(currentTheme);

  const toggleTheme = () => {
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const isLightVariant = variant === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
        isLightVariant
          ? 'border-white/30 text-white/90 hover:border-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
          : 'border-border/80 text-foreground/80 hover:border-foreground/50 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10'
      } ${className}`}
      aria-label={`Switch theme (current: ${currentTheme})`}
      title={`Theme: ${currentTheme} (click to cycle: light, dark, midnight)`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTheme}
          initial={{ y: 6, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -6, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {currentTheme === 'light' && (
            <svg
              className="w-3.5 h-3.5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
          {currentTheme === 'dark' && (
            <svg
              className="w-3.5 h-3.5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
          {currentTheme === 'midnight' && (
            <svg
              className="w-3.5 h-3.5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
