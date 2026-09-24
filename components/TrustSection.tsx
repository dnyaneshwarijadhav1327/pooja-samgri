'use client';

import React from 'react';

export default function TrustSection() {
  const trustPoints = [
    {
      icon: "🪔",
      title: "Authentic Pooja Products",
      desc: "Authentic spiritual items selected according to Vedic traditions."
    },
    {
      icon: "🌿",
      title: "Naturally Selected Ingredients",
      desc: "Pure herbal resins, camphor & chemical-free samagri."
    },
    {
      icon: "📦",
      title: "Carefully Packed",
      desc: "Hygienically sealed packaging ensuring pristine purity."
    },
    {
      icon: "🚚",
      title: "Reliable Doorstep Delivery",
      desc: "Safe and fast delivery directly to your home."
    },
    {
      icon: "🙏",
      title: "Made for Sacred Traditions",
      desc: "Crafted with reverence for daily worship and holy rituals."
    }
  ];

  return (
    <section className="bg-[#F5EFE4] py-4 sm:py-5 border-b border-[#E4D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustPoints.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E4D9C5] shadow-xs hover:border-[#D97706] transition-colors"
            >
              <span className="text-2xl mb-1.5">{item.icon}</span>
              <h4 className="text-xs font-serif font-bold text-[#4A0E17] mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#3A2A20]/70 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
