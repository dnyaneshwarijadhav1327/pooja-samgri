'use client';

import React, { useState, useEffect } from 'react';
import { Play, X, Sparkles, Clock, Film } from 'lucide-react';

export interface MakingVideo {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
}

const defaultVideos: MakingVideo[] = [
  {
    id: "vid-1",
    title: "Pure Hand-Rolled Cotton Diya Wicks (Phool Batti)",
    category: "Diya Wicks",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=600",
    duration: "1:30 min",
    description: "Handcrafted by rural artisans using 100% unbleached virgin cotton for steady, long-lasting aarti flames."
  },
  {
    id: "vid-2",
    title: "Authentic Organic Bhimseni Camphor Distillation",
    category: "Camphor & Dhoop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600",
    duration: "2:15 min",
    description: "Pure crystalline flakes harvested directly from pine trees, burning 100% cleanly without black residue."
  },
  {
    id: "vid-3",
    title: "Sacred Mysore Sandalwood & Turmeric Paste Preparation",
    category: "Sacred Pastes",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=600",
    duration: "1:45 min",
    description: "Traditional stone-grinding of fragrant Mysore Sandalwood infused with Kashmiri saffron and Gangajal."
  },
  {
    id: "vid-4",
    title: "51-Herb Vedic Havan Samagri Formulation",
    category: "Havan Samagri",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600",
    duration: "2:40 min",
    description: "Carefully selected blend of 51 Ayurvedic medicinal herbs, guggal, loban, and sacred dry fruits for auspicious Yagnas."
  },
  {
    id: "vid-5",
    title: "Hand-Rolled Natural Flora Agarbatti & Cow Dung Dhoop",
    category: "Incense Sticks",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600",
    duration: "1:55 min",
    description: "Charcoal-free incense hand-rolled with temple flowers, essential oils, and sacred herbs."
  },
  {
    id: "vid-6",
    title: "Artisanal Pure Brass Diya & Bell Crafting",
    category: "Brass Utensils",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smoke-from-incense-sticks-41131-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600",
    duration: "2:10 min",
    description: "Traditional metalsmiths molding and engraving heavy pure brass diyas and resonant puja bells."
  }
];

export default function ProductMakingSection() {
  const [videos, setVideos] = useState<MakingVideo[]>(defaultVideos);
  const [activeVideo, setActiveVideo] = useState<MakingVideo | null>(null);

  useEffect(() => {
    fetch('/api/admin/videos')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setVideos(data);
        }
      })
      .catch(() => {});
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const isDirectVideoFile = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('mixkit.co');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6EE] relative overflow-hidden border-b border-stone-200/80">
      
      {/* Background Decorative Yellow Hibiscus Flower Motifs - Responsive & Crisp */}
      <img
        src="/images/yellow_hibiscus.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-4 -right-4 w-28 sm:w-52 lg:w-72 h-auto object-contain pointer-events-none select-none drop-shadow-sm rotate-12 opacity-85 sm:opacity-100 z-0"
      />
      <img
        src="/images/yellow_hibiscus.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 w-24 sm:w-44 lg:w-60 h-auto object-contain pointer-events-none select-none drop-shadow-sm -rotate-45 opacity-80 sm:opacity-100 z-0"
      />

      {/* Background Decorative Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D97706]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#4A0E17]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#D97706]/30 text-[#D97706] text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Behind The Scenes</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#4A0E17] leading-tight">
            How Our Sacred Products Are Made
          </h2>

          <p className="text-xs sm:text-sm text-[#3A2A20]/80 max-w-xl mx-auto">
            Watch the authentic Vedic handcrafting and hygienic preparation processes behind our pure pooja samagri essentials.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group bg-white rounded-2xl border border-[#E4D9C5] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D97706] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Video Thumbnail with Play Button */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#380B12]">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play Button Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-[#B45309] transition-all duration-300 border-2 border-white/80">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Category & Duration Badges */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#4A0E17]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-[#D97706]/40 shadow-xs">
                      {vid.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-[#D97706]" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#4A0E17] group-hover:text-[#D97706] transition-colors line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#3A2A20]/75 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[#D97706] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <Film className="w-3.5 h-3.5" /> Watch Making Video ➔
                </span>
                <span className="text-[10px] font-semibold text-stone-600 uppercase tracking-wider">
                  Handcrafted
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen HD Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          {/* Backdrop dismiss */}
          <div className="fixed inset-0" onClick={() => setActiveVideo(null)} />

          <div className="relative w-full max-w-3xl bg-[#FAF6EE] rounded-3xl border-2 border-[#D97706] shadow-2xl overflow-hidden z-10 space-y-3 p-4 sm:p-6 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#4A0E17] text-white flex items-center justify-center text-base font-bold shadow-xs">
                  🪔
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#4A0E17]">
                    {activeVideo.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-[#D97706] font-semibold uppercase tracking-wider block">
                    {activeVideo.category} • Traditional Handcrafted Process
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close Video Modal"
                className="p-2 rounded-full bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#D97706] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative w-full rounded-2xl bg-black overflow-hidden aspect-video shadow-lg border border-stone-300">
              {isDirectVideoFile(activeVideo.videoUrl) ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Video Information & Guarantee Box */}
            <div className="p-3.5 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-xs text-[#3A2A20]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>{activeVideo.description}</span>
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-[11px] font-bold text-[#D97706] hover:underline shrink-0"
              >
                Close Video ✖
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
