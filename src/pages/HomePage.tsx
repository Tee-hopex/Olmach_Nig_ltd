import HeroSection from '../components/sections/HeroSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import TrustSection from '../components/sections/TrustSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import MachineFinderSection from '../components/sections/MachineFinderSection';
import FeaturedBrandsSection from '../components/sections/FeaturedBrandsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FeaturedProductsSection from '../components/sections/FeaturedProductsSection';
import SpecialOffersSection from '../components/sections/SpecialOffersSection';
import BlogPreviewSection from '../components/sections/BlogPreviewSection';
import NewsletterSection from '../components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TrustSection />
      <BestSellersSection />
      <MachineFinderSection />
      <FeaturedBrandsSection />
      <FeaturedProductsSection />
      <SpecialOffersSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </>
  );
}
