'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Ticket, ChevronDown, ChevronUp, CheckCircle2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { getAffiliateByCode } from '@/lib/firestore';
import styles from './CartDrawer.module.css';

const MILESTONES = [
  { amount: 1599, label: 'FLAT 15% OFF!', code: 'BLISS15' },
];

const AVAILABLE_COUPONS = [
  { code: 'BLISS5', label: '5% Off (Save up to ₹30)', desc: 'On orders above ₹599', minCart: 599, percent: 5, maxDiscount: 30 },
  { code: 'BLISS10', label: '10% Off (Save up to ₹110)', desc: 'On orders above ₹1,099', minCart: 1099, percent: 10, maxDiscount: 110 },
  { code: 'BLISS15', label: '15% Off (Save up to ₹240)', desc: 'On orders above ₹1,599', minCart: 1599, percent: 15, maxDiscount: 240 },
];

/* ── Milestone Progress Bar ── */
function MilestoneBar({ cartSubtotal }) {
  const maxAmount = MILESTONES[MILESTONES.length - 1].amount;
  const progress = Math.min((cartSubtotal / maxAmount) * 100, 100);
  const allReached = cartSubtotal >= maxAmount;

  return (
    <div style={{ padding: '14px 16px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7' }}>
      {allReached ? (
        <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#16a34a', margin: 0 }}>
          🎉 You have unlocked all milestones!
        </p>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 500, color: '#065f46', margin: '0 0 10px' }}>
          {cartSubtotal < MILESTONES[0].amount
            ? `Add ₹${(MILESTONES[0].amount - cartSubtotal).toLocaleString()} more for ${MILESTONES[0].label}`
            : `Add ₹${(MILESTONES[1].amount - cartSubtotal).toLocaleString()} more for ${MILESTONES[1].label}`
          }
        </p>
      )}

      {/* Progress track */}
      <div style={{ position: 'relative', height: '6px', background: '#e5e7eb', borderRadius: '3px', margin: '0 20px' }}>
        <div style={{
          height: '100%', borderRadius: '3px',
          background: 'linear-gradient(90deg, #16a34a, #059669)',
          width: `${progress}%`,
          transition: 'width 0.5s ease',
        }} />

        {/* Milestone dots */}
        {MILESTONES.map((m, i) => {
          const pos = (m.amount / maxAmount) * 100;
          const reached = cartSubtotal >= m.amount;
          return (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: `${pos}%`,
              transform: 'translate(-50%, -50%)',
            }}>
              <div style={{
                width: reached ? '22px' : '18px',
                height: reached ? '22px' : '18px',
                borderRadius: '50%',
                background: reached ? '#16a34a' : '#fff',
                border: reached ? '2px solid #16a34a' : '2px solid #d1d5db',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {reached && <CheckCircle2 size={14} style={{ color: '#fff' }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0 0', padding: '0 4px' }}>
        {MILESTONES.map((m, i) => {
          const reached = cartSubtotal >= m.amount;
          return (
            <div key={i} style={{ textAlign: i === 0 ? 'left' : 'right' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: reached ? '#16a34a' : '#6b7280' }}>
                ₹{m.amount}
              </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: reached ? '#16a34a' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {m.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartSubtotal, cartTotal, cartCount, discountAmount, appliedPromo, setAppliedPromo } = useCart();
  const router = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [showOffers, setShowOffers] = useState(false);

  const savings = cartItems.reduce((total, item) => {
    const mrp = item.price || item.mrp || item.salePrice;
    return total + ((mrp - item.salePrice) * item.quantity);
  }, 0) + discountAmount;

  const applyCode = async (code) => {
    const blissCoupon = AVAILABLE_COUPONS.find(c => c.code === code);
    if (blissCoupon) {
      if (cartSubtotal >= blissCoupon.minCart) {
        setAppliedPromo({ code: blissCoupon.code, discountType: 'percent', discountValue: blissCoupon.percent, maxDiscount: blissCoupon.maxDiscount, minOrderValue: blissCoupon.minCart });
        setPromoInput(blissCoupon.code);
        setPromoMessage(`🎉 ${blissCoupon.percent}% discount applied!`);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setPromoMessage(`Add ₹${(blissCoupon.minCart - cartSubtotal).toLocaleString()} more to use ${code}`);
      }
      return;
    }
    else {
      // Check if it's an affiliate code
      try {
        const affiliate = await getAffiliateByCode(code);
        if (affiliate) {
          setAppliedPromo({ code: affiliate.code, discountType: 'percent', discountValue: affiliate.buyerDiscount || 5, minOrderValue: 0, isAffiliate: true });
          setPromoInput(affiliate.code);
          setPromoMessage(`🎉 ${affiliate.buyerDiscount || 5}% off applied via affiliate!`);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          return;
        }
      } catch (e) {}
      setPromoMessage('Invalid promo code');
    }
  };

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
            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#111', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                YOUR CART ({cartCount})
              </h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px' }}>
                <X size={22} />
              </button>
            </div>

            {/* ── Milestone Progress Bar ── */}
            {cartItems.length > 0 && <MilestoneBar cartSubtotal={cartSubtotal} />}

            {/* ── Cart Items ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
              {cartItems.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: '#999' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <h3 style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>Your cart is empty</h3>
                  <p style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>Add items to get started</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    style={{ padding: '10px 24px', background: '#16a34a', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '14px 16px', borderBottom: '1px solid #f5f5f5' }}>
                    {/* Image */}
                    <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#f9f9f9' }}>
                      <Image src={item.image || item.images?.[0] || '/product-plants.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#111', margin: '0 0 2px', lineHeight: '1.3' }}>{item.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>₹{(item.salePrice || 0).toLocaleString()}</span>
                          {item.price && item.price > item.salePrice && (
                            <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{item.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      {/* Qty + Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', padding: '4px' }}>
                          <Trash2 size={16} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', border: 'none', cursor: 'pointer', color: '#555' }}>
                            <Minus size={14} />
                          </button>
                          <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', border: 'none', cursor: 'pointer', color: '#555' }}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Footer: Offers + Pricing ── */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #eee', padding: '12px 16px 16px', background: '#fff' }}>

                {/* Coupon / Offer section */}
                {appliedPromo ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginBottom: '12px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>Save ₹{Math.round(discountAmount).toLocaleString()}</span>
                        <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '6px' }}>with &apos;{appliedPromo.code}&apos;</span>
                      </div>
                    </div>
                    <button onClick={() => { setAppliedPromo(null); setPromoInput(''); setPromoMessage(''); }} style={{ fontSize: '11px', fontWeight: 600, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                  </div>
                ) : (
                  <>
                    {/* Offers toggle */}
                    <button
                      onClick={() => setShowOffers(!showOffers)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', marginBottom: '10px',
                        background: '#fffbeb', border: '1.5px dashed #f59e0b', borderRadius: '8px',
                        cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#92400e',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Ticket size={14} /> {AVAILABLE_COUPONS.length} Offers Available
                      </span>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>View all &gt;</span>
                    </button>

                    <AnimatePresence>
                      {showOffers && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden', marginBottom: '10px' }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {AVAILABLE_COUPONS.map((coupon) => {
                              const isEligible = cartSubtotal >= coupon.minCart;
                              return (
                                <div key={coupon.code} style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '10px 12px', borderRadius: '8px',
                                  border: '1px solid #e5e7eb', background: '#fff',
                                }}>
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', border: '1px dashed #bbf7d0' }}>{coupon.code}</span>
                                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{coupon.label}</span>
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#6b7280' }}>{coupon.desc}</span>
                                  </div>
                                  <button
                                    onClick={() => applyCode(coupon.code)}
                                    style={{
                                      padding: '4px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                                      border: isEligible ? '1.5px solid #16a34a' : '1px solid #d1d5db',
                                      background: isEligible ? '#fff' : '#f9fafb',
                                      color: isEligible ? '#16a34a' : '#9ca3af',
                                      cursor: isEligible ? 'pointer' : 'default',
                                    }}
                                  >
                                    {isEligible ? 'Apply' : `Unlock at ₹${coupon.minCart}`}
                                  </button>
                                </div>
                              );
                            })}

                            {/* Manual input */}
                            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                              <input
                                type="text"
                            placeholder="Enter code"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px', outline: 'none' }}
                          />
                          <button onClick={() => applyCode(promoInput)} style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Apply</button>
                        </div>
                        {promoMessage && (
                          <p style={{ fontSize: '11px', fontWeight: 600, color: promoMessage.includes('🎉') ? '#16a34a' : '#ef4444', margin: '2px 0 0' }}>{promoMessage}</p>
                        )}
                          </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                  </>
                )}

                {/* ── Price Breakdown ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16a34a', fontWeight: 700, marginBottom: '6px' }}>
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-₹{Math.round(discountAmount).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>FREE</span>
                </div>

                {/* Estimated Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #f0f0f0', paddingTop: '10px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111' }}>Estimated total</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>₹{Math.round(cartTotal).toLocaleString()}</span>
                    {savings > 0 && (
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#16a34a' }}>You saved ₹{Math.round(savings).toLocaleString()}!</div>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => { setIsCartOpen(false); router.push('/checkout'); }}
                  style={{
                    width: '100%', padding: '13px', marginTop: '12px',
                    background: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px',
                    fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
                  }}
                >
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
