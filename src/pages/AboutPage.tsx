import { Link } from 'react-router-dom';
import { Shield, Users, Award, Truck } from 'lucide-react';

const milestones = [
  { year: '2018', event: 'Olmach Nig Ltd founded in Lagos with a mission to supply genuine sewing equipment across Nigeria.' },
  { year: '2019', event: 'Became authorised dealer for Singer and Brother brands in Nigeria.' },
  { year: '2020', event: 'Expanded to Juki industrial machines, serving our first garment factory clients.' },
  { year: '2021', event: 'Launched nationwide delivery to all 36 states.' },
  { year: '2022', event: 'Reached 1,000 happy customers milestone. Added embroidery machines to our range.' },
  { year: '2023', event: 'Opened showroom in Lagos. Launched our tailoring training program.' },
  { year: '2024', event: 'Surpassed 2,000 customers. Became authorised dealer for Janome and Pfaff.' },
];

const values = [
  { icon: Shield, title: 'Genuine Products', desc: '100% authentic machines from authorised distributors. Every product verified before shipping.' },
  { icon: Users, title: 'Customer First', desc: 'We succeed only when our customers succeed. Expert support before and after every purchase.' },
  { icon: Award, title: 'Quality Always', desc: 'We only stock machines we\'d recommend to our own families. No compromises on quality.' },
  { icon: Truck, title: 'Reliable Delivery', desc: 'Fast, safe delivery to every corner of Nigeria with full tracking and insurance.' },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
            alt="About Olmach Nig Ltd"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About Olmach Nig Ltd
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Since 2018, we've been Nigeria's most trusted source for genuine sewing machines
            and tailoring equipment. We help tailors, fashion designers and factories get the
            right tools to build great businesses.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '2,000+', label: 'Happy Customers' },
              { value: '500+', label: 'Products in Stock' },
              { value: '6', label: 'Trusted Brands' },
              { value: '6+', label: 'Years of Service' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gold-500">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Olmach Nig Ltd was founded in 2018 by a team of fashion industry professionals who
                were frustrated by the counterfeit and poor-quality sewing machines flooding
                the Nigerian market. We set out to create a trusted destination where tailors,
                fashion designers and factories could buy with confidence.
              </p>
              <p>
                Today, we're an authorised dealer for Singer, Brother, Janome, Juki, Bernette
                and Pfaff — the world's leading sewing machine brands. Every product we sell
                comes with full manufacturer warranty and our personal guarantee of authenticity.
              </p>
              <p>
                We believe that with the right tools, Nigerian fashion talent can compete on a
                world stage. Our mission is to make those tools accessible and affordable
                throughout Nigeria.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card-hover">
            <img
              src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=600&q=80"
              alt="Our showroom"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-navy-900 text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-card text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-500/10 rounded-xl mb-4">
                  <v.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card mb-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <span className="text-gold-600 font-bold text-xs">{m.year}</span>
                </div>
                <div className="flex-1 border-b border-gray-100 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Find Your Perfect Machine?</h2>
          <p className="text-white/60 mb-6">
            Browse our full range or use our Machine Finder tool for a personalised recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary inline-block px-8 py-3 rounded-xl">
              Shop Now
            </Link>
            <Link to="/contact" className="btn-outline inline-block px-8 py-3 rounded-xl">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
