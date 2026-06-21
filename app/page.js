'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with slow Ken Burns effect */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/img4.jpg"
          alt="The Archive Background"
          fill
          priority
          className="object-cover object-center opacity-60 grayscale-[40%]"
        />
        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 z-10" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col h-full items-center justify-center px-6 text-center">
        
        {/* Top Minimal Header (Optional) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-12 w-full px-12 flex justify-center md:justify-between items-center hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Kwaku Ntiri Aninakwa</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Portfolio / 2026</span>
        </motion.div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/70"
          >
            Director & Photographer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif text-white uppercase tracking-widest font-light"
          >
            The Archive
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="text-sm md:text-base font-serif italic text-white/60 max-w-md mx-auto"
          >
            Capturing the unseen rhythm of the mundane.
          </motion.p>
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-24 flex flex-col items-center gap-6"
        >
          <Link href="/gallery" className="group flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-white hover:text-white/70 transition-colors duration-300">
              Enter Gallery
            </span>
            <div className="w-[1px] h-12 bg-white/30 group-hover:bg-white transition-colors duration-500 overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
              />
            </div>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
