'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X } from 'lucide-react';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import styles from './DiscountPopup.module.css';

export default function DiscountPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    // If the user is already logged in, do not show
    if (loading || user) return;

    // Check if the user has already seen it during this visit
    const hasSeenPopup = sessionStorage.getItem('bgiyaBliss_hasSeenDiscountPopup');
    if (hasSeenPopup) return;
    
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('bgiyaBliss_hasSeenDiscountPopup', 'true');
    }, 10000);

    return () => clearTimeout(timer);
  }, [user, loading]);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button 
          className={styles.closeButton} 
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>
            Sign in now to begin your organic journey today!
          </h2>
          
          <div className={styles.formContainer}>
            <GoogleAuthButton 
              onSuccess={() => {
                setIsVisible(false);
              }}
            />
          </div>

          <p className={styles.terms}>
            By logging in, you're agreeing to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
}
