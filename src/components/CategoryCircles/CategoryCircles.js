'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategoryCircles.module.css';

const categories = [
  {
    name: 'Potting Mix',
    slug: 'potting-mix',
    image: '/catagory/pottingmix.png',
    bgColor: '#e8f5e9',
  },
  {
    name: 'Fertilizers',
    slug: 'fertilizers',
    image: '/catagory/feltilizers.png',
    bgColor: '#fff8e1',
  },
  {
    name: 'Soil Additives',
    slug: 'soil-additives',
    image: '/catagory/soiladditives.png',
    bgColor: '#e0f7fa',
  },
  {
    name: 'Bundles',
    slug: 'bundles',
    image: '/catagory/bundles.png',
    bgColor: '#fce4ec',
  },
  {
    name: 'Seeds',
    slug: null,
    image: '/cat-seeds.png',
    bgColor: '#f3e5f5',
    comingSoon: true,
  },
  {
    name: 'Tools & Accessories',
    slug: null,
    image: '/cat-tools.png',
    bgColor: '#e3f2fd',
    comingSoon: true,
  },
];

function CategoryItem({ cat }) {
  const [pressed, setPressed] = useState(false);
  const [showSnack, setShowSnack] = useState(false);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowSnack(true);
    setTimeout(() => setShowSnack(false), 2000);
  };

  const Wrapper = cat.comingSoon ? 'button' : Link;
  const wrapperProps = cat.comingSoon
    ? { onClick: handleComingSoon, type: 'button' }
    : { href: `/collections/${cat.slug}` };

  return (
    <div className={styles.itemOuter}>
      <Wrapper
        {...wrapperProps}
        className={styles.categoryCard}
        style={{ opacity: cat.comingSoon ? 0.65 : 1 }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        <div
          className={styles.imageWrapper}
          style={{
            backgroundColor: cat.bgColor,
            transform: pressed ? 'scale(0.93)' : 'scale(1)',
          }}
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="120px"
            style={{ objectFit: 'cover', padding: 10 }}
            className={styles.image}
          />
          {cat.comingSoon && (
            <span className={styles.comingSoonBadge}>Coming Soon</span>
          )}
        </div>
        <span className={styles.categoryName}>{cat.name}</span>
      </Wrapper>

      {/* Snackbar */}
      {showSnack && (
        <div className={styles.snackbar}>
          🚀 Launching soon!
        </div>
      )}
    </div>
  );
}

export default function CategoryCircles() {
  return (
    <section className={styles.categorySection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shop by Category</h2>
        <p className={styles.subtitle}>Find exactly what your garden needs</p>
      </div>
      <div className={styles.scrollRow}>
        {categories.map((cat, i) => (
          <CategoryItem key={i} cat={cat} />
        ))}
      </div>
    </section>
  );
}
