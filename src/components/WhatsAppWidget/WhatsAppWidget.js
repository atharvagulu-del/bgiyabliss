'use client';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppWidget.module.css';

export default function WhatsAppWidget() {
  // Using the number from previous context
  const phoneNumber = "917737976414";
  const message = "Hi Bgiya Bliss! I need some help with...";

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.widget} !bg-green-500 hover:!bg-green-600 transition-colors`} 
      aria-label="Chat on WhatsApp"
      style={{ backgroundColor: '#25D366' }}
    >
      <div className={styles.rings}></div>
      <div className={styles.iconContainer}>
        <MessageCircle size={28} />
      </div>
      <span className={styles.tooltip}>
        <strong>Need Help?</strong>
        <span>Chat with us on WhatsApp!</span>
      </span>
    </a>
  );
}
