'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Package, Truck } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    icon: Leaf,
    title: 'Choose Your Greens',
    desc: 'Browse our curated collection of organic plants, potting mixes, and fertilizers — all sourced fresh.',
    iconClass: 'iconGreen',
  },
  {
    number: '02',
    icon: Package,
    title: 'We Pack with Care',
    desc: 'Each order is hand-packed in eco-friendly, breathable packaging to keep your plants fresh.',
    iconClass: 'iconAmber',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Delivered to Your Door',
    desc: 'Free shipping on orders above ₹499. Most orders arrive within 3–5 business days.',
    iconClass: 'iconBlue',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className={styles.section} ref={ref}>
      {/* Leaf pattern overlay */}
      <div className={styles.patternOverlay}></div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Your Plant Journey</span>
          <h2 className={styles.title}>
            From Our Nursery{' '}
            <span className={styles.titleHighlight}>to Your Home</span>
          </h2>
          <p className={styles.headerDesc}>
            Three simple steps to bring nature into your living space
          </p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          
          {/* Horizontal flowing path (desktop only) */}
          <div className={styles.pathLine}>
            <svg className={styles.pathLineSvg} viewBox="0 0 1000 8" fill="none" preserveAspectRatio="none">
              <line
                className={styles.pathDash}
                x1="0" y1="4" x2="1000" y2="4"
                stroke="rgba(110, 231, 183, 0.35)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={styles.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + idx * 0.2, duration: 0.7, ease: 'easeOut' }}
            >
              {/* Number circle + vertical connector */}
              <div className={styles.numberCol}>
                <div className={styles.numberCircle}>
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className={styles.verticalLine}></div>
                )}
              </div>

              {/* Content card */}
              <div className={styles.card}>
                <div className={`${styles.iconWrap} ${styles[step.iconClass]}`}>
                  <step.icon size={26} />
                </div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>
                <div className={styles.watermarkNum}>{step.number}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
