import { Link } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

const bundles = [
  {
    id: 'bundle-1',
    title: 'Home Sewing Starter Bundle',
    description: 'Singer 4452 + Professional Starter Kit + Training Guide',
    originalPrice: 295000,
    bundlePrice: 245000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    tag: 'Save ₦50,000',
    href: '/shop',
  },
  {
    id: 'bundle-2',
    title: 'Fashion Business Launch Pack',
    description: 'Industrial Juki + Overlocker + Cutting Machine',
    originalPrice: 790000,
    bundlePrice: 695000,
    image: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=500&q=80',
    tag: 'Save ₦95,000',
    href: '/shop',
  },
  {
    id: 'bundle-3',
    title: 'Embroidery Business Kit',
    description: 'Brother PE800 + Hoop Set + Thread Collection',
    originalPrice: 430000,
    bundlePrice: 385000,
    image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500&q=80',
    tag: 'Save ₦45,000',
    href: '/shop',
  },
];

export default function SpecialOffersSection() {
  return (
    <section className="py-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-1.5 mb-4">
            <Tag className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Bundle Deals</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Special Bundles & Offers
          </h2>
          <p className="text-white/60 mt-2">
            Save more when you buy together — curated bundles for every budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map(bundle => (
            <div
              key={bundle.id}
              className="bg-navy-800 rounded-2xl overflow-hidden group border border-navy-700 hover:border-gold-500/50 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-3 right-3 bg-gold-500 text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  {bundle.tag}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1">{bundle.title}</h3>
                <p className="text-sm text-white/60 mb-4">{bundle.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gold-400">
                      {formatPrice(bundle.bundlePrice)}
                    </p>
                    <p className="text-xs text-white/40 line-through">
                      {formatPrice(bundle.originalPrice)}
                    </p>
                  </div>
                  <Link
                    to={bundle.href}
                    className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
                  >
                    Get Bundle <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
