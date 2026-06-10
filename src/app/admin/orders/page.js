'use client';
import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle2, ChevronDown, ChevronUp, MapPin, Phone, Mail, RefreshCw, User } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '@/lib/firestore';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#b45309', bg: '#fef3c7', icon: Clock },
  confirmed: { label: 'Confirmed', color: '#1d4ed8', bg: '#dbeafe', icon: Package },
  shipped: { label: 'Shipped', color: '#7c3aed', bg: '#ede9fe', icon: Truck },
  delivered: { label: 'Delivered', color: '#059669', bg: '#d1fae5', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fee2e2', icon: Clock },
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update order status');
    }
    setUpdatingId(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="adminTopbar">
        <h1 className="adminTopbarTitle">Orders</h1>
        <button
          onClick={loadOrders}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#f3f4f6', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', border: '1px solid #e5e7eb' }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="adminContent">
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
          <div
            onClick={() => setFilter('all')}
            style={{
              padding: '14px 16px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              background: filter === 'all' ? '#111' : '#fff',
              color: filter === 'all' ? '#fff' : '#111',
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700 }}>{orders.length}</p>
            <p style={{ fontSize: 12, opacity: 0.7 }}>All Orders</p>
          </div>
          {STATUS_OPTIONS.filter(s => s !== 'cancelled').map(s => {
            const cfg = STATUS_CONFIG[s];
            return (
              <div
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '14px 16px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                  background: filter === s ? cfg.bg : '#fff',
                  border: `1px solid ${filter === s ? cfg.color : '#e5e7eb'}`,
                }}
              >
                <p style={{ fontSize: 24, fontWeight: 700, color: cfg.color }}>{statusCounts[s] || 0}</p>
                <p style={{ fontSize: 12, color: '#6b7280' }}>{cfg.label}</p>
              </div>
            );
          })}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="adminCard" style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="adminCard">
            <div className="adminEmptyState">
              <Package size={48} />
              <h3>{filter === 'all' ? 'No Orders Yet' : `No ${STATUS_CONFIG[filter]?.label} Orders`}</h3>
              <p>Orders will appear here when customers place them.</p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {filteredOrders.map(order => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const StatusIcon = cfg.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <div key={order.id} className="adminCard" style={{ padding: 0, overflow: 'hidden' }}>
                  {/* Order Header Row */}
                  <div
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, alignItems: 'center',
                      padding: '16px 20px', cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Order Info */}
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#111', fontFamily: 'monospace' }}>
                        {order.orderId || order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                        {order.customer?.name || 'Unknown'} • {formatDate(order.createdAt)}
                      </p>
                    </div>

                    {/* Items Count */}
                    <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                    </span>

                    {/* Pickup Date Badge */}
                    {order.pickupDate && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        color: '#0369a1', background: '#e0f2fe', whiteSpace: 'nowrap',
                      }}>
                        📦 Pickup: {new Date(order.pickupDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    )}

                    {/* Status Badge */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      color: cfg.color, background: cfg.bg, whiteSpace: 'nowrap',
                    }}>
                      <StatusIcon size={13} /> {cfg.label}
                    </span>

                    {/* Total + Expand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#111', whiteSpace: 'nowrap' }}>
                        ₹{(order.total || 0).toLocaleString()}
                      </span>
                      {isExpanded ? <ChevronUp size={16} style={{ color: '#9ca3af' }} /> : <ChevronDown size={16} style={{ color: '#9ca3af' }} />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid #f0f0f0', padding: '20px', background: '#fafafa' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* Customer & Shipping */}
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <User size={14} /> Customer
                          </h4>
                          <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.8 }}>
                            <p><strong>{order.customer?.name}</strong></p>
                            {order.customer?.phone && <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} /> {order.customer.phone}</p>}
                            {order.customer?.email && <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} /> {order.customer.email}</p>}
                          </div>

                          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginTop: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MapPin size={14} /> Shipping Address
                          </h4>
                          <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6 }}>
                            <p>{order.shipping?.address1}</p>
                            {order.shipping?.address2 && <p>{order.shipping.address2}</p>}
                            <p>{order.shipping?.city}, {order.shipping?.state} — {order.shipping?.pincode}</p>
                          </div>
                        </div>

                        {/* Items & Payment */}
                        <div>
                          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Items</h4>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4b5563', marginBottom: 6 }}>
                              <span>{item.name} × {item.quantity}</span>
                              <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 10, paddingTop: 10, fontSize: 13 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                              <span>Subtotal</span><span>₹{(order.subtotal || 0).toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 600 }}>
                                <span>Discount {order.promoCode && `(${order.promoCode})`}</span><span>-₹{Math.round(order.discount).toLocaleString()}</span>
                              </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                              <span>Shipping ({order.paymentMethod?.toUpperCase()})</span><span>₹{(order.shippingCost || 0)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#111', marginTop: 6, paddingTop: 6, borderTop: '1px solid #e5e7eb', fontSize: 15 }}>
                              <span>Total</span><span>₹{Math.round(order.total || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Update Status:</span>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {STATUS_OPTIONS.map(s => {
                            const sc = STATUS_CONFIG[s];
                            const isActive = order.status === s;
                            return (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(order.id, s)}
                                disabled={updatingId === order.id}
                                style={{
                                  padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                                  cursor: updatingId === order.id ? 'not-allowed' : 'pointer',
                                  background: isActive ? sc.bg : '#fff',
                                  color: isActive ? sc.color : '#6b7280',
                                  border: `1.5px solid ${isActive ? sc.color : '#e5e7eb'}`,
                                  transition: 'all 0.15s',
                                  opacity: updatingId === order.id ? 0.5 : 1,
                                }}
                              >
                                {sc.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
