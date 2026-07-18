import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle, MessageCircle, ShoppingBag, ArrowRight,
  CheckCircle2, Package, Truck, Copy, Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useBestSellers } from '../hooks/usePublicData';
import ProductCard from '../components/ui/ProductCard';
import { formatPrice } from '../lib/utils';

interface OrderState {
  orderNumber: string;
  total: number;
  paymentMethod: string;
  settings?: {
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: string;
    whatsappNumber: string;
  };
}

const steps: { step: string; title: string; desc: string; Icon: LucideIcon; color: string; bg: string }[] = [
  { step: '1', title: 'Order Confirmed', desc: "We've received your order and will send a confirmation SMS/email.", Icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  { step: '2', title: 'Processing & Dispatch', desc: 'Your machine is packed and dispatched within 24 hours.', Icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { step: '3', title: 'Delivery', desc: 'Lagos: Next day delivery. Other states: 2–5 business days.', Icon: Truck, color: 'text-gold-500', bg: 'bg-gold-500/10' },
];

export default function ThankYouPage() {
  const location = useLocation();
  const state = location.state as OrderState | null;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const orderNumber = state?.orderNumber ?? `SH-${Date.now()}-0000`;
  const total = state?.total;
  const paymentMethod = state?.paymentMethod;
  const settings = state?.settings;
  const waNumber = settings?.whatsappNumber && settings.whatsappNumber !== '2349021627280' ? settings.whatsappNumber : '2349021627280';
  const waMsg = encodeURIComponent(`Hi! I just placed order #${orderNumber} and would like to confirm delivery details.`);

  const { data: recommended = [] } = useBestSellers();

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast.success('Copied!');
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="bg-navy-900 text-white py-16 text-center">
        <div className="max-w-lg mx-auto px-4">
          <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-navy-900" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-white/70 mb-4">
            Thank you for shopping with Olmach Nig Ltd. We've received your order.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2">
            <span className="text-gold-400 font-semibold text-sm">Order #{orderNumber}</span>
          </div>
          {total !== undefined && (
            <p className="text-white/60 text-sm mt-3">Total: <span className="text-white font-semibold">{formatPrice(total)}</span></p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Bank transfer details */}
        {paymentMethod === 'bank_transfer' && settings && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-navy-900 mb-1">Complete Your Payment</h2>
            <p className="text-sm text-gray-600 mb-4">
              Transfer {total !== undefined ? <strong>{formatPrice(total)}</strong> : 'the total amount'} to the account below and use your order number as reference.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Bank', value: settings.bankName },
                { label: 'Account Name', value: settings.bankAccountName },
                { label: 'Account Number', value: settings.bankAccountNumber },
                { label: 'Reference', value: orderNumber },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-blue-100">
                  <span className="text-xs text-gray-500 w-32">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-900">{row.value}</span>
                    <button type="button" onClick={() => copyToClipboard(row.value, row.label)}
                      className="text-blue-400 hover:text-blue-600 transition-colors" aria-label={`Copy ${row.label}`}>
                      {copiedField === row.label ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-white rounded-2xl p-6 shadow-card mb-10">
          <h2 className="font-bold text-navy-900 text-lg mb-6">What Happens Next?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(item => (
              <div key={item.step} className="text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${item.bg} rounded-2xl mb-4`}>
                  <item.Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <p className="font-semibold text-navy-900 mb-1">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-green-500 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-10 text-white">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-lg mb-1">Continue on WhatsApp</p>
            <p className="text-white/80 text-sm">
              WhatsApp should have opened automatically with your order summary. If not, tap the button to send it now.
            </p>
          </div>
          <a href={`https://wa.me/${waNumber}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0 shadow">
            <MessageCircle className="w-4 h-4" /> Open WhatsApp
          </a>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link to="/shop" className="btn-primary inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl">
            <ShoppingBag className="w-5 h-5" /> Continue Shopping
          </Link>
          <Link to="/track-order" className="btn-secondary inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl">
            Track Order <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recommended.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommended.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
