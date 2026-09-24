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
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden border-b border-stone-200/80">
      {/* Background Decorative Saffron Flower Motifs */}
      <div 
        className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 opacity-20 pointer-events-none select-none bg-contain bg-no-repeat bg-right-top mix-blend-multiply rotate-12"
        style={{ backgroundImage: "url('/images/saffron_bg.webp')" }}
      />
      <div 
        className="absolute -bottom-16 -left-16 w-56 h-56 sm:w-72 sm:h-72 opacity-15 pointer-events-none select-none bg-contain bg-no-repeat bg-left-bottom mix-blend-multiply -rotate-45"
        style={{ backgroundImage: "url('/images/saffron_bg.webp')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-3 border-b border-stone-200">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold block mb-1">
              Handpicked Purity & Devotion
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
              Our Sacred Essentials
            </h2>
          </div>

          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#D97706] hover:text-white text-[#4A0E17] text-xs font-bold border border-stone-200 transition-all shadow-xs hover:shadow-md"
          >
            Explore All Products ➔
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
