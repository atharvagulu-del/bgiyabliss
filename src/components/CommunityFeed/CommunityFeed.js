'use client';
import { useRef, useState, useEffect } from 'react';
import { Instagram, ChevronLeft, ChevronRight, Volume2, VolumeX, ShoppingBag } from 'lucide-react';

const reels = [
  { id: 1, src: 'https://bgiya-bliss.pages.dev/reels/reel-1.mp4', handle: '@sivan.mai', link: 'https://www.instagram.com/reels/DXO50iApaFn/' },
  { id: 2, src: 'https://bgiya-bliss.pages.dev/reels/reel-2.mp4', handle: '@anokha_aangan', link: 'https://www.instagram.com/reels/DXiwYfMjrqd/' },
  { id: 3, src: 'https://bgiya-bliss.pages.dev/reels/reel-3.mp4', handle: '@priyanka_vazhkai', link: 'https://www.instagram.com/reels/DYXRLLoJLIG/' },
  { id: 4, src: 'https://bgiya-bliss.pages.dev/reels/reel-4.mp4', handle: '@_miniblooms', link: 'https://www.instagram.com/reels/DXV4GBZiC4W/' },
  { id: 5, src: 'https://bgiya-bliss.pages.dev/reels/reel-5.mp4', handle: '@nature247natural', link: 'https://www.instagram.com/reels/DWY-aIXjZ8N/' },
  { id: 6, src: 'https://bgiya-bliss.pages.dev/reels/reel-6.mp4', handle: '@gharkibagia', link: 'https://www.instagram.com/reels/DZ4Xmryg_rR/' },
  { id: 7, src: 'https://bgiya-bliss.pages.dev/reels/reel-7.mp4', handle: '@bunnyorganics73', link: 'https://www.instagram.com/reels/DWJB34bk2Me/' },
  { id: 8, src: 'https://bgiya-bliss.pages.dev/reels/reel-8.mp4', handle: '@bgiyabliss', link: 'https://www.instagram.com/bgiyabliss/' },
  { id: 9, src: 'https://bgiya-bliss.pages.dev/reels/reel-9.mp4', handle: '@bgiyabliss', link: 'https://www.instagram.com/bgiyabliss/' },
  { id: 10, src: 'https://bgiya-bliss.pages.dev/reels/reel-10.mp4', handle: '@bgiyabliss', link: 'https://www.instagram.com/bgiyabliss/' },
  { id: 11, src: 'https://bgiya-bliss.pages.dev/reels/reel-11.mp4', handle: '@bgiyabliss', link: 'https://www.instagram.com/bgiyabliss/' },
  { id: 12, src: 'https://bgiya-bliss.pages.dev/reels/reel-12.mp4', handle: '@bgiyabliss', link: 'https://www.instagram.com/bgiyabliss/' },
];

function VideoCard({ reel }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Autoplay when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="snap-start shrink-0 w-[200px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 relative group cursor-pointer"
      onClick={() => setIsMuted(m => !m)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.src}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      />

      {/* Gradients */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      {/* Sound indicator */}
      <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80">
        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
      </div>

      {/* ═══ SHOP NOW — always visible ═══ */}
      <a
        href="/collections/all"
        className="absolute left-3 right-3 bottom-[52px] flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-[11px] font-bold no-underline shadow-lg transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <ShoppingBag size={13} /> Shop Now
      </a>

      {/* ═══ USER HANDLE — always visible, links to IG ═══ */}
      <a
        href={reel.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2.5 left-3 right-3 flex items-center gap-2 no-underline"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-7 h-7 rounded-full border border-white/30 p-px shrink-0">
          <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Instagram size={11} className="text-white" />
          </div>
        </div>
        <p className="text-white font-semibold text-[11px] truncate drop-shadow-md m-0">
          {reel.handle}
        </p>
      </a>
    </div>
  );
}

export default function CommunityFeed() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 md:py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Trending</span>
            </div>
            <h2 className="text-xl md:text-3xl font-bold font-heading text-gray-900 tracking-tight">
              Real Gardeners, Real Results 🌱
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              See what plant parents across India are growing with Bgiya Bliss
            </p>
          </div>
          <a
            href="https://instagram.com/bgiyabliss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-5 py-2.5 rounded-full font-semibold text-xs hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 shadow-md w-fit shrink-0 transform hover:-translate-y-0.5"
          >
            <Instagram size={16} /> Follow @bgiyabliss
          </a>
        </div>

        {/* Scrollable Video Carousel */}
        <div className="relative group -mx-4 px-4 md:mx-0 md:px-0">
          <div
            className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel) => (
              <VideoCard key={reel.id} reel={reel} />
            ))}
            <div className="min-w-[1px] shrink-0" aria-hidden="true" />
          </div>

          {/* Nav arrows */}
          <button
            className="hidden md:flex absolute -left-5 top-[45%] -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(-1)}
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="hidden md:flex absolute -right-5 top-[45%] -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(1)}
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
