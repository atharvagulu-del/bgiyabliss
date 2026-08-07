import ClientPage from './ClientPage';
import { getProductBySlug, getActiveProducts } from '@/lib/firestore';

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
    return []; // Fallback
  }
}

export default async function Page({ params }) {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    // Pass null so ClientPage can render 404
    return <ClientPage initialProduct={null} initialRelatedProducts={[]} />;
  }

  // Fetch related products (4 random active products excluding this one)
  const allActive = await getActiveProducts();
  const relatedProducts = allActive
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return <ClientPage initialProduct={product} initialRelatedProducts={relatedProducts} />;
}
