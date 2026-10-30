'use client';

import Navigation from '../components/Navigation';

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <section className="flex flex-1 items-center justify-center px-6">
        <h1 className="font-serif text-4xl font-light uppercase tracking-[0.2em] md:text-6xl">
          Coming Soon
        </h1>
      </section>
    </div>
  );
}
