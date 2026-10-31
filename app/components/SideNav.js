'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/gallery' },
  { name: 'Wedding', href: '/wedding' },
  { name: 'Contact', href: '/contact' },
];

export default function SideNav({
  variant = 'default',
  className = '',
  isOpen: controlledIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpen = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalIsOpen(true);
    }
  }, [isControlled, onOpenChange]);

  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, onOpenChange]);

  // Lock body scroll smoothly without layout shift
  useEffect(() => {
    if (isOpen) {
      const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (!isTouch && scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Close drawer automatically on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (isOpen) {
        const timer = setTimeout(() => handleClose(), 0);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, isOpen, handleClose]);

  return (
    <>
      {/* Trigger Button on Small Screens */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-side-nav"
        className={`group inline-flex items-center gap-2.5 px-3 py-2 rounded-full border transition-colors duration-200 ${
          variant === 'light'
            ? 'border-white/30 text-white hover:border-white/60 hover:bg-white/10 active:bg-white/20'
            : 'border-border/60 text-foreground hover:border-foreground/30 hover:bg-foreground/5 active:bg-foreground/10'
        } ${className}`}
      >
        <span className="text-[10px] uppercase tracking-[0.24em] font-medium select-none">
          Menu
        </span>
        <div className="flex flex-col justify-center items-end gap-[5px] w-5 h-4" aria-hidden="true">
          <span className="block h-[1.5px] w-5 bg-current transition-all duration-200 group-hover:translate-x-0.5" />
          <span className="block h-[1.5px] w-3.5 bg-current transition-all duration-200 group-hover:w-5 group-hover:translate-x-0.5" />
        </div>
      </button>

      {/* Slide-out Drawer teleported directly to document.body via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="sidenav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  onClick={handleClose}
                  className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
                  aria-hidden="true"
                />

                {/* Side Panel - Full viewport slide, escapes header containing block */}
                <motion.aside
                  key="sidenav-panel"
                  id="mobile-side-nav"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
                  className="fixed top-0 right-0 bottom-0 z-[1000] flex h-[100dvh] w-[min(90vw,380px)] flex-col justify-between border-l border-border/50 bg-background p-6 shadow-2xl sm:p-8 overflow-y-auto"
                >
                  {/* Header inside drawer */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/40 shrink-0">
                    <Link
                      href="/"
                      onClick={handleClose}
                      aria-label="glitchStudioz home"
                      className="brand-logo-frame nav-brand-logo"
                    >
                      <Image
                        src="/logo.png"
                        alt="glitchStudioz"
                        width={1819}
                        height={2551}
                        priority
                        loading="eager"
                        className="brand-logo-image"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={handleClose}
                      aria-label="Close navigation menu"
                      className="group flex items-center gap-1.5 p-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <span className="hidden sm:inline-block">Close</span>
                      <XMarkIcon className="h-5 w-5 stroke-[1.5] transition-transform duration-200 group-hover:rotate-90" />
                    </button>
                  </div>

                  {/* Navigation Links - Editorial bespoke aesthetic */}
                  <nav className="my-auto py-8 flex flex-col justify-center">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 mb-6 select-none">
                      Index &bull; glitchStudioz
                    </p>

                    <div className="space-y-4 sm:space-y-5">
                      {navigationLinks.map((item) => {
                        const isActive =
                          item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href);

                        return (
                          <div key={item.href} className="group">
                            <Link
                              href={item.href}
                              onClick={handleClose}
                              className={`flex items-center justify-between py-2 transition-all duration-300 ${
                                isActive
                                  ? 'text-foreground'
                                  : 'text-foreground/40 hover:text-foreground'
                              }`}
                            >
                              <span
                                className={`font-serif text-3xl sm:text-4xl font-light tracking-wide transition-all duration-300 ${
                                  isActive
                                    ? 'italic font-normal translate-x-1.5 text-foreground'
                                    : 'group-hover:italic group-hover:translate-x-1.5'
                                }`}
                              >
                                {item.name}
                              </span>

                              <div className="flex items-center">
                                {isActive ? (
                                  <span className="h-[1px] w-6 bg-foreground transition-all duration-300" />
                                ) : (
                                  <span className="text-xs font-light text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                    &rarr;
                                  </span>
                                )}
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Drawer Footer */}
                  <div className="pt-6 border-t border-border/40 space-y-4 shrink-0">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      <span>Accra &bull; Worldwide</span>
                      <ThemeToggle variant="default" />
                    </div>

                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.22em]">
                      <a
                        href="https://www.instagram.com/ak_deez/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                      >
                        Instagram &rarr;
                      </a>
                      <a
                        href="https://www.tiktok.com/@glitchstudioz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                      >
                        TikTok &rarr;
                      </a>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/contact"
                        onClick={handleClose}
                        className="block w-full py-3.5 px-4 border border-foreground bg-foreground text-background text-center text-[10px] uppercase tracking-[0.26em] font-medium transition-all duration-300 hover:bg-transparent hover:text-foreground active:scale-[0.99]"
                      >
                        Inquire / Book A Session &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
