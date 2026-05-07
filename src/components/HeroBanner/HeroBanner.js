'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { getStoreSettings } from '@/lib/firestore';

const defaultBanners = [
  { id: 1, image: '/banners/banner1.jpeg', alt: 'Bgiya Bliss - Strong Soil, Healthy Plants' },
  { id: 2, image: '/banners/banner2.jpeg', alt: 'Bgiya Bliss - Premium Plant Care' },
  { id: 3, image: '/banners/banner3.jpeg', alt: 'Bgiya Bliss - Organic Products' },
];

export default function HeroBanner() {
  const [banners, setBanners] = useState(defaultBanners);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % banners.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + banners.length) % banners.length);
  }, [current, goTo]);

  // Fetch dynamic banners
  useEffect(() => {
    async function fetchBanners() {
      const settings = await getStoreSettings();
      if (settings?.heroBanners?.length > 0) {
        const dynamicBanners = settings.heroBanners.map((url, i) => ({
          id: i + 1,
          image: url,
          alt: `Bgiya Bliss Hero ${i + 1}`
        }));
        setBanners(dynamicBanners);
      }
    }
    fetchBanners();
  }, []);

  // Auto-scroll
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pause on hover
  const pauseAuto = () => clearInterval(timerRef.current);
  const resumeAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAuto();
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    resumeAuto();
  };

  return (
    <section
      className={styles.bannerSection}
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.carousel}>
        {/* Slides */}
        <div className={styles.slidesTrack} style={{ transform: `translateX(-${current * 100}%)` }}>
          {banners.map((b) => (
            <div key={b.id} className={styles.slide}>
              <Image
                src={b.image}
                alt={b.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                priority={b.id === 1}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className={styles.dots}>
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
