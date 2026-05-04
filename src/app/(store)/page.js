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
  const [bestsellers, setBestsellers] = useState(staticBestsellers);
  const [plantBundles, setPlantBundles] = useState(staticBundles);
  const [newArrivals, setNewArrivals] = useState(staticArrivals);
  const [ceramics, setCeramics] = useState(staticCeramics);

  useEffect(() => {
    const loadFirestoreProducts = async () => {
      try {
        const products = await getActiveProducts();
        if (products.length > 0) {
          const best = products.filter(p =>
            (p.featured?.includes('bestseller') ||
            p.category === 'plant-care' ||
            p.category === 'plants') &&
            !p.featured?.includes('bundle')
          );
          const bundles = products.filter(p =>
            p.category === 'bundles' || p.featured?.includes('bundle')
          );
          const pots = products.filter(p =>
            p.category === 'pots' || p.category === 'planters'
          );
          const arrivals = products.filter(p =>
            p.featured?.includes('new-arrival') &&
            !p.featured?.includes('bundle')
          );

          const mergeWithStatic = (firestoreList, staticList) => {
            const slugs = new Set(firestoreList.map(p => p.slug));
            return [...firestoreList, ...staticList.filter(p => !slugs.has(p.slug))];
          };

          const categorised = new Set([...best, ...bundles, ...pots, ...arrivals].map(p => p.id));
          const uncategorised = products.filter(p =>
            !categorised.has(p.id) && !p.featured?.includes('bundle')
          );

          const effectiveBest = best.length > 0
            ? mergeWithStatic([...best, ...uncategorised], staticBestsellers)
            : mergeWithStatic(products.filter(p => !p.featured?.includes('bundle')), staticBestsellers);

          setBestsellers(effectiveBest);
          if (bundles.length > 0) setPlantBundles(mergeWithStatic(bundles, staticBundles));
          if (arrivals.length > 0) setNewArrivals(mergeWithStatic(arrivals, staticArrivals));
          if (pots.length > 0) setCeramics(mergeWithStatic(pots, staticCeramics));
        }
      } catch (err) {
        console.log('Using static product data (Firestore unavailable)');
      }
    };
    loadFirestoreProducts();
  }, []);

  return (
    <>
      <HeroBanner />

      {/* Category Circles — Blinkit/Organic Bazar style */}
      <CategoryCircles />

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
      <CommunityFeed />
      <WhyChooseUs />
      <TrustBar />
    </>
  );
}
