'use client';
import { useState } from 'react';
import { Search, Loader2, Package, Truck, CheckCircle2 } from 'lucide-react';
import { getOrderById } from '@/lib/firestore';
import styles from './page.module.css';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId || !email) {
      setError('Please enter both Order ID and Email.');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Basic cleanup of inputs
      const cleanId = orderId.trim();
      const cleanEmail = email.trim().toLowerCase();

      const fetchedOrder = await getOrderById(cleanId);
      
      if (!fetchedOrder) {
        setError('Order not found. Please check your Order ID.');
      } else if (fetchedOrder.customer?.email?.toLowerCase() !== cleanEmail) {
        setError('Email does not match the order details.');
      } else {
        setOrder(fetchedOrder);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while tracking your order.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (order) => {
    if (order.status === 'delivered') return <span className={`${styles.statusBadge} ${styles.statusDelivered}`}><CheckCircle2 size={16}/> Delivered</span>;
    if (order.status === 'shipped') return <span className={`${styles.statusBadge} ${styles.statusShipped}`}><Truck size={16}/> Shipped</span>;
    if (order.paymentStatus === 'paid') return <span className={`${styles.statusBadge} ${styles.statusPaid}`}><Package size={16}/> Processing (Paid)</span>;
    return <span className={`${styles.statusBadge} ${styles.statusPending}`}><Package size={16}/> {order.status || 'Pending'}</span>;
  };

  return (
    <div className={styles.trackContainer}>
      <h1 className={styles.title}>Track Your Order</h1>
      <p className={styles.subtitle}>Enter your Order ID and Email to see your delivery status.</p>

      <form className={styles.formCard} onSubmit={handleTrack}>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <label>Order ID</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="e.g. BB-1700000000000" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            className={styles.input} 
            placeholder="Email used during checkout" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Track Order
        </button>
      </form>

      {order && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div>
              <div className={styles.orderId}>{order.id}</div>
              <div className={styles.orderDate}>
                Placed on {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
              </div>
            </div>
            <div>
              {getStatusBadge(order)}
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailSection}>
              <h4>Shipping Details</h4>
              <p>{order.customer?.name}</p>
              <p>{order.shipping?.address1}</p>
              {order.shipping?.address2 && <p>{order.shipping?.address2}</p>}
              <p>{order.shipping?.city}, {order.shipping?.state} {order.shipping?.pincode}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>Payment Info</h4>
              <p style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</p>
              {order.paymentStatus === 'paid' && <p style={{ color: '#16a34a', fontWeight: 600 }}>Payment Successful</p>}
            </div>
          </div>

          <div className={styles.itemsList}>
            <h4 style={{ fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontWeight: 600 }}>Items</h4>
            {order.items?.map((item, idx) => (
              <div key={idx} className={styles.itemRow}>
                <span>{item.quantity}x {item.name} {item.variant ? `(${item.variant})` : ''}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className={styles.itemRow} style={{ marginTop: '8px', color: '#6b7280' }}>
              <span>Shipping</span>
              <span>₹{order.shippingCost || 0}</span>
            </div>
            {order.discount > 0 && (
              <div className={styles.itemRow} style={{ color: '#16a34a' }}>
                <span>Discount {order.promoCode ? `(${order.promoCode})` : ''}</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className={styles.itemTotal}>
              <span>Total</span>
              <span>₹{order.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
