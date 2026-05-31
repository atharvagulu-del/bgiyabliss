'use client';
import { useState } from 'react';
import { getAffiliateByCode, getAffiliateEarnings } from '@/lib/firestore';
import { Loader2, Copy, CheckCircle2, TrendingUp, ShoppingBag, DollarSign, Clock } from 'lucide-react';

export default function AffiliateDashboardPage() {
  const [code, setCode] = useState('');
  const [affiliate, setAffiliate] = useState(null);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const aff = await getAffiliateByCode(code.trim().toUpperCase());
    if (!aff) {
      setError('Invalid affiliate code. Please check and try again.');
      setLoading(false);
      return;
    }
    const earns = await getAffiliateEarnings(aff.code);
    setAffiliate(aff);
    setEarnings(earns);
    setLoggedIn(true);
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(affiliate.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCommission = earnings.reduce((s, e) => s + (e.commission || 0), 0);
  const pendingCommission = earnings.filter(e => e.status === 'pending').reduce((s, e) => s + (e.commission || 0), 0);
  const paidCommission = earnings.filter(e => e.status === 'paid').reduce((s, e) => s + (e.commission || 0), 0);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <TrendingUp size={28} color="#16a34a" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">Affiliate Dashboard</h1>
            <p className="text-gray-500 text-sm">Enter your affiliate code to view your earnings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your affiliate code (e.g. AFF_PRIYA42)"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              style={{ width: '100%', padding: '14px 18px', border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15, fontWeight: 600, fontFamily: 'monospace', textTransform: 'uppercase', textAlign: 'center', letterSpacing: 1 }}
            />
            {error && <p style={{ color: '#dc2626', fontSize: 13, textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Checking...</> : 'View Dashboard'}
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-6">
            Don&apos;t have a code? <a href="/pages/affiliates" className="text-emerald-600 font-semibold hover:underline">Apply here</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 className="text-3xl font-bold font-heading text-gray-900 mb-1">Welcome, {affiliate.name}!</h1>
            <p className="text-gray-500 text-sm">{affiliate.email}</p>
          </div>
          <button onClick={() => { setLoggedIn(false); setAffiliate(null); }} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 600, color: '#6b7280', cursor: 'pointer' }}>
            Logout
          </button>
        </div>

        {/* Code Card */}
        <div style={{ background: 'linear-gradient(135deg, #064e3b, #166534)', borderRadius: 16, padding: '28px 32px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: '#86efac', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Your Affiliate Code</p>
            <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 2 }}>{affiliate.code}</p>
            <p style={{ color: '#a7f3d0', fontSize: 13, marginTop: 6 }}>Buyers get 5% off • You earn {affiliate.commissionRate || 7}% commission</p>
          </div>
          <button onClick={copyCode} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#fff', color: '#064e3b', borderRadius: 50, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
            {copied ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy Code</>}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Total Sales', value: earnings.length, icon: <ShoppingBag size={20} />, color: '#2563eb', bg: '#eff6ff' },
            { label: 'Total Earned', value: `₹${totalCommission.toLocaleString()}`, icon: <TrendingUp size={20} />, color: '#16a34a', bg: '#f0fdf4' },
            { label: 'Pending', value: `₹${pendingCommission.toLocaleString()}`, icon: <Clock size={20} />, color: '#d97706', bg: '#fffbeb' },
            { label: 'Paid Out', value: `₹${paidCommission.toLocaleString()}`, icon: <DollarSign size={20} />, color: '#9333ea', bg: '#faf5ff' },
          ].map((s, i) => (
            <div key={i} style={{ padding: 20, background: s.bg, borderRadius: 14, border: '1px solid #e5e7eb' }}>
              <div style={{ color: s.color, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginTop: 4, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Earnings Table */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Earnings History</h2>
          </div>
          {earnings.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9ca3af' }}>
              <ShoppingBag size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ fontWeight: 600 }}>No sales yet</p>
              <p style={{ fontSize: 13 }}>Share your code to start earning commissions!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Order ID', 'Order Total', 'Your Commission', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {earnings.map(e => (
                  <tr key={e.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontSize: 13, fontWeight: 600 }}>{e.orderId}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 600 }}>₹{(e.orderTotal || 0).toLocaleString()}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: '#16a34a' }}>₹{(e.commission || 0).toLocaleString()}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: e.status === 'paid' ? '#dcfce7' : '#fef3c7', color: e.status === 'paid' ? '#16a34a' : '#d97706' }}>
                        {e.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#6b7280' }}>
                      {e.createdAt?.toDate ? e.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Share Message */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, marginTop: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>📱 Share Template</h3>
          <div style={{ background: '#f9fafb', borderRadius: 10, padding: 16, fontSize: 14, color: '#374151', lineHeight: 1.7, border: '1px solid #e5e7eb' }}>
            Hey! 🌱 Check out @bgiyabliss for premium organic gardening products. Use my code <strong>{affiliate.code}</strong> for 5% off your first order! 🪴✨<br />
            Shop at → bgiyabliss.com
          </div>
          <button onClick={() => { navigator.clipboard.writeText(`Hey! 🌱 Check out @bgiyabliss for premium organic gardening products. Use my code ${affiliate.code} for 5% off your first order! 🪴✨\nShop at → bgiyabliss.com`); }} style={{ marginTop: 12, padding: '8px 20px', background: '#f0fdf4', color: '#16a34a', borderRadius: 8, fontWeight: 700, fontSize: 13, border: '1px solid #bbf7d0', cursor: 'pointer' }}>
            Copy Message
          </button>
        </div>
      </div>
    </div>
  );
}
