'use client';
import { useState, useEffect } from 'react';
import { getAllAffiliates, createAffiliate, updateAffiliate, getAllAffiliateEarnings, markEarningPaid } from '@/lib/firestore';
import { Users, Plus, Check, X, Eye, DollarSign, TrendingUp, Copy, Loader2 } from 'lucide-react';

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [viewEarnings, setViewEarnings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', instagram: '', commissionRate: 7 });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [affs, earns] = await Promise.all([getAllAffiliates(), getAllAffiliateEarnings()]);
    setAffiliates(affs);
    setEarnings(earns);
    setLoading(false);
  };

  const generateCode = (name) => {
    const clean = name.trim().split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '');
    return `AFF_${clean || 'USER'}${Math.floor(Math.random() * 100)}`;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const code = generateCode(form.name);
    await createAffiliate({ ...form, code, commissionRate: Number(form.commissionRate), buyerDiscount: 5, status: 'active' });
    setForm({ name: '', email: '', phone: '', instagram: '', commissionRate: 7 });
    setShowForm(false);
    await loadData();
    setSaving(false);
  };

  const toggleStatus = async (aff) => {
    await updateAffiliate(aff.id, { status: aff.status === 'active' ? 'inactive' : 'active' });
    await loadData();
  };

  const approve = async (aff) => {
    await updateAffiliate(aff.id, { status: 'active' });
    await loadData();
  };

  const handleMarkPaid = async (earnId) => {
    await markEarningPaid(earnId);
    await loadData();
  };

  const totalRevenue = earnings.reduce((s, e) => s + (e.orderTotal || 0), 0);
  const totalCommission = earnings.reduce((s, e) => s + (e.commission || 0), 0);
  const pendingPayout = earnings.filter(e => e.status === 'pending').reduce((s, e) => s + (e.commission || 0), 0);

  const filteredEarnings = viewEarnings ? earnings.filter(e => e.affiliateCode === viewEarnings) : [];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Loader2 className="animate-spin" size={32} color="#16a34a" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 className="adminTitle" style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 4 }}>Affiliate Program</h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>{affiliates.length} affiliates • 7% commission • 5% buyer discount</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#16a34a', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add Affiliate
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Affiliates', value: affiliates.length, color: '#2563eb', bg: '#eff6ff' },
          { label: 'Active', value: affiliates.filter(a => a.status === 'active').length, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: '#9333ea', bg: '#faf5ff' },
          { label: 'Pending Payout', value: `₹${pendingPayout.toLocaleString()}`, color: '#ea580c', bg: '#fff7ed' },
        ].map((s, i) => (
          <div key={i} style={{ padding: 20, background: s.bg, borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Create New Affiliate</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            <input placeholder="Full Name *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
            <input placeholder="Email *" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
            <input placeholder="Instagram Handle" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
            <input placeholder="Commission %" type="number" value={form.commissionRate} onChange={e => setForm({ ...form, commissionRate: e.target.value })} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
            <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#16a34a', color: '#fff', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Creating...' : 'Create & Auto-Approve'}
            </button>
          </div>
        </form>
      )}

      {/* Affiliates Table */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Name', 'Code', 'Commission', 'Orders', 'Earnings', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {affiliates.map(aff => (
              <tr key={aff.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>{aff.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{aff.email}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '4px 10px', borderRadius: 6, fontSize: 13 }}>{aff.code}</span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{aff.commissionRate || 7}%</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{aff.totalOrders || 0}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#16a34a' }}>₹{(aff.totalEarnings || 0).toLocaleString()}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                    background: aff.status === 'active' ? '#dcfce7' : aff.status === 'pending' ? '#fef3c7' : '#fee2e2',
                    color: aff.status === 'active' ? '#16a34a' : aff.status === 'pending' ? '#d97706' : '#dc2626',
                  }}>{aff.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {aff.status === 'pending' && (
                      <button onClick={() => approve(aff)} style={{ padding: '6px 12px', background: '#dcfce7', color: '#16a34a', borderRadius: 6, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        <Check size={12} /> Approve
                      </button>
                    )}
                    <button onClick={() => toggleStatus(aff)} style={{ padding: '6px 12px', background: '#f3f4f6', color: '#4b5563', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      {aff.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => setViewEarnings(viewEarnings === aff.code ? null : aff.code)} style={{ padding: '6px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      <Eye size={12} /> Earnings
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {affiliates.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>No affiliates yet. Create one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Earnings Breakdown */}
      {viewEarnings && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <DollarSign size={18} /> Earnings for <span style={{ color: '#16a34a', fontFamily: 'monospace' }}>{viewEarnings}</span>
            <button onClick={() => setViewEarnings(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={18} /></button>
          </h3>
          {filteredEarnings.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: 20 }}>No earnings recorded yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  {['Order ID', 'Order Total', 'Commission', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', fontSize: 12, fontWeight: 700, color: '#6b7280', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 13 }}>{e.orderId}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>₹{(e.orderTotal || 0).toLocaleString()}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#16a34a' }}>₹{(e.commission || 0).toLocaleString()}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: e.status === 'paid' ? '#dcfce7' : '#fef3c7', color: e.status === 'paid' ? '#16a34a' : '#d97706' }}>
                        {e.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {e.status === 'pending' && (
                        <button onClick={() => handleMarkPaid(e.id)} style={{ padding: '5px 14px', background: '#16a34a', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
