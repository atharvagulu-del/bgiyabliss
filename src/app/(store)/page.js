'use client';
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import CategoryCircles from '@/components/CategoryCircles/CategoryCircles';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import TestimonialMarquee from '@/components/TestimonialMarquee/TestimonialMarquee';
import CommunityFeed from '@/components/CommunityFeed/CommunityFeed';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import TrustBar from '@/components/TrustBar/TrustBar';
import { bestsellers as staticBestsellers, plantBundles as staticBundles, newArrivals as staticArrivals, ceramics as staticCeramics } from '@/data/products';
import { getActiveProducts } from '@/lib/firestore';

export default function Home() {
  // Show static products INSTANTLY on first render — no blank sections ever
  const [bestsellers, setBestsellers] = useState(staticBestsellers);
  const [plantBundles, setPlantBundles] = useState(staticBundles);
  const [newArrivals, setNewArrivals] = useState(staticArrivals);
  const [ceramics, setCeramics] = useState(staticCeramics);

  useEffect(() => {
    let isMounted = true;

    const loadFirestoreProducts = async () => {
      try {
        let products = await getActiveProducts();
        if (!isMounted) return;
        
        // Deduplicate by slug to hide accidental duplicates
        const uniqueSlugs = new Set();
        products = products.filter(p => {
          if (uniqueSlugs.has(p.slug)) return false;
          uniqueSlugs.add(p.slug);
          return true;
        });

        if (products.length > 0) {
          const best = products.filter(p =>
            (p.featured?.includes('bestseller') ||
              p.category === 'plant-care' ||
              p.category === 'plants' ||
              p.category === 'potting-mix' ||
              p.category === 'fertilizers' ||
              p.category === 'seeds') &&
            !p.featured?.includes('bundle')
          );

          const bundles = products.filter(p =>
            p.category === 'bundles' || p.featured?.includes('bundle')
          );

          const pots = products.filter(p =>
            p.category === 'pots' || p.category === 'planters' || p.category === 'tools' || p.category === 'accessories'
          );

          const arrivals = products.filter(p =>
            p.featured?.includes('new-arrival') &&
            !p.featured?.includes('bundle')
          );

          // If bestsellers filter misses items, fill it with whatever is left
          const categorised = new Set([...best, ...bundles, ...pots, ...arrivals].map(p => p.id));
          const uncategorised = products.filter(p => !categorised.has(p.id) && !p.featured?.includes('bundle'));

          setBestsellers(best.length > 0 ? best : uncategorised.length > 0 ? uncategorised : products.slice(0, 5));
          setPlantBundles(bundles.length > 0 ? bundles : staticBundles);
          setNewArrivals(arrivals.length > 0 ? arrivals : staticArrivals);
          setCeramics(pots.length > 0 ? pots : staticCeramics);
        }
        // If Firestore returns empty, static data stays — no blank sections
      } catch (err) {
        console.log('Error loading products from Firestore, using static data', err);
        // Static data already showing — no action needed
      }
    };
    loadFirestoreProducts();

    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <HeroBanner />

      {/* Category Circles — Blinkit/Organic Bazar style */}
      <CategoryCircles />

      {/* Instagram Reels — Social proof before products */}
      <CommunityFeed />

      <ProductCarousel
        title="Bestsellers"
        products={bestsellers}
        viewAllLink="/collections/bestsellers"
      />
      <ProductCarousel
        title="Value Bundles"
        products={plantBundles}
        viewAllLink="/collections/bundles"
        bgClass="bg-gray-50"
      />
      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/collections/new-arrivals"
      />
      <ProductCarousel
        title="More from Bgiya Bliss"
        products={ceramics}
        viewAllLink="/collections/all"
        bgClass="bg-gray-50"
      />
      <HowItWorks />
      <TestimonialMarquee />
      <WhyChooseUs />
      <TrustBar />
    </>
  );
}
