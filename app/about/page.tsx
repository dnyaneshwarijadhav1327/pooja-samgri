import React from 'react';
import { ShieldCheck, Flame, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            Our Devotional Journey
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A0E17]">
            Tradition, Purity & Devotion
          </h1>
          <p className="text-sm text-[#3A2A20]/80 max-w-xl mx-auto leading-relaxed">
            Bringing authentic, unadulterated pooja samagri directly to your home with complete sanctity and respect for sacred traditions.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-8 shadow-card space-y-4 text-xs sm:text-sm text-[#3A2A20]/85 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-[#4A0E17]">
            Preserving Indian Spiritual Heritage
          </h2>
          <p>
            Pavitra Pooja was established with a clear mission: to ensure that every household across India has access to genuine, unadulterated, and traditionally purified samagri for their daily morning prayers, festival rituals, and Yagnas.
          </p>
          <p>
            In today&apos;s fast-paced world, finding pure Bhimseni Kapoor, chemical-free bamboo-less dhoop, organic cow dung cakes (Shenachya Guarya), and authentic river Gangajal can be challenging. We bridge this gap by carefully selecting ingredients from authentic traditional sources and packaging them hygienically to maintain their sanctity during transit.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Flame className="w-8 h-8 text-[#D97706] mx-auto" />
            <h3 className="font-serif font-bold text-[#4A0E17] text-base">Uncompromising Purity</h3>
            <p className="text-xs text-[#3A2A20]/75">No artificial synthetic perfumes or cheap chemical fillers.</p>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#D97706] mx-auto" />
            <h3 className="font-serif font-bold text-[#4A0E17] text-base">Authentic Sourcing</h3>
            <p className="text-xs text-[#3A2A20]/75">Direct partnership with indigenous Desi cow farms & traditional herb collectors.</p>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Heart className="w-8 h-8 text-[#D97706] mx-auto" />
            <h3 className="font-serif font-bold text-[#4A0E17] text-base">Packed with Reverence</h3>
            <p className="text-xs text-[#3A2A20]/75">Every order is sealed securely to arrive at your altar in pristine condition.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
