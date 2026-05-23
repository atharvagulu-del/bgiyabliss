'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, ChevronDown, Truck, Tag, Loader2, ShieldCheck, Leaf, Package, Heart, MapPin, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder, getPromoCode } from '@/lib/firestore';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry', 'Andaman & Nicobar'
];

/* ── Floating‑label input ── */
function FloatField({ label, value, onChange, type = 'text', maxLength, half, error, children }) {
  const hasValue = value && value.length > 0;
  return (
    <div style={{ flex: half ? 1 : undefined, minWidth: half ? 0 : undefined }}>
      <div style={{ position: 'relative', border: `1px solid ${error ? '#dc2626' : '#d1d5db'}`, borderRadius: 5, background: '#fff', height: 54 }}>
        {children || (
          <input type={type} value={value} maxLength={maxLength}
            onChange={e => onChange(e.target.value)} placeholder=" "
            onFocus={e => e.target.parentElement.style.borderColor = '#16a34a'}
            onBlur={e => { if (!error) e.target.parentElement.style.borderColor = '#d1d5db'; }}
            style={{ width: '100%', padding: '22px 12px 6px', fontSize: 14, border: 'none', outline: 'none', background: 'transparent', height: '100%', color: '#111' }}
          />
        )}
        <label style={{ position: 'absolute', left: 12, top: hasValue ? 6 : 17, fontSize: hasValue ? 11 : 14, color: error ? '#dc2626' : '#737373', transition: 'all 0.15s ease', pointerEvents: 'none', lineHeight: 1 }}>
          {label}
        </label>
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: 11, marginTop: 3, paddingLeft: 2 }}>{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, cartTotal, discountAmount, appliedPromo, setAppliedPromo, clearCart, cartCount, cartTotalWeight } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', lastName: '', phone: '', email: '', address1: '', address2: '', city: '', state: '', pincode: '', paymentMethod: 'cod' });
  const [saveInfo, setSaveInfo] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(''); // '' | 'loading' | 'success' | 'error'
  const [dynamicShippingCost, setDynamicShippingCost] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Load from localStorage if exists
    const savedInfo = localStorage.getItem('bgiyaBlissCheckoutInfo');
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        setForm(prev => ({ ...prev, ...parsed }));
        if (parsed.pincode && parsed.pincode.length === 6) {
           fetchShippingRate(parsed.pincode, cartTotalWeight, cartTotal);
        }
      } catch (e) { }
    }
  }, []);

  const fetchShippingRate = async (pincode, weight, amount) => {
    if (!pincode || pincode.length !== 6) return;
    try {
      const rateRes = await fetch('/api/shipping/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: pincode, weight, paymentType: 'prepaid', orderAmount: amount })
      });
      const rateData = await rateRes.json();
      if (rateData.success && rateData.rate) {
        setDynamicShippingCost(rateData.rate);
      } else {
        setDynamicShippingCost(null);
      }
    } catch(e) {
      console.error('Failed to fetch rate', e);
      setDynamicShippingCost(null);
    }
  };

  useEffect(() => {
    if (form.pincode && form.pincode.length === 6 && mounted) {
      fetchShippingRate(form.pincode, cartTotalWeight, cartTotal);
    }
  }, [form.pincode, cartTotalWeight, cartTotal, mounted]);


  // Sync with auth user
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        email: prev.email || user.email || '',
        name: prev.name || (user.displayName ? user.displayName.split(' ')[0] : ''),
        lastName: prev.lastName || (user.displayName ? user.displayName.split(' ').slice(1).join(' ') : ''),
        phone: prev.phone || user.phoneNumber || ''
      }));
    }
  }, [user]);

  const baseShippingCost = dynamicShippingCost !== null ? Math.round(dynamicShippingCost) : 54;
  const COD_FEE = 25;
  const shippingCost = form.paymentMethod === 'cod' ? COD_FEE : 0;
  const orderTotal = cartTotal + shippingCost;
  const savings = discountAmount + (form.paymentMethod === 'prepaid' ? baseShippingCost : baseShippingCost - COD_FEE);

  // PIN code auto-fill
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
        } else {
          setPincodeStatus('');
        }
      } catch {
        setPincodeStatus('');
      }
    } else {
      setPincodeStatus('');
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Enter a first name';
    if (!form.phone.trim()) e.phone = 'Enter a phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address1.trim()) e.address1 = 'Enter an address';
    if (!form.city.trim()) e.city = 'Enter a city';
    if (!form.state) e.state = 'Select a state';
    if (!form.pincode.trim()) e.pincode = 'Enter a PIN code';
    else if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = 'Enter a valid 6-digit PIN code';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);

    const sendConfirmationEmail = async (orderInfo) => {
      if (!orderInfo.customer.email) return; // Only send if email provided
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: orderInfo.customer.email,
            subject: `Order Confirmation - Bgiya Bliss #${orderInfo.orderId}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h1 style="color: #16a34a;">Thank you for your order!</h1>
                <p>Hi ${orderInfo.customer.name.split(' ')[0]},</p>
                <p>We've received your order <strong>#${orderInfo.orderId}</strong> and are getting it ready for you.</p>
                
                <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h2>
                ${orderInfo.items.map(item => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>₹${item.price * item.quantity}</span>
                  </div>
                `).join('')}
                
                <div style="border-top: 1px solid #eee; margin-top: 20px; padding-top: 10px;">
                  <div style="display: flex; justify-content: space-between;"><strong>Subtotal:</strong> <span>₹${orderInfo.subtotal}</span></div>
                  ${orderInfo.discount > 0 ? `<div style="display: flex; justify-content: space-between; color: #16a34a;"><strong>Discount:</strong> <span>-₹${orderInfo.discount}</span></div>` : ''}
                  <div style="display: flex; justify-content: space-between;"><strong>Shipping:</strong> <span>₹${orderInfo.shippingCost}</span></div>
                  <div style="display: flex; justify-content: space-between; font-size: 18px; margin-top: 10px;"><strong>Total:</strong> <strong>₹${orderInfo.total}</strong></div>
                </div>

                <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Shipping Address</h2>
                <p>${orderInfo.customer.name}<br/>
                ${orderInfo.shipping.address1}<br/>
                ${orderInfo.shipping.address2 ? orderInfo.shipping.address2 + '<br/>' : ''}
                ${orderInfo.shipping.city}, ${orderInfo.shipping.state} ${orderInfo.shipping.pincode}</p>

                <p style="margin-top: 40px; font-size: 14px; color: #666;">If you have any questions, reply to this email or contact us at bgiyabliss73@gmail.com.</p>
              </div>
            `
          })
        });
      } catch (e) {
        console.error('Failed to send email:', e);
      }
    };

    const autoShip = async (orderInfo) => {
      try {
        await fetch('/api/nimbus/create-shipment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderInfo, totalWeight: cartTotalWeight })
        });
      } catch (e) {
        console.error('Auto ship failed:', e);
      }
    };

    const orderId = `BB-${Date.now()}`;
    const orderData = {
      orderId,
      customer: { name: `${form.name.trim()} ${form.lastName.trim()}`.trim(), phone: form.phone.trim(), email: form.email.trim() },
      shipping: { address1: form.address1.trim(), address2: form.address2.trim(), city: form.city.trim(), state: form.state, pincode: form.pincode.trim() },
      items: cartItems.map(item => ({ id: item.id, name: item.name, slug: item.slug, quantity: item.quantity, price: item.salePrice || 0, image: item.image || item.images?.[0] || '' })),
      subtotal: cartSubtotal, discount: discountAmount, promoCode: appliedPromo?.code || null,
      shippingCost, total: orderTotal, paymentMethod: form.paymentMethod, status: 'pending',
    };

    if (saveInfo) {
      localStorage.setItem('bgiyaBlissCheckoutInfo', JSON.stringify({
        name: form.name, lastName: form.lastName, phone: form.phone, email: form.email,
        address1: form.address1, address2: form.address2, city: form.city, state: form.state, pincode: form.pincode
      }));
    } else {
      localStorage.removeItem('bgiyaBlissCheckoutInfo');
    }

    if (form.paymentMethod === 'cod') {
      try {
        await createOrder(orderData);
        clearCart();
        await sendConfirmationEmail(orderData);
        await autoShip(orderData);
        router.push(`/order-confirmation?id=${orderId}`);
      } catch (err) {
        console.error('Order failed:', err);
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } else {
      // Prepaid - Razorpay Flow
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      try {
        // Create order on our backend
        const res = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal })
        });
        const rzpayOrder = await res.json();

        if (!res.ok) throw new Error(rzpayOrder.error || 'Failed to create Razorpay order');

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
          amount: rzpayOrder.amount,
          currency: rzpayOrder.currency,
          name: 'Bgiya Bliss',
          description: 'Premium Plant Store Purchase',
          image: '/logo.png',
          order_id: rzpayOrder.id,
          handler: async function (response) {
            // Verify payment signature on server
            try {
              const verifyRes = await fetch('/api/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                })
              });
              const verifyData = await verifyRes.json();

              if (!verifyRes.ok || !verifyData.verified) {
                alert('Payment verification failed. If money was deducted, please contact support.');
                setLoading(false);
                return;
              }

              orderData.paymentStatus = 'paid';
              orderData.razorpayPaymentId = response.razorpay_payment_id;
              orderData.razorpayOrderId = response.razorpay_order_id;
              orderData.razorpaySignature = response.razorpay_signature;
              await createOrder(orderData);
              clearCart();
              await sendConfirmationEmail(orderData);
              await autoShip(orderData);
              router.push(`/order-confirmation?id=${orderId}`);
            } catch (err) {
              console.error('Failed to verify/save order:', err);
              alert('Payment was successful but order saving failed. Please contact support at bgiyabliss73@gmail.com');
            }
          },
          prefill: {
            name: orderData.customer.name,
            email: orderData.customer.email,
            contact: orderData.customer.phone
          },
          theme: {
            color: '#16a34a'
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
          alert(`Payment failed: ${response.error.description}`);
          setLoading(false);
        });
        paymentObject.open();
      } catch (err) {
        console.error('Razorpay Error:', err);
        alert('Could not initialize payment. Please check your console.');
        setLoading(false);
      }
    }
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoMsg('');
    const code = promoInput.trim().toUpperCase();
    const promo = await getPromoCode(code);

    if (promo && promo.active !== false) {
      if (cartSubtotal >= (promo.minOrderValue || 0)) {
        setAppliedPromo(promo);
        setPromoMsg('');
        setPromoInput('');
      } else {
        setPromoMsg(`Min. cart value ₹${promo.minOrderValue} required for ${code}`);
      }
    } else {
      setPromoMsg('Invalid or expired discount code');
    }
  };

  const u = (f, v) => { setForm(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => { const n = { ...p }; delete n[f]; return n; }); };

  if (!mounted) return null;
  if (cartCount === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: "'Inter',system-ui,sans-serif" }}>
        <Package size={48} style={{ color: '#d4d4d4', marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: '#737373', marginBottom: 24 }}>Add some products before checking out.</p>
        <a href="/" style={{ padding: '12px 32px', background: '#16a34a', color: '#fff', borderRadius: 6, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>Return to store</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter',system-ui,-apple-system,sans-serif", fontSize: 14 }}>

      {/* ── MOBILE TOGGLE ── */}
      <div className="co-mob-toggle" onClick={() => setShowMobileSummary(!showMobileSummary)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a' }}>
          <Package size={16} /> {showMobileSummary ? 'Hide' : 'Show'} order summary
          <ChevronDown size={14} style={{ transform: showMobileSummary ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
        </span>
        <span style={{ fontSize: 20, fontWeight: 600 }}>₹{Math.round(orderTotal).toLocaleString()}</span>
      </div>

      <div className="co-wrapper">

        {/* ════════ LEFT ════════ */}
        <div className="co-left">
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <a href="/"><div style={{ position: 'relative', height: 60, width: 200 }}>
              <Image src="/logo.png" alt="Bgiya Bliss" fill style={{ objectFit: 'contain' }} priority />
            </div></a>
          </div>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#a3a3a3', marginBottom: 28 }}>
            <a href="/" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 500 }}>Cart</a>
            <ChevronRight size={11} />
            <span style={{ color: '#111', fontWeight: 600, background: '#f0fdf4', padding: '2px 10px', borderRadius: 20, fontSize: 11 }}>Information</span>
            <ChevronRight size={11} />
            <span>Shipping</span>
            <ChevronRight size={11} />
            <span>Payment</span>
          </nav>

          {/* Contact */}
          <h2 className="co-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Contact</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <FloatField label="Phone number *" value={form.phone} onChange={v => u('phone', v)} maxLength={10} half error={errors.phone} />
            <FloatField label="Email (optional)" value={form.email} onChange={v => u('email', v)} type="email" half error={errors.email} />
          </div>

          {/* Delivery */}
          <h2 className="co-section-title">Delivery</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {/* Country */}
            <FloatField label="Country/Region" value="India" onChange={() => { }} >
              <div style={{ display: 'flex', alignItems: 'center', padding: '22px 12px 6px', fontSize: 14, color: '#111', height: '100%' }}>
                India
                <span style={{ marginLeft: 'auto', fontSize: 12, color: '#a3a3a3' }}>🇮🇳</span>
              </div>
            </FloatField>

            <div style={{ display: 'flex', gap: 10 }}>
              <FloatField label="First name *" value={form.name} onChange={v => u('name', v)} half error={errors.name} />
              <FloatField label="Last name" value={form.lastName} onChange={v => u('lastName', v)} half />
            </div>

            <FloatField label="Address *" value={form.address1} onChange={v => u('address1', v)} error={errors.address1} />
            <FloatField label="Apartment, suite, etc. (optional)" value={form.address2} onChange={v => u('address2', v)} />

            {/* PIN code first — auto-fills city & state */}
            <div style={{ position: 'relative' }}>
              <FloatField label="PIN code *" value={form.pincode} onChange={handlePincodeChange} maxLength={6} error={errors.pincode}>
                <input type="text" inputMode="numeric" value={form.pincode} maxLength={6}
                  onChange={e => handlePincodeChange(e.target.value)} placeholder=" "
                  onFocus={e => e.target.parentElement.style.borderColor = '#16a34a'}
                  onBlur={e => { if (!errors.pincode) e.target.parentElement.style.borderColor = '#d1d5db'; }}
                  style={{ width: '100%', padding: '22px 44px 6px 12px', fontSize: 14, border: 'none', outline: 'none', background: 'transparent', height: '100%', color: '#111', letterSpacing: '2px', fontWeight: 600 }}
                />
                {pincodeStatus === 'loading' && <Loader2 size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#16a34a', animation: 'spin 1s linear infinite' }} />}
                {pincodeStatus === 'success' && <CheckCircle2 size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#16a34a' }} />}
                {pincodeStatus === 'error' && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#ef4444', fontSize: 11, fontWeight: 500 }}>Invalid</span>}
              </FloatField>
              {pincodeStatus === 'success' && <p style={{ color: '#16a34a', fontSize: 11, marginTop: 3, paddingLeft: 2, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> Auto-detected: {form.city}, {form.state}</p>}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <FloatField label="City *" value={form.city} onChange={v => u('city', v)} half error={errors.city} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ position: 'relative', border: `1px solid ${errors.state ? '#dc2626' : '#d1d5db'}`, borderRadius: 5, background: '#fff', height: 54 }}>
                  <select value={form.state} onChange={e => u('state', e.target.value)}
                    style={{ width: '100%', padding: '22px 28px 6px 12px', fontSize: 14, border: 'none', outline: 'none', background: 'transparent', height: '100%', color: form.state ? '#111' : 'transparent', cursor: 'pointer', appearance: 'none' }}>
                    <option value=""></option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <label style={{ position: 'absolute', left: 12, top: form.state ? 6 : 17, fontSize: form.state ? 11 : 14, color: errors.state ? '#dc2626' : '#737373', transition: 'all 0.15s', pointerEvents: 'none' }}>State *</label>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#a3a3a3', pointerEvents: 'none' }} />
                </div>
                {errors.state && <p style={{ color: '#dc2626', fontSize: 11, marginTop: 3 }}>{errors.state}</p>}
              </div>
            </div>

            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#16a34a', cursor: 'pointer' }}
              />
              <label htmlFor="saveInfo" style={{ fontSize: 14, color: '#4b5563', cursor: 'pointer' }}>
                Save this information for next time
              </label>
            </div>
          </div>

          {/* Shipping Method */}
          <h2 className="co-section-title">Shipping method</h2>
          <div style={{ border: '1px solid #d1d5db', borderRadius: 5, overflow: 'hidden', marginBottom: 24 }}>
            <label onClick={() => u('paymentMethod', 'prepaid')} className="co-radio-row" style={{ borderBottom: '1px solid #e5e5e5', background: form.paymentMethod === 'prepaid' ? '#f0fdf4' : '#fafafa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="co-radio">{form.paymentMethod === 'prepaid' && <span className="co-radio-dot" />}</span>
                <span>Prepaid (UPI / Card) — <span style={{ color: '#16a34a', fontSize: 12, fontWeight: 600 }}>Save ₹{baseShippingCost}</span></span>
              </div>
              <span style={{ fontWeight: 600, color: '#16a34a' }}>
                <span style={{ textDecoration: 'line-through', color: '#a3a3a3', marginRight: 6, fontSize: 12 }}>₹{baseShippingCost}</span>
                Free
              </span>
            </label>
            <label onClick={() => u('paymentMethod', 'cod')} className="co-radio-row" style={{ background: form.paymentMethod === 'cod' ? '#f0fdf4' : '#fafafa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="co-radio">{form.paymentMethod === 'cod' && <span className="co-radio-dot" />}</span>
                <span>Cash on Delivery</span>
              </div>
              <span style={{ fontWeight: 600 }}>
                <span style={{ textDecoration: 'line-through', color: '#a3a3a3', marginRight: 6, fontSize: 12 }}>₹{baseShippingCost}</span>
                <span style={{ color: '#1a1a1a' }}>₹25</span>
              </span>
            </label>
          </div>

          {/* Pay / Place Order */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Return to cart
            </a>
            <button onClick={handlePlaceOrder} disabled={loading}
              style={{ padding: '16px 44px', background: loading ? '#a3a3a3' : 'linear-gradient(135deg, #16a34a, #059669)', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 4px 14px rgba(22,163,74,0.3)', letterSpacing: '0.3px' }}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <><Lock size={16} /> Pay now</>}
            </button>
          </div>

          {/* Secure badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, fontSize: 11, color: '#94a3b8' }}>
            <Lock size={12} /> Secured by Razorpay · 256-bit SSL encryption
          </div>

          <div style={{ borderTop: '1px solid #e5e5e5', marginTop: 32, paddingTop: 16, display: 'flex', gap: 16, fontSize: 11, color: '#a3a3a3', flexWrap: 'wrap' }}>
            <a href="/pages/refund-policy" style={{ color: '#737373', textDecoration: 'underline' }}>Refund policy</a>
            <a href="/pages/shipping-policy" style={{ color: '#737373', textDecoration: 'underline' }}>Shipping policy</a>
            <a href="/pages/privacy-policy" style={{ color: '#737373', textDecoration: 'underline' }}>Privacy policy</a>
            <a href="/pages/terms-and-conditions" style={{ color: '#737373', textDecoration: 'underline' }}>Terms & conditions</a>
          </div>
        </div>

        {/* ════════ RIGHT ════════ */}
        <div className={`co-right ${showMobileSummary ? 'co-right-show' : ''}`}>

          {/* Items */}
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: '#f5f5f5', position: 'relative', flexShrink: 0, border: '1px solid #e5e5e5' }}>
                <Image src={item.image || item.images?.[0] || '/product-plants.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, borderRadius: 10, background: '#16a34a', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>{item.quantity}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', whiteSpace: 'nowrap' }}>₹{((item.salePrice || 0) * item.quantity).toLocaleString()}.00</span>
            </div>
          ))}

          {/* Discount Code Input */}
          <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 8 }}>
            <input value={promoInput} onChange={e => setPromoInput(e.target.value.toUpperCase())} placeholder="Discount code or gift card"
              style={{ flex: 1, padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: 5, fontSize: 14, outline: 'none', background: '#fff' }}
              onFocus={e => e.target.style.borderColor = '#16a34a'} onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
            <button onClick={handleApplyPromo}
              style={{ padding: '12px 20px', background: '#f5f5f5', border: '1px solid #d1d5db', borderRadius: 5, fontSize: 14, color: '#737373', cursor: 'pointer', fontWeight: 500 }}>
              Apply
            </button>
          </div>
          {promoMsg && <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>{promoMsg}</p>}

          {/* Applied Promo */}
          {appliedPromo && (
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 6, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  🏷️ {appliedPromo.code} — Get {appliedPromo.discountType === 'percent' ? `${appliedPromo.discountValue}%` : `₹${appliedPromo.discountValue}`} OFF
                </span>
                <button onClick={() => { setAppliedPromo(null); setPromoInput(''); }} style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, border: '1px solid #16a34a', borderRadius: 4, padding: '3px 10px', background: '#fff', cursor: 'pointer' }}>Remove</button>
              </div>
              <p style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>🎉 Discount applied!</p>
            </div>
          )}

          {/* Totals */}
          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 16, marginTop: 8, display: 'grid', gap: 8, fontSize: 14, color: '#525252' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal · {cartCount} item{cartCount > 1 ? 's' : ''}</span>
              <span>₹{cartSubtotal.toLocaleString()}.00</span>
            </div>
            {discountAmount > 0 && appliedPromo && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order discount</span><span></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Tag size={12} /> {appliedPromo.code}</span>
                  <span>− ₹{Math.round(discountAmount).toLocaleString()}.00</span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <span>
                <span style={{ textDecoration: 'line-through', color: '#a3a3a3', marginRight: 6, fontSize: 12 }}>₹{baseShippingCost}.00</span>
                {form.paymentMethod === 'prepaid'
                  ? <span style={{ color: '#16a34a', fontWeight: 600 }}>Free</span>
                  : <span style={{ fontWeight: 600 }}>₹25.00</span>
                }
              </span>
            </div>
          </div>

          {/* Grand Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #e5e5e5', marginTop: 16, paddingTop: 16 }}>
            <span style={{ fontSize: 16, color: '#525252' }}>Total</span>
            <div>
              <span style={{ fontSize: 11, color: '#a3a3a3', marginRight: 4 }}>INR</span>
              <span style={{ fontSize: 26, fontWeight: 600, color: '#1a1a1a', letterSpacing: -0.5 }}>₹{Math.round(orderTotal).toLocaleString()}.00</span>
            </div>
          </div>

          {savings > 0 && (
            <p style={{ textAlign: 'right', fontSize: 13, color: '#16a34a', fontWeight: 600, marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
              <Tag size={13} /> TOTAL SAVINGS ₹{Math.round(savings).toLocaleString()}.00
            </p>
          )}

          {/* Trust Badges — like Ugaoo */}
          <div style={{ marginTop: 32, borderTop: '1px solid #e5e5e5', paddingTop: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Why Customers Trust Bgiya Bliss</h3>
            {[
              { icon: ShieldCheck, title: 'Damage-Free Guarantee', desc: 'Damaged product? We\'ll replace it — no questions asked.' },
              { icon: Leaf, title: '100% Organic Products', desc: 'Sourced from trusted farms, nurtured with care.' },
              { icon: Package, title: 'Safe, Secure Packaging', desc: 'Every order is packed to reach you in perfect condition.' },
              { icon: Heart, title: 'Trusted by 1000+ Happy Gardeners', desc: 'Join India\'s growing community of plant parents.' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <t.icon size={20} style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{t.title}</p>
                  <p style={{ fontSize: 12, color: '#737373', lineHeight: 1.4 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Styles ── */}
      <style jsx global>{`
        .co-wrapper { display:flex; min-height:100vh; }
        .co-left { flex:1 1 55%; max-width:680px; margin-left:auto; padding:36px 48px 60px; }
        .co-right { flex:1 1 45%; background:#fafafa; border-left:1px solid #e5e5e5; padding:36px 44px; position:sticky; top:0; height:100vh; overflow-y:auto; }
        .co-section-title { font-size:18px; font-weight:600; color:#1a1a1a; margin-bottom:12px; padding-bottom:8px; border-bottom:2px solid #f0fdf4; }
        .co-radio-row { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; font-size:14px; color:#1a1a1a; transition:background 0.15s; }
        .co-radio-row:hover { background:#f9fafb !important; }
        .co-radio { width:18px; height:18px; border-radius:50%; border:2px solid #d1d5db; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:border-color 0.15s; }
        .co-radio-dot { width:10px; height:10px; border-radius:50%; background:#16a34a; }
        .co-mob-toggle { display:none; padding:14px 20px; background:#f5f5f5; border-bottom:1px solid #e5e5e5; cursor:pointer; align-items:center; justify-content:space-between; font-size:14px; }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
        @media (max-width:900px) {
          .co-wrapper { flex-direction:column; }
          .co-left { max-width:100%; padding:24px 20px 40px; margin-left:0; }
          .co-right { position:relative; height:auto; flex:none; padding:24px 20px; display:none; border-left:none; border-top:1px solid #e5e5e5; }
          .co-right-show { display:block !important; }
          .co-mob-toggle { display:flex !important; }
        }
      `}</style>
    </div>
  );
}
