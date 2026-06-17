import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="section-heading">What Our Customers Say</h2>
          <p className="section-subheading">
            Over 2,000 tailors, fashion designers and businesses trust Olmach Nig Ltd
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map(t => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold-200 mb-3 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? 'text-gold-500 fill-gold-500'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                "{t.review}"
              </p>

              {/* Product tag */}
              {t.product && (
                <p className="text-xs text-gold-600 font-medium bg-gold-500/10 px-3 py-1 rounded-full inline-block mb-4 w-fit">
                  Purchased: {t.product}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-cream-200 flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
