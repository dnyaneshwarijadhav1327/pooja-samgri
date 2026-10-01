'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal, { QuickViewProduct } from './QuickViewModal';
import Link from 'next/link';

interface Props {
  products: QuickViewProduct[];
}

export default function FeaturedProducts({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);

  const allItems = products && products.length > 0 ? products : [];
  const half = Math.ceil(allItems.length / 2);
  const row1 = allItems.length > 0 ? allItems.slice(0, half) : [];
  const row2 = allItems.length > 0 ? (allItems.slice(half).length > 0 ? allItems.slice(half) : row1) : [];

  return (
    <section className="py-4 sm:py-6 bg-white relative overflow-hidden border-b border-stone-200/80">
      {/* Background Decorative Saffron Flower Motifs */}
      <img
        src="/images/saffron_flower.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-4 -right-4 w-28 sm:w-52 lg:w-72 h-auto object-contain pointer-events-none select-none drop-shadow-sm rotate-12 opacity-85 sm:opacity-100"
      />
      <img
        src="/images/saffron_flower.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 w-24 sm:w-44 lg:w-60 h-auto object-contain pointer-events-none select-none drop-shadow-sm -rotate-45 opacity-80 sm:opacity-100"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Actions Bar */}
        <div className="flex flex-row items-center justify-end mb-3 sm:mb-4">
          <Link
            href="/shop"
            className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black hover:text-white text-[11px] sm:text-xs font-bold border border-[#D97706]/40 transition-all shadow-sm shrink-0"
          >
            Explore All ➔
          </Link>
        </div>

        {/* Multi-Row Alternating Horizontal Marquee Animation */}
        <div className="space-y-3 sm:space-y-4">
          {/* Row 1: Left to Right Marquee */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
            
            <div className="animate-marquee-ltr flex items-stretch gap-2.5 sm:gap-6 marquee-track">
              {[...row1, ...row1, ...row1, ...row1].map((product, idx) => (
                <div
                  key={`feat-r1-${product.id}-${idx}`}
                  className="w-[160px] min-[480px]:w-[200px] sm:w-[260px] lg:w-[280px] shrink-0 flex flex-col"
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left Marquee */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
            
            <div className="animate-marquee-rtl flex items-stretch gap-2.5 sm:gap-6 marquee-track">
              {[...row2, ...row2, ...row2, ...row2].map((product, idx) => (
                <div
                  key={`feat-r2-${product.id}-${idx}`}
                  className="w-[160px] min-[480px]:w-[200px] sm:w-[260px] lg:w-[280px] shrink-0 flex flex-col"
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
