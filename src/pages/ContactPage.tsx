import { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from '../components/ui/SocialIcons';
import toast from 'react-hot-toast';
import { useSiteSettings } from '../hooks/usePublicData';

export default function ContactPage() {
  const { data: settings } = useSiteSettings();
  const WHATSAPP_NUMBER = settings?.whatsappNumber && settings.whatsappNumber !== '2348012345678' 
    ? settings.whatsappNumber 
    : '2349021627280';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We\'ll reply within 2 hours.', { duration: 4000 });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 text-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-white/60">
            Have a question or need expert advice? Our team responds within 2 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: 'Visit Our Showroom',
                lines: ['43/45 Agarawu Street by Tom-Jones, Lagos Island', 'Lagos, Nigeria'],
                color: 'text-gold-500',
                bg: 'bg-gold-500/10',
              },
              {
                icon: Phone,
                title: 'Call / WhatsApp',
                lines: ['09021627280', 'Available Mon–Sat, 8am–6pm'],
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
              },
              {
                icon: InstagramIcon,
                title: 'Instagram',
                lines: ['@Olmach_nig_ltd', 'Follow us for updates and product enquiries'],
                color: 'text-green-500',
                bg: 'bg-green-500/10',
                href: 'https://www.instagram.com/olmach_nig_ltd?igsh=MXE4dXplNmgzcGZsOA==&utm_source=ig_contact_invite',
              },
              {
                icon: FacebookIcon,
                title: 'Facebook',
                lines: ['Olmach Nig Ltd', 'Connect with us on Facebook'],
                color: 'text-blue-600',
                bg: 'bg-blue-600/10',
                href: 'https://www.facebook.com/share/1F7LJGUL7w/?mibextid=wwXIfr',
              },
              {
                icon: TikTokIcon,
                title: 'TikTok',
                lines: ['@olmach_nig_ltd1', 'Watch our machine demos and tutorials'],
                color: 'text-gray-900',
                bg: 'bg-gray-900/10',
                href: 'https://www.tiktok.com/@olmach_nig_ltd1?_r=1',
              },
              {
                icon: Clock,
                title: 'Business Hours',
                lines: ['Monday – Saturday: 8am – 6pm', 'Sunday: 10am – 4pm'],
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
              },
            ].map(item => {
              const CardContent = (
                <>
                  <div className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 mb-1 group-hover:text-gold-600 transition-colors">{item.title}</p>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-5 shadow-card flex gap-4 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 shadow-card flex gap-4"
                >
                  {CardContent}
                </div>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I need help choosing a sewing machine.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-4 rounded-2xl transition-colors w-full justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp for Instant Help
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">
                    Thank you for reaching out. We'll reply to your email or call you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Adaeze Okonkwo"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="09021627280"
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="adaeze@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-enquiry">Product Enquiry</option>
                      <option value="order-tracking">Order Tracking</option>
                      <option value="warranty-claim">Warranty Claim</option>
                      <option value="machine-finder">Machine Recommendation</option>
                      <option value="bulk-order">Bulk Order Enquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-xl text-base"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
