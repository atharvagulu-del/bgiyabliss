'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Leaf, ChevronRight } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './AdminSidebar.module.css';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/admin/login';
  };

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <Leaf size={22} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Bgiya Bliss</span>
          <span className={styles.brandLabel}>Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <span className={styles.navLabel}>Main Menu</span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {active && <ChevronRight size={16} className={styles.chevron} />}
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="/admin/products/new" className={styles.addProductBtn}>
          + Add New Product
        </Link>
      </div>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.footerLink} target="_blank">
          View Store →
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
