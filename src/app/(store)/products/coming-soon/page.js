import Link from 'next/link';
import { Clock, ArrowLeft, Leaf } from 'lucide-react';

export const metadata = {
  title: 'Coming Soon | Bgiya Bliss',
  description: 'This product is coming soon to Bgiya Bliss.',
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-[70vh] bg-[#f7f5f0] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full border border-emerald-50">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="text-emerald-600" size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
          Coming Soon
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          We're currently preparing this product to ensure it meets our premium quality standards. Check back soon or explore our other organic gardening essentials.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/collections/all" 
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Leaf size={18} />
            Explore Store
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
