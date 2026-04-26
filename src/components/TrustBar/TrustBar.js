import { Truck, Shield, Leaf, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Fast Delivery', desc: 'All over India', color: 'bg-sky-50 text-sky-600' },
  { icon: Shield, title: 'Safe Packaging', desc: '100% secure delivery', color: 'bg-amber-50 text-amber-600' },
  { icon: Leaf, title: 'Healthy Plants', desc: 'Grown with love & care', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Headphones, title: '24/7 Support', desc: 'Expert plant advice', color: 'bg-purple-50 text-purple-600' },
];

export default function TrustBar() {
  return (
    <section className="py-6 md:py-8 bg-stone-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-11 h-11 ${feat.color} rounded-xl flex items-center justify-center shrink-0`}>
                <feat.icon size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{feat.title}</h4>
                <p className="text-gray-500 text-xs">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
