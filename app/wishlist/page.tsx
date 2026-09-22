'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EFE4] text-[#D97706] text-xs font-semibold border border-[#E4D9C5]">
            <Heart className="w-3.5 h-3.5 fill-current" /> Your Favorites
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A0E17]">
            My Saved Wishlist
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            Keep track of your sacred essentials and add them to your cart whenever you are ready.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] space-y-4 p-8 shadow-card">
            <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#E4D9C5] flex items-center justify-center text-2xl mx-auto text-[#D97706]">
              🪔
            </div>
            <h3 className="text-base font-serif font-bold text-[#4A0E17]">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-[#3A2A20]/70">
              Explore our collection of pure samagri, natural dhoop, and puja kits, and click the heart icon on any product to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              Explore Shop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] p-4 flex flex-col justify-between shadow-card hover:shadow-hover transition-all group"
              >
                <div>
                  <div className="relative h-48 rounded-xl bg-stone-100 overflow-hidden mb-3 border border-[#E4D9C5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#FAF6EE]/90 text-red-600 hover:bg-red-500 hover:text-white shadow-md backdrop-blur-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link href={`/product/${item.slug}`} className="block space-y-1">
                    <span className="text-[10px] font-semibold text-[#D97706] uppercase">
                      {item.quantityUnit}
                    </span>
                    <h3 className="text-sm font-bold text-[#4A0E17] group-hover:text-[#D97706] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                </div>

                <div className="pt-3 border-t border-[#E4D9C5] mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#4A0E17]">₹{item.price}</span>
                    {item.mrp > item.price && (
                      <span className="ml-1 text-xs text-[#3A2A20]/50 line-through">₹{item.mrp}</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-3.5 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
