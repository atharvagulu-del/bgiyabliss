'use client';
import { Gift, TrendingUp, Users } from 'lucide-react';


export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-emerald-950 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-4 block">Partner With Us</span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Earn by Promoting Nature</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the Bgiya Bliss Affiliate Program. Share your love for plants with your audience and earn competitive commissions on every successful referral.
          </p>
          <a href="#join" className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-900 font-bold rounded-full hover:scale-105 transition-transform duration-300">
            Apply Now
          </a>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900">Why Partner With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">High Commissions</h3>
              <p className="text-gray-600">Earn up to 15% commission on every sale made through your unique affiliate link or promo code.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
              <p className="text-gray-600">Get access to a dedicated account manager to help you optimize your campaigns and grow your earnings.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Perks</h3>
              <p className="text-gray-600">Enjoy early access to new plant arrivals, free samples for review, and exclusive giveaways for your audience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Application Form */}
      <div id="join" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Apply for the Program</h2>
              <p className="text-gray-600">Fill out the form below. Our team reviews applications within 48 hours.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application Submitted! We will contact you soon."); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Platform (Instagram, YouTube, Blog URL)</label>
                <input type="url" placeholder="https://" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us about your audience</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors" required></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
