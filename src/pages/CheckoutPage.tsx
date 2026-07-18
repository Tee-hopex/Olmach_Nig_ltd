import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { ShieldCheck, ArrowLeft, Landmark, CreditCard, Truck, Copy, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { useSiteSettings } from '../hooks/usePublicData';
import { api } from '../lib/api';
import { buildOrderWhatsAppUrl } from '../lib/whatsapp';

const schema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  paymentMethod: z.enum(['bank_transfer', 'card', 'pay_on_delivery']),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { paymentMethod: 'bank_transfer' },
  });

  const paymentMethod = watch('paymentMethod');

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const threshold = settings?.freeDeliveryThreshold ?? 50000;
  const deliveryFee = subtotal >= threshold ? 0 : (settings?.deliveryFee ?? 1500);
  const total = subtotal + deliveryFee;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast.success('Copied!');
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        customerPhone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        paymentMethod: data.paymentMethod,
        notes: data.notes ?? '',
        items: items.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.salePrice ?? i.product.price,
          quantity: i.quantity,
          image: i.product.images[0] ?? '',
        })),
      };

      const { data: response } = await api.post('/orders', payload);
      const { order: createdOrder, settings: orderSettings } = response as {
        order: { orderNumber: string; total: number };
        settings: typeof settings;
      };

      const waNum = (orderSettings ?? settings)?.whatsappNumber && (orderSettings ?? settings)?.whatsappNumber !== '2349021627280' ? ((orderSettings ?? settings)?.whatsappNumber as string) : '2349021627280';
      const waUrl = buildOrderWhatsAppUrl(
        createdOrder.orderNumber,
        items.map(i => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.salePrice ?? i.product.price,
        })),
        createdOrder.total,
        waNum
      );
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      clearCart();
      navigate('/thank-you', {
        state: {
          orderNumber: createdOrder.orderNumber,
          total: createdOrder.total,
          paymentMethod: data.paymentMethod,
          settings: orderSettings ?? settings,
        },
      });
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Failed to place order. Please try again.';
      toast.error(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="text-gray-400 hover:text-navy-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-navy-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold text-navy-900 mb-5">Contact Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName' as const, label: 'First Name', placeholder: 'Adaeze' },
                    { name: 'lastName' as const, label: 'Last Name', placeholder: 'Okonkwo' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">{f.label}</label>
                      <input
                        {...register(f.name)}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                      />
                      {errors[f.name] && <p className="text-red-500 text-xs mt-1">{errors[f.name]?.message}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                    <input {...register('phone')} placeholder="09021627280" type="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                    <input {...register('email')} type="email" placeholder="adaeze@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold text-navy-900 mb-5">Delivery Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Street Address</label>
                    <input {...register('address')} placeholder="43/45 Agarawu Street by Tom-Jones, Lagos Island"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
                      <input {...register('city')} placeholder="Lagos"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">State</label>
                      <select {...register('state')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 bg-white">
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Order Notes (optional)</label>
                    <textarea {...register('notes')} rows={2} placeholder="Any special instructions for delivery..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 resize-none" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold text-navy-900 mb-5">Payment Method</h3>
                <div className="space-y-3">
                  {(
                    [
                      { value: 'bank_transfer', label: 'Bank Transfer', desc: 'Transfer directly to our bank account', Icon: Landmark },
                      { value: 'card', label: 'Debit / Credit Card', desc: 'Pay securely online via Paystack', Icon: CreditCard },
                      { value: 'pay_on_delivery', label: 'Pay on Delivery', desc: 'Cash payment when order arrives (Lagos only)', Icon: Truck },
                    ] as { value: string; label: string; desc: string; Icon: LucideIcon }[]
                  ).map(pm => (
                    <label key={pm.value}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gold-400 transition-colors has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/5">
                      <input type="radio" value={pm.value} {...register('paymentMethod')} className="accent-gold-500" />
                      <div className="w-9 h-9 bg-cream-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <pm.Icon className="w-4 h-4 text-navy-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{pm.label}</p>
                        <p className="text-xs text-gray-400">{pm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Bank details shown inline when bank_transfer is selected */}
                {paymentMethod === 'bank_transfer' && settings && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-800 mb-3 uppercase tracking-wide">Bank Transfer Details</p>
                    {[
                      { label: 'Bank', value: settings.bankName },
                      { label: 'Account Name', value: settings.bankAccountName },
                      { label: 'Account Number', value: settings.bankAccountNumber },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-blue-100 last:border-0">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-navy-900">{row.value}</span>
                          <button type="button" onClick={() => copyToClipboard(row.value, row.label)}
                            className="text-blue-500 hover:text-blue-700" aria-label={`Copy ${row.label}`}>
                            {copiedField === row.label ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-2">Use your order number as payment reference.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
                <h3 className="font-semibold text-navy-900 mb-5">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.images[0]} alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-navy-900 line-clamp-2">{item.product.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold text-navy-900 flex-shrink-0">
                        {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {deliveryFee === 0
                      ? <span className="text-green-600 font-medium">Free</span>
                      : <span className="font-medium">{formatPrice(deliveryFee)}</span>}
                  </div>
                  {subtotal < threshold && (
                    <p className="text-xs text-gray-400">
                      Add {formatPrice(threshold - subtotal)} more for free delivery
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-bold text-navy-900 mb-6">
                  <span>Total</span>
                  <span className="text-xl">{formatPrice(total)}</span>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full btn-primary py-4 rounded-xl text-base disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
