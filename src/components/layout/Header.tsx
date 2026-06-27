import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useSearchProducts } from '../../hooks/usePublicData';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  {
    label: 'Sewing Machines',
    href: '/shop?category=industrial-straight',
    dropdown: [
      { label: 'Industrial Straight', href: '/shop?category=industrial-straight' },
      { label: 'Industrial Overlocking', href: '/shop?category=industrial-overlocking' },
      { label: 'Manual Machines', href: '/shop?category=manual-machines' },
    ],
  },
  {
    label: 'Specialty Machines',
    href: '/shop?category=weaving-machines',
    dropdown: [
      { label: 'Weaving Machines', href: '/shop?category=weaving-machines' },
      { label: 'Tapping & Hemming', href: '/shop?category=tapping-hemming' },
    ],
  },
  {
    label: 'Heat & Print',
    href: '/shop?category=heat-transfer',
    dropdown: [
      { label: 'Heat Transfer & Press', href: '/shop?category=heat-transfer' },
      { label: 'Plotter Cutters', href: '/shop?category=plotter-cutters' },
    ],
  },
  {
    label: 'Embroidery',
    href: '/shop?category=embroidery-machines',
    dropdown: [
      { label: 'Embroidery Machines', href: '/shop?category=embroidery-machines' },
    ],
  },
  {
    label: 'More',
    href: '/shop?category=steaming-pressing',
    dropdown: [
      { label: 'Steaming & Pressing', href: '/shop?category=steaming-pressing' },
      { label: 'Display & Accessories', href: '/shop?category=display-accessories' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { getTotalItems, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const { data: searchResults = [] } = useSearchProducts(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoIcon} alt="Olmach Nig Ltd" className="h-10 w-auto" />
            <span className="font-bold text-navy-900 text-lg leading-none hidden sm:block">
              Olmach <span className="text-red-600">Nig Ltd</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sewing machines, brands..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 bg-cream-50"
                />
              </div>
            </form>
            {searchResults.length > 0 && searchQuery.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-card-hover border border-gray-100 overflow-hidden z-50">
                {searchResults.map(p => (
                  <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream-50 transition-colors">
                    <img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-navy-900 leading-snug">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" aria-label="Search" className="md:hidden p-2 text-navy-900 hover:text-gold-600 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <Link to="/wishlist" className="relative p-2 text-navy-900 hover:text-gold-600 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button type="button" onClick={openCart} className="relative p-2 text-navy-900 hover:text-gold-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-navy-900 text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button type="button" className="lg:hidden p-2 text-navy-900 hover:text-gold-600 transition-colors ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sewing machines..." autoFocus
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
              </div>
            </form>
            {searchResults.length > 0 && searchQuery.length > 1 && (
              <div className="mt-1 bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden z-50">
                {searchResults.map(p => (
                  <Link key={p.id} to={`/product/${p.slug}`} onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream-50 transition-colors">
                    <img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-navy-900 leading-snug">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.label} className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={link.href}
                  className="flex items-center gap-0.5 px-3 py-3.5 text-sm font-medium text-navy-800 hover:text-gold-600 transition-colors whitespace-nowrap">
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-card-hover border border-gray-100 py-2 z-50">
                    {link.dropdown.map(sub => (
                      <Link key={sub.label} to={sub.href}
                        className="block px-4 py-2 text-sm text-navy-800 hover:bg-cream-50 hover:text-gold-600 transition-colors">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white pb-4">
          <div className="max-w-7xl mx-auto px-4 space-y-1 pt-2">
            {navLinks.map(link => (
              <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-navy-800 hover:text-gold-600 hover:bg-cream-50 rounded-lg transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
