'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

  useEffect(() => {
    const loadProduct = async () => {
      const slug = params.slug;

      try {
        // Try Firestore first, with a 2-second timeout
        const firestoreProduct = await Promise.race([
          getProductBySlug(slug),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000))
        ]);

        if (firestoreProduct) {
          setProduct(firestoreProduct);

          // Get related products from Firestore (also with timeout)
          const allProducts = await Promise.race([
            getActiveProducts(),
            new Promise(resolve => setTimeout(() => resolve([]), 2000))
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
  }, [params.slug]);

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
      <div className="container section" style={{ textAlign: 'center' }}>
        <h1 className="section-title">Product Not Found</h1>
        <p style={{ color: 'var(--color-gray-600)' }}>This product does not exist.</p>
        <a href="/" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>Go Home</a>
      </div>
    );
  }

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
