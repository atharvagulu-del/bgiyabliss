'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ProductCarousel({ title, products, viewAllLink, bgClass = 'bg-white' }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-10 md:py-14 overflow-hidden ${bgClass}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 tracking-tight">
              {title}
            </h2>
            <div className="h-1 w-16 bg-emerald-500 mt-3 rounded-full"></div>
          </div>
          {viewAllLink && (
            <a href={viewAllLink} className="flex items-center gap-1.5 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-xs md:text-sm shrink-0 shadow-sm hover:shadow-md">
              View All <ArrowRight size={16} />
            </a>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative group -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Scroll Track */}
          <div 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start h-full">
                <ProductCard product={product} />
              </div>
            ))}
            <div className="min-w-[1px] shrink-0" aria-hidden="true" />
          </div>

          {/* Controls */}
          <button 
            className="hidden md:flex absolute -left-5 top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(-1)} 
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="hidden md:flex absolute -right-5 top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(1)} 
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
