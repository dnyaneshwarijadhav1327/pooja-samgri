'use client';

import React, { useState } from 'react';
import { Play, X, Film, Sparkles } from 'lucide-react';

export default function ProductMakingVideoWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // 💡 EDIT THIS VIDEO URL BELOW WITH YOUR OWN MP4 OR YOUTUBE EMBED VIDEO LINK
  // Example YouTube Embed URL: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  // Example MP4 URL: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4"
  const videoSourceUrl = "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4";
  const isDirectVideo = videoSourceUrl.endsWith('.mp4');

  return (
    <>
      {/* 1. Floating Bottom-Right Video Trigger Badge */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 p-2 pr-4 bg-[#4A0E17] text-[#FAF6EE] rounded-full shadow-2xl border-2 border-[#D97706] hover:bg-[#380B12] transition-all duration-300 transform hover:scale-105"
            aria-label="See How We Make Our Products"
          >
            {/* Animated Play Thumbnail Circle */}
            <div className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#B45309]">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>

            {/* Label */}
            <div className="text-left text-xs pr-1">
              <span className="block text-[10px] text-[#D97706] font-bold uppercase tracking-wider leading-none">
                Behind The Scenes
              </span>
              <span className="font-serif font-bold text-white text-[11px] block mt-0.5">
                How It&apos;s Made 🎥
              </span>
            </div>

            {/* Pulse Indicator Ring */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D97706]"></span>
            </span>
          </button>
        </div>
      )}

      {/* 2. Expanded Video Modal Player */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-900/70 backdrop-blur-sm animate-fade-in">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#E4D9C5] shadow-2xl overflow-hidden z-10 space-y-3 p-4 sm:p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center text-sm font-bold">
                  🪔
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#4A0E17]">
                    How We Craft Our Sacred Products
                  </h3>
                  <span className="text-[10px] text-[#D97706] uppercase font-semibold block">
                    Authentic Sourcing & Traditional Process
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#D97706] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative w-full rounded-2xl bg-black overflow-hidden aspect-video shadow-md border border-[#E4D9C5]">
              {isDirectVideo ? (
                <video
                  src={videoSourceUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={videoSourceUrl}
                  title="How We Make Our Pooja Samagri"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Micro Caption */}
            <div className="p-3 bg-[#F5EFE4] rounded-xl border border-[#E4D9C5] text-xs text-[#3A2A20]/80 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#D97706]" /> 100% Traditional Handcrafted Preparation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold text-[#D97706] hover:underline"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
