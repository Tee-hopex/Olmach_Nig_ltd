import { ShieldCheck, Truck, BadgeCheck, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: BadgeCheck,
    title: 'Genuine Products',
    description:
      'Every machine is 100% authentic — sourced directly from authorised brand distributors.',
    color: 'text-gold-500',
    bg: 'bg-gold-500/10',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description:
      'We deliver to all 36 states in Nigeria. Lagos orders arrive within 24 hours.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty Protection',
    description:
      'Full manufacturer warranties on all machines. We handle claims on your behalf.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description:
      'Our team of sewing machine specialists is available via WhatsApp, call and email.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export default function TrustSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="section-heading">Why Buy from Olmach Nig Ltd?</h2>
          <p className="section-subheading">
            Over 2,000 satisfied customers across Nigeria trust us for their equipment needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map(item => (
            <div
              key={item.title}
              className="text-center p-5 sm:p-6 rounded-2xl border border-gray-100 hover:border-gold-200 hover:shadow-card transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${item.bg} mb-4`}
              >
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
