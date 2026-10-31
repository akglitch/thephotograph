'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SideNav from './SideNav';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/gallery' },
  { name: 'Wedding', href: '/wedding' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation({ transparent = false }) {
  const pathname = usePathname();

  if (transparent) {
    return (
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 lg:px-16">
          <Link href="/" aria-label="glitchStudioz home" className="home-brand-frame">
            <Image
              src="/logo.png"
              alt="glitchStudioz"
              fill
              priority
              loading="eager"
              sizes="180px"
              className="home-brand-image"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.24em] text-white/90 md:flex">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-white/60 ${
                    isActive ? 'border-b border-white pb-0.5 text-white' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <ThemeToggle variant="light" />
          </nav>

          {/* Small screens SideNav */}
          <div className="md:hidden">
            <SideNav variant="light" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border/40 bg-background/90 backdrop-blur-md sticky top-0 z-30 transition-colors duration-700 h-16 sm:h-20 shrink-0">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-16">
        <Link href="/" aria-label="glitchStudioz home" className="brand-logo-frame nav-brand-logo">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-[10px] uppercase tracking-[0.24em] text-foreground/80">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground ${
                  isActive ? 'border-b border-foreground pb-0.5 text-foreground' : ''
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <ThemeToggle variant="default" />
        </nav>

        {/* Small screens SideNav */}
        <div className="md:hidden">
          <SideNav variant="default" />
        </div>
      </div>
    </header>
  );
}
