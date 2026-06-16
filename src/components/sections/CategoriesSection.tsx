import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../../hooks/usePublicData';

const FALLBACK_IMAGES: Record<string, string> = {
  'industrial-straight':    'https://images.unsplash.com/photo-1630930678172-63343537a00a?auto=format&fit=crop&w=800&q=80',
  'industrial-overlocking': 'https://images.unsplash.com/photo-1642693252490-ace96a2681ee?auto=format&fit=crop&w=800&q=80',
  'weaving-machines':       'https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?auto=format&fit=crop&w=800&q=80',
  'tapping-hemming':        'https://images.unsplash.com/photo-1618587194716-40490bdba417?auto=format&fit=crop&w=800&q=80',
  'heat-transfer':          'https://images.unsplash.com/photo-1674471361346-38d423db19f3?auto=format&fit=crop&w=800&q=80',
  'plotter-cutters':        'https://images.unsplash.com/photo-1693031630146-568e2f72db0e?auto=format&fit=crop&w=800&q=80',
  'manual-machines':        'https://images.unsplash.com/photo-1564848534648-558dc1ef55c7?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1630930678172-63343537a00a?auto=format&fit=crop&w=800&q=80';

function Skeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden animate-pulse flex flex-col">
      <div className="aspect-video bg-gray-100" />
      <div className="p-2.5 sm:p-3 space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-2.5 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="section-subheading">
            Find exactly what you need for your tailoring business or hobby
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
            : categories.map(cat => {
                const img = cat.image || FALLBACK_IMAGES[cat.slug] || DEFAULT_IMAGE;
                return (
                  <Link key={cat.id} to={`/shop?category=${cat.slug}`}
                    className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-card card-hover flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={img} alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                    </div>
                    <div className="p-2.5 sm:p-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-navy-900 leading-tight">{cat.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400">{cat.productCount} products</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
