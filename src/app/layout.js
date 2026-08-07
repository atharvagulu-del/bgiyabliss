import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
export const metadata = {
  title: 'Bgiya Bliss | India\'s Premium Online Plant Store',
  description: 'Shop the best plants, seeds, pots & gardening products online at Bgiya Bliss. Flat 20% off on orders above ₹1099!',
  keywords: 'plants, indoor plants, seeds, pots, planters, gardening, plant care, buy plants online, Bgiya Bliss',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/videos/hero-compressed.mp4" as="video" type="video/mp4" />
      </head>
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
