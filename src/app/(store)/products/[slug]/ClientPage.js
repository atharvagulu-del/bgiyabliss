'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetailPage from '@/components/ProductPage/ProductPage';
import { getProductBySlug, getActiveProducts } from '@/lib/firestore';
import { getCachedProduct, getAllCachedProducts } from '@/lib/productCache';

export default function ClientPage({ initialProduct, initialRelatedProducts }) {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [product, setProduct] = useState(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState(initialRelatedProducts || []);
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
      <div className="container section" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Image Skeleton */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '12px', animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
            <div style={{ flex: 1, height: '500px', background: '#f1f5f9', borderRadius: '24px', animation: 'pulse 1.5s infinite' }} />
          </div>
          
          {/* Content Skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '20px' }}>
            <div>
              <div style={{ width: '80%', height: '36px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 1.5s infinite' }} />
              <div style={{ width: '40%', height: '24px', background: '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
            </div>
            
            <div style={{ width: '60%', height: '32px', background: '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '120px', height: '40px', background: '#f1f5f9', borderRadius: '20px', animation: 'pulse 1.5s infinite' }} />
              <div style={{ width: '120px', height: '40px', background: '#f1f5f9', borderRadius: '20px', animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ width: '100%', height: '56px', background: '#f1f5f9', borderRadius: '12px', marginTop: '20px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '100%', height: '56px', background: '#f1f5f9', borderRadius: '12px', animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }`}</style>
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
