'use client';
import { useState } from 'react';
import { Gift, TrendingUp, Users, CheckCircle2, Loader2, Share2, Coins, BarChart3 } from 'lucide-react';
import { createAffiliate } from '@/lib/firestore';

export default function AffiliatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', instagram: '', audience: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const code = `AFF_${form.name.trim().split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '')}${Math.floor(Math.random() * 100)}`;
    await createAffiliate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      instagram: form.instagram.trim(),
      audience: form.audience.trim(),
      code,
      commissionRate: 7,
      buyerDiscount: 5,
    });
    setGeneratedCode(code);
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-emerald-950 text-white py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle2 size={40} color="#4ade80" />
            </div>
            <h1 className="text-4xl font-bold font-heading mb-4">Application Submitted! 🎉</h1>
            <p className="text-lg text-emerald-100 max-w-xl mx-auto mb-8">
              Thank you for applying! Our team will review your application within 48 hours. Once approved, your unique affiliate code will be activated.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '24px 32px', display: 'inline-block', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#86efac', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Affiliate Code (Pending Approval)</p>
              <p style={{ fontSize: 32, fontWeight: 800, fontFamily: 'monospace', color: '#fff', letterSpacing: 2 }}>{generatedCode}</p>
            </div>
            <p style={{ color: '#86efac', fontSize: 14 }}>You will be notified via email once your application is approved.</p>
            <a href="/" style={{ display: 'inline-block', marginTop: 24, padding: '12px 32px', background: '#fff', color: '#16a34a', fontWeight: 700, borderRadius: 50, textDecoration: 'none', fontSize: 14 }}>
              Back to Store →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-emerald-950 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-4 block">Partner With Us</span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Earn by Promoting Nature</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the Bgiya Bliss Affiliate Program. Share your love for plants with your audience and earn 7% commission on every successful sale.
          </p>
          <a href="#join" className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-900 font-bold rounded-full hover:scale-105 transition-transform duration-300">
            Apply Now
          </a>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Simple 3-step process to start earning</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <Users size={28} />, title: 'Apply & Get Approved', desc: 'Fill out the form below. We review applications within 48 hours and send you your unique promo code.' },
              { step: '02', icon: <Share2 size={28} />, title: 'Share Your Code', desc: 'Share your unique affiliate code with your audience on Instagram, YouTube, or any platform. Buyers get 5% off!' },
              { step: '03', icon: <Coins size={28} />, title: 'Earn 7% Commission', desc: 'Every time someone places an order with your code, you earn 7% of the order value. Get paid monthly.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center relative">
                <div style={{ position: 'absolute', top: -12, left: 24, background: '#16a34a', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{item.step}</div>
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900">Why Partner With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">7% Commission</h3>
              <p className="text-gray-600">Earn 7% commission on every sale made through your unique affiliate code. No upper limit on earnings!</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Dashboard</h3>
              <p className="text-gray-600">Track your sales, commissions, and payouts in real-time through your personal affiliate dashboard.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Perks</h3>
              <p className="text-gray-600">Free products for reviews, early access to new launches, and exclusive discounts for your own purchases.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="join" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Apply for the Program</h2>
              <p className="text-gray-600">Fill out the form below. Our team reviews applications within 48 hours.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram Handle *</label>
                  <input type="text" required placeholder="@username" value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us about your audience *</label>
                <textarea rows="4" required value={form.audience} onChange={e => setForm({...form, audience: e.target.value})} placeholder="What's your niche? How many followers? What platform do you primarily use?" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"></textarea>
              </div>
              <button type="submit" disabled={submitting} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-60" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
