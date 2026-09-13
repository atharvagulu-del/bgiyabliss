import Image from 'next/image';

export const metadata = {
  title: 'Bgiya Bliss | Premium Plant Care',
};

export default function MaintenancePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Minimal Header */}
      <header style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <Image src="/logo.png" alt="Bgiya Bliss" width={160} height={55} style={{ objectFit: 'contain' }} />
      </header>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        
        <div style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Subtle icon/graphic */}
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'float 3s ease-in-out infinite' 
          }}>
            🌱
          </div>

          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: '800', 
            color: '#0f172a',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            lineHeight: '1.2'
          }}>
            We're taking a short break to upgrade your experience.
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#475569', 
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Our store is undergoing scheduled maintenance to bring you an even better shopping experience. In the meantime, all our premium products are still available!
          </p>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px' 
          }}>
            {/* Real-looking Amazon Button */}
            <a 
              href="https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B0GHZVD45L&me=A1TNQXGYWYWTXX"
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                backgroundColor: '#FFD814', // Official Amazon Yellow
                color: '#0F1111', // Official Amazon Dark Text
                padding: '14px 24px', 
                borderRadius: '100px', // Pill shape like Amazon's buy button
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '1.05rem',
                border: '1px solid #FCD200',
                boxShadow: '0 2px 5px rgba(15,17,17,0.15)',
                transition: 'all 0.2s'
              }}
            >
              Order on 
              {/* Amazon Text Logo SVG */}
              <svg viewBox="0 0 100 30" style={{ height: '22px', marginTop: '3px' }} fill="#0F1111">
                <path d="M60.2,21.5c-0.2,0.1-0.4,0.1-0.6,0.1c-0.9,0-1.6-0.3-2.1-0.8c-0.5-0.5-0.7-1.3-0.7-2.3v-6.9h-1.9v-2.3h1.9V6.4h2.7v2.9h3 v2.3h-3v6.3c0,0.5,0.1,0.9,0.2,1.1c0.2,0.2,0.5,0.3,1.1,0.3c0.4,0,0.7-0.1,0.9-0.2L60.2,21.5z"/>
                <path d="M47.7,21.5c-1.4,0-2.6-0.5-3.5-1.4c-0.9-1-1.3-2.3-1.3-3.9c0-1.6,0.4-2.9,1.3-3.9c0.9-0.9,2-1.4,3.5-1.4 c1.4,0,2.6,0.5,3.5,1.4c0.9,1,1.3,2.3,1.3,3.9c0,1.6-0.4,2.9-1.3,3.9C50.2,21.1,49.1,21.5,47.7,21.5z M47.7,13.2 c-0.6,0-1.1,0.3-1.4,0.8c-0.4,0.5-0.5,1.3-0.5,2.2c0,1,0.2,1.7,0.5,2.2c0.4,0.5,0.8,0.8,1.4,0.8c0.6,0,1.1-0.3,1.4-0.8 c0.4-0.5,0.5-1.3,0.5-2.2c0-1-0.2-1.7-0.5-2.2C48.8,13.4,48.3,13.2,47.7,13.2z"/>
                <path d="M78.6,21.5c-1.4,0-2.6-0.5-3.5-1.4c-0.9-1-1.3-2.3-1.3-3.9c0-1.6,0.4-2.9,1.3-3.9c0.9-0.9,2-1.4,3.5-1.4 c1.4,0,2.6,0.5,3.5,1.4c0.9,1,1.3,2.3,1.3,3.9c0,1.6-0.4,2.9-1.3,3.9C81.1,21.1,80,21.5,78.6,21.5z M78.6,13.2 c-0.6,0-1.1,0.3-1.4,0.8c-0.4,0.5-0.5,1.3-0.5,2.2c0,1,0.2,1.7,0.5,2.2c0.4,0.5,0.8,0.8,1.4,0.8c0.6,0,1.1-0.3,1.4-0.8 c0.4-0.5,0.5-1.3,0.5-2.2c0-1-0.2-1.7-0.5-2.2C79.7,13.4,79.2,13.2,78.6,13.2z"/>
                <path d="M11.9,13.5c-0.7-1.7-2.1-2.6-4.1-2.6C4.8,10.9,3,13,3,16c0,3,1.8,5.4,4.7,5.4c2.2,0,3.6-1.1,4.2-3v2.8h2.6v-10h-2.6V13.5z M7.7,19.2c-1.4,0-2.2-1.1-2.2-3.1c0-1.9,0.8-3,2.1-3c1.3,0,2.1,1.2,2.1,3.1C9.8,18,9.1,19.2,7.7,19.2z"/>
                <path d="M30.7,10.9v10.3h2.6V14.1c0-1.8,0.9-2.9,2.4-2.9c1,0,1.8,0.5,2.1,1.6c0.1,0.3,0.1,0.8,0.1,1.3v7h2.6v-7.1 c0-1.8,0.9-2.9,2.4-2.9c1,0,1.8,0.5,2.1,1.6c0.1,0.3,0.1,0.8,0.1,1.3v7H48V13.7c0-1.9-1.2-2.9-3.4-2.9c-1.3,0-2.4,0.5-3,1.6 c-0.6-1-1.8-1.6-3.2-1.6c-1.2,0-2.3,0.5-2.9,1.4v-1.2H30.7z"/>
                <path d="M68.8,13.3c-1-1.6-2.5-2.4-4.2-2.4c-2.9,0-4.8,2-4.8,5.1c0,3.1,1.9,5.5,4.7,5.5c1.7,0,3.2-0.8,4.1-2.4v2h2.6V11.2h-2.6V13.3 z M64.6,19.3c-1.3,0-2.1-1.2-2.1-3.2c0-2,0.8-3.1,2.1-3.1c1.3,0,2.2,1.2,2.2,3.1C66.8,18.1,66,19.3,64.6,19.3z"/>
                <path d="M96.6,10.9h-2.5v1.2c-0.6-0.9-1.8-1.4-3.1-1.4c-2.1,0-3.3,1.1-3.3,2.8c0,1.4,0.8,2.4,2.5,2.8l2,0.4 c0.7,0.2,1.1,0.4,1.1,0.9c0,0.5-0.5,0.9-1.5,0.9c-1,0-1.8-0.3-2.5-0.8l-1.3,1.9c1.1,0.8,2.5,1.1,3.8,1.1c2.1,0,4.1-0.9,4.1-3.2 c0-1.6-0.9-2.4-2.4-2.8l-1.7-0.4c-0.8-0.2-1.1-0.5-1.1-1c0-0.5,0.4-0.8,1.2-0.8c0.9,0,1.6,0.3,2.1,0.7L96.6,10.9z"/>
                <path d="M16.5,22.1c0,0,5.7,2,14.6,2.3c6,0.2,12.5-0.8,18.4-4c0,0,1.4-0.8,0.3,0.3c-1,1.1-3,2.6-5.8,4.1 c-4.2,2.3-9.5,3.6-15,3.4C22.6,27.9,16.5,25.2,16.5,22.1z" fill="#FF9900"/>
                <path d="M49.2,19.2c-1-0.7-1.4,0.1-0.8,0.7c1,0.8,3,2,5.1,1.9c1.9-0.1,3-1.6,3.1-1.7c0.4-0.7-0.7-0.7-1.3-0.5 C53.5,20.1,50.8,20,49.2,19.2z" fill="#FF9900"/>
              </svg>
            </a>

            {/* Clean WhatsApp Button */}
            <a 
              href="https://wa.me/919571389234?text=Hi Bgiya Bliss, I would like to place an order."
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                backgroundColor: 'white', 
                color: '#16a34a', // Emerald Green text
                padding: '14px 24px', 
                borderRadius: '100px',
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '1.05rem',
                border: '1.5px solid #16a34a',
                transition: 'all 0.2s'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message Us on WhatsApp
            </a>
          </div>
          
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            or call us directly at <a href="tel:+919571389234" style={{ color: '#16a34a', textDecoration: 'none' }}>+91 9571389234</a>
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        color: '#94a3b8', 
        fontSize: '0.875rem' 
      }}>
        &copy; {new Date().getFullYear()} Bgiya Bliss. All rights reserved.
      </footer>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
