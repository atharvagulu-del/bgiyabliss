import ClientPage from './client-page';
import { bestsellers, newArrivals, plantBundles, ceramics } from '@/data/products';

export const dynamicParams = true; // allow unknown slugs to be rendered on demand

export function generateStaticParams() {
  const allStaticProducts = [...bestsellers, ...newArrivals, ...plantBundles, ...ceramics];
  const uniqueSlugs = Array.from(new Set(allStaticProducts.map(p => p.slug)));
  
  return uniqueSlugs.map((slug) => ({
    slug: slug,
  }));
}

export default function Page() {
  return <ClientPage />;
}
