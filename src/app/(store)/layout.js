import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import CartDrawer from '@/components/CartDrawer/CartDrawer';

export default function StoreLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      <CartDrawer />
    </>
  );
}
