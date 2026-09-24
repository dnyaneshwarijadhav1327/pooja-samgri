'use client';

import React from 'react';
import Link from 'next/link';

export default function FestivalSection() {
  const festivals = [
    {
      name: "Diwali",
      slug: "diwali",
      title: "Deepotsav & Lakshmi Puja",
      icon: "🪔",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Ganesh Chaturthi",
      slug: "ganesh-chaturthi",
      title: "Bappa Sthapana & Visarjan",
      icon: "🐘",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Navratri",
      slug: "navratri",
      title: "Devi Worship & Kanya Pujan",
      icon: "🔱",
      image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Mahashivratri",
      slug: "mahashivratri",
      title: "Shiva Abhishekam & Belpatra",
      icon: "🌙",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Janmashtami",
      slug: "janmashtami",
      title: "Bal Gopal Jhula & Panchamrit",
      icon: "🪶",
      image: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Satyanarayan Puja",
      slug: "satyanarayan-puja",
      title: "Full Moon Vrat & Katha Kit",
      icon: "📜",
      image: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Griha Pravesh",
      slug: "griha-pravesh",
      title: "New Home Vastu & Havan",
      icon: "🏡",
      image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Ram Navami",
      slug: "ram-navami",
      title: "Shri Ram Janmotsav Samagri",
      icon: "🏹",
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            Sacred Calendar & Celebrations
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Prepare for Every Sacred Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2A20]/80">
            Specialized curated collections tailored for traditional Indian festivals and holy observances.
          </p>
        </div>

        {/* Festival Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {festivals.map((fest) => (
            <Link
              key={fest.slug}
              href={`/festival/${fest.slug}`}
              className="group relative h-48 rounded-2xl overflow-hidden border border-[#E4D9C5] shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-end p-4"
            >
              {/* Background Image */}
              <img
                src={fest.image}
                alt={fest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17] via-[#4A0E17]/60 to-transparent" />

              {/* Text */}
              <div className="relative z-10 text-white space-y-1">
                <span className="text-2xl block mb-1">{fest.icon}</span>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#D97706] transition-colors">
                  {fest.name}
                </h3>
                <p className="text-[10px] text-white/80 line-clamp-1 font-medium">
                  {fest.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
