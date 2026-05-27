import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Mail, Globe, Camera, PlayCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const categories = [
  { label: 'Sewing Machines', href: '/shop?category=sewing-machines' },
  { label: 'Industrial Machines', href: '/shop?category=industrial-machines' },
  { label: 'Embroidery Machines', href: '/shop?category=embroidery-machines' },
  { label: 'Cutting Equipment', href: '/shop?category=cutting-equipment' },
  { label: 'Starter Kits', href: '/shop?category=starter-kits' },
  { label: 'Spare Parts', href: '/shop?category=spare-parts' },
];

const customerService = [
  { label: 'Track Your Order', href: '/contact' },
  { label: 'Returns & Warranty', href: '/contact' },
  { label: 'Machine Finder', href: '/#machine-finder' },
  { label: 'FAQs', href: '/contact' },
  { label: 'Privacy Policy', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-navy-900" />
            </div>
            <span className="font-bold text-lg">
              Stitch<span className="text-gold-400">Pro</span>
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Nigeria's most trusted source for genuine sewing machines, industrial equipment and
            tailoring accessories. Quality products, expert support.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>14 Fabric Lane, Lagos Island, Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href="tel:+2348012345678" className="hover:text-gold-400 transition-colors">
                +234 801 234 5678
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href="mailto:hello@stitchpro.ng" className="hover:text-gold-400 transition-colors">
                hello@stitchpro.ng
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wide text-xs">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map(l => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wide text-xs">
            Categories
          </h4>
          <ul className="space-y-2">
            {categories.map(l => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wide text-xs">
            Customer Service
          </h4>
          <ul className="space-y-2 mb-6">
            {customerService.map(l => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social */}
          <h4 className="font-semibold text-gold-400 mb-3 uppercase tracking-wide text-xs">
            Follow Us
          </h4>
          <div className="flex gap-3">
            {[
              { Icon: Globe, label: 'Facebook' },
              { Icon: Camera, label: 'Instagram' },
              { Icon: PlayCircle, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center text-white/70 hover:bg-gold-500 hover:text-navy-900 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} StitchPro Nigeria. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Secure payments</span>
            <div className="flex gap-2">
              {['Paystack', 'Bank Transfer', 'USSD'].map(m => (
                <span
                  key={m}
                  className="bg-navy-800 px-2 py-0.5 rounded text-white/60 font-medium"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
