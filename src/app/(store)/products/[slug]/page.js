'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetailPage from '@/components/ProductPage/ProductPage';
import { getProductBySlug, getActiveProducts } from '@/lib/firestore';
import { bestsellers, newArrivals, plantBundles, ceramics } from '@/data/products';

const allStaticProducts = [...bestsellers, ...newArrivals, ...plantBundles, ...ceramics];

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadProduct = async () => {
      const slug = params.slug;

      try {
        // Try Firestore first, with an 8-second timeout
        const firestoreProduct = await Promise.race([
          getProductBySlug(slug),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000))
        ]);

        if (firestoreProduct) {
          // Redirect tools/inactive products to coming-soon page
          if (firestoreProduct.category === 'tools' || firestoreProduct.status === 'inactive') {
            router.replace('/products/coming-soon');
            return;
          }
          setProduct(firestoreProduct);

          // Get related products from Firestore (also with timeout)
          const allProducts = await Promise.race([
            getActiveProducts(),
            new Promise(resolve => setTimeout(() => resolve([]), 8000))
          ]);
          
          const related = allProducts
            .filter(p => p.id !== firestoreProduct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setRelatedProducts(related.length > 0 ? related : allStaticProducts.slice(0, 4));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Firestore lookup failed or timed out, trying static data');
      }

      // Fallback to static data
      const uniqueProducts = Array.from(new Set(allStaticProducts.map(a => a.id)))
        .map(id => allStaticProducts.find(a => a.id === id));

      const staticProduct = uniqueProducts.find(p => p.slug === slug);
      if (staticProduct) {
        // Redirect tools/inactive products to coming-soon page
        if (staticProduct.category === 'tools' || staticProduct.status === 'inactive') {
          router.replace('/products/coming-soon');
          return;
        }
        setProduct(staticProduct);
        setRelatedProducts(
          uniqueProducts
            .filter(p => p.id !== staticProduct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
        );
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    loadProduct();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#004c30', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#f0fdf4', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '36px' }}>🌱</span>
        </div>
        <h1 className="section-title" style={{ fontSize: '2.5rem', color: '#166534', marginBottom: '16px' }}>Coming Soon</h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '32px', lineHeight: 1.6 }}>
          We are currently preparing this product for our online store. It will be available very soon! In the meantime, please check out our other exciting products.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/collections/all" className="btn btn--primary" style={{ padding: '12px 28px', borderRadius: '8px', background: '#16a34a', color: '#fff', textDecoration: 'none', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Explore All Products</a>
          <a href="/" className="btn" style={{ padding: '12px 28px', borderRadius: '8px', background: '#f1f5f9', color: '#334155', textDecoration: 'none', fontWeight: 600, border: '1px solid #e2e8f0' }}>Go to Homepage</a>
        </div>
      </div>
    );
  }

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
