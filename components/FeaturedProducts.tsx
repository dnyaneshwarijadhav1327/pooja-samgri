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

  return (
    <section className="py-8 sm:py-12 bg-white relative overflow-hidden border-b border-stone-200/80">
      {/* Background Decorative Saffron Flower Motifs - Responsive & Crisp */}
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
        
        {/* Section Header */}
        <div className="flex flex-row items-end justify-between gap-2 mb-5 sm:mb-8 pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold block mb-0.5 sm:mb-1">
              Handpicked Purity & Devotion
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
              Our Sacred Essentials
            </h2>
          </div>

          <Link
            href="/shop"
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-[#D97706] hover:text-white text-[#4A0E17] text-[11px] sm:text-xs font-bold border border-stone-200 transition-all shadow-xs shrink-0"
          >
            Explore All ➔
          </Link>
        </div>

        {/* Product Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
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
