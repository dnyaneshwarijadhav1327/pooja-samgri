import React from 'react';
import { ShieldCheck, Flame, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12 text-black font-['Times_New_Roman',_Times,_serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center space-y-3 font-['Times_New_Roman',_Times,_serif]">
          <span className="text-xs uppercase tracking-widest text-black/70 font-bold">
            Our Devotional Journey
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            Tradition, Purity & Devotion
          </h1>
          <p className="text-sm text-black/80 max-w-xl mx-auto leading-relaxed">
            Bringing authentic, unadulterated pooja samagri directly to your home with complete sanctity and respect for sacred traditions.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-8 shadow-card space-y-4 text-xs sm:text-sm text-black/90 leading-relaxed font-['Times_New_Roman',_Times,_serif]">
          <h2 className="text-xl font-bold text-black">
            Preserving Indian Spiritual Heritage
          </h2>
          <p>
            Pooja Sanskar was established with a clear mission: to ensure that every household across India has access to genuine, unadulterated, and traditionally purified samagri for their daily morning prayers, festival rituals, and Yagnas.
          </p>
          <p>
            In today&apos;s fast-paced world, finding pure Bhimseni Kapoor, chemical-free bamboo-less dhoop, organic cow dung cakes (Shenachya Guarya), and authentic river Gangajal can be challenging. We bridge this gap by carefully selecting ingredients from authentic traditional sources and packaging them hygienically to maintain their sanctity during transit.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-['Times_New_Roman',_Times,_serif]">
          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Flame className="w-8 h-8 text-black mx-auto" />
            <h3 className="font-bold text-black text-base">Uncompromising Purity</h3>
            <p className="text-xs text-black/80">No artificial synthetic perfumes or cheap chemical fillers.</p>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-black mx-auto" />
            <h3 className="font-bold text-black text-base">Authentic Sourcing</h3>
            <p className="text-xs text-black/80">Direct partnership with indigenous Desi cow farms & traditional herb collectors.</p>
          </div>

          <div className="p-6 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-center space-y-2">
            <Heart className="w-8 h-8 text-black mx-auto" />
            <h3 className="font-bold text-black text-base">Packed with Reverence</h3>
            <p className="text-xs text-black/80">Every order is sealed securely to arrive at your altar in pristine condition.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
