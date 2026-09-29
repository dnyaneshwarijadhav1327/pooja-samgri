'use client';

import React, { useState, useEffect } from 'react';

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
    title: 'Banner 1',
  },
  {
    id: 2,
    url: '/page.png',
    title: 'Banner 2',
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto flip images every 4 seconds
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden bg-[#FAF6EE] select-none">
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
            />
          </div>
        ))}
      </div>
    </section>
  );
}

