import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../../hooks/usePublicData';

const FALLBACK_IMAGES: Record<string, string> = {
  'industrial-straight':    'https://images.pexels.com/photos/17710109/pexels-photo-17710109.jpeg?auto=compress&cs=tinysrgb&w=800',
  'industrial-overlocking': 'https://images.pexels.com/photos/9850425/pexels-photo-9850425.jpeg?auto=compress&cs=tinysrgb&w=800',
  'weaving-machines':       'https://images.unsplash.com/photo-1758272024360-a95be2abe403?auto=format&fit=crop&w=800&q=80',
  'tapping-hemming':        'https://images.pexels.com/photos/27893063/pexels-photo-27893063.jpeg?auto=compress&cs=tinysrgb&w=800',
  'heat-transfer':          'https://images.pexels.com/photos/33650428/pexels-photo-33650428.jpeg?auto=compress&cs=tinysrgb&w=800',
  'plotter-cutters':        'https://images.pexels.com/photos/4679092/pexels-photo-4679092.jpeg?auto=compress&cs=tinysrgb&w=800',
  'manual-machines':        'https://images.unsplash.com/photo-1643570155378-7ca46b1aa1f5?auto=format&fit=crop&w=800&q=80',
  'embroidery-machines':    'https://images.unsplash.com/photo-1772351720165-d9218e428cf0?auto=format&fit=crop&w=800&q=80',
  'steaming-pressing':      'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
  'display-accessories':    'https://images.unsplash.com/photo-1554109394-7e351053be0d?auto=format&fit=crop&w=800&q=80',
  'button-buttonhole':      'https://images.unsplash.com/photo-1563891510473-18923cd29239?auto=format&fit=crop&w=800&q=80',
  'cutting-machines':       'https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=800',
  'accessories-tools':      'https://images.unsplash.com/photo-1578353022142-09264fd64295?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/17710109/pexels-photo-17710109.jpeg?auto=compress&cs=tinysrgb&w=800';

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
