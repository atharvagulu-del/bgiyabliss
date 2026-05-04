'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, User, ShoppingBag, Heart, X, Menu, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { bestsellers, newArrivals, plantBundles, ceramics } from '@/data/products';
import { navLinks } from '@/data/categories';
import { getActiveProducts } from '@/lib/firestore';

const staticProducts = [...bestsellers, ...newArrivals, ...plantBundles, ...ceramics];

// ─── Mobile Menu Drawer (accordion-style, collapsed by default) ───
function MobileMenuDrawer({ navLinks, onClose }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex' }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />
      <div style={{
        position: 'relative', width: '80%', maxWidth: '360px', height: '100%',
        background: '#fff', boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        animation: 'mobileMenuSlideIn 0.3s ease forwards',
      }}>
        <style>{`@keyframes mobileMenuSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

        {/* Header with close + actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#111' }}>Menu</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); }}>
              <Heart size={20} />
            </a>
            <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); }}>
              <User size={20} />
            </a>
            <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f5f5f5', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav Links — accordion */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {navLinks.map((link, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
              {/* Category row */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={link.link}
                  onClick={onClose}
                  style={{
                    flex: 1, display: 'block', padding: '16px 20px',
                    fontWeight: 600, fontSize: '15px',
                    color: link.highlight ? '#16a34a' : '#111',
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </a>
                {link.megaMenu && (
                  <button
                    onClick={() => toggle(idx)}
                    style={{
                      width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#999',
                      transition: 'transform 0.2s',
                      transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown size={18} />
                  </button>
                )}
              </div>

              {/* Expandable sub-menu */}
              {link.megaMenu && openIdx === idx && (
                <div style={{ padding: '0 20px 16px 36px', borderTop: '1px solid #f5f5f5', background: '#fafafa' }}>
                  {link.megaMenu.map((col, colIdx) => (
                    <div key={colIdx} style={{ marginTop: '12px' }}>
                      <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{col.title}</span>
                      {col.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href={item.link}
                          onClick={onClose}
                          style={{ display: 'block', padding: '6px 0', fontSize: '14px', color: '#555', textDecoration: 'none' }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
          <a href="/collections/all" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: '#333', textDecoration: 'none' }}>
            <ShoppingBag size={18} /> All Products
          </a>
          <a href="/pages/contact" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: '#333', textDecoration: 'none' }}>
            <User size={18} /> Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allProductsList, setAllProductsList] = useState(staticProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getActiveProducts();
        if (products && products.length > 0) {
          setAllProductsList(products);
        }
      } catch (err) {
        console.error('Error fetching products for search:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const uniqueProducts = Array.from(new Set(allProductsList.map(a => a.id)))
      .map(id => allProductsList.find(a => a.id === id));
    return uniqueProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.tags?.some(t => t.toLowerCase().includes(query))
    ).slice(0, 5);
  }, [searchQuery, allProductsList]);

  // Glass mode disabled — no dark hero anymore
  const glass = false;

  return (
    <>
    <header
      className="sticky top-0 z-50"
      style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}
      onMouseLeave={() => setActiveMenu(null)}
    >

      {/* ═══════ DESKTOP HEADER ═══════ */}
      <div className="hidden md:block">

        {/* TOP ROW — cream bg, logo centered, search left, icons right */}
        <div style={{ background: 'linear-gradient(180deg, #f7f5f0 0%, #ffffff 100%)' }}>
          <div className="max-w-[1440px] mx-auto px-10 flex items-center h-[120px]">

            {/* Search — left */}
            <div className="relative w-[260px] flex-shrink-0">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/60" />
              <input
                type="text"
                placeholder="Search plants, soil, pots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-full text-[13px] outline-none bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all duration-200 shadow-sm"
              />
              {searchQuery && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setSearchQuery('')}><X size={13} /></button>
              )}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[200] max-h-[360px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase px-3 py-1.5 tracking-wider">Products</h4>
                      {searchResults.map(product => (
                        <a href={`/products/${product.slug}`} key={product.id} className="flex gap-3 px-3 py-2.5 hover:bg-emerald-50 rounded-lg transition-colors" onClick={() => setSearchQuery('')}>
                          <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={product.image || product.images?.[0] || '/product-plants.png'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-sm font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm font-bold text-emerald-600">₹{(product.salePrice || 0).toLocaleString()}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-5 text-center text-gray-400 text-sm">No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* Logo — big, centered */}
            <div className="flex-1 flex justify-center">
              <a href="/" className="relative h-[90px] w-[180px] hover:opacity-90 transition-opacity duration-300">
                <Image
                  src="/logo.png"
                  alt="Bgiya Bliss - Where Every Leaf Tells a Story"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </a>
            </div>

            {/* Action Icons — right */}
            <div className="flex items-center gap-3 flex-shrink-0 w-[260px] justify-end">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-emerald-800/70 hover:text-emerald-800 hover:bg-emerald-50 transition-all duration-200" aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-emerald-800/70 hover:text-emerald-800 hover:bg-emerald-50 transition-all duration-200" aria-label="Account">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-emerald-800/70 hover:text-emerald-800 hover:bg-emerald-50 transition-all duration-200" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* NAV ROW — elegant underline style */}
        <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e8e5df', borderBottom: '2px solid #16a34a' }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <nav className="flex items-center justify-center gap-1">
              {navLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && setActiveMenu(idx)}
                >
                  <a
                    href={link.link}
                    className={`relative flex items-center gap-1 px-5 py-3.5 text-[13px] font-semibold uppercase tracking-widest whitespace-nowrap transition-colors duration-200 group ${
                      link.highlight
                        ? 'text-emerald-600 hover:text-emerald-700'
                        : 'text-gray-700 hover:text-emerald-700'
                    }`}
                  >
                    {link.name}
                    {link.megaMenu && <ChevronDown size={12} className={`transition-transform duration-200 ${activeMenu === idx ? 'rotate-180' : ''}`} />}
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>

                  {/* Mega Menu dropdown */}
                  {link.megaMenu && activeMenu === idx && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[480px] bg-white rounded-b-2xl shadow-2xl p-7 z-[200] border border-gray-100" style={{ animation: 'fadeDown 0.2s ease' }}>
                      <div className="flex gap-10">
                        {link.megaMenu.map((col, colIdx) => (
                          <div key={colIdx} className="min-w-[140px]">
                            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider pb-2 mb-2 border-b-2 border-emerald-100">{col.title}</h4>
                            <ul className="space-y-1">
                              {col.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <a href={item.link} className="block py-1.5 text-[13px] text-gray-500 hover:text-emerald-600 hover:pl-1 transition-all duration-200">{item.name}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ═══════ MOBILE HEADER — compact ═══════ */}
      <div className="md:hidden" style={{ background: '#fff', borderBottom: '2px solid #16a34a' }}>
        {/* Single row: menu | logo+tagline | icons */}
        <div className="flex items-center justify-between px-3 h-[60px]">
          <button aria-label="Menu" onClick={() => setIsMobileMenuOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <Menu size={20} strokeWidth={1.5} className="text-gray-700" />
          </button>

          <a href="/" className="relative h-[52px] w-[110px] mx-auto">
            <Image
              src="/logo.png"
              alt="Bgiya Bliss"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </a>

          <div className="flex items-center gap-0.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-[15px] h-[15px] rounded-full bg-emerald-600 text-white text-[8px] font-bold flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Compact Search */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search plants, soil, pots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-full text-[13px] outline-none bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setSearchQuery('')}><X size={12} /></button>
            )}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map(product => (
                      <a href={`/products/${product.slug}`} key={product.id} className="flex gap-3 px-3 py-2 hover:bg-emerald-50 rounded-lg" onClick={() => setSearchQuery('')}>
                        <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={product.image || product.images?.[0] || '/product-plants.png'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                          <p className="text-sm font-bold text-emerald-600">₹{(product.salePrice || 0).toLocaleString()}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">No results</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Menu Drawer — rendered via portal to avoid header stacking context */}
      {typeof window !== 'undefined' && isMobileMenuOpen && createPortal(
        <MobileMenuDrawer
          navLinks={navLinks}
          onClose={() => setIsMobileMenuOpen(false)}
        />,
        document.body
      )}
    </>
  );
}
