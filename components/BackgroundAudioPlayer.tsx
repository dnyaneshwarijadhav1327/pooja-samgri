'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

export default function BackgroundAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.10); // Subtle 10% ambient volume
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isManuallyPausedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.10;
    audio.loop = true;

    // 1. Attempt direct instant playback on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // If browser requires user gesture, wait for first touch / scroll / click
          setIsPlaying(false);
        });
    }

    // 2. Global immediate trigger on ANY user scroll or touch anywhere on the page
    const handleUserTouchOrScroll = () => {
      // If customer explicitly clicked STOP/PAUSE button, do NOT override customer command
      if (isManuallyPausedRef.current) return;

      if (audio && audio.paused) {
        audio.volume = 0.10;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      } else {
        setIsPlaying(true);
        setHasInteracted(true);
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      ['touchstart', 'touchend', 'scroll', 'pointerdown', 'mousedown', 'click', 'wheel'].forEach(evt => {
        window.removeEventListener(evt, handleUserTouchOrScroll, true);
        document.removeEventListener(evt, handleUserTouchOrScroll, true);
      });
    };

    ['touchstart', 'touchend', 'scroll', 'pointerdown', 'mousedown', 'click', 'wheel'].forEach(evt => {
      window.addEventListener(evt, handleUserTouchOrScroll, { once: true, capture: true });
      document.addEventListener(evt, handleUserTouchOrScroll, { once: true, capture: true });
    });

    return () => {
      cleanupListeners();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Customer command: STOP / PAUSE
      audio.pause();
      setIsPlaying(false);
      isManuallyPausedRef.current = true;
    } else {
      // Customer command: PLAY
      isManuallyPausedRef.current = false;
      audio.volume = isMuted ? 0 : volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/divine_mantra.mp3"
        preload="auto"
      />

      {/* Floating Sacred Background Music Sidebar Widget */}
      <div 
        className="fixed left-3 sm:left-5 bottom-5 z-40 select-none"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`flex items-center gap-2 bg-[#4A0E17]/95 text-white backdrop-blur-md px-3 py-2 rounded-full border border-[#D97706]/70 shadow-lg shadow-black/20 transition-all duration-300 ${!isPlaying && !hasInteracted ? 'animate-bounce' : ''}`}>
          
          {/* Play / Stop Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Stop divine music" : "Play divine music"}
            title={isPlaying ? "Pause / Stop Music" : "Play Divine Music"}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Sound Wave Animation or Title */}
          <div 
            onClick={togglePlay}
            className="flex items-center gap-1.5 cursor-pointer pr-1"
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-5 px-0.5">
                <span className="w-0.5 bg-[#D97706] rounded-full animate-[soundWave_1s_infinite_ease-in-out_0.1s] h-3" />
                <span className="w-0.5 bg-[#FDE68A] rounded-full animate-[soundWave_1s_infinite_ease-in-out_0.3s] h-4" />
                <span className="w-0.5 bg-[#D97706] rounded-full animate-[soundWave_1s_infinite_ease-in-out_0.2s] h-2.5" />
                <span className="w-0.5 bg-[#FDE68A] rounded-full animate-[soundWave_1s_infinite_ease-in-out_0.4s] h-3.5" />
              </div>
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            )}

            <span className="text-[11px] sm:text-xs font-serif font-medium tracking-wide text-[#FAF6EE] hidden min-[400px]:inline whitespace-nowrap">
              {isPlaying ? 'Divine Chant (10%)' : 'Play Om Chant'}
            </span>
          </div>

          {/* Expanded Controls: Mute & Volume Slider */}
          <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-w-[140px] opacity-100 pl-1 border-l border-white/20' : 'max-w-0 opacity-0'
          }`}>
            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="p-1 rounded-full text-stone-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#D97706]" />
              )}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              title={`Volume: ${Math.round(volume * 100)}%`}
              className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
            />
          </div>

        </div>
      </div>
    </>
  );
}
