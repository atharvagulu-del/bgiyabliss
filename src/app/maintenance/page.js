import Image from 'next/image';

export const metadata = { title: 'Bgiya Bliss | Be Right Back' };

export default function MaintenancePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ backgroundColor: 'white', padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center' }}>
        <Image src="/logo.png" alt="Bgiya Bliss Logo" width={150} height={50} style={{ objectFit: 'contain' }} />
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', backgroundColor: '#dcfce7', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <svg style={{ width: '32px', height: '32px', color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>

          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            We're Currently Upgrading Our Store!
          </h1>
          
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem', lineHeight: '1.6' }}>
            We are working on fixing a few technical issues to improve your shopping experience. You can still order our premium plant care products through our official Amazon store or directly via WhatsApp!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a 
              href="https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B0GHZVD45L&me=A1TNQXGYWYWTXX"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                backgroundColor: '#FF9900', color: 'white', padding: '1rem', borderRadius: '0.5rem',
                textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', transition: 'background-color 0.2s'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                <path d="M14.99 7.64c-2.47-1.12-5.71-1.63-8.81-1.63-2.61 0-5.06.41-6.18.66v2.17c1.37-.29 3.9-.76 6.33-.76 4.3 0 7.21 1.05 8.66 2.05z" />
                <path d="M22.95 19.38c-2.09 1.4-5.26 2.62-9.28 2.62-4.14 0-7.38-1.2-9.48-2.58l1.45-2.06c1.78 1.15 4.6 2.19 8.03 2.19 3.92 0 6.64-1.07 8.35-2.1l.93 1.93z" />
                <path d="M19.7 15.65c-.15.42-.42.92-1.24.92-.6 0-1-.38-1.2-1.02-.13-.39-.17-.98-.17-1.57V8.58c0-.62-.35-1.1-1.12-1.1-.8 0-1.2.53-1.2 1.15v5.52c0 .64-.02 1.34-.23 1.83-.34.78-1.02 1.15-1.87 1.15-.9 0-1.58-.38-1.92-1.16-.21-.49-.23-1.19-.23-1.83V8.58c0-.62-.35-1.1-1.12-1.1-.8 0-1.2.53-1.2 1.15v5.52c0 .64-.02 1.34-.23 1.83-.34.78-1.02 1.15-1.87 1.15-.9 0-1.58-.38-1.92-1.16-.21-.49-.23-1.19-.23-1.83V8.58c0-.62-.35-1.1-1.12-1.1-.8 0-1.2.53-1.2 1.15v5.55c0 1.25.32 2.21 1.03 2.87.75.7 1.82 1.05 3.03 1.05 1.55 0 2.82-.57 3.58-1.53.7.9 1.88 1.53 3.33 1.53 1.26 0 2.37-.38 3.16-1.1.75-.7 1.1-1.68 1.1-2.92V8.65c0-1.3-.9-2.05-2.22-2.05-1.25 0-2.1.65-2.1 1.82v7.23z" />
              </svg>
              Order from Amazon
            </a>

            <a 
              href="https://wa.me/919571389234?text=Hi Bgiya Bliss, I would like to place an order."
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                backgroundColor: '#25D366', color: 'white', padding: '1rem', borderRadius: '0.5rem',
                textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', transition: 'background-color 0.2s'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact Us on WhatsApp (+91 9571389234)
            </a>
          </div>
        </div>
      </main>

      <footer style={{ padding: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} Bgiya Bliss. All rights reserved.
      </footer>
    </div>
  );
}
