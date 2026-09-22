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
    <div className="group relative bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between">
      
      {/* Clickable Product Card Link Wrapper */}
      <Link href={`/product/${product.slug}`} className="block flex-1 p-4">
        
        {/* Product Image Area */}
        <div className="relative w-full h-48 sm:h-52 rounded-xl bg-stone-100 overflow-hidden mb-3 border border-[#E4D9C5]/60">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#4A0E17] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D97706] shadow-sm">
              {product.discount}% OFF
            </span>
          )}

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full shadow-md backdrop-blur-xs transition-colors ${
                inWish ? 'bg-red-500 text-white' : 'bg-[#FAF6EE]/90 text-[#4A0E17] hover:bg-[#D97706] hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleQuickViewClick}
              className="p-2 rounded-full bg-[#FAF6EE]/90 text-[#4A0E17] hover:bg-[#D97706] hover:text-white shadow-md backdrop-blur-xs transition-colors"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[#D97706] uppercase tracking-wider">
              {product.category?.name}
            </span>
            <span className="text-[#3A2A20]/50 font-medium">
              {product.quantityUnit}
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#4A0E17] line-clamp-1 group-hover:text-[#D97706] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#3A2A20]/70 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs pt-1">
            <div className="flex items-center text-[#D97706]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1 text-[#4A0E17]">{product.rating}</span>
            </div>
            <span className="text-[11px] text-[#3A2A20]/50">({product.reviewCount})</span>
          </div>
        </div>
      </Link>

      {/* Card Footer: Price & Add to Cart */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-[#E4D9C5]/40 mt-2">
        <div>
          <span className="text-base font-bold text-[#4A0E17]">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="ml-1.5 text-xs text-[#3A2A20]/50 line-through">₹{product.mrp}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="px-3 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Add
        </button>
      </div>

    </div>
  );
}
