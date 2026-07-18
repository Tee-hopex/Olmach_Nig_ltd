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

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; Icon: typeof Package; step: number }> = {
  pending: { label: 'Order Placed', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', Icon: Clock, step: 1 },
  confirmed: { label: 'Confirmed', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', Icon: CheckCircle2, step: 2 },
  processing: { label: 'Processing', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', Icon: Package, step: 3 },
  shipped: { label: 'Shipped', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', Icon: Truck, step: 4 },
  delivered: { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', Icon: CheckCircle2, step: 5 },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', Icon: XCircle, step: 0 },
};

const STEPS: { key: string; label: string; short: string; Icon: typeof Package }[] = [
  { key: 'pending', label: 'Order Placed', short: 'Placed', Icon: Clock },
  { key: 'confirmed', label: 'Confirmed', short: 'Confirmed', Icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', short: 'Processing', Icon: Package },
  { key: 'shipped', label: 'Shipped', short: 'Shipped', Icon: Truck },
  { key: 'delivered', label: 'Delivered', short: 'Delivered', Icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: settings } = useSiteSettings();
  const waNumber = settings?.whatsappNumber && settings.whatsappNumber !== '2349021627280' ? settings.whatsappNumber : '2349021627280';

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
      {/* Hero */}
      <div className="bg-navy-900 text-white py-10 sm:py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-white/60 text-sm sm:text-base">Enter your order number to see the current status of your delivery.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card mb-6 sm:mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. SH-1720000000-1234"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl disabled:opacity-70 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching…' : 'Track Order'}
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-3 flex items-start gap-1.5">
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {error}
            </p>
          )}
        </div>

        {/* Result */}
        {order && cfg && (
          <div className="space-y-4 sm:space-y-6">

            {/* Status banner */}
            <div className={`rounded-2xl p-4 sm:p-5 border ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <cfg.Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${cfg.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                    Order #{order.orderNumber}
                  </p>
                  <p className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5 break-words">
                    {order.address}, {order.city}, {order.state}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Placed {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress tracker — vertical on mobile, horizontal on sm+ */}
            {order.status !== 'cancelled' && (
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card">
                <h3 className="font-semibold text-navy-900 text-sm mb-4 sm:mb-5">Delivery Progress</h3>

                {/* Mobile: vertical */}
                <div className="flex flex-col gap-0 sm:hidden">
                  {STEPS.map((s, i) => {
                    const done = currentStep > i + 1;
                    const active = currentStep === i + 1;
                    const isLast = i === STEPS.length - 1;
                    return (
                      <div key={s.key} className="flex items-start gap-3">
                        {/* circle + line */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${done ? 'bg-gold-500 border-gold-500' : active ? 'bg-white border-gold-500' : 'bg-white border-gray-200'}`}>
                            <s.Icon className={`w-3.5 h-3.5 ${done ? 'text-white' : active ? 'text-gold-500' : 'text-gray-300'}`} />
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-8 transition-colors ${done ? 'bg-gold-400' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        {/* label */}
                        <p className={`text-sm pt-1.5 pb-6 ${active ? 'font-bold text-navy-900' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                          {s.label}
                          {active && <span className="ml-2 text-xs text-gold-600 font-normal">← current</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: horizontal */}
                <div className="hidden sm:flex items-start">
                  {STEPS.map((s, i) => {
                    const done = currentStep > i + 1;
                    const active = currentStep === i + 1;
                    const isLast = i === STEPS.length - 1;
                    return (
                      <div key={s.key} className="flex items-start flex-1">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors ${done ? 'bg-gold-500 border-gold-500' : active ? 'bg-white border-gold-500' : 'bg-white border-gray-200'}`}>
                            <s.Icon className={`w-4 h-4 ${done ? 'text-white' : active ? 'text-gold-500' : 'text-gray-300'}`} />
                          </div>
                          <p className={`text-[11px] mt-2 text-center leading-tight w-14 ${active ? 'font-bold text-navy-900' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                            {s.short}
                          </p>
                        </div>
                        {!isLast && (
                          <div className={`h-0.5 flex-1 mt-4 mx-1.5 transition-colors ${done ? 'bg-gold-400' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order items */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card">
              <h3 className="font-semibold text-navy-900 mb-4">Order Items</h3>
              <div className="space-y-3 mb-5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0 border border-gray-100" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 line-clamp-2 leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-navy-900 flex-shrink-0 ml-2">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery fee</span>
                  <span>{order.deliveryFee === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Payment method</span>
                <span className="capitalize font-medium text-gray-600">{order.paymentMethod.replace(/-/g, ' ')}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'd like an update on order #${order.orderNumber}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-6 py-4 rounded-2xl transition-colors w-full text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              Get a delivery update on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
