'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, clearCart } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, cartTotal }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon(data);
        setCouponError('');
      } else {
        setCouponError(data.error || 'Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (e) {
      setCouponError('Failed to apply coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shippingFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EFE4] text-[#D97706] text-xs font-semibold border border-[#E4D9C5]">
            <ShoppingBag className="w-3.5 h-3.5" /> Shopping Basket
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A0E17]">
            Your Sacred Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] space-y-4 p-8 shadow-card">
            <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#E4D9C5] flex items-center justify-center text-2xl mx-auto text-[#D97706]">
              🪔
            </div>
            <h3 className="text-base font-serif font-bold text-[#4A0E17]">
              Your cart is currently empty
            </h3>
            <p className="text-xs text-[#3A2A20]/70">
              Explore our selection of pure samagri, natural dhoop, and handcrafted puja kits.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Progress Alert */}
              <div className="p-4 bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] text-xs text-[#4A0E17]">
                {cartTotal >= 499 ? (
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span>🎉</span> Congratulations! You unlocked <strong>FREE Doorstep Delivery</strong> on this order.
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#D97706]">₹{499 - cartTotal}</strong> more of samagri to get <strong>FREE Delivery</strong>!
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 shadow-card space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E4D9C5] text-xs font-serif font-bold text-[#4A0E17]">
                  <span>Product Details</span>
                  <button onClick={clearCart} className="text-[#D97706] text-[11px] hover:underline font-sans font-semibold">
                    Clear Cart
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5]/70"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-[#E4D9C5]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link href={`/product/${item.slug}`} className="text-xs font-bold text-[#4A0E17] hover:text-[#D97706]">
                          {item.name}
                        </Link>
                        <span className="block text-[10px] text-[#3A2A20]/60">{item.quantityUnit}</span>
                        <span className="text-xs font-bold text-[#4A0E17] mt-1 block">₹{item.price} each</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-[#E4D9C5]/50 pt-2 sm:pt-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-[#E4D9C5] bg-[#F5EFE4]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1.5 text-[#4A0E17] hover:text-[#D97706]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#4A0E17]">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1.5 text-[#4A0E17] hover:text-[#D97706]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total price for item */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#4A0E17]">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="block text-[10px] text-stone-400 hover:text-red-600 mt-0.5 ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="text-xs font-bold text-[#4A0E17] hover:text-[#D97706] underline"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>

            {/* Right Summary & Checkout Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Coupon Box */}
              <div className="bg-[#F5EFE4] p-5 rounded-3xl border border-[#E4D9C5] shadow-card space-y-3 text-xs">
                <span className="font-serif font-bold text-[#4A0E17] flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#D97706]" /> Apply Coupon Code
                </span>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. PAVITRA10"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] font-bold uppercase focus:outline-none focus:border-[#D97706]"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="px-4 py-2 rounded-xl bg-[#4A0E17] text-white font-bold hover:bg-[#380B12] transition-colors"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                )}

                {appliedCoupon && (
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-[11px] flex items-center justify-between font-semibold">
                    <span>Code <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discountPercent}% OFF)</span>
                    <span className="text-emerald-700">-₹{appliedCoupon.discountAmount}</span>
                  </div>
                )}

                <div className="text-[10px] text-[#3A2A20]/60 space-y-0.5 pt-1">
                  <p>💡 Use <strong>PAVITRA10</strong> for 10% off (orders over ₹499)</p>
                  <p>💡 Use <strong>FESTIVAL20</strong> for 20% off (orders over ₹999)</p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
                <h3 className="text-base font-serif font-bold text-[#4A0E17] pb-3 border-b border-[#E4D9C5]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-[#3A2A20]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#4A0E17]">₹{cartTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-emerald-700">FREE</span>
                    ) : (
                      <span className="font-bold text-[#4A0E17]">₹{shippingFee}</span>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Coupon Discount</span>
                      <span className="font-bold">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#E4D9C5] flex justify-between items-baseline text-base font-bold text-[#4A0E17]">
                    <span>Total Amount</span>
                    <span className="text-xl text-[#D97706]">₹{finalTotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors mt-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
