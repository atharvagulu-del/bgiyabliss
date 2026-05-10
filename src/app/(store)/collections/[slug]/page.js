'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, ChevronDown, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { getActiveProducts } from '@/lib/firestore';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

// Map slugs to display info
const categoryMeta = {
  'potting-mix': { title: 'Potting Mix', subtitle: 'Premium Organic Soil Blends', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'fertilizers': { title: 'Fertilizers', subtitle: 'Neem Cake, Mustard Cake & More', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
  'vermicompost': { title: 'Vermicompost', subtitle: 'Nutrient-Rich Natural Soil Supplement', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'cocopeat': { title: 'Cocopeat', subtitle: 'Premium Growing Medium', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
  'perlite': { title: 'Perlite', subtitle: 'For Better Drainage & Aeration', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'seeds': { title: 'Seeds', subtitle: 'Vegetable, Flower & Herb Seeds', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
  'tools': { title: 'Tools & Accessories', subtitle: 'Everything for Your Garden', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'bundles': { title: 'Bundles', subtitle: 'Save More with Combo Packs', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
  'bestsellers': { title: 'Bestsellers', subtitle: 'Our Most Popular Products', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'new-arrivals': { title: 'New Arrivals', subtitle: 'Fresh Additions to Our Store', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
  'offers': { title: 'Offers', subtitle: 'Best Deals & Discounts', bg: '/bgiya_lifestyle_room_1773167548111.png' },
  'all': { title: 'All Products', subtitle: 'Browse Our Complete Collection', bg: '/bgiya_lifestyle_hd_1773167764488.png' },
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'discount', label: 'Biggest Discount' },
];

function ProductGridCard({ product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice > product.salePrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : (product.discount || 0);

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.slug}`} className={styles.cardImageWrap}>
        <Image
          src={product.image || product.images?.[0] || '/product-plants.png'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ objectFit: 'cover' }}
          className={styles.cardImage}
        />
        {discount > 0 && <span className={styles.cardBadge}>-{discount}%</span>}
        <button
          className={styles.cardWishlist}
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
        <button
          className={styles.cardQuickAdd}
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
        >
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </Link>
      <div className={styles.cardInfo}>
        <Link href={`/products/${product.slug}`} className={styles.cardName}>
          {product.name}
        </Link>
        {product.rating > 0 && (
          <div className={styles.cardRating}>
            <div className={styles.cardStars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i < Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />
              ))}
            </div>
            <span className={styles.cardRatingText}>{product.rating} | {product.reviews || 0}</span>
          </div>
        )}
        <div className={styles.cardPricing}>
          <span className={styles.cardPrice}>₹ {(product.salePrice || product.price || 0).toLocaleString('en-IN')}</span>
          {product.originalPrice > (product.salePrice || 0) && (
            <span className={styles.cardOriginal}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discount > 0 && <span className={styles.cardDiscount}>-{discount}% Off</span>}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug || 'all';
  const meta = categoryMeta[slug] || { title: slug.replace(/-/g, ' '), subtitle: 'Browse products', bg: '/bgiya_lifestyle_hd_1773167764488.png' };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [showSort, setShowSort] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await getActiveProducts();
        let filtered = all;

        if (slug === 'bestsellers') {
          filtered = all.filter(p => p.featured?.includes('bestseller'));
        } else if (slug === 'new-arrivals') {
          filtered = all.filter(p => p.featured?.includes('new-arrival'));
        } else if (slug === 'offers') {
          filtered = all.filter(p => (p.discount || 0) > 0 || (p.originalPrice > (p.salePrice || 0)));
        } else if (slug !== 'all') {
          filtered = all.filter(p => 
            p.category === slug || 
            (slug === 'potting-mix' && p.category === 'plants' && p.name.toLowerCase().includes('potting'))
          );
        }

        // If no matches in that category, show all
        if (filtered.length === 0 && slug !== 'all') {
          filtered = all;
        }

        setProducts(filtered);
      } catch (err) {
        console.log('Failed to load products:', err);
        setProducts([]);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  const sortedProducts = useMemo(() => {
    let list = [...products];

    // Price filter
    if (priceRange === 'under-200') list = list.filter(p => (p.salePrice || p.price || 0) < 200);
    else if (priceRange === '200-500') list = list.filter(p => { const pr = p.salePrice || p.price || 0; return pr >= 200 && pr <= 500; });
    else if (priceRange === 'above-500') list = list.filter(p => (p.salePrice || p.price || 0) > 500);

    // Sort
    switch (sortBy) {
      case 'price-low': list.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0)); break;
      case 'price-high': list.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0)); break;
      case 'rating': list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'discount': list.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      case 'newest': break; // already sorted by createdAt desc
      default: break;
    }
    return list;
  }, [products, sortBy, priceRange]);

  return (
    <div className={styles.collectionPage}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <Image src={meta.bg} alt={meta.title} fill style={{ objectFit: 'cover' }} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{meta.title}</h1>
          <nav className={styles.heroBreadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{meta.title}</span>
          </nav>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          {/* Price filter pills */}
          <button className={`${styles.filterPill} ${priceRange === 'all' ? styles.filterPillActive : ''}`} onClick={() => setPriceRange('all')}>All Prices</button>
          <button className={`${styles.filterPill} ${priceRange === 'under-200' ? styles.filterPillActive : ''}`} onClick={() => setPriceRange('under-200')}>Under ₹200</button>
          <button className={`${styles.filterPill} ${priceRange === '200-500' ? styles.filterPillActive : ''}`} onClick={() => setPriceRange('200-500')}>₹200 - ₹500</button>
          <button className={`${styles.filterPill} ${priceRange === 'above-500' ? styles.filterPillActive : ''}`} onClick={() => setPriceRange('above-500')}>Above ₹500</button>
        </div>
        <div className={styles.toolbarRight}>
          <span className={styles.productCount}>{sortedProducts.length} Products</span>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`} onClick={() => setViewMode('grid')}><Grid3X3 size={16} /></button>
            <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
          </div>
          <div className={styles.sortWrap}>
            <button className={styles.sortBtn} onClick={() => setShowSort(!showSort)}>
              Sort by <ChevronDown size={14} className={showSort ? styles.sortChevronOpen : ''} />
            </button>
            {showSort && (
              <div className={styles.sortDropdown}>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} className={`${styles.sortOption} ${sortBy === opt.value ? styles.sortOptionActive : ''}`}
                    onClick={() => { setSortBy(opt.value); setShowSort(false); }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.gridContainer}>
        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(8)].map((_, i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className={`${styles.productGrid} ${viewMode === 'list' ? styles.productList : ''}`}>
            {sortedProducts.map(product => (
              <ProductGridCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <SlidersHorizontal size={48} strokeWidth={1} />
            <h3>No products found</h3>
            <p>Try adjusting your filters or check back soon for new arrivals!</p>
            <Link href="/collections/all" className={styles.emptyBtn}>Browse All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
