'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const heroSlides = [
  { src: '/slider1.webp', alt: 'People beside a fishing boat on the beach', label: 'Coastal stories' },
  { src: '/slider2.webp', alt: 'Two people standing in the surf', label: 'By the water' },
  { src: '/slider3.webp', alt: 'A vintage car passing through an Accra street', label: 'Street memories' },
];

const featuredImages = [
  { src: '/20240819_121957 (1).jpg', alt: 'A thoughtful portrait outdoors', label: 'Portraits' },
  { src: '/20241006_115243.jpg', alt: 'A street scene full of movement', label: 'Street stories' },
  { src: '/20250811_143808.jpg', alt: 'A vivid portrait with braided hair', label: 'Color & character' },
];

let hasShownIntro = false;

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(!hasShownIntro);

  useEffect(() => {
    if (!isLoading) return;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsLoading(false);
      hasShownIntro = true;
      document.body.style.overflow = 'unset';
    }, 2800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-foreground">
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
                className="brand-logo-frame aspect-[664/323] w-[min(88vw,850px)]"
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
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-border"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative flex min-h-[720px] h-[100svh] items-end overflow-hidden bg-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <motion.div
                key={slide.src}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.025,
                }}
                transition={{
                  opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 7, ease: 'easeOut' },
                }}
                className={`absolute inset-0 pointer-events-none ${isActive ? 'z-10' : 'z-0'}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1920}
                  height={1080}
                  priority
                  sizes="100vw"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 lg:px-16">
            <Link href="/" aria-label="glitchStudioz home" className="home-brand-frame">
              <Image src="/logo.png" alt="glitchStudioz" fill priority sizes="180px" className="home-brand-image" />
            </Link>
            <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.24em] text-white/90 md:flex">
              <Link href="/" className="border-b border-white pb-0.5 text-white">Home</Link>
              <Link href="/gallery" className="transition-colors hover:text-white/60">Portfolio</Link>
              <Link href="/wedding" className="transition-colors hover:text-white/60">Wedding</Link>
              <Link href="/contact" className="transition-colors hover:text-white/60">Contact</Link>
            </nav>
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] md:hidden">
              <Link href="/" className="text-white/80 transition-colors hover:text-white">Home</Link>
              <Link href="/contact" className="border border-white/60 px-3.5 py-2 transition-colors hover:bg-white hover:text-black text-white">
                Contact
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-end justify-between gap-10 px-6 pb-14 pt-32 md:px-12 md:pb-20 lg:px-16">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-white/75">glitchStudioz  Accra, Ghana</p>
            <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.04] tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
              Honest moments,<br />beautifully told.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 md:text-base">
              Colorful, natural photographs for the people and moments you want to remember.
            </p>
            <Link href="/gallery" className="mt-8 inline-flex items-center gap-4 border-b border-white/70 pb-3 text-[10px] uppercase tracking-[0.28em] transition-colors hover:border-white/40 hover:text-white/65">
              Explore Gallery <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>

          <div className="hidden shrink-0 items-end gap-5 text-[9px] uppercase tracking-[0.24em] md:flex">
            <span className="pb-1 text-white/70">{heroSlides[activeSlide].label}</span>
            <span className="font-serif text-2xl tracking-normal">0{activeSlide + 1}<span className="px-2 text-white/40">/</span>0{heroSlides.length}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:items-center md:px-12 md:py-36 lg:px-16">
        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.34em] text-muted-foreground">A little about us</p>
          <h2 className="max-w-xl font-serif text-4xl font-light leading-tight md:text-6xl">Photographs that feel like you.</h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
            We photograph people as they are: the laughter, the quiet glances, and all the in-between moments. Our approach is relaxed, thoughtful, and full of life.
          </p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-foreground transition-opacity hover:opacity-60">
            Get to know the studio <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image src="/20241006_115243.jpg" alt="A candid moment on an Accra street" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
          <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[0.25em] text-white">Everyday, observed</span>
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-muted-foreground">Selected frames</p>
              <h2 className="font-serif text-4xl font-light md:text-6xl">A few stories we love.</h2>
            </div>
            <Link href="/gallery" className="w-fit border-b border-foreground/40 pb-2 text-[10px] uppercase tracking-[0.24em] transition-colors hover:border-foreground">
              Explore the gallery <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredImages.map((image, index) => (
              <Link href="/gallery" key={image.src} className={`group block ${index === 1 ? 'md:mt-16' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                </div>
                <p className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {image.label}<span aria-hidden="true" className="text-foreground transition-transform group-hover:translate-x-1">&rarr;</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#171714] px-6 py-24 text-white md:px-12 md:py-36 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.34em] text-white/55">For all the moments in between</p>
            <h2 className="max-w-4xl font-serif text-4xl font-light leading-tight md:text-6xl lg:text-7xl">Let's make something worth remembering.</h2>
          </div>
          <Link href="/contact" className="w-fit border border-white/50 px-7 py-4 text-[10px] uppercase tracking-[0.24em] transition-colors hover:bg-white hover:text-black">
            Let's connect <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

