import PortfolioGallery from '../components/portfolioGallery';

export default function NubukePage() {
  return (
    <PortfolioGallery 
      initialCategory="nubuke" 
      hideFilters={true} 
      title="Nubuke"
      subtitle="Collection 2026"
    />
  );
}
