'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import GoogleAuthButton from '@/components/GoogleAuthButton/GoogleAuthButton';
import styles from './page.module.css';

import { Suspense } from 'react';

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/account';
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      router.push(returnUrl);
    }
  }, [user, authLoading, router, returnUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    // AuthContext will handle redirect
  };

  if (authLoading || user) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#16a34a" size={32} />
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
      <p className={styles.subtitle}>{isLogin ? 'Sign in to access your account and wishlist' : 'Join Bgiya Bliss for exclusive perks'}</p>

      <div style={{ marginBottom: '20px' }}>
        <GoogleAuthButton onSuccess={handleLoginSuccess} text={isLogin ? "Sign in with Google" : "Sign up with Google"} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#9ca3af', fontSize: '14px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        <span style={{ margin: '0 10px' }}>or continue with email</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            className={styles.input} 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" 
            className={styles.input} 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className={styles.toggleMode}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className={styles.toggleBtn} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#16a34a" size={32} />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
