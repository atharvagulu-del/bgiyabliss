'use client';
import styles from './AnnouncementBar.module.css';

const messages = [
  '🚚 Free Delivery Above ₹499 | Shop Now',
  '🌿 Premium Organic Potting Mix starting ₹249!',
  '⚡ Next Day Delivery Available',
  '🎉 Flat 30% Off on First Order | Use: BLISS30',
  '🌱 100% Organic | Made in India',
];

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        {[...messages, ...messages].map((msg, i) => (
          <a key={i} href="/collections/offers" className={styles.message}>
            {msg}
          </a>
        ))}
      </div>
    </div>
  );
}
