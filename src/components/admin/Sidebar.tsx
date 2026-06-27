import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Bookmark,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';
import { useAdminStore } from '../../store/adminStore';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Products', icon: Package, href: '/admin/products' },
  { label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  { label: 'Categories', icon: Tag, href: '/admin/categories' },
  { label: 'Brands', icon: Bookmark, href: '/admin/brands' },
  { label: 'Blog', icon: FileText, href: '/admin/blog' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { admin, logout } = useAdminStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success('Logged out');
    navigate('/admin/login');
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 group ${
      isActive
        ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-navy-900 flex flex-col z-50
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src={logoIcon} alt="Olmach Nig Ltd" className="h-9 w-auto brightness-0 invert flex-shrink-0" />
          <div>
            <p className="font-bold text-white text-sm leading-none">Olmach Nig Ltd</p>
            <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/admin'}
              className={navLinkClass}
              onClick={onClose}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
            <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
              {admin?.username?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{admin?.username ?? 'Admin'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
