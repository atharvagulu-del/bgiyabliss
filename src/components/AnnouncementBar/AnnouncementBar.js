'use client';
import { useEffect, useState } from 'react';
import styles from './AnnouncementBar.module.css';
import { getStoreSettings } from '@/lib/firestore';

const defaultMessages = [
  '🎉 Flat 15% Off on Orders Above ₹1099 | Use: BLISS15',
  '⚡ 10% Off on Your First Prepaid Order | Use: BLISS10',
  '🌿 Premium Organic Potting Mix starting ₹249!',
  '🌱 100% Organic | Made in India',
  '📞 Support: 9 AM - 6 PM | Mon-Sat',
];

export default function AnnouncementBar() {
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getStoreSettings();
      if (settings?.announcementMessages?.length > 0) {
        setMessages(settings.announcementMessages);
      }
    }
    loadSettings();
  }, []);

  const displayMessages = [...messages, ...messages];

  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        {displayMessages.map((msg, i) => (
          <a key={i} href="/collections/offers" className={styles.message}>
            {msg}
          </a>
        ))}
      </div>
    </div>
  );
}
