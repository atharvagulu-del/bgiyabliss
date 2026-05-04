'use client';
import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartConfetti() {
  const { showConfetti } = useCart();
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!showConfetti) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#16a34a', '#059669', '#f59e0b', '#ef4444', '#8b5cf6',
      '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#fbbf24',
      '#34d399', '#a78bfa', '#fb7185', '#facc15',
    ];
    const particles = [];

    function createBurst(originX, originY, count) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 160 - 80) * (Math.PI / 180);
        const speed = Math.random() * 16 + 7;
        particles.push({
          x: originX + (Math.random() * 60 - 30),
          y: originY,
          vx: Math.sin(angle) * speed,
          vy: -Math.cos(angle) * speed,
          size: Math.random() * 7 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotSpeed: Math.random() * 10 - 5,
          opacity: 1,
          shape: Math.random() > 0.6 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
        });
      }
    }

    // Main burst from bottom center
    createBurst(canvas.width / 2, canvas.height + 5, 100);

    // Side bursts from bottom corners
    createBurst(canvas.width * 0.2, canvas.height + 5, 40);
    createBurst(canvas.width * 0.8, canvas.height + 5, 40);

    function drawStar(ctx, size) {
      const spikes = 5;
      const outerR = size;
      const innerR = size / 2;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(0, -outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outerR, Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(Math.cos(rot) * innerR, Math.sin(rot) * innerR);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        p.vy += 0.22;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height - 20) p.opacity -= 0.03;
        if (p.opacity <= 0) continue;
        alive = true;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'star') {
          drawStar(ctx, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [showConfetti]);

  if (!showConfetti) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
