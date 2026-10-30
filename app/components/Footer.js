'use client';

import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/ak_deez/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@glitchstudioz' },
];

function SocialIcon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v2.1H6.8v3.2h2.9V21h3.7Z" />
      </svg>
    );
  }

  if (name === 'TikTok') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M19.6 7.2a6.6 6.6 0 0 1-4.1-1.4v8.1a6.2 6.2 0 1 1-5.4-6.1v3.3a3 3 0 1 0 2.1 2.9V2h3.3a6.6 6.6 0 0 0 4.1 4.2v1Z" />
      </svg>
    );
  }
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors duration-700">
      <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-12 lg:px-24">
        <Link href="/" aria-label="glitchStudioz home">
          <Image
            src="/logo.png"
            alt="glitchStudioz"
            width={1819}
            height={2551}
            className="brand-logo-image footer-brand-logo"
          />
        </Link>

        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} glitchStudioz</p>

        <nav aria-label="Social media" className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              title={link.name}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <SocialIcon name={link.name} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
