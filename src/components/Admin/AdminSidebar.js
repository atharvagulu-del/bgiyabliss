'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Leaf, ChevronRight, Plus, ExternalLink, Tag, Users, Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './AdminSidebar.module.css';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Promo Codes', href: '/admin/promos', icon: Tag },
  { label: 'Affiliates', href: '/admin/affiliates', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/admin/login';
  };

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className={styles.mobileToggleBtn}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        {/* Mobile Close Button (inside sidebar) */}
        <button 
          className={styles.mobileCloseBtn}
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Leaf size={18} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Bgiya Bliss</span>
            <span className={styles.brandLabel}>Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <span className={styles.navLabel}>Menu</span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              >
              <Icon size={17} />
              <span>{item.label}</span>
              {active && <ChevronRight size={14} className={styles.chevron} />}
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="/admin/products/new" className={styles.addProductBtn}>
          <Plus size={14} /> New Product
        </Link>
      </div>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.footerLink} target="_blank">
          <ExternalLink size={15} /> View Store
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
