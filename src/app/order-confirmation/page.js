'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';

/* ── Confetti Burst from Bottom ── */
function ConfettiBurst() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#16a34a', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#fbbf24'];
    const particles = [];

    // Single burst from bottom center
    for (let i = 0; i < 120; i++) {
      const angle = (Math.random() * 120 - 60) * (Math.PI / 180); // spread -60° to +60° upward
      const speed = Math.random() * 14 + 8;
      particles.push({
        x: canvas.width / 2 + (Math.random() * 100 - 50),
        y: canvas.height + 10,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed,
        size: Math.random() * 7 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 8 - 4,
        opacity: 1,
        isRect: Math.random() > 0.5,
      });
    }

    let animId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        p.vy += 0.25; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height - 50) p.opacity -= 0.03;
        if (p.opacity <= 0) continue;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.isRect) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }} />
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'N/A';

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f9fafb' }}>

      <ConfettiBurst />

      <div style={{ maxWidth: 540, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Success Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: '#ecfdf5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: '0 0 0 8px rgba(16,185,129,0.08)',
          animation: 'popIn 0.5s ease',
        }}>
          <CheckCircle2 size={40} style={{ color: '#059669' }} />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 8, fontFamily: 'var(--font-heading)' }}>
          Order Placed Successfully!
        </h1>
        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Thank you for your order. We&apos;ll start preparing it right away.
        </p>

        {/* Order Card */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0',
          textAlign: 'left', marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Package size={20} style={{ color: '#059669' }} />
            <span style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>Order Details</span>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Order ID</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#111', fontFamily: 'monospace', letterSpacing: 0.5 }}>{orderId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Status</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '3px 10px', borderRadius: 20 }}>Pending</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Estimated Delivery</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>3-5 business days</span>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div style={{
          background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 12,
          padding: '14px 18px', fontSize: 13, color: '#1e40af', lineHeight: 1.5,
          marginBottom: 32, textAlign: 'left',
        }}>
          📱 We&apos;ll send order updates to your phone number. For any queries, reach us on WhatsApp.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', background: '#059669', color: '#fff',
              borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(5,150,105,0.25)', transition: 'background 0.2s',
            }}
          >
            <Home size={18} /> Continue Shopping
          </a>
          <a
            href="/collections/all"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', background: '#fff', color: '#374151',
              borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: 'none',
              border: '1.5px solid #e5e7eb', transition: 'all 0.2s',
            }}
          >
            Browse Products <ArrowRight size={16} />
          </a>
        </div>

        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
