'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, Lock, Ticket, ChevronRight, ChevronDown, Truck, Tag, Loader2, ShieldCheck, Leaf, Package, Heart, MapPin, CheckCircle2, Coins, ArrowLeft, CreditCard, Banknote, Sparkles, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder, getPromoCode, getAffiliateByCode, logAffiliateEarning, incrementAffiliateStats, addCoins, getUserOrders, getUserCoins, redeemCoins, getActiveProducts } from '@/lib/firestore';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry', 'Andaman & Nicobar'
];

const AVAILABLE_COUPONS = [
  { code: 'BLISS5', label: '5% Off (Save up to ₹30)', desc: 'On orders above ₹599', minCart: 599, percent: 5, maxDiscount: 30 },
  { code: 'BLISS10', label: '10% Off (Save up to ₹110)', desc: 'On orders above ₹1,099', minCart: 1099, percent: 10, maxDiscount: 110 },
  { code: 'BLISS15', label: '15% Off (Save up to ₹240)', desc: 'On orders above ₹1,599', minCart: 1599, percent: 15, maxDiscount: 240 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, cartTotal, discountAmount, appliedPromo, setAppliedPromo, clearCart, cartCount, cartTotalWeight, addToCart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();

  // Steps: 1 = Contact, 2 = Address, 3 = Payment & Summary
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', lastName: '', phone: '', email: '', address1: '', address2: '', city: '', state: '', pincode: '', paymentMethod: 'prepaid' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');
  const [showOffers, setShowOffers] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState('');
  const [dynamicShippingCost, setDynamicShippingCost] = useState(null);
  const [isFirstOrder, setIsFirstOrder] = useState(true);
  const [animDir, setAnimDir] = useState('forward');
  const [userCoins, setUserCoins] = useState({ balance: 0 });
  const [coinsToRedeem, setCoinsToRedeem] = useState(0);
  const [coinsApplied, setCoinsApplied] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    setMounted(true);
    const savedInfo = localStorage.getItem('bgiyaBlissCheckoutInfo');
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        setForm(prev => ({ ...prev, ...parsed }));
        if (parsed.pincode && parsed.pincode.length === 6) {
          fetchShippingRate(parsed.pincode, cartTotalWeight, cartTotal);
        }
      } catch (e) {}
    }
  }, []);

  // Check if first order + fetch coins balance + fetch recommendations
  useEffect(() => {
    async function checkFirstOrder() {
      const email = form.email || user?.email;
      if (email) {
        try {
          const [orders, coins] = await Promise.all([getUserOrders(email), getUserCoins(email)]);
          setIsFirstOrder(!orders || orders.length === 0);
          setUserCoins(coins || { balance: 0 });
        } catch { setIsFirstOrder(true); }
      }
    }
    checkFirstOrder();
  }, [form.email, user?.email]);

  // Fetch recommended products (same category as cart items)
  useEffect(() => {
    async function fetchRecs() {
      try {
        const products = await getActiveProducts();
        const cartIds = cartItems.map(i => i.id);
        const cartCategories = cartItems.map(i => i.category).filter(Boolean);
        let recs = products.filter(p => !cartIds.includes(p.id));
        if (cartCategories.length > 0) {
          const related = recs.filter(p => cartCategories.includes(p.category));
          recs = related.length >= 2 ? related : [...related, ...recs.filter(p => !related.includes(p))];
        }
        setRecommendedProducts(recs.slice(0, 4));
      } catch {}
    }
    fetchRecs();
  }, [cartItems]);



  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        email: (prev.email && prev.email.trim()) ? prev.email : (user.email || ''),
        name: (prev.name && prev.name.trim()) ? prev.name : (user.displayName ? user.displayName.split(' ')[0] : ''),
        lastName: (prev.lastName && prev.lastName.trim()) ? prev.lastName : (user.displayName ? user.displayName.split(' ').slice(1).join(' ') : ''),
        phone: (prev.phone && prev.phone.trim()) ? prev.phone : (user.phoneNumber || '')
      }));
    }
  }, [user]);

  const fetchShippingRate = async (pincode, weight, amount) => {
    if (!pincode || pincode.length !== 6) return;
    try {
      const rateRes = await fetch('/api/shipping/rates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ destination: pincode, weight, paymentType: 'prepaid', orderAmount: amount }) });
      const rateData = await rateRes.json();
      if (rateData.success && rateData.rate) setDynamicShippingCost(rateData.rate);
      else setDynamicShippingCost(null);
    } catch { setDynamicShippingCost(null); }
  };

  useEffect(() => {
    if (form.pincode?.length === 6 && mounted) fetchShippingRate(form.pincode, cartTotalWeight, cartTotal);
  }, [form.pincode, cartTotalWeight, cartTotal, mounted]);

  const baseShippingCost = dynamicShippingCost !== null ? Math.round(dynamicShippingCost) : 54;
  const COD_FEE = 52;
  const shippingCost = form.paymentMethod === 'cod' ? COD_FEE : 0;
  const coinDiscount = coinsApplied ? Math.floor(coinsToRedeem / 10) : 0; // 100 coins = ₹10
  const orderTotal = Math.max(cartTotal + shippingCost - coinDiscount, 0);
  const coinsToEarn = Math.floor(cartSubtotal / 10);

  const handleApplyCoins = () => {
    if (userCoins.balance < 100) return;
    const maxCoins = Math.min(userCoins.balance, Math.floor((cartTotal + shippingCost) * 10)); // can't redeem more than order
    const redeemAmount = Math.floor(maxCoins / 100) * 100; // round down to nearest 100
    setCoinsToRedeem(redeemAmount);
    setCoinsApplied(true);
  };

  const handleRemoveCoins = () => {
    setCoinsToRedeem(0);
    setCoinsApplied(false);
  };

  const handlePincodeChange = async (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 6);
    u('pincode', digits);
    if (digits.length === 6) {
      setPincodeStatus('loading');
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${digits}`);
        const data = await res.json();
        if (data?.[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          setForm(prev => ({ ...prev, pincode: digits, city: po.District || po.Division || prev.city, state: po.State || prev.state }));
          setErrors(prev => { const n = { ...prev }; delete n.city; delete n.state; delete n.pincode; return n; });
          setPincodeStatus('success');
          setTimeout(() => setPincodeStatus(''), 3000);
        } else setPincodeStatus('');
      } catch { setPincodeStatus(''); }
    } else setPincodeStatus('');
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.phone.trim()) e.phone = 'Enter your phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit number';
    if (!form.email.trim()) e.email = 'Enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Enter your first name';
    if (!form.address1.trim()) e.address1 = 'Enter your address';
    if (!form.city.trim()) e.city = 'Enter your city';
    if (!form.state) e.state = 'Select your state';
    if (!form.pincode.trim()) e.pincode = 'Enter a PIN code';
    else if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = 'Enter a valid 6-digit PIN code';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToStep = (s) => {
    setAnimDir(s > step ? 'forward' : 'back');
    setStep(s);
  };

  const handleStep1Next = () => { if (validateStep1()) goToStep(2); };
  const handleStep2Next = () => {
    if (validateStep2()) {
      localStorage.setItem('bgiyaBlissCheckoutInfo', JSON.stringify({
        name: form.name, lastName: form.lastName, phone: form.phone, email: form.email,
        address1: form.address1, address2: form.address2, city: form.city, state: form.state, pincode: form.pincode
      }));
      goToStep(3);
    }
  };

  const loadRazorpay = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePlaceOrder = async () => {
    setLoading(true);

    const sendConfirmationEmail = async (orderInfo) => {
      if (!orderInfo.customer.email) return;
      try {
        await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          to: orderInfo.customer.email, subject: `Order Confirmation - Bgiya Bliss #${orderInfo.orderId}`,
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333;"><h1 style="color:#16a34a;">Thank you for your order!</h1><p>Hi ${orderInfo.customer.name.split(' ')[0]},</p><p>We've received your order <strong>#${orderInfo.orderId}</strong> and are getting it ready.</p><p>You earned <strong>🪙 ${orderInfo.coinsEarned} Bgiya Coins</strong> on this order!</p><h2 style="border-bottom:1px solid #eee;padding-bottom:10px;">Order Summary</h2>${orderInfo.items.map(item => `<div style="display:flex;justify-content:space-between;margin-bottom:10px;"><span>${item.quantity}x ${item.name}</span><span>₹${item.price * item.quantity}</span></div>`).join('')}<div style="border-top:1px solid #eee;margin-top:20px;padding-top:10px;"><div style="display:flex;justify-content:space-between;font-size:18px;margin-top:10px;"><strong>Total:</strong><strong>₹${orderInfo.total}</strong></div></div></div>`
        })});
      } catch (e) { console.error('Failed to send email:', e); }
    };

    const autoShip = async (orderInfo) => {
      try { await fetch('/api/nimbus/create-shipment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...orderInfo, totalWeight: cartTotalWeight }) }); }
      catch (e) { console.error('Auto ship failed:', e); }
    };

    // Calculate pickup date (order + 2 days)
    const getPickupDate = () => {
      const now = new Date();
      const pickup = new Date(now);
      pickup.setDate(pickup.getDate() + 2);
      return pickup.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const orderId = `BB-${Date.now()}`;
    const pickupDate = getPickupDate();
    const orderData = {
      orderId,
      userId: user?.uid || null,
      customer: { name: `${form.name.trim()} ${form.lastName.trim()}`.trim(), phone: form.phone.trim(), email: form.email.trim() },
      shipping: { address1: form.address1.trim(), address2: form.address2.trim(), city: form.city.trim(), state: form.state, pincode: form.pincode.trim() },
      items: cartItems.map(item => ({ id: item.id, name: item.name, slug: item.slug, quantity: item.quantity, price: item.salePrice || 0, image: item.image || item.images?.[0] || '', shippingWeight: item.shippingWeight || 0, shippingLength: item.shippingLength || 0, shippingBreadth: item.shippingBreadth || 0, shippingHeight: item.shippingHeight || 0 })),
      subtotal: cartSubtotal, discount: discountAmount, promoCode: appliedPromo?.code || null,
      affiliateCode: appliedPromo?.isAffiliate ? appliedPromo.code : null,
      coinsEarned: coinsToEarn, coinsRedeemed: coinsApplied ? coinsToRedeem : 0, coinDiscount,
      shippingCost, total: orderTotal, paymentMethod: form.paymentMethod, status: 'pending',
      pickupDate,
    };

    const processPostOrder = async (orderInfo) => {
      try {
        if (orderInfo.customer?.email && orderInfo.coinsEarned > 0) await addCoins(orderInfo.customer.email, orderInfo.coinsEarned, 'Earned from order', orderInfo.orderId);
        if (orderInfo.coinsRedeemed > 0 && orderInfo.customer?.email) await redeemCoins(orderInfo.customer.email, orderInfo.coinsRedeemed, orderInfo.orderId);
        if (orderInfo.affiliateCode && appliedPromo?.isAffiliate) {
          const commission = Math.round(orderInfo.subtotal * (appliedPromo.affiliateCommission || 7) / 100);
          await logAffiliateEarning({ affiliateCode: orderInfo.affiliateCode, orderId: orderInfo.orderId, orderTotal: orderInfo.subtotal, commission });
          await incrementAffiliateStats(appliedPromo.affiliateId, orderInfo.subtotal, commission);
        }
      } catch (err) { console.error('Post-order tasks error:', err); }
    };

    if (form.paymentMethod === 'cod') {
      try {
        await createOrder(orderData);
        setOrderPlaced(true); clearCart();
        await sendConfirmationEmail(orderData); await processPostOrder(orderData); await autoShip(orderData);
        router.push(`/order-confirmation?id=${orderId}`);
      } catch (err) { console.error('Order failed:', err); alert('Something went wrong. Please try again.'); setLoading(false); }
    } else {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) { alert('Razorpay SDK failed to load.'); setLoading(false); return; }
      try {
        const res = await fetch('/api/razorpay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: orderTotal }) });
        const rzpayOrder = await res.json();
        if (!res.ok) throw new Error(rzpayOrder.error || 'Failed to create Razorpay order');
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
          amount: rzpayOrder.amount, currency: rzpayOrder.currency, name: 'Bgiya Bliss', description: 'Plant Store Purchase', image: '/logo.png', order_id: rzpayOrder.id,
          handler: async function (response) {
            try {
              const verifyRes = await fetch('/api/razorpay/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature }) });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.verified) { alert('Payment verification failed.'); setLoading(false); return; }
              orderData.paymentStatus = 'paid'; orderData.razorpayPaymentId = response.razorpay_payment_id; orderData.razorpayOrderId = response.razorpay_order_id; orderData.razorpaySignature = response.razorpay_signature;
              await createOrder(orderData); setOrderPlaced(true); clearCart();
              await sendConfirmationEmail(orderData); await processPostOrder(orderData); await autoShip(orderData);
              router.push(`/order-confirmation?id=${orderId}`);
            } catch (err) { console.error('Failed:', err); alert('Payment successful but order saving failed. Contact bgiyabliss73@gmail.com'); }
          },
          prefill: { name: orderData.customer.name, email: orderData.customer.email, contact: orderData.customer.phone },
          theme: { color: '#16a34a' },
          modal: { ondismiss: () => setLoading(false) }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', (r) => { alert(`Payment failed: ${r.error.description}`); setLoading(false); });
        paymentObject.open();
      } catch (err) { console.error('Razorpay Error:', err); alert('Could not initialize payment.'); setLoading(false); }
    }
  };

  const handleApplyPromo = async (codeToApply) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    if (!code) return;
    setPromoMsg('');
    // Check hardcoded Bliss coupons
    const blissCoupon = AVAILABLE_COUPONS.find(c => c.code === code);
    if (blissCoupon) {
      if (cartSubtotal >= blissCoupon.minCart) {
        setAppliedPromo({ code: blissCoupon.code, discountType: 'percent', discountValue: blissCoupon.percent, maxDiscount: blissCoupon.maxDiscount, minOrderValue: blissCoupon.minCart });
        setPromoMsg(''); setPromoInput(''); confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setPromoMsg(`Add ₹${(blissCoupon.minCart - cartSubtotal).toLocaleString()} more to use ${code}`);
      }
      return;
    }
    const promo = await getPromoCode(code);
    if (promo && promo.active !== false) {
      if (cartSubtotal >= (promo.minOrderValue || 0)) { setAppliedPromo(promo); setPromoMsg(''); setPromoInput(''); confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); }
      else setPromoMsg(`Min. cart value ₹${promo.minOrderValue} required`);
      return;
    }
    const affiliate = await getAffiliateByCode(code);
    if (affiliate) {
      setAppliedPromo({ code: affiliate.code, discountType: 'percent', discountValue: affiliate.buyerDiscount || 5, minOrderValue: 0, isAffiliate: true, affiliateId: affiliate.id, affiliateCommission: affiliate.commissionRate || 7 });
      setPromoMsg(''); setPromoInput(''); confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); return;
    }
    setPromoMsg('Invalid or expired discount code');
  };

  const u = (f, v) => { setForm(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => { const n = { ...p }; delete n[f]; return n; }); };

  if (!mounted) return null;

  if (orderPlaced || (loading && cartCount === 0)) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#fafaf9' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Loader2 size={28} color="#16a34a" className="animate-spin" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Processing your order...</h2>
        <p style={{ color: '#9ca3af', fontSize: 14 }}>This will only take a moment</p>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#fafaf9' }}>
        <Package size={48} style={{ color: '#d4d4d4', marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: '#9ca3af', marginBottom: 24 }}>Add some products before checking out.</p>
        <a href="/" style={{ padding: '12px 32px', background: '#16a34a', color: '#fff', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>Return to store</a>
      </div>
    );
  }

  const stepNames = ['Contact', 'Address', 'Payment'];

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: "'Inter',system-ui,sans-serif" }}>
      <style>{`
        @keyframes slideInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
        .step-anim { animation: ${animDir === 'forward' ? 'slideInRight' : 'slideInLeft'} 0.3s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.25s ease forwards; }
        .co-input { width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:15px; outline:none; background:#fff; color:#111; transition: border-color 0.2s, box-shadow 0.2s; }
        .co-input:focus { border-color:#16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.08); }
        .co-input-error { border-color:#dc2626 !important; }
        .co-input::placeholder { color:#9ca3af; }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: 36, width: 130 }}>
            <Image src="/logo.png" alt="Bgiya Bliss" fill style={{ objectFit: 'contain' }} priority />
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#9ca3af' }}>
          <Lock size={12} /> Secure checkout
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 32 }}>
          {stepNames.map((name, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
                <div onClick={() => isDone && goToStep(stepNum)} style={{
                  display: 'flex', alignItems: 'center', gap: 8, cursor: isDone ? 'pointer' : 'default', padding: '8px 16px',
                  borderRadius: 50, background: isActive ? '#064e3b' : isDone ? '#dcfce7' : '#f3f4f6',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800,
                    background: isActive ? '#fff' : isDone ? '#16a34a' : '#d1d5db',
                    color: isActive ? '#064e3b' : isDone ? '#fff' : '#6b7280',
                  }}>
                    {isDone ? <Check size={13} /> : stepNum}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#fff' : isDone ? '#16a34a' : '#6b7280' }}>{name}</span>
                </div>
                {i < 2 && <div style={{ width: 32, height: 2, background: isDone ? '#16a34a' : '#e5e7eb', margin: '0 4px', borderRadius: 2 }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 24px 120px' }}>

        {/* ═══ STEP 1: Contact ═══ */}
        {step === 1 && (
          <div className="step-anim" key="step1">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 4 }}>Let&apos;s start with your details</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>We&apos;ll use this to send order updates</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Phone Number *</label>
                <input className={`co-input ${errors.phone ? 'co-input-error' : ''}`} type="tel" inputMode="numeric" placeholder="10-digit mobile number" maxLength={10} value={form.phone} onChange={e => u('phone', e.target.value.replace(/\D/g, ''))} />
                {errors.phone && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Email Address *</label>
                <input className={`co-input ${errors.email ? 'co-input-error' : ''}`} type="email" placeholder="your@email.com" value={form.email} onChange={e => u('email', e.target.value)} />
                {errors.email && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>
            </div>

            {/* Mini cart with edit */}
            <div style={{ marginTop: 28, background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Cart · {cartCount} item{cartCount > 1 ? 's' : ''}</span>
                <Link href="/" style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>← Back to shop</Link>
              </div>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #f5f5f5' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', background: '#f5f5f5', position: 'relative', flexShrink: 0, border: '1px solid #e5e5e5' }}>
                    <Image src={item.image || item.images?.[0] || '/product-plants.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 26, height: 26, border: 'none', background: '#f9fafb', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#6b7280' }}>−</button>
                        <span style={{ width: 28, textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 26, height: 26, border: 'none', background: '#f9fafb', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#6b7280' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>₹{((item.salePrice || 0) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, color: '#111', marginTop: 4 }}>
                <span>Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={handleStep1Next} style={{
              width: '100%', padding: '16px', marginTop: 24, background: '#16a34a', color: '#fff', fontSize: 15, fontWeight: 700,
              borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(22,163,74,0.25)', transition: 'all 0.2s',
            }}>
              Continue to Address <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ═══ STEP 2: Address ═══ */}
        {step === 2 && (
          <div className="step-anim" key="step2">
            <button onClick={() => goToStep(1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 4 }}>Where should we deliver?</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>Enter your shipping address</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>First Name *</label>
                  <input className={`co-input ${errors.name ? 'co-input-error' : ''}`} placeholder="First name" value={form.name} onChange={e => u('name', e.target.value)} />
                  {errors.name && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Last Name</label>
                  <input className="co-input" placeholder="Last name" value={form.lastName} onChange={e => u('lastName', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>PIN Code *</label>
                <div style={{ position: 'relative' }}>
                  <input className={`co-input ${errors.pincode ? 'co-input-error' : ''}`} inputMode="numeric" placeholder="6-digit PIN code" maxLength={6} value={form.pincode} onChange={e => handlePincodeChange(e.target.value)} style={{ letterSpacing: 2, fontWeight: 600 }} />
                  {pincodeStatus === 'loading' && <Loader2 size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#16a34a' }} className="animate-spin" />}
                  {pincodeStatus === 'success' && <CheckCircle2 size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#16a34a' }} />}
                </div>
                {errors.pincode && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.pincode}</p>}
                {pincodeStatus === 'success' && <p style={{ color: '#16a34a', fontSize: 12, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {form.city}, {form.state}</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Address *</label>
                <input className={`co-input ${errors.address1 ? 'co-input-error' : ''}`} placeholder="House/flat no., building, street" value={form.address1} onChange={e => u('address1', e.target.value)} />
                {errors.address1 && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.address1}</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Landmark (optional)</label>
                <input className="co-input" placeholder="Near temple, school, etc." value={form.address2} onChange={e => u('address2', e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>City *</label>
                  <input className={`co-input ${errors.city ? 'co-input-error' : ''}`} placeholder="City" value={form.city} onChange={e => u('city', e.target.value)} />
                  {errors.city && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.city}</p>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>State *</label>
                  <select className={`co-input ${errors.state ? 'co-input-error' : ''}`} value={form.state} onChange={e => u('state', e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{errors.state}</p>}
                </div>
              </div>
            </div>

            <button onClick={handleStep2Next} style={{
              width: '100%', padding: '16px', marginTop: 24, background: '#16a34a', color: '#fff', fontSize: 15, fontWeight: 700,
              borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 14px rgba(22,163,74,0.25)',
            }}>
              Continue to Payment <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ═══ STEP 3: Payment & Summary ═══ */}
        {step === 3 && (
          <div className="step-anim" key="step3">
            <button onClick={() => goToStep(2)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7280', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 4 }}>Review & Pay</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>Choose your payment method and confirm</p>

            {/* Delivery info summary */}
            <div className="fade-in" style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f0', padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Delivering to</span>
                <button onClick={() => goToStep(2)} style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
              </div>
              <p style={{ fontSize: 14, color: '#111', fontWeight: 600 }}>{form.name} {form.lastName}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{form.address1}{form.address2 ? `, ${form.address2}` : ''}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{form.city}, {form.state} - {form.pincode}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{form.phone} · {form.email}</p>
            </div>

            {/* Payment Method */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 10 }}>Payment Method</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label onClick={() => u('paymentMethod', 'prepaid')} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px',
                  borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s',
                  border: form.paymentMethod === 'prepaid' ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  background: form.paymentMethod === 'prepaid' ? '#f0fdf4' : '#fff',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${form.paymentMethod === 'prepaid' ? '#16a34a' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {form.paymentMethod === 'prepaid' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CreditCard size={16} /> Prepaid (UPI / Card)
                      </div>
                      <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Free shipping · Save ₹{baseShippingCost}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>Free</span>
                </label>

                <label onClick={() => u('paymentMethod', 'cod')} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px',
                  borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s',
                  border: form.paymentMethod === 'cod' ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  background: form.paymentMethod === 'cod' ? '#f0fdf4' : '#fff',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${form.paymentMethod === 'cod' ? '#16a34a' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {form.paymentMethod === 'cod' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Banknote size={16} /> Cash on Delivery
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>₹52 COD charges apply</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>₹52</span>
                </label>
              </div>
            </div>

            {/* Discount Code */}
            <div style={{ marginBottom: 20 }}>
              {appliedPromo ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>Saving ₹{Math.round(discountAmount).toLocaleString()}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>with &apos;{appliedPromo.code}&apos;</div>
                    </div>
                  </div>
                  <button onClick={() => { setAppliedPromo(null); setPromoInput(''); setPromoMsg(''); }} style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <input value={promoInput} onChange={e => setPromoInput(e.target.value.toUpperCase())} placeholder="Discount code" className="co-input" style={{ flex: 1 }} />
                    <button onClick={() => handleApplyPromo()} style={{ padding: '0 24px', background: promoInput.trim() ? '#111' : '#f3f4f6', color: promoInput.trim() ? '#fff' : '#9ca3af', border: 'none', borderRadius: 12, fontWeight: 700, cursor: promoInput.trim() ? 'pointer' : 'default', fontSize: 14 }}>Apply</button>
                  </div>
                  {promoMsg && <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{promoMsg}</p>}
                  <button onClick={() => setShowOffers(!showOffers)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fffbeb', border: '1.5px dashed #fbbf24', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#92400e' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ticket size={15} /> {AVAILABLE_COUPONS.length} Offers Available</span>
                    <ChevronDown size={14} style={{ transform: showOffers ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </button>
                  <AnimatePresence>
                    {showOffers && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {AVAILABLE_COUPONS.map(c => {
                            const eligible = cartSubtotal >= c.minCart;
                            return (
                              <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, border: '1px solid #e5e7eb', background: '#fff' }}>
                                <div>
                                  <span style={{ fontSize: 12, fontWeight: 800, color: '#16a34a', background: '#ecfdf5', padding: '2px 8px', borderRadius: 4, border: '1px dashed #bbf7d0', marginRight: 8 }}>{c.code}</span>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{c.label}</span>
                                  <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{c.desc}</p>
                                </div>
                                <button onClick={() => handleApplyPromo(c.code)} disabled={!eligible} style={{ padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: eligible ? '1.5px solid #16a34a' : '1px solid #d1d5db', background: '#fff', color: eligible ? '#16a34a' : '#9ca3af', cursor: eligible ? 'pointer' : 'default' }}>
                                  {eligible ? 'Apply' : `Unlock at ₹${c.minCart}`}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', padding: '20px', marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 14 }}>Order Summary</div>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', background: '#f5f5f5', position: 'relative', flexShrink: 0, border: '1px solid #e5e5e5' }}>
                    <Image src={item.image || item.images?.[0] || '/product-plants.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, background: '#16a34a', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                  </div>
                  <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#111' }}>{item.name}</p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>₹{((item.salePrice || 0) * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#6b7280' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
                {discountAmount > 0 && appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Tag size={13} /> {appliedPromo.code}</span>
                    <span>−₹{Math.round(discountAmount).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping</span>
                  <span>
                    {form.paymentMethod === 'prepaid'
                      ? <><span style={{ textDecoration: 'line-through', color: '#d1d5db', marginRight: 6, fontSize: 12 }}>₹{baseShippingCost}</span><span style={{ color: '#16a34a', fontWeight: 700 }}>Free</span></>
                      : <span style={{ fontWeight: 600 }}>₹52</span>
                    }
                  </span>
                </div>
                {coinsApplied && coinDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🪙 Bgiya Coins ({coinsToRedeem})</span>
                    <span>−₹{coinDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1.5px solid #111', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#111' }}>₹{Math.round(orderTotal).toLocaleString()}</span>
              </div>
            </div>

            {/* Bgiya Coins Section */}
            {user && (
              <div className="fade-in" style={{
                padding: '14px 18px', borderRadius: 14, marginBottom: 16,
                background: coinsApplied ? '#f0fdf4' : '#fff',
                border: coinsApplied ? '1.5px solid #bbf7d0' : '1.5px solid #e5e7eb',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Coins size={18} color={coinsApplied ? '#16a34a' : '#d97706'} />
                    <div>
                      {coinsApplied ? (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>🪙 {coinsToRedeem} coins applied (−₹{coinDiscount})</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>Deducted after order confirmation</div>
                        </>
                      ) : userCoins.balance >= 100 ? (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>🪙 {userCoins.balance} Bgiya Coins</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>Use to save ₹{Math.floor(Math.min(Math.floor(userCoins.balance / 100) * 100, Math.floor((cartTotal + shippingCost) * 10 / 100) * 100) / 10)}</div>
                        </>
                      ) : (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>🪙 {userCoins.balance} Bgiya Coins</div>
                          <div style={{ fontSize: 11, color: '#9ca3af' }}>Min. 100 coins needed to redeem</div>
                        </>
                      )}
                    </div>
                  </div>
                  {userCoins.balance >= 100 && (
                    <button onClick={coinsApplied ? handleRemoveCoins : handleApplyCoins} style={{
                      padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      border: coinsApplied ? 'none' : '1.5px solid #16a34a',
                      background: coinsApplied ? '#ef4444' : '#fff',
                      color: coinsApplied ? '#fff' : '#16a34a',
                    }}>{coinsApplied ? 'Remove' : 'Use Coins'}</button>
                  )}
                </div>
              </div>
            )}

            {/* Coins to earn */}
            {coinsToEarn > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7', marginBottom: 20 }}>
                <Sparkles size={16} color="#d97706" />
                <span style={{ fontSize: 13, color: '#92400e' }}>Earn <strong>🪙 {coinsToEarn} coins</strong> on this order <span style={{ color: '#a16207', fontWeight: 400 }}>· 100 coins = ₹10</span></span>
              </div>
            )}

            {/* Place Order */}
            <motion.button 
              onClick={handlePlaceOrder} 
              disabled={loading} 
              whileHover={{ scale: loading ? 1 : 1.02, translateY: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.96 }}
              style={{
                width: '100%', padding: '18px', 
                background: loading ? '#9ca3af' : (form.paymentMethod === 'prepaid' ? '#16a34a' : '#059669'),
                color: '#fff', fontSize: 16, fontWeight: 800, borderRadius: 16, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: loading ? 'none' : '0 8px 24px rgba(22, 163, 74, 0.25)', 
                letterSpacing: 0.5, textTransform: 'uppercase',
                outline: 'none'
              }}
            >
              {loading ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : <><Lock size={18} style={{ color: '#fff' }} /> {form.paymentMethod === 'prepaid' ? `Pay Securely · ₹${Math.round(orderTotal).toLocaleString()}` : `Place COD Order · ₹${Math.round(orderTotal).toLocaleString()}`}</>}
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, fontSize: 11, color: '#9ca3af' }}>
              <Lock size={11} /> Secured by Razorpay · 256-bit SSL encryption
            </div>

            {/* You might also like — Clean minimal like Shopflo */}
            {recommendedProducts.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginBottom: 16, letterSpacing: 0.3 }}>You might also like</div>
                <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
                  {recommendedProducts.map(product => (
                    <div key={product.id} style={{ flexShrink: 0, width: 155, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 80, height: 80, borderRadius: 12, overflow: 'hidden', background: '#fafafa', position: 'relative', marginBottom: 8, border: '1px solid #f0f0f0' }}>
                        <Image src={product.images?.[0] || product.image || '/product-plants.png'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: '#111', textAlign: 'center', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 4, maxWidth: 140 }}>{product.name}</p>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 8 }}>₹{product.salePrice}</p>
                      <button onClick={() => { addToCart(product); confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } }); }} style={{
                        padding: '6px 20px', borderRadius: 8, border: '1.5px solid #111', background: '#fff',
                        color: '#111', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                        transition: 'all 0.2s',
                      }}><Plus size={12} /> ADD</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 28 }}>
              {[
                { icon: ShieldCheck, text: 'Damage-Free Guarantee' },
                { icon: Leaf, text: '100% Organic Products' },
                { icon: Package, text: 'Secure Packaging' },
                { icon: Heart, text: '1000+ Happy Gardeners' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#fff', borderRadius: 10, border: '1px solid #f0f0f0', fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  <t.icon size={16} color="#16a34a" /> {t.text}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 24, paddingTop: 16, display: 'flex', gap: 16, fontSize: 11, color: '#9ca3af', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/pages/refund-policy" style={{ color: '#6b7280', textDecoration: 'underline' }}>Refund policy</a>
              <a href="/pages/shipping-policy" style={{ color: '#6b7280', textDecoration: 'underline' }}>Shipping policy</a>
              <a href="/pages/privacy-policy" style={{ color: '#6b7280', textDecoration: 'underline' }}>Privacy policy</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
