'use client';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Sprout, Package, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { number: '5,000+', label: 'Plants Delivered', icon: Package },
  { number: '100%', label: 'Organic', icon: Sprout },
  { number: '4.8★', label: 'Avg Rating', icon: ShieldCheck },
  { number: 'Free', label: 'Delivery 499+', icon: Truck },
];

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-10 md:py-14 bg-emerald-950 overflow-hidden relative">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px'}} />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="text-center p-4 md:p-6 rounded-2xl bg-emerald-900/40 border border-emerald-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-emerald-800/50 rounded-xl flex items-center justify-center text-emerald-400">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white font-heading mb-1">
                {stat.number}
              </div>
              <div className="text-emerald-300/60 text-xs md:text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-white mb-3 tracking-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="text-emerald-200/50 text-sm md:text-base mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive deals, plant care tips, and early access to new arrivals.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 bg-emerald-900/50 border border-emerald-700/50 rounded-xl text-white placeholder:text-emerald-400/40 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-white text-emerald-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg"
              >
                Get 10% Off <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-900/50 border border-emerald-700/50 rounded-xl p-6 max-w-lg mx-auto"
            >
              <div className="text-emerald-400 text-lg font-bold mb-1">🎉 You&apos;re in!</div>
              <p className="text-emerald-200/60 text-sm">Check your inbox for your 10% discount code.</p>
            </motion.div>
          )}

          <p className="text-emerald-400/30 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
