'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { mainCategories } from '@/data/categories';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export default function CategoryGrid() {
  return (
    <div className="flex flex-col bg-[#111] overflow-hidden -mt-10">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1530836369250-ef71a3f5e4bb?q=80&w=2000&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1466692476877-6a6838b09b55?q=80&w=2000&auto=format&fit=crop"
        title="Organic Garden"
        date="100% Natural"
        scrollToExpand="Scroll to explore collections"
        textBlend={false}
      >
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold mb-3 text-white font-heading tracking-tight">
              Curated Collections
            </h2>
            <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
              Everything you need to grow thriving, chemical-free plants right at home. 
              Explore our premium blends below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {mainCategories.map((cat, idx) => (
              <a 
                key={idx} 
                href={cat.link} 
                className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300 transform hover:-translate-y-2 h-[320px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Content Box */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider w-fit mb-3 border border-white/20 shadow-sm">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-white text-2xl font-bold font-heading mb-2 drop-shadow-md">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-emerald-300 text-sm font-medium transition-colors">
                      Explore
                    </span>
                    <ArrowRight size={16} className="text-emerald-300 transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
