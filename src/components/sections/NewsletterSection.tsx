import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/subscribe', { email });
      setSubmitted(true);
      toast.success("You're subscribed! Welcome to the Olmach Nig Ltd family.", { duration: 4000 });
      setEmail('');
    } catch {
      toast.error('Could not subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-500/10 rounded-2xl mb-5">
          <Mail className="w-7 h-7 text-gold-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
          Get Sewing Tips & Exclusive Offers
        </h2>
        <p className="text-gray-500 mb-8 text-sm md:text-base">
          Join 5,000+ tailors and fashion designers who get our weekly tips, maintenance guides,
          and subscriber-only discounts.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-5">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="text-green-700 font-medium">You're subscribed! Welcome to the Olmach Nig Ltd family.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-5 py-3.5 sm:py-3 rounded-xl transition-colors shadow-gold flex-shrink-0 w-full sm:w-auto disabled:opacity-70"
            >
              {loading ? 'Subscribing...' : <><span>Subscribe</span> <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 mt-4">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
