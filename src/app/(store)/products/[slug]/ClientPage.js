'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetailPage from '@/components/ProductPage/ProductPage';
import { getProductBySlug, getActiveProducts } from '@/lib/firestore';
import { getCachedProduct, getAllCachedProducts } from '@/lib/productCache';

export default function ClientPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  // Try cache first (populated by homepage)
  const cachedProduct = getCachedProduct(slug);
  const initialProduct = cachedProduct || null;

  // Build initial related products from cache
  const initialRelated = (() => {
    if (!initialProduct) return [];
    const cached = getAllCachedProducts();
    const pool = cached.length > 1 ? cached : [];
    return pool
      .filter(p => p.id !== initialProduct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  })();

  const [product, setProduct] = useState(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState(initialRelated);
  const [loading, setLoading] = useState(!initialProduct);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Redirect coming soon products
    if (initialProduct && (initialProduct.category === 'tools' || initialProduct.status === 'inactive')) {
      router.replace('/products/coming-soon');
      return;
    }

    let isMounted = true;

    const syncFromFirestore = async () => {
      try {
        const firestoreProduct = await getProductBySlug(slug);
        if (!isMounted) return;

        if (firestoreProduct) {
          if (firestoreProduct.category === 'tools' || firestoreProduct.status === 'inactive') {
            router.replace('/products/coming-soon');
            return;
          }
          setProduct(firestoreProduct);
          setLoading(false);

          // Load related products in background
          getActiveProducts().then(allProducts => {
            if (!isMounted) return;
            const related = allProducts
              .filter(p => p.id !== firestoreProduct.id)
              .sort(() => 0.5 - Math.random())
              .slice(0, 4);
            if (related.length > 0) setRelatedProducts(related);
          }).catch(() => {});
          return;
        }
      } catch (err) {
        // Firestore failed
      }

      if (!isMounted) return;
      if (!initialProduct) {
        setNotFound(true);
      }
      setLoading(false);
    };

    syncFromFirestore();
    return () => { isMounted = false; };
  }, [slug, router, initialProduct]);

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
