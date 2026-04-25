'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './CartDrawer.module.css';

const FREE_SHIPPING_THRESHOLD = 499;

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartSubtotal, cartTotal, cartCount, discountAmount, appliedPromo, setAppliedPromo } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Your Cart ({cartCount})</h2>
              <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.shippingTracker}>
              <p className={styles.shippingText}>
                {remaining > 0 
                  ? `Add ₹${remaining.toLocaleString()} more to unlock FREE Shipping!`
                  : `🎉 You've unlocked FREE Shipping!`}
              </p>
              <div className={styles.progressBarContainer}>
                <div 
                  className={`${styles.progressBar} ${remaining <= 0 ? styles.unlocked : ''}`} 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            <div className={styles.items}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <h3>Your cart is empty</h3>
                  <button 
                    className="btn btn--primary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => setIsCartOpen(false)}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Image src={item.image || item.images?.[0] || '/product-plants.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <div className={styles.itemPrice}>₹{(item.salePrice || 0).toLocaleString()}</div>
                      </div>
                      <div className={styles.controls}>
                        <div className={styles.qtyWrapper}>
                          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                          <span className={styles.qty}>{item.quantity}</span>
                          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                
                {/* Promo Code UI */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter Promo Code" 
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm uppercase outline-none focus:border-emerald-500"
                    />
                    <button 
                      className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-sm hover:bg-emerald-200 transition-colors"
                      onClick={() => {
                        if (promoInput === 'BLISS20' && cartSubtotal >= 1099) {
                          setAppliedPromo('BLISS20');
                          setPromoMessage('20% discount applied successfully!');
                        } else if (promoInput === 'BLISS20' && cartSubtotal < 1099) {
                          setPromoMessage('Minimum cart value ₹1099 required for BLISS20');
                        } else if (promoInput === 'BLISS10') {
                          setAppliedPromo('BLISS10');
                          setPromoMessage('10% discount applied successfully!');
                        } else {
                          setPromoMessage('Invalid promo code');
                        }
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs mt-2 font-medium ${promoMessage.includes('applied') ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMessage}
                    </p>
                  )}
                  {appliedPromo && (
                    <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 mt-2 rounded">
                      <span className="text-xs font-bold text-emerald-700">Applied: {appliedPromo}</span>
                      <button onClick={() => { setAppliedPromo(null); setPromoInput(''); setPromoMessage(''); }} className="text-xs text-gray-500 hover:text-red-500">Remove</button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-emerald-600 font-bold mb-2">
                    <span>Discount ({appliedPromo})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t border-gray-100 mt-2 pt-3 mb-4">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
