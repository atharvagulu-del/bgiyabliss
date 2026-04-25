'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import styles from './ShopTheLook.module.css';

const hotspots = [
  {
    id: 1,
    top: '45%',
    left: '25%',
    title: 'Monstera Deliciosa',
    price: '₹899',
    slug: 'monstera-deliciosa'
  },
  {
    id: 2,
    top: '65%',
    left: '70%',
    title: 'Milan White Ceramic Pot',
    price: '₹599',
    slug: 'milan-white-ceramic'
  },
  {
    id: 3,
    top: '35%',
    left: '85%',
    title: 'Fiddle Leaf Fig',
    price: '₹999',
    slug: 'fiddle-leaf-fig'
  }
];

export default function ShopTheLook() {
  const [activeSpot, setActiveSpot] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop The Look</h2>
          <p className={styles.subtitle}>Click the hotspots to shop this aesthetic living room setup.</p>
        </div>
        
        <div className={styles.imageContainer}>
          <Image
            src="/bgiya_lifestyle_hd_1773167764488.png"
            alt="Beautiful HD Plant Living Room"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            className={styles.lifestyleImage}
          />
          
          {hotspots.map((spot) => (
            <div 
              key={spot.id}
              className={`${styles.hotspot} ${activeSpot === spot.id ? styles.active : ''}`}
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveSpot(spot.id)}
              onMouseLeave={() => setActiveSpot(null)}
            >
              <div className={styles.dot}>
                <span className={styles.pulse}></span>
              </div>
              
              <div className={styles.tooltip}>
                <div className={styles.tooltipInfo}>
                  <strong>{spot.title}</strong>
                  <span>{spot.price}</span>
                </div>
                <a href={`/products/${spot.slug}`} className={styles.tooltipBtn}>
                  <ShoppingCart size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
