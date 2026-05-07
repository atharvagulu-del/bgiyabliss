'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, Settings, Upload } from 'lucide-react';
import { getStoreSettings, updateStoreSettings } from '@/lib/firestore';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [messages, setMessages] = useState(['']);
  
  const [heroBanners, setHeroBanners] = useState(['']);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const settings = await getStoreSettings();
    if (settings) {
      if (settings.announcementMessages) setMessages(settings.announcementMessages);
      if (settings.heroBanners) {
        setHeroBanners(settings.heroBanners.length ? settings.heroBanners : ['']);
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanHeroBanners = heroBanners.filter(url => url.trim() !== '');
      await updateStoreSettings({
        announcementMessages: cleanMessages,
        heroBanners: cleanHeroBanners
      });
      alert('Settings saved successfully!');
      loadSettings();
    } catch (err) {
      alert('Failed to save settings.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingIdx(idx);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary credentials missing in .env.local');
      setUploadingIdx(null);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        const newBanners = [...heroBanners];
        newBanners[idx] = data.secure_url;
        setHeroBanners(newBanners);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploadingIdx(null);
      e.target.value = '';
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
  }

  return (
    <>
      <div className="adminTopbar flex justify-between items-center w-full">
        <h1 className="adminTopbarTitle">Store Settings</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>
      <div className="adminContent">
        <div className="max-w-4xl space-y-8">
          
          {/* Announcement Bar */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Announcement Bar</h2>
              <button 
                onClick={() => setMessages([...messages, ''])}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                <Plus size={16} /> Add Message
              </button>
            </div>
            
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    type="text" 
                    value={msg} 
                    onChange={(e) => {
                      const newMsg = [...messages];
                      newMsg[idx] = e.target.value;
                      setMessages(newMsg);
                    }}
                    placeholder="e.g. 🎉 Flat 20% Off on Orders Above ₹1099 | Use: BLISS20"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500"
                  />
                  <button 
                    onClick={() => {
                      const newMsg = messages.filter((_, i) => i !== idx);
                      setMessages(newMsg.length ? newMsg : ['']);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-2">These messages scroll infinitely at the very top of the screen.</p>
            </div>
          </div>

          {/* Hero Banners */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Hero Carousel Banners</h2>
              <button 
                onClick={() => setHeroBanners([...heroBanners, ''])}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                <Plus size={16} /> Add Banner
              </button>
            </div>
            
            <div className="space-y-3">
              {heroBanners.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <input 
                      type="text" 
                      value={url} 
                      onChange={(e) => {
                        const newBanners = [...heroBanners];
                        newBanners[idx] = e.target.value;
                        setHeroBanners(newBanners);
                      }}
                      placeholder="e.g. /banners/banner1.jpeg or https://..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500"
                    />
                    <div className="relative overflow-hidden inline-block shrink-0">
                      <button 
                        type="button" 
                        disabled={uploadingIdx === idx}
                        className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 border border-emerald-200 flex items-center gap-2"
                      >
                        {uploadingIdx === idx ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Upload
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                        onChange={(e) => handleImageUpload(e, idx)} 
                        disabled={uploadingIdx === idx}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newBanners = heroBanners.filter((_, i) => i !== idx);
                      setHeroBanners(newBanners.length ? newBanners : ['']);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-2">These images will appear in the main sliding carousel at the top of the homepage.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
