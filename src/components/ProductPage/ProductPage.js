'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronLeft, ChevronRight, X, Heart, ShoppingCart, CheckCircle2, Share2 } from 'lucide-react';
import styles from './ProductPage.module.css';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import TrustBar from '@/components/TrustBar/TrustBar';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getReviews, addReview } from '@/lib/firestore';
import { getSeedReviews } from '@/data/seedReviews';
import { getStableRatingData } from '@/lib/ratingUtils';

// Emoji icons for spec keys — matching OrganicBazar exactly
const specEmojis = {
  material: '🧶', gsm: '📐', drainage: '💧', capacity: '🪣', durability: '💪',
  handles: '🎒', shape: '🔵', color: '🎨', size: '📏', weight: '⚖️',
  type: '📦', 'plant type': '🌱', 'special benefits': '✨', 'accessories': '🧩',
};
function getEmoji(key) {
  const k = key.toLowerCase();
  for (const [pattern, emoji] of Object.entries(specEmojis)) {
    if (k.includes(pattern)) return emoji;
  }
  return '📋';
}

function StarRating({ rating, size = 16 }) {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill={i < Math.floor(rating) ? '#f59e0b' : (i < rating ? '#f59e0b' : 'none')}
          stroke={i < Math.ceil(rating) ? '#f59e0b' : '#d1d5db'} strokeWidth={2} />
      ))}
    </div>
  );
}

const AVATAR_COLORS = [
  '#16a34a', '#2563eb', '#9333ea', '#e11d48', '#ea580c',
  '#0891b2', '#4f46e5', '#c026d3', '#059669', '#d97706',
  '#7c3aed', '#dc2626', '#0d9488', '#6366f1', '#db2777',
];

export default function ProductDetailPage({ product, relatedProducts }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, title: '', body: '' });
  const [stickyVisible, setStickyVisible] = useState(false);
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const addToCartRef = useRef(null);

  const isWished = isInWishlist(product.id);

  const gallery = (product.gallery || product.images || [product.image]).filter(img => img && img.trim() !== '');
  if (gallery.length === 0) gallery.push('/product-plants.png');

  const variants = product.variants || [];
  useEffect(() => { if (variants.length > 0 && !selectedVariant) setSelectedVariant(variants[0]); }, [variants]);

  const currentPrice = selectedVariant?.price || product.salePrice || product.price || 0;
  const currentOriginal = selectedVariant?.originalPrice || product.originalPrice || 0;
  const discount = currentOriginal > currentPrice ? Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100) : (product.discount || 0);
  const saveAmount = currentOriginal > currentPrice ? currentOriginal - currentPrice : 0;
  const details = product.details || {};
  const benefits = product.benefits || [];
  const howToUse = product.howToUse || [];

  const handleAddToCart = () => {
    addToCart({ ...product, salePrice: currentPrice, cartId: selectedVariant ? `${product.id}-${selectedVariant.name}` : product.id, variant: selectedVariant?.name || '' });
  };

  // Sticky bar observer
  useEffect(() => {
    if (!addToCartRef.current) return;
    const obs = new IntersectionObserver(([e]) => { setStickyVisible(!e.isIntersecting && e.boundingClientRect.top < 0); }, { threshold: 0 });
    obs.observe(addToCartRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await getReviews(product.id);
      if (data && data.length > 0) {
        setFetchedReviews(data);
      }
    };
    if (product.id) loadReviews();
  }, [product.id]);

  const handleSubmitReview = async () => {
    if (!reviewForm.name || !reviewForm.body) {
      alert("Please enter your name and review.");
      return;
    }
    setIsSubmittingReview(true);
    try {
      const newReview = { ...reviewForm, verified: true, date: 'Just now' };
      const id = await addReview(product.id, newReview);
      setFetchedReviews([{ id, ...newReview }, ...fetchedReviews]);
      setShowReviewModal(false);
      setReviewForm({ name: '', rating: 5, title: '', body: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const seedReviews = getSeedReviews(product.slug, product.name, product.category);
  const reviews = fetchedReviews.length > 0 ? [...fetchedReviews, ...seedReviews] : (product.reviews_data || seedReviews);
  const stableData = getStableRatingData(product.id, product.name);
  const totalReviews = product.reviews || reviews.length || stableData.reviewCount;
  const calculatedRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : stableData.rating;
  const avgRating = Math.max(product.rating || calculatedRating, 4.5);
  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star, count: reviews.filter(r => r.rating === star).length,
    pct: Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100),
  }));

  const tabs = [
    { key: 'description', label: 'Product description' },
    { key: 'delivery', label: 'Delivery & Returns' },
    ...(Object.keys(details).length > 0 ? [{ key: 'technical', label: 'Technical Details' }] : []),
    ...(benefits.length > 0 || howToUse.length > 0 ? [{ key: 'additional', label: 'Additional Information' }] : []),
  ];

  const nextImg = () => setActiveImage((activeImage + 1) % gallery.length);
  const prevImg = () => setActiveImage((activeImage - 1 + gallery.length) % gallery.length);

  return (
    <main className={styles.main}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        {product.category && (<><Link href={`/collections/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' ')}</Link><span className={styles.breadcrumbSep}>/</span></>)}
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Main Grid */}
      <section className={styles.productGrid}>
        {/* Left: Gallery — OB style: main image + thumbnail grid on right */}
        <div className={styles.galleryColumn}>
          <div className={styles.galleryLayout}>
            <div className={styles.mainImageWrap} onClick={() => setLightboxOpen(true)}>
              <Image src={gallery[activeImage]} alt={product.name} fill style={{ objectFit: 'contain' }} className={styles.mainImage} priority />
              {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
              {gallery.length > 1 && (
                <>
                  <button className={`${styles.galleryNav} ${styles.galleryPrev}`} onClick={e => { e.stopPropagation(); prevImg(); }}><ChevronLeft size={18} /></button>
                  <button className={`${styles.galleryNav} ${styles.galleryNext}`} onClick={e => { e.stopPropagation(); nextImg(); }}><ChevronRight size={18} /></button>
                </>
              )}
            </div>
            {gallery.length > 1 && (
              <div className={styles.thumbGrid}>
                {gallery.slice(0, 8).map((img, idx) => (
                  <button key={idx} className={`${styles.thumbBtn} ${activeImage === idx ? styles.thumbActive : ''}`} onClick={() => setActiveImage(idx)}>
                    <Image src={img} alt={`View ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className={styles.infoColumn}>
          <h1 className={styles.productTitle}>{product.name}</h1>

          <div className={styles.ratingRow}>
            <StarRating rating={avgRating} size={18} />
            <span className={styles.reviewCount} style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('reviewsSection')?.scrollIntoView({ behavior: 'smooth' })}>
              {avgRating.toFixed(2)} | {totalReviews}
            </span>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.salePrice}>₹ {currentPrice.toLocaleString('en-IN')}</span>
            {currentOriginal > currentPrice && <span className={styles.originalPrice}>₹{currentOriginal.toLocaleString('en-IN')}</span>}
            {saveAmount > 0 && <span className={styles.saveBadge}>You Save: ₹ {saveAmount.toLocaleString('en-IN')} ✓</span>}
          </div>
          <p className={styles.taxLine}>Taxes included. <Link href="/pages/shipping-policy">Shipping</Link> calculated at checkout.</p>

          <div className={`${styles.stockBadge} ${product.category === 'tools' || product.status === 'inactive' || product.inStock === false ? styles.outOfStock : styles.inStock}`}
            style={product.category === 'tools' || product.status === 'inactive' || product.inStock === false ? { color: '#b45309', background: '#fffbeb' } : {}}>
            <span className={`${styles.stockDot} ${product.category === 'tools' || product.status === 'inactive' || product.inStock === false ? styles.stockDotRed : styles.stockDotGreen}`}
              style={product.category === 'tools' || product.status === 'inactive' || product.inStock === false ? { background: '#f59e0b' } : {}} />
            {product.category === 'tools' || product.status === 'inactive' ? 'Coming Soon' : (product.inStock === false ? 'Out of stock' : 'In stock')}
          </div>

          {/* Amazon-style Linked Variant Switcher */}
          {Array.isArray(product.variantSummary) && product.variantSummary.length > 0 && (() => {
            // Extract a short weight label from any string (e.g. "Bgiya Bliss 5kg Pack" → "5kg")
            const extractWeight = (str) => {
              if (!str) return null;
              const m = str.match(/\b(\d+(?:\.\d+)?)\s*(g|kg|ml|L|ltr|litre|Kg|KG)\b/i);
              if (!m) return null;
              const unit = m[2].toLowerCase()
                .replace('ltr', 'L').replace('litre', 'L');
              return `${m[1]}${unit}`;
            };

            // Extract "Pack of X" from any string, returns null if not found or pack=1
            const extractPack = (str) => {
              if (!str) return null;
              const m = str.match(/pack\s*(?:of\s*)?(\d+)/i);
              if (m && parseInt(m[1]) > 1) return m[1];
              return null;
            };

            // Build a full label: weight + pack info from all available sources
            const buildFullLabel = (label, name, ...extraSources) => {
              // Start with the label if it's clean and short
              let base = null;
              if (label && label.length <= 30 && !label.toLowerCase().includes('bgiya')) {
                base = label;
              } else {
                base = extractWeight(label) || extractWeight(name);
              }
              if (!base) return label || name || null;

              // Already has pack info? Return as-is
              if (/pack/i.test(base)) return base;

              // Check all sources for pack info
              const allSources = [label, name, ...extraSources].filter(Boolean);
              for (const src of allSources) {
                const packNum = extractPack(src);
                if (packNum) return `${base} (Pack of ${packNum})`;
              }
              return base;
            };

            // Convert weight string to grams for sorting (1kg=1000g, 1L=1000ml)
            const toGrams = (str) => {
              if (!str) return 999999;
              const m = str.match(/(\d+(?:\.\d+)?)\s*(g|kg|ml|L|ltr|litre|Kg|KG)/i);
              if (!m) return 999999;
              const val = parseFloat(m[1]);
              const unit = m[2].toLowerCase();
              if (unit === 'kg') return val * 1000;
              if (unit === 'l' || unit === 'ltr' || unit === 'litre') return val * 1000;
              return val; // g or ml — keep as is
            };

            // Sort variants lightest → heaviest, then by pack quantity (like Amazon)
            const sortedSummary = [...product.variantSummary].sort((a, b) => {
              const la = buildFullLabel(a.label, a.name) || '';
              const lb = buildFullLabel(b.label, b.name) || '';
              const wa = toGrams(la);
              const wb = toGrams(lb);
              if (wa !== wb) return wa - wb;
              // Same weight — sort by pack quantity
              const packA = la.match(/pack of (\d+)/i);
              const packB = lb.match(/pack of (\d+)/i);
              return (parseInt(packA?.[1] || 1)) - (parseInt(packB?.[1] || 1));
            });

            // For the current product, check variantLabel, summary label, AND the product name
            const summaryEntry = product.variantSummary.find(v => v.slug === product.slug);
            const currentLabel =
              buildFullLabel(
                product.variantLabel,
                product.name,
                summaryEntry?.label,
                summaryEntry?.name
              ) || extractWeight(product.name) || 'Default';

            return (
              <div className={styles.variantSection}>
                <div className={styles.variantLabel}>
                  Weight:&nbsp;<strong>{currentLabel}</strong>
                </div>
                <div className={styles.variantOptions}>
                  {sortedSummary.map((v, i) => {
                    const isActive = product.slug === v.slug;
                    const pillLabel = (() => {
                      if (isActive) return currentLabel;
                      return buildFullLabel(v.label, v.name) || `Variant ${i + 1}`;
                    })();
                    return (
                      <a
                        key={i}
                        href={`/products/${v.slug}`}
                        className={`${styles.variantBtn} ${product.slug === v.slug ? styles.variantBtnActive : ''}`}
                        style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', minWidth: 56 }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{pillLabel}</span>
                        {v.salePrice > 0 && (
                          <span style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>₹{v.salePrice}</span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Quantity + Add to Cart — NO Buy Now */}
          {product.category === 'tools' || product.status === 'inactive' ? (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7, #fffbeb)',
                border: '1px solid #f59e0b',
                borderRadius: 12,
                padding: '20px 24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Coming Soon</h3>
                <p style={{ fontSize: 13, color: '#a16207', margin: 0 }}>This product will be available shortly. Stay tuned!</p>
              </div>
              <div className={styles.btnRow} style={{ marginTop: 12 }}>
                <button className={`${styles.wishlistBtn} ${isWished ? styles.wishlistActive : ''}`} onClick={() => toggleWishlist(product)}>
                  <Heart size={20} fill={isWished ? '#ef4444' : 'none'} />
                </button>
                <button
                  className={styles.wishlistBtn}
                  title="Share this product"
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                      setShareCopied(true);
                      setTimeout(() => setShareCopied(false), 2000);
                    });
                  }}
                  style={{ position: 'relative' }}
                >
                  <Share2 size={20} />
                  {shareCopied && (
                    <span style={{
                      position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                      background: '#111', color: '#fff', fontSize: 11, fontWeight: 600,
                      padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap',
                      pointerEvents: 'none', animation: 'fadeIn 0.2s ease'
                    }}>Link copied!</span>
                  )}
                </button>
              </div>
            </div>
          ) : (
          <div className={styles.actionsRow} ref={addToCartRef}>
            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Quantity:</span>
              <div className={styles.qtySelector}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <div className={styles.btnRow}>
              <div style={{ flex: 1 }}>
                {product.inStock === false ? (
                  <button className={styles.btnAddCart} disabled style={{ background: '#9ca3af', cursor: 'not-allowed', opacity: 1, boxShadow: 'none', width: '100%' }}>
                    <ShoppingCart size={18} /> OUT OF STOCK
                  </button>
                ) : (
                  <button className={styles.btnAddCart} onClick={handleAddToCart} style={{ width: '100%' }}>
                    <ShoppingCart size={18} /> ADD TO CART
                  </button>
                )}
              </div>
              <button className={`${styles.wishlistBtn} ${isWished ? styles.wishlistActive : ''}`} onClick={() => toggleWishlist(product)}>
                <Heart size={20} fill={isWished ? '#ef4444' : 'none'} />
              </button>
              <button
                className={styles.wishlistBtn}
                title="Share this product"
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url).then(() => {
                    setShareCopied(true);
                    setTimeout(() => setShareCopied(false), 2000);
                  });
                }}
                style={{ position: 'relative' }}
              >
                <Share2 size={20} />
                {shareCopied && (
                  <span style={{
                    position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                    background: '#111', color: '#fff', fontSize: 11, fontWeight: 600,
                    padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap',
                    pointerEvents: 'none', animation: 'fadeIn 0.2s ease'
                  }}>Link copied!</span>
                )}
              </button>
            </div>
          </div>
          )}

          {/* Specs — OB style: emoji + bold label: value */}
          {Object.keys(details).length > 0 && (
            <div className={styles.specsSection}>
              <div className={styles.specsGrid}>
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <span className={styles.specIcon}>{getEmoji(key)}</span>
                    <span><span className={styles.specLabel}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</span>{' '}<span className={styles.specValue}>{value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <Truck size={20} className={styles.trustIcon} />
              <span className={styles.trustText}>Free Shipping Above ₹499</span>
            </div>
            <div className={styles.trustItem}>
              <RotateCcw size={20} className={styles.trustIcon} />
              <span className={styles.trustText}>Replacement Guarantee</span>
            </div>
            <div className={styles.trustItem}>
              <ShieldCheck size={20} className={styles.trustIcon} />
              <span className={styles.trustText}>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.tabsSection}>
        <div className={styles.tabNav}>
          {tabs.map(t => (
            <button key={t.key} className={`${styles.tabBtn} ${activeTab === t.key ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div>
              {product.longDescription ? <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                : product.description ? <p>{product.description}</p> : <p>No description available.</p>}
              {benefits.length > 0 && (<><h3>Key Benefits</h3><ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul></>)}
            </div>
          )}
          {activeTab === 'delivery' && (
            <div className={styles.deliveryGrid}>
              <div className={styles.deliveryCard}>
                <h4><Truck size={18} /> Shipping</h4>
                <ul><li>Shipping charges calculated at checkout based on location</li><li>Prepaid orders enjoy lower shipping rates</li><li>COD available with a small handling fee</li></ul>
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#ecfdf5', borderRadius: 8, fontSize: 13 }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>🎉 Available Offers:</p>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    <li>5% Off on orders above ₹599 — Use code: <strong>BLISS5</strong></li>
                    <li>10% Off on orders above ₹1099 — Use code: <strong>BLISS10</strong></li>
                    <li>15% Off on orders above ₹1599 — Use code: <strong>BLISS15</strong></li>
                  </ul>
                </div>
              </div>
              <div className={styles.deliveryCard}>
                <h4><RotateCcw size={18} /> Returns & Refunds</h4>
                <ul><li>All sales are final — no refunds</li><li>Free replacement for damaged products (report within 24 hrs)</li><li>Contact us with photos for quick resolution</li></ul>
              </div>
            </div>
          )}
          {activeTab === 'technical' && Object.keys(details).length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}><tbody>
              {Object.entries(details).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#333', width: '40%' }}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{value}</td>
                </tr>
              ))}
            </tbody></table>
          )}
          {activeTab === 'additional' && (
            <div>
              {howToUse.length > 0 && (<><h3>How to Use</h3><ol>{howToUse.map((s, i) => <li key={i}>{s}</li>)}</ol></>)}
              {benefits.length > 0 && (<><h3>Benefits</h3><ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul></>)}
              {product.description && <p>{product.description}</p>}
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.reviewsSection} id="reviewsSection">
        <div className={styles.reviewsHeader}>
          <h2 className={styles.reviewsTitle}>⭐ Customer Reviews</h2>
          <button className={styles.writeReviewBtn} onClick={() => setShowReviewModal(true)}>✍️ Write a Review</button>
        </div>
        <div className={styles.reviewsSummary}>
          <div className={styles.reviewsOverall}>
            <span className={styles.reviewsBigNum}>{avgRating.toFixed(1)}</span>
            <div><StarRating rating={avgRating} size={18} /><div className={styles.reviewsTotalText}>{totalReviews} verified reviews</div></div>
          </div>
          <div className={styles.ratingBars}>
            {ratingDist.map(({ star, count, pct }) => (
              <div key={star} className={styles.ratingBarRow}>
                <span className={styles.ratingBarLabel}>{star} <Star size={11} fill="#f59e0b" stroke="#f59e0b" /></span>
                <div className={styles.ratingBarTrack}><div className={styles.ratingBarFill} style={{ width: `${pct}%` }} /></div>
                <span className={styles.ratingBarCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.reviewsList}>
          {reviews.slice(0, reviewsToShow).map((r, idx) => (
            <div key={r.id || idx} className={styles.reviewCard}>
              <div className={styles.reviewTop}>
                <div className={styles.reviewAuthor}>
                  <div className={styles.reviewAvatar} style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>{r.name?.charAt(0)?.toUpperCase() || 'U'}</div>
                  <div><div className={styles.reviewName}>{r.name || 'Customer'}</div><div className={styles.reviewDate}>{r.date}</div></div>
                </div>
                {r.verified && <span className={styles.reviewVerified}><CheckCircle2 size={12} /> Verified Purchase</span>}
              </div>
              <div className={styles.reviewStars}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? '#f59e0b' : 'none'} stroke={i < r.rating ? '#f59e0b' : '#d1d5db'} />)}</div>
              {r.title && <div className={styles.reviewTitle}>{r.title}</div>}
              <div className={styles.reviewBody}>{r.body}</div>
              {r.reply && <div className={styles.reviewReply}><div className={styles.reviewReplyLabel}>🌿 Bgiya Bliss Response</div><div className={styles.reviewReplyText}>{r.reply}</div></div>}
            </div>
          ))}
        </div>
        {reviews.length > reviewsToShow && (
          <button className={styles.showMoreBtn} onClick={() => setReviewsToShow(prev => prev + 10)}>
            Show More Reviews ({reviews.length - reviewsToShow} remaining)
          </button>
        )}
        {reviewsToShow > 5 && reviews.length <= reviewsToShow && (
          <button className={styles.showMoreBtn} onClick={() => setReviewsToShow(5)}>
            Show Less
          </button>
        )}
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className={styles.reviewModal} onClick={() => setShowReviewModal(false)}>
          <div className={styles.reviewModalContent} onClick={e => e.stopPropagation()}>
            <h3 className={styles.reviewModalTitle}>Write a Review</h3>
            <p className={styles.reviewModalSubtitle}>Share your experience to help other gardeners</p>
            <div className={styles.reviewFormGroup}><label>Rating</label>
              <div className={styles.starPicker}>{[1, 2, 3, 4, 5].map(s => (
                <button key={s} className={`${styles.starPickerBtn} ${s <= reviewForm.rating ? styles.starPickerBtnActive : ''}`} onClick={() => setReviewForm({ ...reviewForm, rating: s })}>
                  <Star size={28} fill={s <= reviewForm.rating ? '#f59e0b' : 'none'} /></button>
              ))}</div></div>
            <div className={styles.reviewFormGroup}><label>Name</label><input type="text" placeholder="Your name" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} /></div>
            <div className={styles.reviewFormGroup}><label>Review Title</label><input type="text" placeholder="Sum up your experience" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} /></div>
            <div className={styles.reviewFormGroup}><label>Review</label><textarea placeholder="Tell us what you liked..." value={reviewForm.body} onChange={e => setReviewForm({ ...reviewForm, body: e.target.value })} /></div>
            <div className={styles.reviewModalActions}>
              <button className={styles.reviewCancelBtn} onClick={() => setShowReviewModal(false)}>Cancel</button>
              <button className={styles.reviewSubmitBtn} onClick={handleSubmitReview} disabled={isSubmittingReview}>
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightboxOpen(false)}><X size={18} /></button>
            {gallery.length > 1 && (<>
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prevImg}><ChevronLeft size={20} /></button>
              <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={nextImg}><ChevronRight size={20} /></button>
            </>)}
            <Image src={gallery[activeImage]} alt={product.name} fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}

      {relatedProducts?.length > 0 && <div className={styles.relatedSection}><ProductCarousel title="You May Also Like" products={relatedProducts} viewAllLink="/collections/all" /></div>}
      <TrustBar />

      {/* OB-style Sticky Bottom Bar — product info + price + qty + Add to Cart */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#f5f0e8',
        borderTop: '1px solid #e5e0d5', zIndex: 100, padding: '10px 0',
        transform: stickyVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', width: 50, height: 50, borderRadius: 6, overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
              <Image src={gallery[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333', lineHeight: 1.3, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
              {selectedVariant && <div style={{ fontSize: 11, color: '#888' }}>{selectedVariant.name}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>₹ {currentPrice.toLocaleString('en-IN')}</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 6, overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 34, height: 34, border: 'none', background: '#fff', cursor: 'pointer', fontSize: 16, color: '#555' }}>−</button>
              <span style={{ width: 36, textAlign: 'center', fontWeight: 600, fontSize: 14, borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', height: 34, lineHeight: '34px' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 34, height: 34, border: 'none', background: '#fff', cursor: 'pointer', fontSize: 16, color: '#555' }}>+</button>
            </div>
            <button onClick={handleAddToCart} style={{
              height: 42, padding: '0 32px', borderRadius: 50, background: 'var(--color-primary)', color: '#fff',
              fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              textTransform: 'uppercase', letterSpacing: 0.5, transition: 'all 0.2s',
            }}>
              <ShoppingCart size={16} /> ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
