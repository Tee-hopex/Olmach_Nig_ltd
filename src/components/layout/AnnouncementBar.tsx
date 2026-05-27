import { Truck, ShieldCheck, Star, Phone } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Nationwide Delivery' },
  { icon: ShieldCheck, text: 'Genuine Products' },
  { icon: Star, text: 'Warranty Included' },
  { icon: Phone, text: 'Expert Support' },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-navy-900 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-10 flex-wrap text-xs md:text-sm">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
