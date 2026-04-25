import Image from 'next/image';
import { Leaf, Shield, Heart } from 'lucide-react';
import styles from './RichProductScroll.module.css';

export default function RichProductScroll({ product }) {
  if (!product) return null;

  return (
    <div className={styles.richContainer}>
      
      {/* Featured Wide Banner */}
      <section className={styles.section}>
        <div className={styles.wideImageWrapper}>
          <Image 
            src="/bgiya_lifestyle_hd_1773167764488.png" 
            alt="Beautiful Plant Room" 
            fill 
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
          <div className={styles.overlay}>
             <h2 className={styles.overlayTitle}>Transform Your Space.</h2>
             <p className={styles.overlayText}>Experience the Bgiya Bliss difference with premium, organic care.</p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className={`${styles.section} ${styles.benefitsSection}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose {product.name.split(' (')[0]}?</h2>
          <p className={styles.subtitle}>Our expertly crafted formula guarantees results.</p>
        </div>

        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
             <div className={styles.iconWrapper}><Leaf size={32} /></div>
             <h3>100% Organic & Safe</h3>
             <p>Completely free of harsh chemicals, ensuring your plants grow naturally and beautifully.</p>
          </div>
          <div className={styles.benefitCard}>
             <div className={styles.iconWrapper}><Shield size={32} /></div>
             <h3>Pest Protection</h3>
             <p>Naturally repels soil-borne pests, grubs, and nematodes, keeping roots healthy.</p>
          </div>
          <div className={styles.benefitCard}>
             <div className={styles.iconWrapper}><Heart size={32} /></div>
             <h3>Nutrient Dense</h3>
             <p>Packed with essential macro and micro nutrients that release slowly over time.</p>
          </div>
        </div>
      </section>

      {/* Split Info Feature */}
      <section className={styles.splitSection}>
         <div className={styles.splitContent}>
            <h2 className={styles.title}>The Secret to Thriving Plants</h2>
            <p className={styles.text}>
              {product.description}
            </p>
            <ul className={styles.checkList}>
               {product.benefits?.map((benefit, idx) => (
                 <li key={idx}>✓ {benefit}</li>
               ))}
            </ul>
         </div>
         <div className={styles.splitImage}>
            {/* Reusing a related high-quality asset */}
            <Image 
              src="/bgiya_product_neem_sack_1773167457492.png" 
              alt="Premium Product Lifestyle" 
              fill 
              style={{ objectFit: 'cover' }}
            />
         </div>
      </section>

    </div>
  );
}
