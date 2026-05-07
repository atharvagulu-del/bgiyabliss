'use client';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', fontFamily: 'var(--font-heading)' }}>Your Wishlist</h1>
        <p style={{ color: '#6b7280', marginTop: 8 }}>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9fafb', borderRadius: 16, border: '1px dashed #d1d5db', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#9ca3af' }}>
            <Heart size={48} strokeWidth={1} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 8 }}>Your wishlist is empty</h2>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>Save items you love and buy them later.</p>
          <Link href="/collections/all" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#16a34a', color: 'white', padding: '12px 24px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
