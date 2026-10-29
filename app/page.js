'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="landing-page relative h-screen w-full overflow-hidden bg-transparent">
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-12 hidden w-full items-center justify-between px-12 md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">Kwaku Ntiri Aninakwa</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">Portfolio / 2026</span>
        </motion.div>

        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.5em] text-foreground/70 md:text-sm"
          >
            Director &amp; Photographer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="brand-logo-frame aspect-[664/323] w-[min(90vw,1050px)]"
            aria-label="glitchStudioz"
          >
            <Image
              src="/logo.png"
              alt="glitchStudioz logo"
              width={1819}
              height={2551}
              priority
              className="brand-logo-image"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="w-full max-w-md text-center text-sm font-serif italic text-foreground/60 md:text-base"
          >
            Capturing the unseen rhythm of the mundane.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute bottom-24 flex flex-col items-center gap-6"
        >
          <Link href="/gallery" className="group flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-foreground transition-colors duration-300 group-hover:text-foreground/60">
              Enter Gallery
            </span>
            <div className="relative h-12 w-px overflow-hidden bg-foreground/30 transition-colors duration-500 group-hover:bg-foreground">
              <motion.div
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 top-0 h-1/2 w-full bg-foreground"
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
