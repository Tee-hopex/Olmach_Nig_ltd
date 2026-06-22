import { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, XCircle, MessageCircle } from 'lucide-react';
import { api } from '../lib/api';
import { formatPrice } from '../lib/utils';
import { useSiteSettings } from '../hooks/usePublicData';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface TrackedOrder {
  orderNumber: string;
  status: string;
  customerName: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: typeof Package; step: number }> = {
  pending:    { label: 'Order Placed',    color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200',   Icon: Clock,        step: 1 },
  confirmed:  { label: 'Confirmed',       color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200',       Icon: CheckCircle2, step: 2 },
  processing: { label: 'Processing',      color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200',   Icon: Package,      step: 3 },
  shipped:    { label: 'Shipped',         color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200',   Icon: Truck,        step: 4 },
  delivered:  { label: 'Delivered',       color: 'text-green-600',  bg: 'bg-green-50 border-green-200',     Icon: CheckCircle2, step: 5 },
  cancelled:  { label: 'Cancelled',       color: 'text-red-600',    bg: 'bg-red-50 border-red-200',         Icon: XCircle,      step: 0 },
};

const STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: settings } = useSiteSettings();
  const waNumber = settings?.whatsappNumber ?? '2348012345678';

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const { data } = await api.get(`/orders/track/${query.trim().toUpperCase()}`);
      setOrder(data as TrackedOrder);
    } catch {
      setError('Order not found. Please check your order number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const cfg = order ? (STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending) : null;
  const currentStep = cfg?.step ?? 0;

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="bg-navy-900 text-white py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-white/60">Enter your order number to see the current status of your delivery.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Search */}
        <div className="bg-white rounded-2xl p-6 shadow-card mb-8">
          <form onSubmit={handleTrack} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. SH-1720000000-1234"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 btn-primary px-5 py-3 rounded-xl disabled:opacity-70">
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* Result */}
        {order && cfg && (
          <div className="space-y-6">
            {/* Status banner */}
            <div className={`rounded-2xl p-5 border ${cfg.bg} flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0`}>
                <cfg.Icon className={`w-6 h-6 ${cfg.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Order #{order.orderNumber}</p>
                <p className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</p>
                <p className="text-sm text-gray-500">{order.address}, {order.city}, {order.state}</p>
              </div>
            </div>

            {/* Progress tracker (not shown for cancelled) */}
            {order.status !== 'cancelled' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-start">
                  {STEPS.map((s, i) => {
                    const sc = STATUS_CONFIG[s];
                    const done = currentStep > i + 1;
                    const active = currentStep === i + 1;
                    const isLast = i === STEPS.length - 1;
                    return (
                      <div key={s} className="flex items-start flex-1">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${done ? 'bg-gold-500 border-gold-500' : active ? 'bg-white border-gold-500' : 'bg-white border-gray-200'}`}>
                            <sc.Icon className={`w-3.5 h-3.5 ${done ? 'text-white' : active ? 'text-gold-500' : 'text-gray-300'}`} />
                          </div>
                          <p className={`text-[10px] mt-2 text-center leading-tight w-14 ${active ? 'font-bold text-navy-900' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                            {sc.label}
                          </p>
                        </div>
                        {!isLast && (
                          <div className={`h-0.5 flex-1 mt-4 mx-1 transition-colors ${done ? 'bg-gold-500' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order details */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold text-navy-900 mb-4">Order Items</h3>
              <div className="space-y-3 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-navy-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-1 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span>{order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 pt-1 border-t border-gray-100">
                  <span>Total</span><span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp help */}
            <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'd like an update on order #${order.orderNumber}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-2xl transition-colors w-full">
              <MessageCircle className="w-5 h-5" /> Get a delivery update on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
