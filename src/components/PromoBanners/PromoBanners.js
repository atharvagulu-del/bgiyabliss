'use client';
import { Gift, Crown, ArrowRight, Sparkles, Leaf, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromoBanners() {
  return (
    <section className="py-10 md:py-16 overflow-hidden" style={{ background: 'var(--color-off-white)' }}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Subscription Banner */}
          <motion.a
            href="/pages/subscriptions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block rounded-3xl overflow-hidden"
            style={{ minHeight: '320px' }}
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                background: 'linear-gradient(135deg, #0d4f3c 0%, #145c46 25%, #1a7a5a 50%, #0f6b4d 75%, #0a3d2e 100%)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Floating decorative elements */}
            <div className="absolute top-6 right-8 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }} />
            <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }} />
            <div className="absolute -top-4 -right-4 w-40 h-40 rounded-full opacity-[0.05]"
              style={{ background: 'radial-gradient(circle, #a7f3d0 0%, transparent 60%)' }} />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full" style={{ minHeight: '320px' }}>
              {/* Top section */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#a7f3d0',
                  }}>
                  <Sparkles size={13} />
                  Monthly Subscription
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-[1.15] tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  Plant<br />Subscriptions
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg mb-2 leading-relaxed max-w-xs"
                  style={{ color: 'rgba(167, 243, 208, 0.8)' }}>
                  Fresh plants delivered monthly. Starting at just
                </p>

                {/* Price tag */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">₹499</span>
                  <span className="text-sm font-medium" style={{ color: 'rgba(167,243,208,0.7)' }}>/month</span>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between">
                {/* CTA Button */}
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                    color: '#052e16',
                    boxShadow: '0 4px 15px rgba(34,197,94,0.25)',
                  }}>
                  Subscribe Now <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                {/* Floating icons */}
                <div className="hidden md:flex items-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                  <Leaf size={20} className="text-emerald-300" />
                  <Gift size={18} className="text-emerald-200" />
                </div>
              </div>
            </div>

            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(167,243,208,0.2), 0 0 40px rgba(34,197,94,0.15)' }} />
          </motion.a>

          {/* Rewards Banner */}
          <motion.a
            href="/pages/rewards"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block rounded-3xl overflow-hidden"
            style={{ minHeight: '320px' }}
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4338ca 50%, #3730a3 75%, #1e1b4b 100%)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 20.5a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5zM0 .5A.5.5 0 0 1 .5 0a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5A.5.5 0 0 1 0 .5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Floating decorative elements */}
            <div className="absolute top-8 right-10 w-24 h-24 rounded-full opacity-[0.12] group-hover:opacity-[0.20] transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }} />
            <div className="absolute bottom-8 right-16 w-36 h-36 rounded-full opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }} />
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
              <div className="relative">
                <Star size={60} className="text-amber-400/10 group-hover:text-amber-400/20 transition-colors duration-500 rotate-12" fill="currentColor" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full" style={{ minHeight: '320px' }}>
              {/* Top section */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.15))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(251,191,36,0.25)',
                    color: '#fcd34d',
                  }}>
                  <Crown size={13} />
                  VIP Program
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-[1.15] tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  Plant Parent<br />Rewards
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg mb-4 leading-relaxed max-w-xs"
                  style={{ color: 'rgba(196, 181, 253, 0.85)' }}>
                  Earn points, unlock VIP discounts & claim free plants!
                </p>

                {/* Reward tiers */}
                <div className="flex items-center gap-3 mb-6">
                  {['Bronze', 'Silver', 'Gold'].map((tier, i) => (
                    <div key={tier} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: i === 2
                          ? 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.2))'
                          : 'rgba(255,255,255,0.08)',
                        color: i === 2 ? '#fcd34d' : 'rgba(196,181,253,0.7)',
                        border: i === 2 ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      }}>
                      {i === 2 && <Zap size={10} />}
                      {tier}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between">
                {/* CTA Button */}
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#451a03',
                    boxShadow: '0 4px 15px rgba(245,158,11,0.25)',
                  }}>
                  Join Now <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                {/* Points hint */}
                <div className="hidden md:flex items-center gap-2 text-xs font-medium" style={{ color: 'rgba(196,181,253,0.5)' }}>
                  <Star size={14} fill="currentColor" />
                  Earn 2x points this week
                </div>
              </div>
            </div>

            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(196,181,253,0.2), 0 0 40px rgba(99,102,241,0.15)' }} />
          </motion.a>

        </div>
      </div>
    </section>
  );
}
