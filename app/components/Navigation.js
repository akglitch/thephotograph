'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/', description: 'Begin your journey' },
  { name: 'Portfolio', href: '/gallery', description: 'View our work' },
  { name: 'About', href: '/about', description: 'Our story' },
  { name: 'Services', href: '/services', description: 'What we offer' },
  { name: 'Contact', href: '/contact', description: 'Get in touch' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full z-50 bg-transparent"
      >
        <nav className="max-w-8xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="group">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-foreground/20">
                      <div className="w-4 h-4 border-2 border-foreground rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-2xl font-light text-foreground tracking-tight">
                      The Archive
                    </span>
                    <span className="text-xs tracking-widest uppercase text-foreground/60">
                      Studio
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={`relative group text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-foreground'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    <span className="relative z-10">
                      {item.name}
                    </span>
                    
                    {/* Animated underline */}
                    <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full ${
                      pathname === item.href ? 'w-full' : ''
                    }`} />
                  </Link>
                </motion.div>
              ))}
              
              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/contact"
                  className="group relative bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all duration-300 transform hover:scale-105 ml-4"
                >
                  <span className="relative z-10">Book Session</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.div 
              className="lg:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="button"
                className="inline-flex items-center justify-center p-3 rounded-2xl bg-foreground/10 text-foreground backdrop-blur-md hover:bg-foreground/20 transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Premium Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu - Side Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl border-l border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-foreground rounded-full"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-light text-foreground">The Archive</span>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">Studio</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-foreground text-background shadow-2xl'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className={`text-sm ${
                          pathname === item.href ? 'opacity-80' : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </span>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`w-2 h-2 rounded-full ${
                          pathname === item.href ? 'bg-background' : 'bg-muted-foreground/30 group-hover:bg-foreground'
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="absolute bottom-6 left-6 right-6">
                <Link
                  href="/contact"
                  className="block w-full bg-foreground text-background text-center py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Your Session
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}