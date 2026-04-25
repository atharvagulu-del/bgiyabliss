'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import styles from './StickyCart.module.css';

export default function StickyCart({ product, mainAddToCartRef, handleAddToCart, selectedVariant }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!mainAddToCartRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky cart when main CTA is out of view (scrolled past)
        setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(mainAddToCartRef.current);

    return () => observer.disconnect();
  }, [mainAddToCartRef]);

  if (!product) return null;

  return (
    <div className={`${styles.stickyBar} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        
        <div className={styles.productInfo}>
          <div className={styles.imageWrapper}>
            <Image 
              src={product.image || product.images?.[0] || product.gallery?.[0] || '/product-plants.png'} 
              alt={product.name} 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div className={styles.textDetails}>
            <span className={styles.name}>{product.name}</span>
            {selectedVariant && (
              <div className={styles.variantInfo}>{selectedVariant}</div>
            )}
            <div className={styles.priceRow}>
              <span className={styles.salePrice}>₹{product.salePrice}</span>
              {product.originalPrice > product.salePrice && (
                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCart} onClick={handleAddToCart}>
            <ShoppingCart size={16} style={{ marginRight: 6 }} />
            Add to Cart
          </button>
          <button className={styles.btnBuy}>Buy It Now</button>
        </div>

      </div>
    </div>
  );
}
