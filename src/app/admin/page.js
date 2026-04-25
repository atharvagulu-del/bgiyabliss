'use client';
import { useState, useEffect } from 'react';
import { Package, TrendingUp, Archive, AlertCircle, Plus, Upload, ExternalLink, ShieldAlert, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts, seedProducts } from '@/lib/firestore';
import { bestsellers, newArrivals, plantBundles, ceramics } from '@/data/products';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState(null);
  const [firestoreError, setFirestoreError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setFirestoreError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      const msg = err.message || '';
      if (msg.includes('permission') || msg.includes('Permission') || err.code === 'permission-denied') {
        setFirestoreError('permission');
      } else if (msg.includes('timed out')) {
        setFirestoreError('timeout');
      } else {
        setFirestoreError('unknown');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSeedProducts = async () => {
    if (products.length > 0) {
      if (!confirm('Products already exist in database. This will add duplicates. Continue?')) return;
    }

    setSeeding(true);
    try {
      const allStaticProducts = [...bestsellers, ...newArrivals, ...plantBundles, ...ceramics];
      const uniqueProducts = [];
      const seenSlugs = new Set();

      for (const product of allStaticProducts) {
        if (!seenSlugs.has(product.slug)) {
          seenSlugs.add(product.slug);
          uniqueProducts.push({
            name: product.name,
            slug: product.slug,
            category: product.tags?.[0]?.toLowerCase().includes('fertilizer') || product.tags?.[0]?.toLowerCase().includes('organic') ? 'plant-care' :
                     product.tags?.[0]?.toLowerCase().includes('ceramic') || product.tags?.[0]?.toLowerCase().includes('terracotta') ? 'pots' : 'plants',
            tags: product.tags || [],
            description: product.description || '',
            benefits: product.benefits || [],
            howToUse: product.howToUse || [],
            images: product.gallery || [product.image],
            originalPrice: product.originalPrice || 0,
            salePrice: product.salePrice || 0,
            discount: product.discount || 0,
            rating: product.rating || 0,
            reviews: product.reviews || 0,
            variants: {
              sizes: ['Small', 'Medium', 'Large'],
              potStyles: ['Grower Pot', 'Classic Plastic', 'Ceramic'],
            },
            details: product.details || {},
            status: 'active',
            featured: [],
          });
        }
      }

      const results = await seedProducts(uniqueProducts);
      setToast({ type: 'success', message: `${results.length} products imported successfully!` });
      await loadProducts();
    } catch (err) {
      console.error('Seed failed:', err);
      setToast({ type: 'error', message: 'Import failed. Check console.' });
    } finally {
      setSeeding(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const activeCount = products.filter(p => p.status === 'active').length;
  const draftCount = products.filter(p => p.status === 'draft').length;
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <>
      {/* Top Bar */}
      <div className="adminTopbar">
        <h1 className="adminTopbarTitle">Dashboard</h1>
        <div className="adminTopbarActions">
          <Link href="/admin/products/new" className="adminBtn adminBtnPrimary">
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      <div className="adminContent">
        {/* Firestore Error Banner */}
        {firestoreError && (
          <div className={styles.errorBanner}>
            <div className={styles.errorBannerIcon}>
              <ShieldAlert size={28} />
            </div>
            <div className={styles.errorBannerContent}>
              <h3 className={styles.errorBannerTitle}>
                {firestoreError === 'permission' ? '⚠️ Firestore Permission Denied' :
                 firestoreError === 'timeout' ? '⏱️ Firestore Connection Timed Out' :
                 '❌ Firestore Connection Error'}
              </h3>
              <p className={styles.errorBannerDesc}>
                {firestoreError === 'permission'
                  ? 'Your Firestore security rules are blocking read/write access. Follow these steps to fix:'
                  : firestoreError === 'timeout'
                  ? 'Could not connect to Firestore. Make sure you have created the database in Firebase Console.'
                  : 'An unexpected error occurred while connecting to Firestore.'}
              </p>
              {firestoreError === 'permission' && (
                <ol className={styles.errorSteps}>
                  <li>Go to <a href="https://console.firebase.google.com/project/bgiya-bliss/firestore/rules" target="_blank" rel="noopener">Firebase Console → Firestore → Rules</a></li>
                  <li>Replace the rules with:
                    <code className={styles.errorCode}>{`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /products/{document=**} {\n      allow read: if true;\n      allow write: if request.auth != null;\n    }\n  }\n}`}</code>
                  </li>
                  <li>Click <strong>Publish</strong></li>
                  <li>Come back and refresh this page</li>
                </ol>
              )}
              <button
                className={`adminBtn adminBtnSecondary ${styles.retryBtn}`}
                onClick={() => { setLoading(true); loadProducts(); }}
              >
                <RefreshCw size={16} /> Try Again
              </button>
            </div>
          </div>
        )}

        {/* Welcome Banner */}
        <div className={styles.welcome}>
          <div className={styles.welcomeText}>
            <h2>Welcome back! 👋</h2>
            <p>Here&apos;s an overview of your Bgiya Bliss store.</p>
          </div>
          {products.length === 0 && !loading && !firestoreError && (
            <button
              className={`adminBtn adminBtnPrimary ${styles.seedBtn}`}
              onClick={handleSeedProducts}
              disabled={seeding}
            >
              <Upload size={18} />
              {seeding ? 'Importing...' : 'Import Sample Products'}
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={`adminCard ${styles.statCard}`}>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <Package size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{loading ? '—' : products.length}</span>
              <span className={styles.statLabel}>Total Products</span>
            </div>
          </div>

          <div className={`adminCard ${styles.statCard}`}>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <TrendingUp size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{loading ? '—' : activeCount}</span>
              <span className={styles.statLabel}>Active</span>
            </div>
          </div>

          <div className={`adminCard ${styles.statCard}`}>
            <div className={`${styles.statIcon} ${styles.statIconYellow}`}>
              <Archive size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{loading ? '—' : draftCount}</span>
              <span className={styles.statLabel}>Drafts</span>
            </div>
          </div>

          <div className={`adminCard ${styles.statCard}`}>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
              <AlertCircle size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{loading ? '—' : categories.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickGrid}>
          <Link href="/admin/products/new" className={`adminCard ${styles.quickCard}`}>
            <Plus size={24} />
            <h3>Add New Product</h3>
            <p>List a new product in your store</p>
          </Link>

          <Link href="/admin/products" className={`adminCard ${styles.quickCard}`}>
            <Package size={24} />
            <h3>Manage Products</h3>
            <p>View, edit, or remove products</p>
          </Link>

          <a href="/" target="_blank" rel="noopener" className={`adminCard ${styles.quickCard}`}>
            <ExternalLink size={24} />
            <h3>View Store</h3>
            <p>See your live storefront</p>
          </a>

          {products.length > 0 && (
            <button
              className={`adminCard ${styles.quickCard} ${styles.quickCardBtn}`}
              onClick={handleSeedProducts}
              disabled={seeding}
            >
              <Upload size={24} />
              <h3>{seeding ? 'Importing...' : 'Re-Import Data'}</h3>
              <p>Push static product data to Firestore</p>
            </button>
          )}
        </div>

        {/* Recent Products */}
        {!loading && products.length > 0 && (
          <div className="adminCard" style={{ marginTop: '24px' }}>
            <div className="adminCardHeader">
              <h3 className="adminCardTitle">Recent Products</h3>
              <Link href="/admin/products" className="adminBtn adminBtnGhost adminBtnSm">
                View All →
              </Link>
            </div>
            <div className="adminCardBody" style={{ padding: 0 }}>
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td>
                        <Link href={`/admin/products/${product.id}/edit`} style={{ color: 'var(--admin-text)', fontWeight: 500, textDecoration: 'none' }}>
                          {product.name}
                        </Link>
                      </td>
                      <td style={{ color: 'var(--admin-text-secondary)', textTransform: 'capitalize' }}>
                        {product.category || '—'}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>₹{product.salePrice}</span>
                        {product.originalPrice > product.salePrice && (
                          <span style={{ color: 'var(--admin-text-muted)', textDecoration: 'line-through', marginLeft: 6, fontSize: 12 }}>
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`adminBadge ${product.status === 'active' ? 'adminBadgeActive' : 'adminBadgeDraft'}`}>
                          {product.status || 'active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`adminToast ${toast.type === 'success' ? 'adminToastSuccess' : 'adminToastError'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
