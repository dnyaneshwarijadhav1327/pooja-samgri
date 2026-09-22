import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { CheckCircle2, Truck, ArrowRight, Home } from 'lucide-react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderSuccessPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });

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

        {/* Order Details Receipt Box */}
        <div className="bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] p-6 text-left space-y-4 text-xs text-[#3A2A20]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4D9C5]">
            <div>
              <span className="text-[10px] text-[#3A2A20]/50 uppercase font-semibold block">Order Reference ID</span>
              <span className="text-sm font-mono font-bold text-[#4A0E17]">{order?.id || id}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#3A2A20]/50 uppercase font-semibold block">Payment Method</span>
              <span className="font-bold text-[#D97706]">{order?.paymentMethod || 'COD'} ({order?.paymentStatus || 'PENDING'})</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-[#4A0E17] block mb-1">📍 Delivery Address:</span>
            <p>{order?.customerName}</p>
            <p>{order?.street}, {order?.city}, {order?.state} - {order?.pincode}</p>
            <p>Phone: {order?.phone}</p>
          </div>

          {/* Items Table */}
          {order?.orderItems && order.orderItems.length > 0 && (
            <div className="pt-2 border-t border-[#E4D9C5] space-y-2">
              <span className="font-bold text-[#4A0E17] block">📦 Order Summary:</span>
              <div className="space-y-1">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.productName}</span>
                    <span className="font-bold text-[#4A0E17]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#E4D9C5] flex justify-between font-bold text-sm text-[#4A0E17]">
                <span>Total Amount Paid</span>
                <span className="text-[#D97706]">₹{order.totalAmount}</span>
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/track-order?orderId=${order?.id || id}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" /> Track Order Status
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FAF6EE] hover:bg-[#E4D9C5] text-[#4A0E17] text-xs font-bold border border-[#E4D9C5] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Shop
          </Link>
        </div>

      </div>
    </div>
  );
}
