'use client';
import { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import styles from './PhoneAuthForm.module.css';

export default function PhoneAuthForm({ onSuccess, onCancel, buttonText = "Sign In" }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Enter Phone, 2 = Enter OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaWrapperRef = useRef(null);

  useEffect(() => {
    // Initialize Recaptcha only when component mounts on client
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setError("reCAPTCHA expired. Please try again.");
        }
      });
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation for Indian phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const formattedNumber = `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const confResult = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(confResult);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send OTP. Please try again.");
      if (window.recaptchaVerifier) window.recaptchaVerifier.render().then(widgetId => grecaptcha.reset(widgetId));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await confirmationResult.confirm(otp);
      // User is signed in
      if (onSuccess) onSuccess(result.user);
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div id="recaptcha-container" ref={recaptchaWrapperRef}></div>
      
      {error && <div className={styles.error}>{error}</div>}

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.phoneInputWrapper}>
              <span className={styles.countryCode}>+91</span>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={styles.input}
                disabled={loading}
                autoFocus
              />
            </div>
          </div>
          <button type="submit" disabled={loading || phoneNumber.length < 10} className={styles.button}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : buttonText}
          </button>
          
          {onCancel && (
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
          )}
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className={styles.form}>
          <p className={styles.otpMessage}>OTP sent to +91 {phoneNumber}</p>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={styles.input}
              style={{ textAlign: 'center', letterSpacing: '0.2em' }}
              disabled={loading}
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading || otp.length < 6} className={styles.button}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Verify OTP"}
          </button>
          
          <button 
            type="button" 
            onClick={() => { setStep(1); setOtp(''); setError(''); }} 
            className={styles.cancelBtn}
            disabled={loading}
          >
            Change Number
          </button>
        </form>
      )}
    </div>
  );
}
