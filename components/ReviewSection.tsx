'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewSection() {
  const reviews = [
    {
      name: "Sunita Deshmukh",
      location: "Pune, Maharashtra",
      rating: 5,
      date: "September 14, 2026",
      comment: "Beautifully packed and the products arrived safely. The Gangajal bottle and Bhimseni kapoor smell completely pure and natural.",
      verified: true
    },
    {
      name: "Rajesh Kumar",
      location: "Bengaluru, Karnataka",
      rating: 5,
      date: "September 08, 2026",
      comment: "Good quality and very convenient for daily puja. The Gomaya sambrani dhoop cups create such a serene morning atmosphere at home.",
      verified: true
    },
    {
      name: "Ananya Sharma",
      location: "New Delhi",
      rating: 5,
      date: "August 29, 2026",
      comment: "Everything was packed neatly with immense respect. The Shri Ganesh Puja Kit saved us so much time searching for individual items.",
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            Devotee Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Trusted by Thousands of Homes
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2A20]/80">
            Real feedback from families who rely on Pooja Sanskar for their daily worship and sacred occasions.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F5EFE4] rounded-2xl p-6 border border-[#E4D9C5] shadow-card flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#D97706]/20 absolute top-4 right-4" />

              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D97706]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#3A2A20]/85 italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D9C5] flex items-center justify-between mt-4">
                <div>
                  <h4 className="text-xs font-bold text-[#4A0E17] flex items-center gap-1">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-label="Verified Customer" />
                    )}
                  </h4>
                  <span className="text-[10px] text-[#3A2A20]/60">{rev.location}</span>
                </div>

                <span className="text-[10px] text-[#3A2A20]/50">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
