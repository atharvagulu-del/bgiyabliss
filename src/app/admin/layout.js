'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import './admin.css';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  const ADMIN_EMAIL = 'bgiyabliss73@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);

      if (!currentUser && !isLoginPage) {
        router.push('/admin/login');
      } else if (currentUser && currentUser.email !== ADMIN_EMAIL && !isLoginPage) {
        alert("Access Denied: You do not have admin privileges.");
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [isLoginPage, router]);

  // Show loading while checking auth
  if (checking) {
    return (
      <div className="adminBody" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="adminSpinner"></div>
      </div>
    );
  }

  // Login page — no sidebar
  if (isLoginPage) {
    return <div className="adminBody">{children}</div>;
  }

  // Not logged in or not admin — will redirect via useEffect
  if (!user || (user && user.email !== ADMIN_EMAIL)) {
    return (
      <div className="adminBody" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="adminSpinner"></div>
      </div>
    );
  }

  // Authenticated admin layout
  return (
    <div className="adminBody">
      <div className="adminLayout">
        <AdminSidebar />
        <div className="adminMain">
          {children}
        </div>
      </div>
    </div>
  );
}
