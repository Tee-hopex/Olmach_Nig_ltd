import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ChevronRight, Star } from 'lucide-react';

const WHATSAPP_NUMBER = '2348012345678';
const WA_MSG = encodeURIComponent('Hi! I need expert advice on choosing a sewing machine.');

export default function HeroSection() {
  return (
    <section className="relative bg-navy-900 overflow-hidden min-h-[580px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Fashion designer at sewing machine"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-800/50" />
      </div>

      {/* Gold decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text */}
        <div>
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-gold-400 text-sm font-medium">
              Nigeria's #1 Trusted Sewing Equipment Store
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Premium Sewing Machines,{' '}
            <span className="text-gold-400">Delivered to You</span>
          </h1>

          <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
            Genuine brands — Singer, Brother, Janome, Juki. From beginner home machines to
            industrial production equipment. Warranty included. Nationwide delivery.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10">
            {[
              { value: '500+', label: 'Products' },
              { value: '2,000+', label: 'Customers' },
              { value: '6', label: 'Trusted Brands' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-gold text-base"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-gold-400 text-white hover:text-gold-400 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Get Expert Advice
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[
            {
              image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80',
              label: 'Home Machines',
              sublabel: 'Starting from ₦85,000',
              href: '/shop?category=sewing-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=300&q=80',
              label: 'Industrial',
              sublabel: 'Starting from ₦350,000',
              href: '/shop?category=industrial-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=300&q=80',
              label: 'Embroidery',
              sublabel: 'Starting from ₦280,000',
              href: '/shop?category=embroidery-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&q=80',
              label: 'Starter Kits',
              sublabel: 'Starting from ₦35,000',
              href: '/shop?category=starter-kits',
            },
          ].map(card => (
            <Link
              key={card.label}
              to={card.href}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-navy-800"
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{card.label}</p>
                  <p className="text-gold-400 text-xs">{card.sublabel}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
