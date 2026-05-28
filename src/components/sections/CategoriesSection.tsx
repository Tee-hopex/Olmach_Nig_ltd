import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="section-subheading">
            Find exactly what you need for your tailoring business or hobby
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-navy-900 leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400">{cat.productCount} products</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
