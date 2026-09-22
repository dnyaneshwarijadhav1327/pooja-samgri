'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Volume2, VolumeX, X, Play, ShoppingBag } from 'lucide-react';

// ==========================================
// 🛠️ CONFIGURATION SETTINGS
// ==========================================
// Change destination link when video is clicked
const PROMO_VIDEO_LINK = '/shop';

// Change video path to your vertical 9:16 video in public folder
const PROMO_VIDEO_SRC = '/videos/pooja-promo.mp4';
const FALLBACK_VIDEO_SRC = 'https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4';

export default function FloatingPromoVideo() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isClosed, setIsClosed] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState(PROMO_VIDEO_SRC);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const closedPref = localStorage.getItem('poojaPromoVideoClosed');
      if (closedPref !== 'true') {
        setIsClosed(false);
      }
    } catch (e) {
      setIsClosed(false);
    }
  }, []);

  // Handle Video Autoplay
  useEffect(() => {
    if (!isClosed && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay
      });
    }
  }, [isClosed]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosed(true);
    try {
      localStorage.setItem('poojaPromoVideoClosed', 'true');
    } catch (e) {}
  };

  const handleReopen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosed(false);
    try {
      localStorage.removeItem('poojaPromoVideoClosed');
    } catch (e) {}
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    router.push(PROMO_VIDEO_LINK);
  };

  const handleVideoError = () => {
    // If /videos/pooja-promo.mp4 is not found, fallback to sample video URL
    if (videoSrc !== FALLBACK_VIDEO_SRC) {
      setVideoSrc(FALLBACK_VIDEO_SRC);
    }
  };

  return (
    <>
      {/* 1. REOPEN BUTTON (When Video is Closed) */}
      {isClosed && (
        <button
          onClick={handleReopen}
          aria-label="Reopen Promotional Video"
          className="fixed bottom-20 right-5 z-40 w-11 h-11 rounded-full bg-[#4A0E17] text-[#FAF6EE] border-2 border-[#D97706] shadow-xl hover:bg-[#380B12] hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          title="Watch Sacred Samagri Promo Video"
        >
          <Play className="w-5 h-5 fill-current text-[#D97706] ml-0.5 group-hover:scale-110 transition-transform" />
          <span className="sr-only">Reopen Promo Video</span>
        </button>
      )}

      {/* 2. FLOATING PROMOTIONAL VIDEO PLAYER */}
      {!isClosed && (
        <div
          className="fixed bottom-[70px] right-5 z-40 w-[130px] sm:w-[180px] h-[230px] sm:h-[320px] rounded-2xl overflow-hidden bg-[#380B12] border-2 border-[#D97706] shadow-2xl transition-all duration-300 transform animate-fade-in group cursor-pointer"
          onClick={handleVideoClick}
          role="button"
          tabIndex={0}
          aria-label="Click to shop featured pooja samagri"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleVideoClick(e as any);
          }}
        >
          {/* Vertical Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onError={handleVideoError}
            className="w-full h-full object-cover select-none"
          />

          {/* Top Gradient Overlay */}
          <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* TOP RIGHT: CLOSE BUTTON */}
          <button
            onClick={handleClose}
            aria-label="Close floating video"
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-[#FAF6EE] hover:bg-[#4A0E17] hover:text-white transition-colors"
            title="Close Video"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* TOP LEFT: MUTE / UNMUTE SOUND CONTROL */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
            className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/50 text-[#FAF6EE] hover:bg-[#D97706] transition-colors"
            title={isMuted ? 'Click to Unmute' : 'Muted'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-stone-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#D97706]" />
            )}
          </button>

          {/* BOTTOM OVERLAY CTA BUTTON */}
          <div className="absolute bottom-2.5 inset-x-2 z-10 text-center">
            <Link
              href={PROMO_VIDEO_LINK}
              onClick={(e) => e.stopPropagation()}
              className="w-full py-1.5 px-2 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md transition-colors"
            >
              <ShoppingBag className="w-3 h-3" /> Shop Now
            </Link>
          </div>

        </div>
      )}
    </>
  );
}
