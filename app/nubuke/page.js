import PortfolioGallery from '../components/portfolioGallery';

export default function NubukePage() {
  return (
    <PortfolioGallery 
      initialCategory="nubuke" 
      hideFilters={true} 
      title="Nubuke Foundation"
      subtitle="Art Gallery Exhibition"
    />
  );
}
