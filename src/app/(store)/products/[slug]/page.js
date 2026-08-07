import ClientPage from './ClientPage';
import { getActiveProducts } from '@/lib/firestore';

export const dynamicParams = true; // allow unknown slugs to be rendered on demand

export async function generateStaticParams() {
  try {
    const products = await getActiveProducts();
    const uniqueSlugs = Array.from(new Set(products.map(p => p.slug).filter(Boolean)));
    
    return uniqueSlugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error('Error generating static params from Firestore:', error);
    return []; // Fallback to empty array (dynamic rendering) if Firestore fetch fails during build
  }
}

export default function Page() {
  return <ClientPage />;
}
