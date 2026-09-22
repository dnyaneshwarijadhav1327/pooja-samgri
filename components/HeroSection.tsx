'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

/**
 * HERO SLIDER IMAGES
 * ✅ Add your image URLs here. Use paths like '/Home.png' for images placed in the /public folder.
 * ✅ You can also use external URLs like 'https://...'
 * ✅ Add as many slides as you want — the slider auto-detects the count.
 */
export const HERO_SLIDES = [
  {
    id: 1,
    url: '/Home.png',
    title: 'Bring Purity & Tradition Into Every Puja',
    subtitle: 'Authentic pooja samagri, carefully selected for your daily prayers, sacred rituals, and auspicious festivals. Delivered with divine sanctity.',
    badge: '🪔 Authentic & Purified Spiritual Essentials',
  },
  {
    id: 2,
    url: '/homepage.png',
    title: 'Complete Premium Puja Kits',
    subtitle: 'Hand-curated complete kits for daily worship, festival rituals, and special ceremonies.',
    badge: '🌿 100% Traditional Sourcing',
  },
   {
    id: 2,
    url: '/page.png',
    title: 'Complete Premium Puja Kits',
    subtitle: 'Hand-curated complete kits for daily worship, festival rituals, and special ceremonies.',
    badge: '🌿 100% Traditional Sourcing',
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto flip images every 4 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-screen min-h-[650px] max-h-[1080px] overflow-hidden bg-[#FAF6EE] select-none">

      {/* ── Full-Screen Background Images ── */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image — full brightness, high quality */}
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(1.08) saturate(1.15) contrast(1.05)' }}
            />

            {/* ✅ BRIGHT overlay — only a soft warm glow at the bottom-left for text readability */}
            {/* NO heavy black overlay — images stay vivid and clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        ))}
      </div>

      {/* ── Decorative Warm Ambient Glow (subtle, non-darkening) ── */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none z-10" />

      {/* ── Hero Text Content ── */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5 pt-16">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D97706]/30 text-[#D97706] text-xs font-bold tracking-wide shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
            <span>{HERO_SLIDES[currentIndex].badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4A0E17] leading-tight drop-shadow-sm min-h-[2.5em] sm:min-h-[2em] flex items-center">
            {HERO_SLIDES[currentIndex].title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#3A2A20]/90 leading-relaxed max-w-xl font-medium drop-shadow-sm min-h-[3em] bg-white/50 backdrop-blur-xs px-4 py-2 rounded-xl border border-[#E4D9C5]/60">
            {HERO_SLIDES[currentIndex].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Shop Pooja Samagri <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/category/puja-kits"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/80 hover:bg-white text-[#4A0E17] text-sm font-serif font-bold border border-[#D97706]/30 hover:border-[#D97706] backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Explore Puja Kits 🪔
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E4D9C5] text-[#4A0E17] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>100% Traditional Sourcing</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E4D9C5] text-[#4A0E17] shadow-sm">
              <span className="text-[#D97706]">📦</span>
              <span>Sanctified Packing</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E4D9C5] text-[#4A0E17] shadow-sm">
              <span className="text-[#D97706]">⚡</span>
              <span>Fast Delivery</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Prev / Next Arrow Buttons ── */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-[#D97706] text-[#4A0E17] hover:text-white backdrop-blur-md border border-[#E4D9C5] transition-all hover:scale-110 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/70 hover:bg-[#D97706] text-[#4A0E17] hover:text-white backdrop-blur-md border border-[#E4D9C5] transition-all hover:scale-110 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* ── Bottom: Dots + Play/Pause + Counter ── */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-4">

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/70 hover:bg-white text-[#4A0E17] backdrop-blur-md border border-[#E4D9C5] transition-colors shadow-sm"
          title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#E4D9C5] shadow-sm">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? 'w-8 bg-[#D97706] shadow-sm'
                  : 'w-2.5 bg-[#4A0E17]/30 hover:bg-[#D97706]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs font-mono text-[#4A0E17] bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E4D9C5] shadow-sm font-semibold">
          {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </div>

      </div>

    </section>
  );
}
