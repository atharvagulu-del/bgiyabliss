'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Loader2, Tag, Percent, CheckCircle2, XCircle } from 'lucide-react';
import { getAllPromos, addPromoCode, updatePromoCode, deletePromoCode } from '@/lib/firestore';

export default function AdminPromosPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, code: '', discountType: 'percent', discountValue: 10, minOrderValue: 0, active: true });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    setLoading(true);
    const data = await getAllPromos();
    setPromos(data);
    setLoading(false);
  };

  const handleOpenModal = (promo = null) => {
    if (promo) {
      setForm(promo);
    } else {
      setForm({ id: null, code: '', discountType: 'percent', discountValue: 10, minOrderValue: 0, active: true });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrderValue: Number(form.minOrderValue),
        active: form.active
      };
      
      if (form.id) {
        await updatePromoCode(form.id, data);
      } else {
        await addPromoCode(data);
      }
      
      setShowModal(false);
      loadPromos();
    } catch (err) {
      console.error(err);
      alert('Failed to save promo code');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this promo code?')) {
      await deletePromoCode(id);
      loadPromos();
    }
  };

  const handleToggleActive = async (promo) => {
    await updatePromoCode(promo.id, { active: !promo.active });
    loadPromos();
  };

  return (
    <>
      <div className="adminTopbar flex justify-between items-center w-full">
        <h1 className="adminTopbarTitle">Promo Codes</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Promo
        </button>
      </div>
      
      <div className="adminContent">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
        ) : promos.length === 0 ? (
          <div className="adminEmptyState">
            <Tag size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold">No Promo Codes</h3>
            <p className="text-gray-500">Create your first discount code to boost sales.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Code</th>
                  <th className="p-4 font-medium">Discount</th>
                  <th className="p-4 font-medium">Min. Order</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promos.map(promo => (
                  <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 font-mono text-sm font-bold text-gray-800 border border-gray-200">
                        <Tag size={12} /> {promo.code}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      {promo.discountType === 'percent' ? `${promo.discountValue}% OFF` : `₹${promo.discountValue} OFF`}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {promo.minOrderValue > 0 ? `₹${promo.minOrderValue}` : 'None'}
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleToggleActive(promo)} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${promo.active !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {promo.active !== false ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                        {promo.active !== false ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleOpenModal(promo)} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{form.id ? 'Edit Promo Code' : 'New Promo Code'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><XCircle size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code Name</label>
                <input required type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER20" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-mono uppercase focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input required type="number" min="1" max={form.discountType === 'percent' ? 100 : 99999} value={form.discountValue} onChange={e => setForm({...form, discountValue: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Value (₹)</label>
                <input required type="number" min="0" value={form.minOrderValue} onChange={e => setForm({...form, minOrderValue: e.target.value})} placeholder="0 for no minimum" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none" />
                <p className="text-xs text-gray-500 mt-1">Set to 0 to apply to any order.</p>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  {submitting ? <Loader2 size={18} className="animate-spin"/> : null}
                  {form.id ? 'Save Changes' : 'Create Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
