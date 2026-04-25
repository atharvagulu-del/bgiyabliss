'use client';
import Image from 'next/image';
import { Leaf, Heart, ShieldCheck } from 'lucide-react';

export default function AboutNursery() {
  return (
    <section className="py-10 md:py-14 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[320px] md:h-[460px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1200" 
                alt="Hands holding organic soil and a seedling" 
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-4 md:-right-6 bg-white p-4 md:p-5 rounded-xl shadow-lg max-w-[200px] border border-emerald-50">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">100% Organic</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pesticide-free from seed to your doorstep.
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-4">
              Our Roots
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-stone-900 mb-4 leading-tight">
              Grown with love, <br/>
              <span className="text-emerald-600">delivered with care.</span>
            </h2>
            
            <p className="text-base md:text-lg text-stone-600 mb-6 leading-relaxed">
              We started Bgiya Bliss as a small family greenhouse with a simple mission: to bring the joy of truly organic, resilient plants into every home. 
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-amber-100 text-amber-600 p-2 rounded-full shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-0.5">Hand-Nurtured</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">Every plant raised by local experts, healthy and acclimated before it leaves our nursery.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-teal-100 text-teal-600 p-2 rounded-full shrink-0">
                  <Leaf size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-0.5">Sustainable Practices</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">Rich compost, organic neem, and zero harmful chemicals — gardening that heals the earth.</p>
                </div>
              </div>
            </div>

            <button className="bg-emerald-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-800 transition-colors w-fit shadow-md text-sm">
              Learn Our Full Story
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
