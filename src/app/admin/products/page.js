'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit3, Eye, MoreVertical, ShieldAlert, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/firestore';
import styles from './page.module.css';

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toast, setToast] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
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
      console.error('Error loading products:', err);
      const msg = err.message || '';
      if (msg.includes('permission') || msg.includes('Permission') || err.code === 'permission-denied') {
        setFirestoreError('permission');
      } else if (msg.includes('timed out')) {
        setFirestoreError('timeout');
      } else {
        setFirestoreError('unknown');
      }
      showToast('error', err.message?.includes('timed out')
        ? 'Firestore timed out. Please create the database in Firebase Console first.'
        : 'Could not load products. Check your Firebase configuration.'
      );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('success', `"${name}" deleted.`);
    } catch (err) {
      showToast('error', 'Delete failed.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    try {
      await updateProduct(id, { status: newStatus });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      showToast('success', `Status changed to ${newStatus}.`);
    } catch (err) {
      showToast('error', 'Status update failed.');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} products? This cannot be undone.`)) return;
    try {
      for (const id of selectedIds) {
        await deleteProduct(id);
      }
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      showToast('success', `${selectedIds.length} products deleted.`);
    } catch (err) {
      showToast('error', 'Bulk delete failed.');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <>
      <div className="adminTopbar">
        <h1 className="adminTopbarTitle">Products ({products.length})</h1>
        <div className="adminTopbarActions">
          <Link href="/admin/products/new" className="adminBtn adminBtnPrimary">
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      <div className="adminContent">
        {/* Filters Bar */}
        <div className={`adminCard ${styles.filtersBar}`}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`adminInput ${styles.searchInput}`}
            />
          </div>

          <div className={styles.filterGroup}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`adminInput adminSelect ${styles.filterSelect}`}
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`adminInput adminSelect ${styles.filterSelect}`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {selectedIds.length > 0 && (
            <button className="adminBtn adminBtnDanger adminBtnSm" onClick={handleBulkDelete}>
              <Trash2 size={14} /> Delete ({selectedIds.length})
            </button>
          )}
        </div>

        {/* Firestore Error */}
        {firestoreError === 'permission' && (
          <div style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #fef2f2, #fff7ed)',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #ef4444',
            borderRadius: 'var(--admin-radius-lg)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <ShieldAlert size={24} style={{ color: '#dc2626', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#991b1b' }}>Firestore permissions are blocking access.</strong>
              <span style={{ color: '#7c2d12', marginLeft: 8 }}>
                Go to the <a href="/admin" style={{ color: '#2563eb', textDecoration: 'underline' }}>Dashboard</a> to see instructions for fixing your Firestore rules.
              </span>
            </div>
            <button className="adminBtn adminBtnSecondary adminBtnSm" onClick={() => { setLoading(true); loadProducts(); }}>
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        {/* Products Table */}
        <div className="adminCard" style={{ marginTop: '16px' }}>
          {loading ? (
            <div className="adminLoading">
              <div className="adminSpinner"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="adminEmptyState">
              <h3>{products.length === 0 ? 'No products yet' : 'No matching products'}</h3>
              <p>{products.length === 0 ? 'Start by adding your first product or importing sample data.' : 'Try adjusting your filters.'}</p>
              {products.length === 0 && (
                <Link href="/admin/products/new" className="adminBtn adminBtnPrimary">
                  <Plus size={18} /> Add First Product
                </Link>
              )}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="adminTable">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ width: 140 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productThumb}>
                            {product.images?.[0] && (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                              />
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className={styles.productName}
                            >
                              {product.name}
                            </Link>
                            <span className={styles.productSlug}>/{product.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize', color: 'var(--admin-text-secondary)' }}>
                        {product.category || '—'}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>₹{product.salePrice}</span>
                        {product.originalPrice > product.salePrice && (
                          <span className={styles.strikePrice}>₹{product.originalPrice}</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`adminBadge ${product.status === 'active' ? 'adminBadgeActive' : 'adminBadgeDraft'}`}
                          onClick={() => handleToggleStatus(product.id, product.status)}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Click to toggle"
                        >
                          {product.status || 'active'}
                        </button>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className={styles.actionBtn}
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </Link>
                          <a
                            href={`/products/${product.slug}`}
                            target="_blank"
                            rel="noopener"
                            className={styles.actionBtn}
                            title="View"
                          >
                            <Eye size={16} />
                          </a>
                          <button
                            className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                            onClick={() => handleDelete(product.id, product.name)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className={`adminToast ${toast.type === 'success' ? 'adminToastSuccess' : 'adminToastError'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
