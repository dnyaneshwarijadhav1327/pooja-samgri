'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { QuickViewProduct } from './QuickViewModal';

interface Props {
  product: QuickViewProduct;
  onQuickView: (product: QuickViewProduct) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const mainImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600';
  const inWish = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: mainImage,
      quantityUnit: product.quantityUnit,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: mainImage,
      quantityUnit: product.quantityUnit,
    });
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D97706]/60 transition-all duration-300 flex flex-col justify-between">
      
      {/* Clickable Product Card Link Wrapper */}
      <Link href={`/product/${product.slug}`} className="block flex-1 p-2 sm:p-4">
        
        {/* Product Image Area */}
        <div className="relative w-full h-36 sm:h-52 rounded-lg sm:rounded-xl bg-stone-50 overflow-hidden mb-2 sm:mb-3 border border-stone-100">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-[#4A0E17] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full border border-[#D97706] shadow-sm">
              {product.discount}% OFF
            </span>
          )}

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex flex-col gap-1 sm:gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`p-1.5 sm:p-2 rounded-full shadow-md backdrop-blur-xs transition-colors ${
                inWish ? 'bg-red-500 text-white' : 'bg-white/95 text-[#4A0E17] hover:bg-[#D97706] hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${inWish ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleQuickViewClick}
              className="p-1.5 sm:p-2 rounded-full bg-white/95 text-[#4A0E17] hover:bg-[#D97706] hover:text-white shadow-md backdrop-blur-xs transition-colors"
              title="Quick View"
            >
              <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
            <span className="font-semibold text-[#D97706] uppercase tracking-wider truncate max-w-[65%]">
              {product.category?.name}
            </span>
            <span className="text-[#3A2A20]/50 font-medium text-[9px] sm:text-[10px]">
              {product.quantityUnit}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-[#4A0E17] line-clamp-1 group-hover:text-[#D97706] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#3A2A20]/70 line-clamp-1 sm:line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs pt-0.5 sm:pt-1">
            <div className="flex items-center text-[#D97706]">
              <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
              <span className="font-bold ml-0.5 sm:ml-1 text-[#4A0E17]">{product.rating}</span>
            </div>
            <span className="text-[9px] sm:text-[11px] text-[#3A2A20]/50">({product.reviewCount})</span>
          </div>
        </div>
      </Link>

      {/* Card Footer: Price & Add to Cart */}
      <div className="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-1.5 sm:pt-2 flex items-center justify-between border-t border-stone-100 mt-1 sm:mt-2">
        <div>
          <span className="text-xs sm:text-base font-bold text-[#4A0E17]">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="ml-1 text-[10px] sm:text-xs text-[#3A2A20]/50 line-through">₹{product.mrp}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
        >
          <ShoppingBag className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> <span className="hidden min-[400px]:inline">Add</span>
        </button>
      </div>

    </div>
  );
}
