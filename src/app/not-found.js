'use client';
import Link from 'next/link';
import { Leaf, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f7f5f0',
      textAlign: 'center',
      fontFamily: 'var(--font-body), sans-serif'
    }}>
      <div style={{ color: '#16a34a', marginBottom: '24px' }}>
        <Leaf size={64} strokeWidth={1.5} />
      </div>
      
      <h1 style={{ 
        fontSize: '120px', 
        fontWeight: '900', 
        color: '#111', 
        lineHeight: 1,
        fontFamily: 'var(--font-heading), sans-serif',
        margin: '0 0 16px 0',
        letterSpacing: '-0.05em'
      }}>
        404
      </h1>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#374151',
        marginBottom: '12px'
      }}>
        Oops! Looks like you've wandered off the garden path.
      </h2>
      
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        maxWidth: '500px',
        margin: '0 auto 32px auto',
        lineHeight: 1.6
      }}>
        We can't seem to find the page you're looking for. It might have been uprooted, moved, or never planted in the first place.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '15px',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
        >
          <Home size={18} /> Back to Homepage
        </Link>
        
        <Link href="/collections/all" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'white',
          color: '#374151',
          padding: '14px 28px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '15px',
          border: '1px solid #d1d5db',
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#9ca3af'; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#d1d5db'; }}
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
