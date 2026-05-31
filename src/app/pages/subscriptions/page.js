import { Check, X } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Subscriptions - Bgiya Bliss',
  description: 'Join Bgiya Bliss subscriptions for exclusive discounts and premium delivery.',
};

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-emerald-950 mb-4">
            Avail Yearly Subscription
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get amazing discounts and priority support when you join the Bgiya Bliss family for a year. 
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* Standard Subscription */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:border-emerald-200 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">Standard</h3>
            <p className="text-emerald-600 font-medium mb-6">15% discount on every order valid for one year</p>
            <div className="text-4xl font-bold text-gray-900 mb-8">
              ₹999<span className="text-lg text-gray-500 font-normal">/year</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <Check className="text-emerald-500" size={20} />
                <span className="text-gray-600">15% Off all orders</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-emerald-500" size={20} />
                <span className="text-gray-600">Priority Support (9AM-6PM)</span>
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <X className="text-gray-400" size={20} />
                <span className="text-gray-500">Express Delivery</span>
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <X className="text-gray-400" size={20} />
                <span className="text-gray-500">Extra 5% discount on order above ₹2499</span>
              </li>
            </ul>
            
            <button className="w-full py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors">
              Choose Standard
            </button>
          </div>

          {/* Premium Subscription */}
          <div className="bg-emerald-900 rounded-3xl p-8 shadow-xl border border-emerald-800 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white font-heading mb-2">Premium</h3>
            <p className="text-emerald-300 font-medium mb-6">25% discount on every order valid for one year</p>
            <div className="text-4xl font-bold text-white mb-8">
              ₹1999<span className="text-lg text-emerald-300/60 font-normal">/year</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <Check className="text-emerald-400" size={20} />
                <span className="text-white/90">25% Off all orders</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-emerald-400" size={20} />
                <span className="text-white/90">Priority Support (9AM-6PM)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-emerald-400" size={20} />
                <span className="text-white/90">Express Delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-emerald-400" size={20} />
                <span className="text-white/90">Extra 5% discount on order above ₹2499</span>
              </li>
            </ul>
            
            <button className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-colors shadow-lg">
              Choose Premium
            </button>
          </div>

        </div>

        {/* Feature Comparison Table (Desktop Only for better UX, cards suffice for mobile) */}
        <div className="hidden md:block bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 pt-16">
          <h2 className="text-3xl font-bold font-heading text-center text-gray-900 mb-12">Subscription Plan Breakdown</h2>
          
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-emerald-100">
                <th className="pb-4 text-lg font-bold text-gray-900">Features</th>
                <th className="pb-4 text-lg font-bold text-center text-emerald-700 w-1/4">Standard</th>
                <th className="pb-4 text-lg font-bold text-center text-emerald-700 w-1/4">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-6 text-gray-700 font-medium">Discount</td>
                <td className="py-6 text-center text-gray-600 font-semibold">15% on all orders</td>
                <td className="py-6 text-center text-emerald-600 font-bold">25% on all orders</td>
              </tr>
              <tr>
                <td className="py-6 text-gray-700 font-medium">Express Delivery</td>
                <td className="py-6 text-center"><X className="mx-auto text-gray-300" size={24} /></td>
                <td className="py-6 text-center"><Check className="mx-auto text-emerald-500" size={24} /></td>
              </tr>
              <tr>
                <td className="py-6 text-gray-700 font-medium">Priority Support (9AM-6PM)</td>
                <td className="py-6 text-center"><Check className="mx-auto text-emerald-500" size={24} /></td>
                <td className="py-6 text-center"><Check className="mx-auto text-emerald-500" size={24} /></td>
              </tr>
              <tr>
                <td className="py-6 text-gray-700 font-medium whitespace-nowrap">Extra 5% discount on order above ₹2499</td>
                <td className="py-6 text-center"><X className="mx-auto text-gray-300" size={24} /></td>
                <td className="py-6 text-center"><Check className="mx-auto text-emerald-500" size={24} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
