'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './ShopByLocation.module.css';

const locations = [
  { name: 'Balcony', image: '/product-plants.png', link: '/collections/balcony' },
  { name: 'Workspace', image: '/category-seeds.png', link: '/collections/workspace' },
  { name: 'Living Room', image: '/hero-banner.png', link: '/collections/living-room' },
  { name: 'Bedroom', image: '/category-pots.png', link: '/collections/bedroom' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ShopByLocation() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop By Location</h2>
        </div>
        
        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {locations.map((loc, idx) => (
            <motion.a href={loc.link} key={idx} className={styles.card} variants={itemVariants}>
              <Image 
                src={loc.image} 
                alt={loc.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                className={styles.image} 
              />
              <div className={styles.overlay}>
                <span className={styles.cardTitle}>{loc.name} <ArrowRight size={18} /></span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
