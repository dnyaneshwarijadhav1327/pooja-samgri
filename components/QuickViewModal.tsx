'use client';

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';

export interface QuickViewProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  ingredients?: string | null;
  howToUse?: string | null;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  quantityUnit: string;
  category: { name: string };
  images: { url: string }[];
}

interface Props {
  product: QuickViewProduct | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWish = isInWishlist(product.id);
  const mainImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600';

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      image: mainImage,
      quantityUnit: product.quantityUnit,
    }, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-900/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-[#FAF6EE] rounded-2xl shadow-2xl border border-[#E4D9C5] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#D97706] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative bg-[#F5EFE4] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E4D9C5]">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
          />
          {product.discount > 0 && (
            <span className="absolute top-4 left-4 bg-[#4A0E17] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#D97706]">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">
              {product.category?.name}
            </span>
            <h2 className="text-xl font-serif font-bold text-[#4A0E17] leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-[#3A2A20]/75 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#D97706]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold ml-1 text-[#4A0E17]">{product.rating}</span>
              </div>
              <span className="text-xs text-[#3A2A20]/50">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-bold text-[#4A0E17]">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-sm text-[#3A2A20]/50 line-through">₹{product.mrp}</span>
              )}
              <span className="text-xs text-[#3A2A20]/60">({product.quantityUnit})</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-[#4A0E17]">Quantity:</span>
              <div className="flex items-center rounded-lg border border-[#E4D9C5] bg-[#F5EFE4]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-xs font-bold text-[#4A0E17] hover:bg-[#E4D9C5]"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-[#4A0E17]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-xs font-bold text-[#4A0E17] hover:bg-[#E4D9C5]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-[#E4D9C5] mt-4">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  mrp: product.mrp,
                  image: mainImage,
                  quantityUnit: product.quantityUnit
                })}
                className={`p-3 rounded-xl border border-[#E4D9C5] transition-colors ${
                  inWish ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#E4D9C5]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs font-semibold text-[#4A0E17] hover:text-[#D97706] underline"
            >
              View Full Product Details & Usage Guide ➔
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
