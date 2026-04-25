'use client';
import { useRef, useEffect } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroBanner() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen -mt-[140px] flex items-center justify-center overflow-hidden pt-[180px] pb-24">
      {/* Background Video & Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a1f12]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.05] md:scale-[1.1]"
          src="/videos/hero-compressed.mp4"
          poster="/background.jpg"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Darkening overlay with subtle blur for premium look */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px]"></div>
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="mb-8 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Premium plants.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-400">
              Pure organic soil.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="mb-12 text-lg md:text-2xl text-emerald-50/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
            Start your garden right. Explore our exclusive collection of high-yield vegetable seeds, paired with nutrient-dense organic fertilizers.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <a
              href="/collections/seeds"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Seeds <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="/collections/fertilizers"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:text-emerald-950 w-full sm:w-auto"
            >
              Organic Fertilizers
            </a>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
