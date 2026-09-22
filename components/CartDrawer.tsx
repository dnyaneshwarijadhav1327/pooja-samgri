'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateCartQuantity, removeFromCart, cartTotal } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-maroon-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EE] shadow-2xl border-l border-[#E4D9C5] flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 bg-[#F5EFE4] border-b border-[#E4D9C5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D97706]" />
              <h3 className="text-lg font-serif font-bold text-[#4A0E17]">Your Sacred Cart</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706] font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#3A2A20]/70 hover:text-[#4A0E17] hover:bg-[#FAF6EE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE4] border border-[#E4D9C5] flex items-center justify-center text-2xl text-[#D97706]">
                  🪔
                </div>
                <h4 className="text-base font-serif font-semibold text-[#4A0E17]">Your cart is empty</h4>
                <p className="text-xs text-[#3A2A20]/70 max-w-xs">
                  Discover our pure samagri, natural dhoop, and handcrafted puja kits to begin your sacred shopping.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold tracking-wide shadow-md transition-colors"
                >
                  Explore Sacred Essentials
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#F5EFE4] rounded-xl border border-[#E4D9C5] relative group"
                >
                  <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-[#E4D9C5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#4A0E17] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-[#3A2A20]/60 mt-0.5">{item.quantityUnit}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-[#E4D9C5] bg-[#FAF6EE]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 text-[#3A2A20] hover:text-[#4A0E17] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#4A0E17]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1 text-[#3A2A20] hover:text-[#4A0E17] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#4A0E17]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.mrp > item.price && (
                          <span className="block text-[10px] text-[#3A2A20]/50 line-through">
                            ₹{item.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5EFE4] border-t border-[#E4D9C5] space-y-4">
              {/* Shipping Progress */}
              <div className="text-xs text-[#3A2A20]/80">
                {cartTotal >= 499 ? (
                  <p className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span>🎉</span> You unlocked <strong>FREE Doorstep Delivery</strong>!
                  </p>
                ) : (
                  <p>
                    Add <strong className="text-[#D97706]">₹{499 - cartTotal}</strong> more for <strong>FREE Delivery</strong>
                  </p>
                )}
              </div>

              {/* Order Total Summary */}
              <div className="flex justify-between items-center text-sm font-bold text-[#4A0E17] pt-2 border-t border-[#E4D9C5]">
                <span>Subtotal Amount</span>
                <span className="text-lg text-[#D97706]">₹{cartTotal}</span>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-2 text-xs font-semibold text-[#4A0E17] hover:underline"
                >
                  View Full Shopping Cart
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
