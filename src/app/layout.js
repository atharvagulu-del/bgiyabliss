import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Bgiya Bliss | India\'s Premium Online Plant Store',
  description: 'Shop the best plants, seeds, pots & gardening products online at Bgiya Bliss. Free delivery on orders above ₹499.',
  keywords: 'plants, indoor plants, seeds, pots, planters, gardening, plant care, buy plants online, Bgiya Bliss',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/videos/hero-compressed.mp4" as="video" type="video/mp4" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
