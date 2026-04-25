'use client';
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
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
          // Categorize products by featured tags or category
          const best = products.filter(p => p.featured?.includes('bestseller') || p.category === 'plant-care' || p.category === 'plants');
          const bundles = products.filter(p => p.category === 'bundles' || p.featured?.includes('bundle'));
          const pots = products.filter(p => p.category === 'pots' || p.category === 'planters');
          
          // Everything else (or explicitly tagged new-arrival) goes here
          const arrivals = products.filter(p => p.featured?.includes('new-arrival') || (!best.includes(p) && !bundles.includes(p) && !pots.includes(p)));

          // Merge Firestore products with static data so carousels always look full
          const mergeWithStatic = (firestoreList, staticList) => {
            const slugs = new Set(firestoreList.map(p => p.slug));
            const unique = staticList.filter(p => !slugs.has(p.slug));
            return [...firestoreList, ...unique];
          };

          if (best.length > 0) setBestsellers(mergeWithStatic(best, staticBestsellers));
          if (bundles.length > 0) setPlantBundles(mergeWithStatic(bundles, staticBundles));
          if (arrivals.length > 0) setNewArrivals(mergeWithStatic(arrivals, staticArrivals));
          if (pots.length > 0) setCeramics(mergeWithStatic(pots, staticCeramics));

          // If no products matched any named category, put them all in Bestsellers
          if (best.length === 0 && bundles.length === 0 && arrivals.length === 0 && pots.length === 0) {
            setBestsellers(mergeWithStatic(products, staticBestsellers));
          }
        }
      } catch (err) {
        // Silently fall back to static data
        console.log('Using static product data (Firestore unavailable)');
      }
    };
    loadFirestoreProducts();
  }, []);

  return (
    <>
      <HeroBanner />
      
      {/* Curved overlap over the Hero Video */}
      <div className="relative z-20 -mt-10 md:-mt-20 pt-10 md:pt-20 bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
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
      </div>
    </>
  );
}
