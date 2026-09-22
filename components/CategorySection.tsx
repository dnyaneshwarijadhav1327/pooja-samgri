'use client';

import React from 'react';
import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      name: "Pavitra Jal",
      slug: "pavitra-jal",
      desc: "Sacred Gangajal & purified river water.",
      icon: "💧",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dhoop & Incense",
      slug: "dhoop-incense",
      desc: "Herbal dhoop, loban & sambrani cups.",
      icon: "🪔",
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Gomaya Products",
      slug: "gomaya-products",
      desc: "Shenachya Guarya & cow dung dhoop.",
      icon: "🌿",
      image: "https://images.unsplash.com/photo-1545232979-fbfd44da0b84?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Havan Samagri",
      slug: "havan-samagri",
      desc: "51-herb mixtures & Yagna materials.",
      icon: "🔥",
      image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Puja Essentials",
      slug: "puja-essentials",
      desc: "Kumkum, Haldi, Kapoor, Wicks & Chandan.",
      icon: "🌸",
      image: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Puja Kits",
      slug: "puja-kits",
      desc: "Complete ready-to-use ritual boxes.",
      icon: "📦",
      image: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Festival Samagri",
      slug: "festival-samagri",
      desc: "Special boxes for Diwali, Navratri & Ganesh Chaturthi.",
      icon: "✨",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Flowers & Offerings",
      slug: "flowers-offerings",
      desc: "Traditional garlands & ritual offerings.",
      icon: "🌺",
      image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section id="categories" className="py-16 bg-[#FAF6EE] border-b border-[#E4D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            Explore Sacred Sourcing
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#D97706] mx-auto rounded-full" />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] overflow-hidden p-4 text-center hover:border-[#D97706] hover:shadow-hover transition-all duration-300 flex flex-col items-center"
            >
              {/* Image Circle Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#E4D9C5] group-hover:border-[#D97706] transition-colors mb-3 bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute inset-0 bg-maroon-900/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Text */}
              <h3 className="text-sm font-serif font-bold text-[#4A0E17] group-hover:text-[#D97706] transition-colors flex items-center gap-1.5 justify-center">
                <span>{cat.icon}</span> {cat.name}
              </h3>
              <p className="text-[11px] text-[#3A2A20]/70 mt-1 line-clamp-2">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
