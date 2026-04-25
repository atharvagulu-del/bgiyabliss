'use client';
import { Star } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', text: 'Absolutely in love with my purchase! The packaging was incredibly secure and everything arrived looking so fresh. The organic potting mix is top-tier.' },
  { id: 2, name: 'Rahul Verma', location: 'Delhi', text: 'Bgiya Bliss has transformed my apartment into a jungle. The quality compared to local nurseries is day and night. Plus, the fast delivery is a huge bonus.' },
  { id: 3, name: 'Anjali Desai', location: 'Pune', text: 'Everything looks premium. The care guide that came with my order helped me figure out the perfect watering schedule. Highly recommended!' },
  { id: 4, name: 'Vikram Singh', location: 'Jaipur', text: 'The best online plant store in India, hands down. The Neem Cake Powder completely revived my dying indoor plants. Will order more.' },
  { id: 5, name: 'Sneha Patel', location: 'Bangalore', text: 'Gorgeous packaging and even more gorgeous plants. Gave me so many ideas for my home setup. Five stars all the way!' },
];

export default function TestimonialMarquee() {
  return (
    <section className="py-10 md:py-12 bg-emerald-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px'}} />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10 mb-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-tight mb-1.5">
            What Our Customers Say
          </h2>
          <p className="text-emerald-200/40 text-sm">
            Real reviews from real plant parents.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-emerald-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-emerald-900 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-4 animate-marquee">
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={`${t.id}-${idx}`} 
              className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-xl p-5 min-w-[280px] md:min-w-[340px] shrink-0 hover:bg-white/[0.12] transition-colors duration-300"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-white/70 mb-4 leading-relaxed text-sm line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                  <span className="text-emerald-300/40 text-xs">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
