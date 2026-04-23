'use client';

import { useState } from 'react';
import Image from 'next/image';
import { portfolioData } from './PortfolioData';

const categoryLabels = {
  all: 'All Works',
  portrait: 'Portraits',
  landscape: 'Landscapes',
  wedding: 'Weddings',
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = portfolioData.categories.map((category) => ({
    ...category,
    count:
      category.id === 'all'
        ? portfolioData.images.length
        : portfolioData.images.filter((image) => image.category === category.id).length,
  }));

  const filteredImages =
    activeCategory === 'all'
      ? portfolioData.images
      : portfolioData.images.filter((image) => image.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-foreground">
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-2 text-xs uppercase tracking-widest text-foreground/80">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            Creative Portfolio
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
            Visual Stories
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A dynamic showcase of photography that blends emotion, technique, and artistic vision in every frame.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-pink-400 bg-pink-400 text-purple-900 shadow-lg shadow-pink-400/30'
                    : 'border-foreground/20 bg-foreground/10 text-foreground/80 hover:border-pink-300 hover:bg-foreground/20'
                }`}
              >
                {categoryLabels[category.id]} ({category.count})
              </button>
            ))}
          </div>
          <p className="text-sm text-foreground/60">
            Displaying {filteredImages.length} curated images.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, index) => (
            <article
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-foreground/5 backdrop-blur-sm border border-foreground/10 transition-all duration-500 hover:border-pink-400/50 hover:bg-foreground/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-xs uppercase tracking-widest text-foreground/80 mb-2">{categoryLabels[image.category]}</p>
                  <h3 className="text-lg font-semibold text-foreground">{image.title}</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-foreground/70 line-clamp-2">{image.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-pink-400/20 px-3 py-1 text-pink-200">{image.location}</span>
                  <span className="rounded-full bg-purple-400/20 px-3 py-1 text-purple-200">{image.camera}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block rounded-2xl bg-foreground/10 backdrop-blur-sm border border-foreground/20 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Create Your Story?</h2>
            <p className="text-foreground/70 mb-6">Let's collaborate on capturing moments that matter.</p>
            <button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-foreground font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
