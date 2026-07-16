import { Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Camera, PlayCircle } from 'lucide-react';
import logoFull from '../../assets/logo-full.png';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const categories = [
  { label: 'Industrial Straight', href: '/shop?category=industrial-straight' },
  { label: 'Industrial Overlocking', href: '/shop?category=industrial-overlocking' },
  { label: 'Weaving Machines', href: '/shop?category=weaving-machines' },
  { label: 'Tapping & Hemming', href: '/shop?category=tapping-hemming' },
  { label: 'Heat Transfer & Press', href: '/shop?category=heat-transfer' },
  { label: 'Plotter Cutters', href: '/shop?category=plotter-cutters' },
  { label: 'Manual Machines', href: '/shop?category=manual-machines' },
  { label: 'Embroidery Machines', href: '/shop?category=embroidery-machines' },
  { label: 'Steaming & Pressing', href: '/shop?category=steaming-pressing' },
  { label: 'Display & Accessories', href: '/shop?category=display-accessories' },
  { label: 'Button & Buttonhole', href: '/shop?category=button-buttonhole' },
  { label: 'Cutting Machines', href: '/shop?category=cutting-machines' },
  { label: 'Accessories & Tools', href: '/shop?category=accessories-tools' },
];

const customerService = [
  { label: 'Track Your Order', href: '/track-order' },
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
          <Link to="/" className="inline-block mb-4">
            <img src={logoFull} alt="Olmach Nig Ltd" className="h-16 w-auto brightness-0 invert" />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Nigeria's most trusted source for genuine sewing machines, industrial equipment and
            tailoring accessories. Quality products, expert support.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>43/45 Agarawu Street by Tom-Jones, Lagos Island, Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href="tel:+2349021627280" className="hover:text-gold-400 transition-colors">
                09021627280
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href="tel:+2349156562770" className="hover:text-gold-400 transition-colors">
                09156562770 / 09065300516
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href="https://www.instagram.com/Olmach_nig_ltd" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                @Olmach_nig_ltd
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
              { Icon: Globe, label: 'Facebook', href: 'https://www.facebook.com/share/1F7LJGUL7w/?mibextid=wwXIfr' },
              { Icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/olmach_nig_ltd?igsh=MXE4dXplNmgzcGZsOA==&utm_source=ig_contact_invite' },
              { Icon: PlayCircle, label: 'TikTok', href: 'https://www.tiktok.com/@olmach_nig_ltd1?_r=1' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
          <span>© {new Date().getFullYear()} Olmach Nig Ltd. All rights reserved.</span>
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
