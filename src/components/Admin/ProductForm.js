'use client';
import { useState, useEffect } from 'react';
import { Save, Trash2, Plus, X, Image as ImageIcon, ArrowLeft, ChevronDown, ChevronUp, Link2, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addProduct, updateProduct, deleteProduct, getVariantGroup, getAllProducts, getProductBySlug } from '@/lib/firestore';
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

// A variant in the form — becomes its own separate Firestore product doc
const emptyVariant = () => ({
  name: '',           // The full product name for this variant's page (REQUIRED)
  label: '',          // Short pill label shown in switcher, e.g. "500g", "1kg (Pack of 2)"
  weightValue: '',    // numeric weight
  weightUnit: 'g',   // g | kg | ml | L
  packQuantity: '',   // optional pack count, e.g. 2 for "Pack of 2"
  salePrice: '',
  originalPrice: '',
  images: [],
  isUploading: false,
  expanded: true,
  featured: [],
  status: 'active',
});

const emptyForm = {
  name: '',
  slug: '',
  category: 'potting-mix',
  tags: [],
  description: '',
  longDescription: '',
  benefits: [''],
  howToUse: [''],
  images: [],
  originalPrice: '',
  salePrice: '',
  discount: 0,
  rating: '',
  reviews: '',
  linkedVariants: [],
  details: [{ key: '', value: '' }],
  status: 'draft',
  featured: [],
  variantGroupId: '',
  mainVariantLabel: '',
  productWeight: '',
  productWeightUnit: 'kg',
  productPackQuantity: '',
  // Shipping fields for Nimbus
  shippingWeight: '',      // in kg (actual shipping weight with packaging)
  shippingLength: '',      // cm
  shippingBreadth: '',     // cm
  shippingHeight: '',      // cm
  inStock: true,           // Default to in stock
};

export default function ProductForm({ existingProduct = null }) {
  const router = useRouter();
  const isEditing = !!existingProduct;

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // States for linking existing products
  const [allProducts, setAllProducts] = useState([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch all products when modal opens
  useEffect(() => {
    if (showLinkModal && allProducts.length === 0) {
      getAllProducts().then(setAllProducts).catch(console.error);
    }
  }, [showLinkModal]);

  // Initialize form with existing product data
  useEffect(() => {
    if (existingProduct) {
      const details = existingProduct.details || {};
      const detailsArray = Object.keys(details).length > 0
        ? Object.entries(details).map(([key, value]) => ({ key, value }))
        : [{ key: '', value: '' }];

      // Reconstruct linkedVariants from the variantSummary stored on the product
      // Each entry in variantSummary (except isMain) maps to a variant card
      const reconstructedVariants = Array.isArray(existingProduct.variantSummary)
        ? existingProduct.variantSummary
          .filter(v => !v.isMain)
          .map(v => {
            // Parse weight & pack from the stored label (e.g. "5kg (Pack of 2)")
            const lbl = v.label || '';
            const wMatch = lbl.match(/(\d+(?:\.\d+)?)\s*(g|kg|ml|L)/i);
            const pMatch = lbl.match(/pack of\s*(\d+)/i);
            return {
              name: v.name || '',
              label: lbl,
              weightValue: wMatch ? wMatch[1] : '',
              weightUnit: wMatch ? wMatch[2] : 'g',
              packQuantity: pMatch ? pMatch[1] : '',
              salePrice: v.salePrice ? String(v.salePrice) : '',
              originalPrice: v.originalPrice ? String(v.originalPrice) : '',
              images: Array.isArray(v.images) ? v.images : [],
              isUploading: false,
              expanded: false,  // collapsed by default on edit
              featured: Array.isArray(v.featured) ? v.featured : [],
              status: v.status || 'active',
              _existingSlug: v.slug,  // remember original slug for reference
            };
          })
        : [];

      setForm({
        name: existingProduct.name || '',
        slug: existingProduct.slug || '',
        category: existingProduct.category || 'potting-mix',
        tags: Array.isArray(existingProduct.tags) ? existingProduct.tags : [],
        description: existingProduct.description || '',
        longDescription: existingProduct.longDescription || '',
        benefits: Array.isArray(existingProduct.benefits) && existingProduct.benefits.length > 0
          ? existingProduct.benefits : [''],
        howToUse: Array.isArray(existingProduct.howToUse) && existingProduct.howToUse.length > 0
          ? existingProduct.howToUse : [''],
        images: Array.isArray(existingProduct.images)
          ? existingProduct.images.filter(img => img && img.trim()) : [],
        originalPrice: existingProduct.originalPrice || '',
        salePrice: existingProduct.salePrice || '',
        discount: existingProduct.discount || 0,
        rating: existingProduct.rating || '',
        reviews: existingProduct.reviews || '',
        linkedVariants: reconstructedVariants,
        details: detailsArray,
        status: existingProduct.status || 'draft',
        featured: Array.isArray(existingProduct.featured) ? existingProduct.featured : [],
        variantGroupId: existingProduct.variantGroupId || '',
        mainVariantLabel: existingProduct.variantLabel || '',
        productWeight: (() => {
          const w = existingProduct.details?.Weight || existingProduct.variantLabel || '';
          return w.replace(/[^0-9.]/g, '') || '';
        })(),
        productWeightUnit: (() => {
          const w = existingProduct.details?.Weight || existingProduct.variantLabel || '';
          if (w.includes('kg') || w.includes('Kg')) return 'kg';
          if (w.includes('ml')) return 'ml';
          if (w.includes('L') && !w.includes('ml')) return 'L';
          return 'g';
        })(),
        inStock: existingProduct.inStock !== false,
        productPackQuantity: (() => {
          const w = existingProduct.variantLabel || existingProduct.details?.Weight || '';
          const pMatch = w.match(/pack of\s*(\d+)/i);
          return pMatch ? pMatch[1] : '';
        })(),
        shippingWeight: existingProduct.shippingWeight || '',
        shippingLength: existingProduct.shippingLength || '',
        shippingBreadth: existingProduct.shippingBreadth || '',
        shippingHeight: existingProduct.shippingHeight || '',
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

  // ─── Linked Variant helpers ───
  const addLinkedVariant = () => {
    setForm(prev => ({ ...prev, linkedVariants: [...prev.linkedVariants, emptyVariant()] }));
  };
  
  const handleLinkProduct = (product) => {
    // Determine the label/weight for the product
    const w = product.details?.Weight || product.variantLabel || '';
    const wMatch = w.match(/(\d+(?:\.\d+)?)\s*(g|kg|ml|L)/i);
    const pMatch = w.match(/pack of\s*(\d+)/i);
    
    const newVariant = {
      name: product.name,
      label: w || product.name,
      weightValue: wMatch ? wMatch[1] : '',
      weightUnit: wMatch ? wMatch[2] : 'g',
      packQuantity: pMatch ? pMatch[1] : '',
      salePrice: String(product.salePrice || ''),
      originalPrice: String(product.originalPrice || ''),
      images: Array.isArray(product.images) ? product.images : [],
      isUploading: false,
      expanded: false,
      featured: Array.isArray(product.featured) ? product.featured : [],
      status: product.status || 'active',
      _existingSlug: product.slug, // Crucial for linking
    };
    
    setForm(prev => ({ ...prev, linkedVariants: [...prev.linkedVariants, newVariant] }));
    setShowLinkModal(false);
    setSearchQuery('');
  };
  const removeLinkedVariant = (index) => {
    setForm(prev => ({ ...prev, linkedVariants: prev.linkedVariants.filter((_, i) => i !== index) }));
  };
  const updateLinkedVariant = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      linkedVariants: prev.linkedVariants.map((v, i) => {
        if (i !== index) return v;
        const updated = { ...v, [field]: value };
        // Auto-update label when weight OR pack changes
        const wv = field === 'weightValue' ? value : updated.weightValue;
        const wu = field === 'weightUnit' ? value : updated.weightUnit;
        const pk = field === 'packQuantity' ? value : updated.packQuantity;
        if ((field === 'weightValue' || field === 'weightUnit' || field === 'packQuantity') && wv) {
          const weightStr = `${wv}${wu}`;
          const packStr = pk && parseInt(pk) > 1 ? ` (Pack of ${pk})` : '';
          updated.label = `${weightStr}${packStr}`;
        }
        return updated;
      }),
    }));
  };
  const setVariantFieldManual = (index, field) => {
    setForm(prev => ({
      ...prev,
      linkedVariants: prev.linkedVariants.map((v, i) =>
        i === index ? { ...v, [`_${field}Manual`]: true } : v
      ),
    }));
  };
  const toggleVariantExpanded = (index) => {
    setForm(prev => ({
      ...prev,
      linkedVariants: prev.linkedVariants.map((v, i) =>
        i === index ? { ...v, expanded: !v.expanded } : v
      ),
    }));
  };

  // Upload image for a specific variant
  const handleVariantImageUpload = async (e, variantIndex) => {
    const file = e.target.files[0];
    if (!file) return;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) return;

    // Set uploading state on this variant
    setForm(prev => ({ ...prev, linkedVariants: prev.linkedVariants.map((v, i) => i === variantIndex ? { ...v, isUploading: true } : v) }));

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', uploadPreset);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.secure_url) {
        setForm(prev => ({
          ...prev,
          linkedVariants: prev.linkedVariants.map((v, i) =>
            i === variantIndex ? { ...v, images: [...(v.images || []), data.secure_url], isUploading: false } : v
          ),
        }));
        setToast({ type: 'success', message: 'Variant image uploaded!' });
      }
    } catch {
      setForm(prev => ({ ...prev, linkedVariants: prev.linkedVariants.map((v, i) => i === variantIndex ? { ...v, isUploading: false } : v) }));
      setToast({ type: 'error', message: 'Variant image upload failed.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
      e.target.value = '';
    }
  };
  const removeVariantImage = (variantIndex, imgIndex) => {
    setForm(prev => ({
      ...prev,
      linkedVariants: prev.linkedVariants.map((v, i) =>
        i === variantIndex ? { ...v, images: v.images.filter((_, ii) => ii !== imgIndex) } : v
      ),
    }));
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
      const detailsObj = {};
      form.details.forEach(d => { if (d.key.trim()) detailsObj[d.key.trim()] = d.value.trim(); });
      // Auto-add Weight to details from the weight field if set and not already present
      if (form.productWeight && !detailsObj['Weight']) {
        detailsObj['Weight'] = `${form.productWeight}${form.productWeightUnit}`;
      }

      // Require at least a name to count as a valid variant
      const validVariants = form.linkedVariants.filter(v => v.name.trim() || v.label.trim());

      const groupId = form.variantGroupId ||
        (validVariants.length > 0 ? `vg-${Date.now()}` : '');

      const mainSlug = form.slug.trim() || generateSlug(form.name);
      const mainName = form.name.trim();

      // Build sibling entries — each one becomes a full Firestore product doc
      const siblingEntries = validVariants.map(v => {
        const weightOnly = v.weightValue
          ? `${v.weightValue}${v.weightUnit}`
          : '';
        const packStr = v.packQuantity && parseInt(v.packQuantity) > 1
          ? ` (Pack of ${v.packQuantity})` : '';
        const weightStr = weightOnly ? `${weightOnly}${packStr}` : v.label.trim();
        const variantName = v.name.trim() || `${mainName}${weightStr ? ' - ' + weightStr : ''}`;
        const variantSlug = v._existingSlug ||
          (v.label.trim()
            ? generateSlug(`${mainSlug}-${v.label.trim()}`)
            : generateSlug(variantName));
        return {
          label: weightStr || variantName,
          name: variantName,
          slug: variantSlug,
          weight: weightOnly || weightStr,
          salePrice: parseFloat(v.salePrice) || 0,
          originalPrice: parseFloat(v.originalPrice) || 0,
          images: Array.isArray(v.images) ? v.images : [],
          featured: Array.isArray(v.featured) ? v.featured : form.featured,
          status: v.status || 'active',
          _existingSlug: v._existingSlug || null,
        };
      });

      // Full switcher shown on every product page (main + all siblings)
      // Compute mainLabel directly from productWeight/productWeightUnit/productPackQuantity
      // to avoid stale closure issues from the onChange handlers
      const mainLabel = (() => {
        if (form.productWeight) {
          const weightStr = `${form.productWeight}${form.productWeightUnit}`;
          const packStr = form.productPackQuantity && parseInt(form.productPackQuantity) > 1
            ? ` (Pack of ${form.productPackQuantity})` : '';
          return `${weightStr}${packStr}`;
        }
        return form.mainVariantLabel.trim() || (validVariants.length > 0 ? 'Default' : '');
      })();
      const mainEntry = {
        label: mainLabel,
        name: mainName,
        slug: mainSlug,
        salePrice: parseFloat(form.salePrice) || 0,
        originalPrice: parseFloat(form.originalPrice) || 0,
        images: form.images.filter(img => img && img.trim()),
        isMain: true,
      };
      const allVariantSummary = validVariants.length > 0
        ? [mainEntry, ...siblingEntries.map(v => ({
          label: v.label, name: v.name, slug: v.slug,
          salePrice: v.salePrice, originalPrice: v.originalPrice,
          images: v.images, featured: v.featured, status: v.status,
        }))]
        : [];

      const baseProductData = {
        name: mainName,
        slug: mainSlug,
        category: form.category,
        tags: form.tags,
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        benefits: form.benefits.filter(b => b.trim()),
        howToUse: form.howToUse.filter(h => h.trim()),
        images: form.images.filter(img => img && img.trim()),
        originalPrice: parseFloat(form.originalPrice) || 0,
        salePrice: parseFloat(form.salePrice) || 0,
        discount: form.discount,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        details: detailsObj,
        status: status || form.status,
        inStock: form.inStock,
        featured: form.featured,
        variantGroupId: groupId,
        variantLabel: mainLabel,
        variantSummary: allVariantSummary,
        // Shipping info for Nimbus
        shippingWeight: parseFloat(form.shippingWeight) || 0,
        shippingLength: parseFloat(form.shippingLength) || 0,
        shippingBreadth: parseFloat(form.shippingBreadth) || 0,
        shippingHeight: parseFloat(form.shippingHeight) || 0,
      };

      if (isEditing) {
        // Update the main product
        await updateProduct(existingProduct.id, baseProductData);

        // Create any NEW variant docs added during this edit session
        const newVariants = siblingEntries.filter(v => !v._existingSlug);
        for (const v of newVariants) {
          const variantDiscount = v.originalPrice > v.salePrice && v.originalPrice > 0
            ? Math.round(((v.originalPrice - v.salePrice) / v.originalPrice) * 100)
            : baseProductData.discount;

          await addProduct({
            ...baseProductData,
            name: v.name,
            slug: v.slug,
            images: v.images.length > 0 ? v.images : baseProductData.images,
            salePrice: v.salePrice || baseProductData.salePrice,
            originalPrice: v.originalPrice || baseProductData.originalPrice,
            discount: variantDiscount,
            variantLabel: v.label,
            variantSummary: allVariantSummary,
            featured: v.featured.length > 0 ? v.featured : baseProductData.featured,
            status: v.status,
            details: v.weight ? { ...detailsObj, Weight: v.weight } : detailsObj,
          });
        }

        // ── Sync ALL existing siblings in this group ──
        // Updates variantSummary, featured tags, labels, prices, etc.
        if (groupId) {
          try {
            const groupDocs = await getVariantGroup(groupId);
            for (const sibling of groupDocs) {
              if (sibling.id !== existingProduct.id) {
                // Find matching sibling entry from the form to get updated featured/label/etc.
                const matchingEntry = siblingEntries.find(e => e._existingSlug === sibling.slug);
                const updateData = { variantSummary: allVariantSummary };
                if (matchingEntry) {
                  updateData.variantLabel = matchingEntry.label;
                  updateData.featured = matchingEntry.featured;
                  updateData.salePrice = matchingEntry.salePrice;
                  updateData.originalPrice = matchingEntry.originalPrice;
                  if (matchingEntry.images.length > 0) updateData.images = matchingEntry.images;
                  if (matchingEntry.weight) updateData.details = { ...detailsObj, Weight: matchingEntry.weight };
                }
                await updateProduct(sibling.id, updateData);
              }
            }
            
            // ── Link External Variants ──
            const externalVariants = siblingEntries.filter(v => v._existingSlug && !groupDocs.some(d => d.slug === v._existingSlug));
            for (const ext of externalVariants) {
              const extDoc = await getProductBySlug(ext._existingSlug);
              if (extDoc) {
                await updateProduct(extDoc.id, {
                  variantGroupId: groupId,
                  variantSummary: allVariantSummary,
                  variantLabel: ext.label,
                  featured: ext.featured.length > 0 ? ext.featured : extDoc.featured,
                  salePrice: ext.salePrice || extDoc.salePrice,
                  originalPrice: ext.originalPrice || extDoc.originalPrice,
                  images: ext.images.length > 0 ? ext.images : extDoc.images,
                  details: ext.weight ? { ...(extDoc.details || {}), Weight: ext.weight } : (extDoc.details || {}),
                });
              }
            }
          } catch (syncErr) {
            console.warn('Could not sync variant summaries:', syncErr.message);
          }
        }

        const newCount = newVariants.length;
        setToast({
          type: 'success',
          message: `Product updated${newCount > 0 ? ` + ${newCount} new variant${newCount > 1 ? 's' : ''} created!` : '!'}`,
        });
      } else {
        // 1. Save the main product
        await addProduct(baseProductData);

        // 2. Separate new vs existing variants
        const newVariants = siblingEntries.filter(v => !v._existingSlug);
        const externalVariants = siblingEntries.filter(v => v._existingSlug);

        // 3. Save each NEW variant as its own Firestore product doc
        for (const v of newVariants) {
          const variantDiscount = v.originalPrice > v.salePrice && v.originalPrice > 0
            ? Math.round(((v.originalPrice - v.salePrice) / v.originalPrice) * 100)
            : baseProductData.discount;

          await addProduct({
            // Copy ALL main product fields first
            ...baseProductData,
            // Then override with variant-specific values
            name: v.name,
            slug: v.slug,
            images: v.images.length > 0 ? v.images : baseProductData.images,
            salePrice: v.salePrice || baseProductData.salePrice,
            originalPrice: v.originalPrice || baseProductData.originalPrice,
            discount: variantDiscount,
            variantLabel: v.label,
            variantSummary: allVariantSummary,
            featured: v.featured.length > 0 ? v.featured : baseProductData.featured,
            status: v.status,
            details: v.weight
              ? { ...detailsObj, Weight: v.weight }
              : detailsObj,
          });
        }
        
        // 4. Update external variants
        for (const ext of externalVariants) {
          const extDoc = await getProductBySlug(ext._existingSlug);
          if (extDoc) {
            await updateProduct(extDoc.id, {
              variantGroupId: groupId,
              variantSummary: allVariantSummary,
              variantLabel: ext.label,
              featured: ext.featured.length > 0 ? ext.featured : extDoc.featured,
              salePrice: ext.salePrice || extDoc.salePrice,
              originalPrice: ext.originalPrice || extDoc.originalPrice,
              images: ext.images.length > 0 ? ext.images : extDoc.images,
              details: ext.weight ? { ...(extDoc.details || {}), Weight: ext.weight } : (extDoc.details || {}),
            });
          }
        }

        const count = siblingEntries.length;
        setToast({
          type: 'success',
          message: `✓ Product saved${count > 0 ? ` + ${count} variant product${count > 1 ? 's' : ''} created/linked!` : '!'}`,
        });
        setTimeout(() => router.push('/admin/products'), 2000);
      }
    } catch (err) {
      console.error('Save failed:', err);
      setToast({ type: 'error', message: `Save failed: ${err.message || 'Please try again.'}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 5000);
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
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>Drag to reorder — first image is the main product photo</p>
              </div>
              <div className="adminCardBody">
                {/* Image thumbnails grid — drag to reorder */}
                {form.images.filter(img => img.trim()).length > 0 && (
                  <div className={styles.imageGrid} style={{ marginBottom: 12 }}>
                    {form.images.map((url, i) => {
                      if (!url.trim()) return null;
                      return (
                        <div
                          key={url}
                          className={styles.imageSlot}
                          draggable
                          onDragStart={(e) => { setDragIndex(i); e.dataTransfer.effectAllowed = 'move'; }}
                          onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
                          onDragLeave={() => setDragOverIndex(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (dragIndex === null || dragIndex === i) return;
                            const newImages = [...form.images];
                            const [moved] = newImages.splice(dragIndex, 1);
                            newImages.splice(i, 0, moved);
                            setForm(prev => ({ ...prev, images: newImages }));
                            setDragIndex(null);
                            setDragOverIndex(null);
                          }}
                          onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                          style={{
                            opacity: dragIndex === i ? 0.4 : 1,
                            border: dragOverIndex === i ? '2px dashed #16a34a' : undefined,
                            borderRadius: 10,
                            transition: 'opacity 0.15s, border 0.15s',
                            cursor: 'grab',
                          }}
                        >
                          <div className={styles.imagePreview}>
                            <img src={url} alt={`Product ${i + 1}`} className={styles.previewImg} />
                            {i === 0 && (
                              <span className={styles.mainBadge}>Main</span>
                            )}
                            <div className={styles.imageDragHandle}>
                              <GripVertical size={14} />
                            </div>
                            <button
                              className={styles.imageRemove}
                              onClick={(e) => { e.stopPropagation(); removeListItem('images', i); }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <span style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', display: 'block', marginTop: 4 }}>{i === 0 ? '★ Main' : `#${i + 1}`}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Compact upload button */}
                <label className={styles.uploadBtn}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    disabled={isUploading}
                  />
                  <ImageIcon size={16} />
                  <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                </label>
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

            {/* ─── Pricing & Weight ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">Pricing &amp; Weight</h3>
              </div>
              <div className="adminCardBody">

                {/* Weight field — sets the variant switcher pill label */}
                <div className="adminFormGroup">
                  <label className="adminLabel" style={{ fontWeight: 700 }}>Product Weight / Size</label>
                  <div className={styles.weightRow}>
                    <input
                      type="number"
                      className="adminInput"
                      placeholder="e.g. 500"
                      min="0"
                      value={form.productWeight}
                      onChange={(e) => {
                        const val = e.target.value;
                        const pack = form.productPackQuantity && parseInt(form.productPackQuantity) > 1
                          ? ` (Pack of ${form.productPackQuantity})` : '';
                        const label = val ? `${val}${form.productWeightUnit}${pack}` : '';
                        setForm(prev => ({ ...prev, productWeight: val, mainVariantLabel: label }));
                      }}
                      style={{ flex: 1 }}
                    />
                    <select
                      className={`adminInput adminSelect ${styles.unitSelect}`}
                      value={form.productWeightUnit}
                      onChange={(e) => {
                        const unit = e.target.value;
                        const pack = form.productPackQuantity && parseInt(form.productPackQuantity) > 1
                          ? ` (Pack of ${form.productPackQuantity})` : '';
                        const label = form.productWeight ? `${form.productWeight}${unit}${pack}` : '';
                        setForm(prev => ({ ...prev, productWeightUnit: unit, mainVariantLabel: label }));
                      }}
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>

                {/* Pack of X for main product */}
                <div className="adminFormGroup">
                  <label className="adminLabel">Pack Quantity <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(optional)</span></label>
                  <div className={styles.weightRow}>
                    <span style={{ fontSize: 13, color: 'var(--admin-text-secondary)', whiteSpace: 'nowrap', padding: '0 8px 0 2px' }}>Pack of</span>
                    <input
                      type="number"
                      className="adminInput"
                      placeholder="1"
                      min="1"
                      value={form.productPackQuantity}
                      onChange={(e) => {
                        const pk = e.target.value;
                        const pack = pk && parseInt(pk) > 1 ? ` (Pack of ${pk})` : '';
                        const label = form.productWeight
                          ? `${form.productWeight}${form.productWeightUnit}${pack}` : '';
                        setForm(prev => ({ ...prev, productPackQuantity: pk, mainVariantLabel: label }));
                      }}
                      style={{ flex: 1 }}
                    />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                    Pill shows as &quot;{form.productWeight || '5'}{form.productWeightUnit}{form.productPackQuantity && parseInt(form.productPackQuantity) > 1 ? ` (Pack of ${form.productPackQuantity})` : ''}&quot;
                  </p>
                </div>

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

            {/* ─── Shipping Dimensions (for Nimbus) ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <h3 className="adminCardTitle">📦 Shipping Info</h3>
                <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>Used for Nimbus Post shipment — actual weight with packaging</p>
              </div>
              <div className="adminCardBody">
                <div className="adminFormGroup">
                  <label className="adminLabel">Shipping Weight (kg)</label>
                  <input
                    type="number"
                    className="adminInput"
                    placeholder="e.g. 3.7"
                    step="0.1"
                    min="0"
                    value={form.shippingWeight}
                    onChange={(e) => setForm(prev => ({ ...prev, shippingWeight: e.target.value }))}
                  />
                  <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4 }}>Actual weight including packaging (in kg)</p>
                </div>
                <label className="adminLabel" style={{ marginBottom: 8 }}>Dimensions (cm)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div className="adminFormGroup" style={{ margin: 0 }}>
                    <input
                      type="number"
                      className="adminInput"
                      placeholder="Length"
                      min="0"
                      value={form.shippingLength}
                      onChange={(e) => setForm(prev => ({ ...prev, shippingLength: e.target.value }))}
                    />
                    <span style={{ fontSize: 10, color: 'var(--admin-text-muted)', textAlign: 'center', display: 'block', marginTop: 2 }}>Length</span>
                  </div>
                  <div className="adminFormGroup" style={{ margin: 0 }}>
                    <input
                      type="number"
                      className="adminInput"
                      placeholder="Breadth"
                      min="0"
                      value={form.shippingBreadth}
                      onChange={(e) => setForm(prev => ({ ...prev, shippingBreadth: e.target.value }))}
                    />
                    <span style={{ fontSize: 10, color: 'var(--admin-text-muted)', textAlign: 'center', display: 'block', marginTop: 2 }}>Breadth</span>
                  </div>
                  <div className="adminFormGroup" style={{ margin: 0 }}>
                    <input
                      type="number"
                      className="adminInput"
                      placeholder="Height"
                      min="0"
                      value={form.shippingHeight}
                      onChange={(e) => setForm(prev => ({ ...prev, shippingHeight: e.target.value }))}
                    />
                    <span style={{ fontSize: 10, color: 'var(--admin-text-muted)', textAlign: 'center', display: 'block', marginTop: 2 }}>Height</span>
                  </div>
                </div>
                {form.shippingWeight && form.shippingLength && form.shippingBreadth && form.shippingHeight && (
                  <div style={{ marginTop: 12, padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, fontSize: 12, color: '#065f46' }}>
                    ✅ Nimbus will use: <strong>{form.shippingWeight}kg</strong> — <strong>{form.shippingLength} × {form.shippingBreadth} × {form.shippingHeight} cm</strong>
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

            {/* ─── Linked Variants (Amazon-style: each = its own product page) ─── */}
            <div className={`adminCard ${styles.section}`}>
              <div className="adminCardHeader">
                <div>
                  <h3 className="adminCardTitle" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Link2 size={15} /> Linked Variants
                  </h3>
                  <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 3, lineHeight: 1.4 }}>
                    Each variant = its own product page with same content, different weight &amp; price.
                  </p>
                </div>
              </div>
              <div className="adminCardBody">
                {/* ── Main product's own weight label ── */}
                <div className="adminFormGroup" style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--admin-border)' }}>
                  <label className="adminLabel" style={{ fontWeight: 700 }}>This Product&apos;s Weight / Size Label</label>
                  <input
                    type="text"
                    className="adminInput"
                    placeholder="e.g. 5kg, 500g, 1 Litre — shown in variant switcher pill"
                    value={form.mainVariantLabel}
                    onChange={(e) => setForm(prev => ({ ...prev, mainVariantLabel: e.target.value }))}
                  />
                  <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                    Short label shown in the switcher pill for THIS product page (e.g. &quot;5kg&quot;)
                  </p>
                </div>

                {form.linkedVariants.length === 0 && (
                  <p style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                    No variants yet. Add weight variants like 500g, 1kg — each gets its own page &amp; switcher pill.
                  </p>
                )}

                {form.linkedVariants.map((v, i) => {
                  const weightLabel = v.weightValue ? `${v.weightValue}${v.weightUnit}` : `Variant ${i + 1}`;
                  return (
                    <div key={i} className={styles.variantCard}>
                      <div className={styles.variantCardHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                          <span className={styles.variantPill} style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {v.name || weightLabel}
                          </span>
                          {v.salePrice && <span style={{ fontSize: 11, color: 'var(--admin-text-muted)', flexShrink: 0 }}>₹{v.salePrice}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className={styles.removeRowBtn} onClick={() => toggleVariantExpanded(i)}
                            title={v.expanded ? 'Collapse' : 'Expand'}>
                            {v.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          <button className={styles.removeRowBtn} onClick={() => removeLinkedVariant(i)}>
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      {v.expanded && (
                        <div className={styles.variantCardBody}>

                          {/* ── Product Name (the variant's own page title) ── */}
                          <div className="adminFormGroup" style={{ marginBottom: 10 }}>
                            <label className="adminLabel" style={{ fontWeight: 700, color: 'var(--admin-text)' }}>
                              Product Name *
                            </label>
                            <input
                              type="text"
                              className="adminInput"
                              placeholder={`${form.name || 'Product Name'} - ${v.weightValue ? `${v.weightValue}${v.weightUnit}` : 'Weight'}`}
                              value={v.name}
                              onChange={(e) => {
                                updateLinkedVariant(i, 'name', e.target.value);
                                setVariantFieldManual(i, 'name');
                              }}
                              style={{ fontWeight: 500 }}
                            />
                            <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 3 }}>
                              This is the full title shown on the variant&apos;s own product page
                            </p>
                          </div>

                          {/* ── Weight / Size ── */}
                          <div className="adminFormGroup" style={{ marginBottom: 10 }}>
                            <label className="adminLabel">Weight / Size *</label>
                            <div className={styles.weightRow}>
                              <input
                                type="number"
                                className="adminInput"
                                placeholder="500"
                                min="0"
                                value={v.weightValue}
                                onChange={(e) => updateLinkedVariant(i, 'weightValue', e.target.value)}
                                style={{ flex: 1 }}
                              />
                              <select
                                className={`adminInput adminSelect ${styles.unitSelect}`}
                                value={v.weightUnit}
                                onChange={(e) => updateLinkedVariant(i, 'weightUnit', e.target.value)}
                              >
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="L">L</option>
                              </select>
                            </div>
                          </div>

                          {/* Pack of X */}
                          <div className="adminFormGroup" style={{ marginBottom: 10 }}>
                            <label className="adminLabel">Pack Quantity <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(optional)</span></label>
                            <div className={styles.weightRow}>
                              <span style={{ fontSize: 13, color: 'var(--admin-text-secondary)', whiteSpace: 'nowrap', padding: '0 8px 0 2px' }}>Pack of</span>
                              <input
                                type="number"
                                className="adminInput"
                                placeholder="1"
                                min="1"
                                value={v.packQuantity}
                                onChange={(e) => updateLinkedVariant(i, 'packQuantity', e.target.value)}
                                style={{ flex: 1 }}
                              />
                            </div>
                            <p style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                              Pill shows as &quot;{v.weightValue || '5'}{v.weightUnit}{v.packQuantity && parseInt(v.packQuantity) > 1 ? ` (Pack of ${v.packQuantity})` : ''}&quot;
                            </p>
                          </div>

                          {/* Pricing */}
                          <div className={styles.twoCol} style={{ marginBottom: 10 }}>
                            <div className="adminFormGroup" style={{ marginBottom: 0 }}>
                              <label className="adminLabel">Sale Price (₹)</label>
                              <input type="number" className="adminInput" placeholder="399"
                                value={v.salePrice}
                                onChange={(e) => updateLinkedVariant(i, 'salePrice', e.target.value)} />
                            </div>
                            <div className="adminFormGroup" style={{ marginBottom: 0 }}>
                              <label className="adminLabel">MRP (₹)</label>
                              <input type="number" className="adminInput" placeholder="599"
                                value={v.originalPrice}
                                onChange={(e) => updateLinkedVariant(i, 'originalPrice', e.target.value)} />
                            </div>
                          </div>

                          {/* Images for this variant */}
                          <div className="adminFormGroup" style={{ marginBottom: 10 }}>
                            <label className="adminLabel">Variant Images <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(optional — uses main images if empty)</span></label>
                            {v.images && v.images.length > 0 && (
                              <div className={styles.variantImgGrid}>
                                {v.images.map((url, ii) => (
                                  <div key={ii} className={styles.variantImgSlot}>
                                    <img src={url} alt="" className={styles.variantImgThumb} />
                                    <button className={styles.variantImgRemove} onClick={() => removeVariantImage(i, ii)}>
                                      <X size={10} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <label className={styles.uploadBtn} style={{ marginTop: v.images?.length ? 8 : 0 }}>
                              <input type="file" accept="image/*"
                                onChange={(e) => handleVariantImageUpload(e, i)}
                                style={{ display: 'none' }}
                                disabled={v.isUploading}
                              />
                              <ImageIcon size={14} />
                              <span>{v.isUploading ? 'Uploading...' : 'Add Image'}</span>
                            </label>
                          </div>

                          {/* Featured Collections */}
                          <div className="adminFormGroup" style={{ marginBottom: 10 }}>
                            <label className="adminLabel">Featured Collections</label>
                            <div className={styles.checkGrid}>
                              {['bestseller', 'new-arrival', 'bundle'].map(tag => (
                                <label key={tag} className={styles.checkItem}>
                                  <input
                                    type="checkbox"
                                    checked={(v.featured || []).includes(tag)}
                                    onChange={() => updateLinkedVariant(i, 'featured',
                                      (v.featured || []).includes(tag)
                                        ? (v.featured || []).filter(t => t !== tag)
                                        : [...(v.featured || []), tag]
                                    )}
                                  />
                                  <span style={{ textTransform: 'capitalize' }}>{tag.replace('-', ' ')}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="adminFormGroup" style={{ marginBottom: 0 }}>
                            <label className="adminLabel">Status</label>
                            <div className={styles.statusToggle}>
                              <button
                                type="button"
                                className={`${styles.statusBtn} ${v.status === 'active' ? styles.statusActive : ''}`}
                                onClick={() => updateLinkedVariant(i, 'status', 'active')}
                              >Active</button>
                              <button
                                type="button"
                                className={`${styles.statusBtn} ${v.status === 'draft' ? styles.statusDraft : ''}`}
                                onClick={() => updateLinkedVariant(i, 'status', 'draft')}
                              >Draft</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className={styles.addRowBtn} onClick={addLinkedVariant} type="button">
                    <Plus size={15} /> Add Weight Variant
                  </button>
                  <button className={styles.addRowBtn} onClick={() => setShowLinkModal(true)} type="button" style={{ background: '#f8fafc', color: '#0369a1', borderColor: '#bae6fd' }}>
                    <Link2 size={15} /> Link Existing Product
                  </button>
                </div>
              </div>

              {/* Link Existing Product Modal */}
              {showLinkModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Link Existing Product</h3>
                      <button onClick={() => setShowLinkModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search by product name..." 
                      className="adminInput" 
                      style={{ marginBottom: '16px' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      {allProducts
                        .filter(p => p.id !== existingProduct?.id && !form.linkedVariants.some(v => v._existingSlug === p.slug))
                        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(p => (
                          <div 
                            key={p.id} 
                            onClick={() => handleLinkProduct(p)}
                            style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>{p.name}</span>
                            <span style={{ fontSize: '12px', color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{p.category}</span>
                          </div>
                      ))}
                      {allProducts.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Loading products...</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                  <label className="adminLabel">Stock Status</label>
                  <div className={styles.statusToggle}>
                    <button
                      className={`${styles.statusBtn} ${form.inStock ? styles.statusActive : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, inStock: true }))}
                      type="button"
                    >
                      In Stock
                    </button>
                    <button
                      className={`${styles.statusBtn} ${!form.inStock ? styles.statusDraft : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, inStock: false }))}
                      type="button"
                    >
                      Out of Stock
                    </button>
                  </div>
                </div>

                <div className="adminFormGroup">
                  <label className="adminLabel">Featured Collections</label>
                  <div className={styles.checkGrid}>
                    {['bestseller', 'new-arrival', 'bundle'].map(tag => (
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
