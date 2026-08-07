'use client';
import { Star, ShoppingCart, Sun, Droplets, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getStableRatingData } from '@/lib/ratingUtils';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);
  const isComingSoon = product.category === 'tools' || product.status === 'inactive';
  // Mock care data based strictly on tags for demo purposes
  const isLowLight = product.tags?.includes('Low Light');
  const isLowCare = product.tags?.includes('Low Care') || product.tags?.includes('Low Maintenance');

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 shadow-sm hover:shadow-xl w-[260px] md:w-[280px] shrink-0">

      {/* Image Area */}
      <a href={`/products/${product.slug}`} className="relative h-64 md:h-72 w-full overflow-hidden block bg-gray-50 flex-shrink-0">
        <img
          src={product.image || product.images?.[0] || '/product-plants.png'}
          alt={product.name}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
          {isComingSoon ? (
            <span className="bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-sm">
              COMING SOON
            </span>
          ) : (
            <>
              {product.discount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-sm">
                  {product.discount}% OFF
                </span>
              )}
              {product.featured?.includes('new-arrival') && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-sm">
                  NEW
                </span>
              )}
            </>
          )}
        </div>

        <div className="absolute top-3 right-3 pointer-events-none">
          {true && (
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-yellow-500 px-2 py-1 rounded shadow-sm text-xs font-bold">
              <Star size={12} fill="currentColor" />
              <span className="text-gray-800">
                {product.rating ? Math.max(product.rating, 4.5).toFixed(1) : getStableRatingData(product.id, product.name).rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Wishlist Button (Hover Reveal) */}
        <button
          className={`absolute top-3 right-3 md:top-12 ${isWished ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm flex items-center justify-center z-10 ${isWished ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-white'}`}
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Heart size={18} fill={isWished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add overlay button */}
        {isComingSoon ? (
          <div
            className="absolute bottom-4 left-4 right-4 bg-gray-800/80 backdrop-blur text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10 cursor-default"
          >
            🔔 Coming Soon
          </div>
        ) : (
          <button
            className="absolute bottom-4 left-4 right-4 bg-emerald-600/90 backdrop-blur text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm translate-y-[150%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-700 shadow-lg z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingCart size={16} /> Quick Add
          </button>
        )}
      </a>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags?.slice(0, 2)?.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-semibold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <a href={`/products/${product.slug}`} className="text-gray-900 font-medium text-[15px] leading-tight mb-3 hover:text-emerald-600 transition-colors line-clamp-2">
          {product.name}
        </a>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            {/* Pricing */}
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{(product.salePrice || 0).toLocaleString()}
              </span>
              {product.originalPrice > 0 && (
                <span className="text-sm font-medium text-gray-400 line-through mb-0.5">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Care Icons */}
            <div className="flex gap-1.5 text-gray-400" title="Care Requirements">
              <span className={`p-1 rounded-full ${!isLowLight ? 'bg-amber-50 text-amber-500' : 'bg-gray-50'}`} title={isLowLight ? "Low Light" : "Bright Light"}>
                <Sun size={14} />
              </span>
              <span className={`p-1 rounded-full ${!isLowCare ? 'bg-blue-50 text-blue-500' : 'bg-gray-50'}`} title={isLowCare ? "Water Weekly" : "Keep Moist"}>
                <Droplets size={14} />
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
