'use client';
import { useRef, useState, useEffect } from 'react';
import { Instagram, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const reels = [
  { id: 1, src: '/reels/reel-1.mp4', handle: '@plant._.perfect' },
  { id: 2, src: '/reels/reel-2.mp4', handle: '@aasanbagwani' },
  { id: 3, src: '/reels/reel-3.mp4', handle: '@nita_singhs_dil_ki_baat' },
  { id: 5, src: '/reels/reel-5.mp4', handle: '@botani.cal_girl' },
];

function VideoCard({ reel }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="snap-start shrink-0 w-[240px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 relative group cursor-pointer" onClick={toggleMute}>
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.src}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      
      {/* Dark Overlay for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Play/Sound indicator */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </div>

      {/* User Info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 p-0.5 relative shrink-0">
          <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex flex-col items-center justify-center">
            <Instagram size={18} className="text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate drop-shadow-md">
            {reel.handle}
          </p>
          <p className="text-white/80 text-xs drop-shadow-md">Instagram Reel</p>
        </div>
      </div>
    </div>
  );
}

export default function CommunityFeed() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-gray-900 tracking-tight">
              Join Our Community
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Inspiration from plant lovers across India.
            </p>
          </div>
          <a 
            href="https://instagram.com/bgiyabliss" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 shadow-md w-fit shrink-0 transform hover:-translate-y-0.5"
          >
            <Instagram size={18} /> @bgiyabliss
          </a>
        </div>
        
        {/* Scrollable Native Video Carousel */}
        <div className="relative group -mx-4 px-4 md:mx-0 md:px-0">
          <div 
            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel) => (
              <VideoCard key={reel.id} reel={reel} />
            ))}
            {/* spacer for end padding */}
            <div className="min-w-[1px] shrink-0" aria-hidden="true" />
          </div>

          {/* Nav arrows */}
          <button 
            className="hidden md:flex absolute -left-5 top-[45%] -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(-1)} 
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="hidden md:flex absolute -right-5 top-[45%] -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
            onClick={() => scroll(1)} 
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
