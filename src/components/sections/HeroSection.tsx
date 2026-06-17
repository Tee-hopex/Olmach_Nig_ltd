import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ChevronRight, Star } from 'lucide-react';
import { useSiteSettings } from '../../hooks/usePublicData';

export default function HeroSection() {
  const { data: settings } = useSiteSettings();
  const waNumber = settings?.whatsappNumber ?? '2348012345678';
  const waMsg = encodeURIComponent('Hi! I need expert advice on choosing a sewing machine.');

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        {/* Text */}
        <div className="text-center lg:text-left">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-4 py-1.5 mb-6 mx-auto lg:mx-0">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-gold-400 text-xs sm:text-sm font-medium">
              Nigeria's #1 Trusted Sewing Equipment Store
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Premium Sewing Machines,{' '}
            <span className="text-gold-400 block sm:inline">Delivered to You</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Genuine brands — Singer, Brother, Janome, Juki. From beginner home machines to
            industrial production equipment. Warranty included. Nationwide delivery.
          </p>

          {/* Stats */}
          <div className="flex justify-center lg:justify-start gap-4 sm:gap-8 mb-8 sm:mb-10">
            {[
              { value: '500+', label: 'Products' },
              { value: '2,000+', label: 'Customers' },
              { value: '6', label: 'Trusted Brands' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-xl sm:text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
            <Link
              to="/shop"
              className="inline-flex justify-center items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-gold text-sm sm:text-base w-full sm:w-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 border-2 border-white/30 hover:border-gold-400 text-white hover:text-gold-400 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Get Expert Advice
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-0">
          {[
            {
              image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80',
              label: 'Home Machines',
              sublabel: 'From ₦85,000',
              href: '/shop?category=sewing-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=300&q=80',
              label: 'Industrial',
              sublabel: 'From ₦350,000',
              href: '/shop?category=industrial-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=300&q=80',
              label: 'Embroidery',
              sublabel: 'From ₦280,000',
              href: '/shop?category=embroidery-machines',
            },
            {
              image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&q=80',
              label: 'Starter Kits',
              sublabel: 'From ₦35,000',
              href: '/shop?category=starter-kits',
            },
          ].map(card => (
            <Link
              key={card.label}
              to={card.href}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square bg-navy-800"
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-end justify-between">
                <div>
                  <p className="text-white font-semibold text-xs sm:text-sm">{card.label}</p>
                  <p className="text-gold-400 text-[10px] sm:text-xs">{card.sublabel}</p>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
