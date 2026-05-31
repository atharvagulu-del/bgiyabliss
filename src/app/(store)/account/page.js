'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders, getUserCoins, getCoinTransactions } from '@/lib/firestore';
import { Loader2, LogOut, Package, Coins, Gift, ShoppingBag, ArrowRight, Copy, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [coins, setCoins] = useState({ balance: 0, totalEarned: 0, totalRedeemed: 0 });
  const [coinTxns, setCoinTxns] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchData() {
      if (user?.email) {
        setOrdersLoading(true);
        const [fetchedOrders, userCoins, txns] = await Promise.all([
          getUserOrders(user.email, user.uid),
          getUserCoins(user.email),
          getCoinTransactions(user.email),
        ]);
        setOrders(fetchedOrders);
        setCoins(userCoins);
        setCoinTxns(txns);
        setOrdersLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const handleLogout = async () => { await logout(); router.push('/login'); };

  const copyReferral = () => {
    navigator.clipboard.writeText(`Hey! Check out Bgiya Bliss for amazing organic gardening products 🌱 https://bgiyabliss.com`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !user) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9' }}>
      <Loader2 className="animate-spin" color="#16a34a" size={28} />
    </div>
  );

  const displayName = user.displayName || user.email?.split('@')[0] || 'Gardener';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)',
        padding: '48px 20px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1,
              }}>{initials}</div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: -0.5 }}>
                  Hi, {displayName} 👋
                </h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}><LogOut size={14} /> Logout</button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 2 }}>

        {/* Coins Card — floating over banner */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '24px 28px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f0f0ec',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 0,
          marginBottom: 28,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Bgiya Coins</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a', lineHeight: 1 }}>🪙 {coins.balance || 0}</div>
          </div>
          <div style={{ width: 1, height: 48, background: '#f0f0f0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Total Earned</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#111', lineHeight: 1 }}>{coins.totalEarned || 0}</div>
          </div>
          <div style={{ width: 1, height: 48, background: '#f0f0f0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Orders</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#111', lineHeight: 1 }}>{orders.length}</div>
          </div>
        </div>

        {/* Rewards Tip */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #fefce8, #fef9c3)', borderRadius: 14,
          padding: '16px 22px', marginBottom: 28, border: '1px solid #fde68a',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sparkles size={18} color="#d97706" />
            <span style={{ fontSize: 13, color: '#92400e', fontWeight: 600 }}>
              Earn 1 coin for every ₹10 spent • 100 coins = ₹10 off
            </span>
          </div>
          <button onClick={copyReferral} style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
            borderRadius: 50, background: '#16a34a', color: '#fff', fontSize: 12, fontWeight: 700,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            {copied ? <><CheckCircle2 size={12} /> Copied!</> : <><Copy size={12} /> Share</>}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {[
            { key: 'orders', label: 'Orders', icon: <Package size={15} /> },
            { key: 'coins', label: 'Coin History', icon: <Coins size={15} /> },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px',
              borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
              background: activeTab === tab.key ? '#064e3b' : '#fff',
              color: activeTab === tab.key ? '#fff' : '#6b7280',
              boxShadow: activeTab === tab.key ? '0 2px 8px rgba(6,78,59,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.25s ease',
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {ordersLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Loader2 className="animate-spin" color="#16a34a" /></div>
            ) : orders.length === 0 ? (
              <div style={{
                background: '#fff', borderRadius: 20, padding: '60px 24px', textAlign: 'center',
                border: '1px dashed #d1d5db', boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <ShoppingBag size={28} color="#16a34a" />
                </div>
                <h4 style={{ fontWeight: 700, color: '#111', fontSize: 17, margin: '0 0 6px' }}>No orders yet</h4>
                <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 20 }}>Place your first order and start earning Bgiya Coins!</p>
                <Link href="/collections/all" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 24px',
                  borderRadius: 50, background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: 13,
                  textDecoration: 'none',
                }}>Shop Now <ArrowRight size={14} /></Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {orders.map((order) => (
                  <div key={order.id} style={{
                    background: '#fff', borderRadius: 16, padding: '20px 24px',
                    border: '1px solid #f0f0ec', boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    transition: 'border-color 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: '#374151' }}>{order.orderId}</span>
                        <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 10 }}>
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: '#111', fontSize: 16 }}>₹{order.total?.toLocaleString()}</div>
                        <span style={{
                          display: 'inline-block', marginTop: 4, padding: '3px 10px', borderRadius: 50, fontSize: 10, fontWeight: 800,
                          textTransform: 'uppercase', letterSpacing: 0.5,
                          background: order.paymentStatus === 'paid' ? '#dcfce7' : order.status === 'shipped' ? '#dbeafe' : '#fef3c7',
                          color: order.paymentStatus === 'paid' ? '#16a34a' : order.status === 'shipped' ? '#2563eb' : '#d97706',
                        }}>{order.paymentStatus === 'paid' ? 'Paid' : order.status || 'Pending'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b7280' }}>
                          <span><span style={{ color: '#9ca3af', marginRight: 6 }}>{item.quantity}×</span>{item.name}</span>
                          <span style={{ fontWeight: 600, color: '#374151' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>+{order.items.length - 3} more items</span>
                      )}
                    </div>
                    {order.coinsEarned > 0 && (
                      <div style={{ marginTop: 12, padding: '8px 14px', background: '#f0fdf4', borderRadius: 10, fontSize: 12, color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        🪙 +{order.coinsEarned} coins earned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Coins Tab */}
        {activeTab === 'coins' && (
          <div>
            {coinTxns.length === 0 ? (
              <div style={{
                background: '#fff', borderRadius: 20, padding: '60px 24px', textAlign: 'center',
                border: '1px dashed #d1d5db',
              }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Coins size={28} color="#d97706" />
                </div>
                <h4 style={{ fontWeight: 700, color: '#111', fontSize: 17, margin: '0 0 6px' }}>No coin activity yet</h4>
                <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 20 }}>Place an order to start earning Bgiya Coins!</p>
                <Link href="/collections/all" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 24px',
                  borderRadius: 50, background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: 13,
                  textDecoration: 'none',
                }}>Shop Now <ArrowRight size={14} /></Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {coinTxns.map((txn) => (
                  <div key={txn.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', borderRadius: 14, padding: '16px 20px',
                    border: '1px solid #f0f0ec',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: txn.type === 'credit' ? '#f0fdf4' : '#fef2f2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, fontWeight: 800,
                        color: txn.type === 'credit' ? '#16a34a' : '#dc2626',
                      }}>{txn.type === 'credit' ? '↑' : '↓'}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>{txn.reason || (txn.type === 'credit' ? 'Earned from order' : 'Redeemed')}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                          {txn.createdAt?.toDate ? txn.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                          {txn.orderId && <span> · {txn.orderId}</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: txn.type === 'credit' ? '#16a34a' : '#dc2626' }}>
                      {txn.type === 'credit' ? '+' : '−'}{txn.amount} 🪙
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
