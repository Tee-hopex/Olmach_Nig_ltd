import { Link } from 'react-router-dom';
import {
  CheckCircle,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Package,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getBestSellers } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const ORDER_NUMBER = `SPH-${Math.floor(100000 + Math.random() * 900000)}`;
const WHATSAPP_NUMBER = '2348012345678';
const WA_MSG = encodeURIComponent(
  `Hi! I just placed order #${ORDER_NUMBER} and would like to confirm delivery details.`
);

const steps: { step: string; title: string; desc: string; Icon: LucideIcon; color: string; bg: string }[] = [
  {
    step: '1',
    title: 'Order Confirmed',
    desc: "We've received your order and will send a confirmation SMS/email.",
    Icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    step: '2',
    title: 'Processing & Dispatch',
    desc: 'Your machine is packed and dispatched within 24 hours.',
    Icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    step: '3',
    title: 'Delivery',
    desc: 'Lagos: Next day delivery. Other states: 2–5 business days.',
    Icon: Truck,
    color: 'text-gold-500',
    bg: 'bg-gold-500/10',
  },
];

export default function ThankYouPage() {
  const recommended = getBestSellers().slice(0, 4);

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
            Thank you for shopping with StitchPro. We've received your order.
          </p>
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2">
            <span className="text-gold-400 font-semibold text-sm">
              Order #{ORDER_NUMBER}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
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

        {/* Support */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-10">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-navy-900 mb-1">Need help with your order?</p>
            <p className="text-sm text-gray-600">
              Chat with us on WhatsApp for instant support. Our team responds within minutes.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Chat Support
          </a>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link to="/shop" className="btn-primary inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl">
            <ShoppingBag className="w-5 h-5" /> Continue Shopping
          </Link>
          <Link to="/" className="btn-secondary inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl">
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommended.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
