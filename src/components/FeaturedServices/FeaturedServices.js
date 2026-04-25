'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Gift, Video, RefreshCw, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: RefreshCw,
    title: 'Plant Subscriptions',
    desc: 'Fresh, beautiful plants delivered to your doorstep every month. Curated by experts.',
    link: '/pages/plant-subscriptions',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=800',
    tag: 'Popular',
  },
  {
    icon: Video,
    title: 'Doctor Green',
    desc: 'Book a 1-on-1 video consultation with our gardening experts for personalized care tips.',
    link: '/pages/doctor-green',
    image: 'https://images.unsplash.com/photo-1466692476877-6a6838b09b55?auto=format&fit=crop&q=80&w=800',
    tag: 'New',
  },
  {
    icon: Gift,
    title: 'Corporate Gifting',
    desc: 'Give the gift of green — perfect for employees, clients, and corporate events.',
    link: '/pages/corporate-gifting',
    image: 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&q=80&w=800',
    tag: 'Bulk Orders',
  },
];

export default function FeaturedServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <motion.div 
          className="flex items-end justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 tracking-tight">
              Our Services
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              More than a store — your complete gardening partner.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, idx) => (
            <motion.a 
              href={service.link} 
              key={idx} 
              className="group relative rounded-2xl overflow-hidden h-[280px] md:h-[320px] block"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + idx * 0.12, duration: 0.6, ease: 'easeOut' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors duration-500" />
              
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 text-white border border-white/20 group-hover:bg-white/25 transition-colors">
                  <service.icon size={20} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-1.5">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm mb-3 leading-relaxed line-clamp-2">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-sm">
                  <span className="border-b border-emerald-300/50 pb-0.5">Learn More</span>
                  <ArrowRight size={14} className="transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
