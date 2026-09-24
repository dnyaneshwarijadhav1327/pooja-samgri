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
    <section className="py-8 sm:py-10 bg-[#F5EFE4] border-b border-[#E4D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-3 border-b border-[#E4D9C5]">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold block mb-1">
              Handpicked Purity
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
              Our Sacred Essentials
            </h2>
          </div>

          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl bg-[#FAF6EE] hover:bg-[#D97706] hover:text-white text-[#4A0E17] text-xs font-bold border border-[#E4D9C5] transition-colors shadow-xs"
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
