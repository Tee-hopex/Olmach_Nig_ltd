import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBestSellers } from '../../hooks/usePublicData';
import ProductCard from '../ui/ProductCard';

function Skeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-5 bg-gray-100 rounded w-1/4 mt-3" />
      </div>
    </div>
  );
}

export default function BestSellersSection() {
  const { data: bestSellers = [], isLoading } = useBestSellers();

  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Best Sellers</h2>
            <p className="section-subheading mt-1">
              Our most popular machines — trusted by thousands of tailors
            </p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
            : bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/shop" className="btn-secondary inline-flex items-center gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
