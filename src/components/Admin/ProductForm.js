'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Trash2, Plus, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addProduct, updateProduct, deleteProduct } from '@/lib/firestore';
import styles from './ProductForm.module.css';

const CATEGORIES = [
  { value: 'potting-mix', label: 'Potting Mix' },
  { value: 'fertilizers', label: 'Fertilizers' },
  { value: 'vermicompost', label: 'Vermicompost' },
  { value: 'cocopeat', label: 'Cocopeat' },
  { value: 'perlite', label: 'Perlite' },
  { value: 'seeds', label: 'Seeds' },
  { value: 'tools', label: 'Tools & Accessories' },
  { value: 'bundles', label: 'Bundles' },
];

const emptyForm = {
  name: '',
  slug: '',
  category: 'potting-mix',
  tags: [],
  description: '',
  longDescription: '',
  benefits: [''],
  howToUse: [''],
  images: [''],
  originalPrice: '',
  salePrice: '',
  discount: 0,
  rating: '',
  reviews: '',
  variants: [],
  details: [{ key: '', value: '' }],
  status: 'draft',
  featured: [],
};

export default function ProductForm({ existingProduct = null }) {
  const router = useRouter();
  const isEditing = !!existingProduct;

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [tagInput, setTagInput] = useState('');

  // Initialize form with existing product data
  useEffect(() => {
    if (existingProduct) {
      const details = existingProduct.details || {};
      const detailsArray = Object.keys(details).length > 0
        ? Object.entries(details).map(([key, value]) => ({ key, value }))
        : [{ key: '', value: '' }];

      // Normalize variants: convert old format to new array format
      let variantsArray = [];
      if (Array.isArray(existingProduct.variants)) {
        variantsArray = existingProduct.variants;
      }

      setForm({
        name: existingProduct.name || '',
        slug: existingProduct.slug || '',
        category: existingProduct.category || 'plants',
        tags: existingProduct.tags || [],
        description: existingProduct.description || '',
        longDescription: existingProduct.longDescription || '',
        benefits: existingProduct.benefits?.length > 0 ? existingProduct.benefits : [''],
        howToUse: existingProduct.howToUse?.length > 0 ? existingProduct.howToUse : [''],
        images: existingProduct.images?.length > 0 ? existingProduct.images : [''],
        originalPrice: existingProduct.originalPrice || '',
        salePrice: existingProduct.salePrice || '',
        discount: existingProduct.discount || 0,
        rating: existingProduct.rating || '',
        reviews: existingProduct.reviews || '',
        variants: variantsArray,
        details: detailsArray,
        status: existingProduct.status || 'draft',
        featured: existingProduct.featured || [],
      });
    }
  }, [existingProduct]);

  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleNameChange = (value) => {
    setForm(prev => ({
      ...prev,
      name: value,
      slug: isEditing ? prev.slug : generateSlug(value),
    }));
  };

  // Auto-calculate discount
  useEffect(() => {
    const original = parseFloat(form.originalPrice);
    const sale = parseFloat(form.salePrice);
    if (original > 0 && sale > 0 && original > sale) {
      setForm(prev => ({ ...prev, discount: Math.round(((original - sale) / original) * 100) }));
    } else {
      setForm(prev => ({ ...prev, discount: 0 }));
    }
  }, [form.originalPrice, form.salePrice]);

  // Dynamic list helpers
  const addListItem = (field) => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (field, index) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateListItem = (field, index, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  // Details key-value helpers
  const addDetail = () => {
    setForm(prev => ({ ...prev, details: [...prev.details, { key: '', value: '' }] }));
  };

  const removeDetail = (index) => {
    setForm(prev => ({ ...prev, details: prev.details.filter((_, i) => i !== index) }));
  };

  const updateDetail = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      details: prev.details.map((d, i) => i === index ? { ...d, [field]: value } : d),
    }));
  };

  // Tags
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  // Dynamic variants helpers
  const addVariant = () => {
    setForm(prev => ({ ...prev, variants: [...prev.variants, { name: '', price: '', originalPrice: '', type: 'Pack' }] }));
  };
  const removeVariant = (index) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };
  const updateVariant = (index, field, value) => {
    setForm(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === index ? { ...v, [field]: value } : v) }));
  };

  // Featured toggle
  const toggleFeatured = (tag) => {
    setForm(prev => {
      const current = prev.featured || [];
      const updated = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
      return { ...prev, featured: updated };
    });
  };

  // Cloudinary Direct Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setToast({ type: 'error', message: 'Cloudinary credentials missing in .env.local' });
      setIsUploading(false);
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        // Find the first empty slot or append to the end
        const emptyIndex = form.images.findIndex(img => img.trim() === '');
        if (emptyIndex >= 0) {
          updateListItem('images', emptyIndex, data.secure_url);
        } else {
          setForm(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
        }
        setToast({ type: 'success', message: 'Image uploaded successfully!' });
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: err.message || 'Image upload failed.' });
    } finally {
      setIsUploading(false);
      setTimeout(() => setToast(null), 3000);
      e.target.value = ''; // Reset input so the same file could be selected again
    }
  };

  // Save
  const handleSave = async (status) => {
    if (!form.name.trim()) {
      setToast({ type: 'error', message: 'Product name is required.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSaving(true);
    try {
      // Build the product data
      const detailsObj = {};
      form.details.forEach(d => {
        if (d.key.trim()) detailsObj[d.key.trim()] = d.value.trim();
      });

      // Clean variants: remove empty ones, parse prices
      const cleanVariants = form.variants
        .filter(v => v.name.trim())
        .map(v => ({
          name: v.name.trim(),
          price: parseFloat(v.price) || 0,
          originalPrice: parseFloat(v.originalPrice) || 0,
          type: v.type || 'Pack',
        }));

      const productData = {
        name: form.name.trim(),
        slug: form.slug.trim() || generateSlug(form.name),
        category: form.category,
        tags: form.tags,
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        benefits: form.benefits.filter(b => b.trim()),
        howToUse: form.howToUse.filter(h => h.trim()),
        images: form.images.filter(img => img.trim()),
        originalPrice: parseFloat(form.originalPrice) || 0,
        salePrice: parseFloat(form.salePrice) || 0,
        discount: form.discount,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        variants: cleanVariants,
        details: detailsObj,
        status: status || form.status,
        featured: form.featured,
      };

      if (isEditing) {
        await updateProduct(existingProduct.id, productData);
        setToast({ type: 'success', message: 'Product updated!' });
      } else {
        await addProduct(productData);
        setToast({ type: 'success', message: 'Product created!' });
        setTimeout(() => router.push('/admin/products'), 1500);
      }
    } catch (err) {
      console.error('Save failed:', err);
      setToast({ type: 'error', message: 'Save failed. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!confirm('Delete this product permanently?')) return;
    try {
      await deleteProduct(existingProduct.id);
      router.push('/admin/products');
    } catch (err) {
      setToast({ type: 'error', message: 'Delete failed.' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="adminTopbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin/products" className="adminBtn adminBtnGhost" style={{ padding: '8px' }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 className="adminTopbarTitle">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
        <div className="adminTopbarActions">
          {isEditing && (
            <button className="adminBtn adminBtnDanger adminBtnSm" onClick={handleDelete}>
              <Trash2 size={16} /> Delete
            </button>
          )}
          <button
            className="adminBtn adminBtnSecondary"
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            className="adminBtn adminBtnPrimary"
            onClick={() => handleSave('active')}
            disabled={saving}
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="adminContent">
        <div className={styles.formGrid}>
          {/* LEFT COLUMN — Main Content */}
          <div className={styles.mainCol}>

            {/* ─── SECTION: Basic Information ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Product Identity</h3>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">Product Name <span style={{ color: 'var(--admin-danger)' }}>*</span></label>
                  <input
                    type="text"
                    className="adminInput"
                    placeholder="e.g. Monstera Deliciosa Plant"
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>

                <div className={styles.twoCol}>
                  <div className="adminFormGroup">
                    <label className="adminLabel">URL Slug</label>
                    <input
                      type="text"
                      className="adminInput"
                      placeholder="auto-generated"
                      value={form.slug}
                      onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>
                  <div className="adminFormGroup">
                    <label className="adminLabel">Category</label>
                    <select
                      className="adminInput adminSelect"
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="adminFormGroup">
                  <label className="adminLabel">Tags</label>
                  <div className={styles.tagInput}>
                    <div className={styles.tagList}>
                      {form.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>
                          {tag}
                          <button onClick={() => removeTag(tag)} className={styles.tagRemove}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                    <div className={styles.tagInputRow}>
                      <input
                        type="text"
                        className="adminInput"
                        placeholder="Add a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                      />
                      <button className="adminBtn adminBtnSecondary adminBtnSm" onClick={addTag} type="button">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION: Description & Content ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Description & Content</h3>
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>These fields power the product page tabs</p>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">Short Description <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(shown below price)</span></label>
                  <textarea
                    className="adminInput adminTextarea"
                    placeholder="Brief summary of the product (1-2 sentences)..."
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="adminFormGroup">
                  <label className="adminLabel">Full Product Description <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(Product Description tab — supports HTML)</span></label>
                  <textarea
                    className="adminInput adminTextarea"
                    placeholder="Detailed product description. You can use HTML tags like <strong>, <ul>, <li>, <h3> etc."
                    value={form.longDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, longDescription: e.target.value }))}
                    rows={8}
                    style={{ fontFamily: 'monospace', fontSize: 13 }}
                  />
                </div>

                {/* Benefits */}
                <div className="adminFormGroup">
                  <label className="adminLabel">Key Benefits <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(shown as bullet list in Description tab)</span></label>
                  {form.benefits.map((benefit, i) => (
                    <div key={i} className={styles.dynamicRow}>
                      <span className={styles.rowNumber}>{i + 1}</span>
                      <input
                        type="text"
                        className="adminInput"
                        placeholder="e.g. 100% Organic & Chemical Free"
                        value={benefit}
                        onChange={(e) => updateListItem('benefits', i, e.target.value)}
                      />
                      {form.benefits.length > 1 && (
                        <button className={styles.removeRowBtn} onClick={() => removeListItem('benefits', i)}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button className={styles.addRowBtn} onClick={() => addListItem('benefits')} type="button">
                    <Plus size={16} /> Add Benefit
                  </button>
                </div>

                {/* How to Use */}
                <div className="adminFormGroup">
                  <label className="adminLabel">How to Use <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(Additional Information tab)</span></label>
                  {form.howToUse.map((step, i) => (
                    <div key={i} className={styles.dynamicRow}>
                      <span className={styles.rowNumber}>{i + 1}</span>
                      <input
                        type="text"
                        className="adminInput"
                        placeholder="e.g. Mix 2 tablespoons with 1 litre of water"
                        value={step}
                        onChange={(e) => updateListItem('howToUse', i, e.target.value)}
                      />
                      {form.howToUse.length > 1 && (
                        <button className={styles.removeRowBtn} onClick={() => removeListItem('howToUse', i)}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button className={styles.addRowBtn} onClick={() => addListItem('howToUse')} type="button">
                    <Plus size={16} /> Add Step
                  </button>
                </div>
              </div>
            </div>

            {/* ─── SECTION: Images ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Product Images</h3>
              </div>
              <div className="adminCardBody">
                <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginBottom: 16 }}>
                  Upload product images directly from your device.
                </p>
                <div className={styles.imageGrid}>
                  {form.images.map((url, i) => {
                    if (!url.trim()) return null;
                    return (
                      <div key={i} className={styles.imageSlot}>
                        <div className={styles.imagePreview}>
                          <img src={url} alt={`Product ${i + 1}`} className={styles.previewImg} />
                          <button
                            className={styles.imageRemove}
                            onClick={() => removeListItem('images', i)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ gridColumn: '1 / -1', marginTop: form.images.filter(img => img.trim()).length > 0 ? '8px' : '0' }}>
                    <label className={styles.addImageBtn} style={{ width: '100%', cursor: 'pointer', background: 'var(--admin-primary)', color: 'white', flexDirection: 'row', padding: '12px' }}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: 'none' }} 
                        disabled={isUploading}
                      />
                      <ImageIcon size={20} />
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION: Technical Details / Specifications ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Technical Details / Specifications</h3>
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>Shown with emoji icons on the product page + Technical Details tab</p>
              </div>
              <div className="adminCardBody">
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                  Common keys: Material, GSM, Size, Capacity, Durability, Drainage, Handles, Shape, Color, Weight, Plant Type Suitability, Special Benefits
                </p>
                {form.details.map((detail, i) => (
                  <div key={i} className={styles.detailRow}>
                    <input
                      type="text"
                      className="adminInput"
                      placeholder="e.g. Material, Capacity, Durability"
                      value={detail.key}
                      onChange={(e) => updateDetail(i, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      className="adminInput"
                      placeholder="e.g. 260 GSM UV-treated HDPE"
                      value={detail.value}
                      onChange={(e) => updateDetail(i, 'value', e.target.value)}
                    />
                    {form.details.length > 1 && (
                      <button className={styles.removeRowBtn} onClick={() => removeDetail(i)}>
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button className={styles.addRowBtn} onClick={addDetail} type="button">
                  <Plus size={16} /> Add Specification
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sidebar */}
          <div className={styles.sideCol}>

            {/* ─── Pricing ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Pricing</h3>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">MRP / Original Price (₹)</label>
                  <input
                    type="number"
                    className="adminInput"
                    placeholder="999"
                    value={form.originalPrice}
                    onChange={(e) => setForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                  />
                </div>
                <div className="adminFormGroup">
                  <label className="adminLabel">Sale Price (₹)</label>
                  <input
                    type="number"
                    className="adminInput"
                    placeholder="699"
                    value={form.salePrice}
                    onChange={(e) => setForm(prev => ({ ...prev, salePrice: e.target.value }))}
                  />
                </div>
                {form.discount > 0 && (
                  <div className={styles.discountDisplay}>
                    <span>Discount</span>
                    <strong>{form.discount}% OFF</strong>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Rating ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Ratings</h3>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">Rating (0-5)</label>
                  <input
                    type="number"
                    className="adminInput"
                    placeholder="4.8"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) => setForm(prev => ({ ...prev, rating: e.target.value }))}
                  />
                </div>
                <div className="adminFormGroup">
                  <label className="adminLabel">Number of Reviews</label>
                  <input
                    type="number"
                    className="adminInput"
                    placeholder="120"
                    value={form.reviews}
                    onChange={(e) => setForm(prev => ({ ...prev, reviews: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* ─── Variants (dynamic) ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Variants</h3>
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>Optional — pill selector on product page</p>
              </div>
              <div className="adminCardBody">
                {form.variants.length === 0 && (
                  <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', marginBottom: 12 }}>
                    No variants yet. Add variants like &quot;Pack of 1&quot;, &quot;Pack of 5&quot; with different prices.
                  </p>
                )}
                {form.variants.map((v, i) => (
                  <div key={i} style={{ padding: 12, border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius)', marginBottom: 10, background: 'var(--admin-content-bg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-muted)' }}>Variant {i + 1}</span>
                      <button className={styles.removeRowBtn} onClick={() => removeVariant(i)} style={{ width: 28, height: 28 }}>
                        <X size={14} />
                      </button>
                    </div>
                    <div className="adminFormGroup" style={{ marginBottom: 8 }}>
                      <input type="text" className="adminInput" placeholder='Name (e.g. Pack of 1, 500g, Large)'
                        value={v.name} onChange={(e) => updateVariant(i, 'name', e.target.value)} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div className="adminFormGroup" style={{ marginBottom: 0 }}>
                        <label className="adminLabel" style={{ fontSize: 11 }}>Sale Price (₹)</label>
                        <input type="number" className="adminInput" placeholder="199"
                          value={v.price} onChange={(e) => updateVariant(i, 'price', e.target.value)} />
                      </div>
                      <div className="adminFormGroup" style={{ marginBottom: 0 }}>
                        <label className="adminLabel" style={{ fontSize: 11 }}>MRP (₹)</label>
                        <input type="number" className="adminInput" placeholder="499"
                          value={v.originalPrice} onChange={(e) => updateVariant(i, 'originalPrice', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button className={styles.addRowBtn} onClick={addVariant} type="button">
                  <Plus size={16} /> Add Variant
                </button>
              </div>
            </div>

            {/* ─── Visibility ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Visibility</h3>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">Status</label>
                  <div className={styles.statusToggle}>
                    <button
                      className={`${styles.statusBtn} ${form.status === 'active' ? styles.statusActive : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, status: 'active' }))}
                      type="button"
                    >
                      Active
                    </button>
                    <button
                      className={`${styles.statusBtn} ${form.status === 'draft' ? styles.statusDraft : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, status: 'draft' }))}
                      type="button"
                    >
                      Draft
                    </button>
                  </div>
                </div>

                <div className="adminFormGroup">
                  <label className="adminLabel">Featured Collections</label>
                  <div className={styles.checkGrid}>
                    {['bestseller', 'new-arrival', 'trending'].map(tag => (
                      <label key={tag} className={styles.checkItem}>
                        <input
                          type="checkbox"
                          checked={form.featured?.includes(tag)}
                          onChange={() => toggleFeatured(tag)}
                        />
                        <span style={{ textTransform: 'capitalize' }}>{tag.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
