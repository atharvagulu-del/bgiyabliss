import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import CartConfetti from '@/components/CartConfetti/CartConfetti';

export default function StoreLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <CartConfetti />
    </>
  );
}
