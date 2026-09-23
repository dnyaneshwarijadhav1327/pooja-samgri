'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Truck, Home } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-8 shadow-2xl space-y-6 text-center">

        {/* Celebration Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl mx-auto border-2 border-emerald-300 shadow-md">
          🪔
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-serif font-bold text-[#D97706] tracking-wider">
            Order Confirmed & Sanctified
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Thank You for Your Order!
          </h1>
          <p className="text-xs text-[#3A2A20]/80">
            We have received your order. Your pooja samagri is being carefully packed for safe doorstep delivery.
          </p>
        </div>

        {/* Order Reference */}
        <div className="bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] p-6 text-left space-y-4 text-xs text-[#3A2A20]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4D9C5]">
            <div>
              <span className="text-[10px] text-[#3A2A20]/50 uppercase font-semibold block">Order Reference ID</span>
              <span className="text-sm font-mono font-bold text-[#4A0E17]">{orderId}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#3A2A20]/50 uppercase font-semibold block">Payment Method</span>
              <span className="font-bold text-[#D97706]">Cash on Delivery</span>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-sm text-[#3A2A20]/70">
              📦 Your order is being prepared. Our team will contact you shortly for delivery confirmation.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FAF6EE] hover:bg-[#E4D9C5] text-[#4A0E17] text-xs font-bold border border-[#E4D9C5] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessClient() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAF6EE] min-h-screen flex items-center justify-center">
        <div className="text-[#4A0E17] font-serif text-lg">Loading... 🪔</div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
