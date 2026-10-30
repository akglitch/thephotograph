'use client';

import Navigation from '../components/Navigation';
import PortfolioGallery from '../components/portfolioGallery';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <div>
        <PortfolioGallery />
      </div>
    </div>
  );
}
