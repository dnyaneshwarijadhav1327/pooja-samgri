import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-stone-200 rounded-md" />
          <div className="h-4 w-4 bg-stone-200 rounded-md" />
          <div className="h-4 w-16 bg-stone-200 rounded-md" />
          <div className="h-4 w-4 bg-stone-200 rounded-md" />
          <div className="h-4 w-32 bg-stone-200 rounded-md" />
        </div>

        {/* Product Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-4 sm:p-8 rounded-3xl border border-stone-200 shadow-xs mb-12">
          
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-square rounded-2xl bg-stone-100 border border-stone-200" />
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-stone-200" />
              <div className="w-16 h-16 rounded-xl bg-stone-200" />
              <div className="w-16 h-16 rounded-xl bg-stone-200" />
            </div>
          </div>

          {/* Right Column: Details Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="h-4 w-28 bg-[#D97706]/20 rounded-full" />
              <div className="h-8 w-4/5 bg-stone-200 rounded-lg" />
              <div className="h-4 w-36 bg-stone-200 rounded-md" />
            </div>

            {/* Price Skeleton */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
              <div className="h-8 w-24 bg-stone-300 rounded-lg" />
              <div className="h-5 w-16 bg-stone-200 rounded-md" />
              <div className="h-6 w-20 bg-green-200 rounded-full ml-auto" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-stone-100 rounded-md" />
              <div className="h-4 w-5/6 bg-stone-100 rounded-md" />
              <div className="h-4 w-3/4 bg-stone-100 rounded-md" />
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="h-13 flex-1 bg-[#D97706]/40 rounded-xl" />
              <div className="h-13 flex-1 bg-stone-200 rounded-xl" />
            </div>

            {/* Trust Badges Skeleton */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="h-16 bg-stone-50 rounded-xl border border-stone-200" />
              <div className="h-16 bg-stone-50 rounded-xl border border-stone-200" />
              <div className="h-16 bg-stone-50 rounded-xl border border-stone-200" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
