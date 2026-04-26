'use client';
import styles from './AnnouncementBar.module.css';

const messages = [
  '🎉 Flat 20% Off on Orders Above ₹1099 | Use: BLISS20',
  '⚡ Flat 10% Off on Your First Order | Use: BLISS10',
  '🌿 Premium Organic Potting Mix starting ₹249!',
  '🌱 100% Organic | Made in India',
  '🎉 Flat 20% Off on Orders Above ₹1099 | Use: BLISS20',
  '⚡ Flat 10% Off on Your First Order | Use: BLISS10',
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
