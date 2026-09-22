'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Trash2, EyeOff } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      userName: 'Sunita Deshmukh',
      rating: 5,
      comment: 'Beautifully packed and the products arrived safely. Highly authentic quality.',
      approved: true,
      date: 'Sep 14, 2026'
    },
    {
      id: 'rev-2',
      userName: 'Rajesh Kumar',
      rating: 5,
      comment: 'Good quality and very convenient for our daily morning puja. Smells pure and traditional.',
      approved: true,
      date: 'Sep 08, 2026'
    },
    {
      id: 'rev-3',
      userName: 'Amit Shah',
      rating: 4,
      comment: 'Arrived on time. The dhoop fragrance is peaceful.',
      approved: false,
      date: 'Aug 30, 2026'
    }
  ]);

  const toggleApproval = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E4D9C5]">
        <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
          Customer Reviews Moderation ({reviews.length})
        </h1>
        <p className="text-xs text-[#3A2A20]/70">
          Approve, hide, or delete customer reviews submitted on product detail pages.
        </p>
      </div>

      <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 shadow-card space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#4A0E17]">{rev.userName}</span>
                <span className="text-[10px] text-[#3A2A20]/50">{rev.date}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                rev.approved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {rev.approved ? 'Approved' : 'Pending Review'}
              </span>
            </div>

            <div className="flex items-center text-[#D97706]">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-[#3A2A20]">{rev.comment}</p>

            <div className="pt-2 border-t border-[#E4D9C5] flex items-center justify-end gap-3 text-[11px]">
              <button
                onClick={() => toggleApproval(rev.id)}
                className="text-[#D97706] font-semibold hover:underline flex items-center gap-1"
              >
                {rev.approved ? <><EyeOff className="w-3.5 h-3.5" /> Hide Review</> : <><CheckCircle className="w-3.5 h-3.5" /> Approve Review</>}
              </button>
              <button
                onClick={() => deleteReview(rev.id)}
                className="text-red-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
