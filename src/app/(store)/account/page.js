'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders } from '@/lib/firestore';
import { Loader2, LogOut, Package, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchOrders() {
      if (user?.email) {
        setOrdersLoading(true);
        const fetchedOrders = await getUserOrders(user.email);
        setOrders(fetchedOrders);
        setOrdersLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading || !user) return <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" color="#16a34a" size={32} /></div>;

  const emailInitial = user.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className={styles.accountContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Account</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Sidebar */}
        <div>
          <div className={styles.sidebarCard}>
            <div className={styles.avatar}>{emailInitial}</div>
            <div className={styles.userInfo}>
              <h3>Welcome back</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          
          <section>
            <h2 className={styles.sectionTitle}>Recent Orders</h2>
            {ordersLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin" color="#16a34a" /></div>
            ) : orders.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><Package size={32} /></div>
                <h4>No orders yet</h4>
                <p>When you place an order, it will appear here.</p>
                <Link href="/collections/all" className={styles.shopBtn}>Start Shopping</Link>
              </div>
            ) : (
              <div className={styles.orderList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>{order.orderId}</div>
                        <div className={styles.orderDate}>
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Recently'}
                        </div>
                      </div>
                      <div>
                        <div className={styles.orderTotal}>₹{order.total?.toLocaleString()}</div>
                        <div className={`${styles.orderStatus} ${order.paymentStatus === 'paid' ? styles.statusPaid : order.status === 'shipped' ? styles.statusShipped : styles.statusPending}`}>
                          {order.paymentStatus === 'paid' ? 'Paid' : order.status || 'Pending'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className={styles.orderItem}>
                          <div className={styles.itemInfo}>
                            <span>{item.quantity}x</span>
                            <span>{item.name} {item.variant ? `(${item.variant})` : ''}</span>
                          </div>
                          <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Saved Addresses</h2>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}><MapPin size={32} /></div>
              <h4>No addresses saved</h4>
              <p>Add a shipping address for faster checkout.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
