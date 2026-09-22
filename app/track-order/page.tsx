'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, CheckCircle2, Truck, Home, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);

  const mockTrackingDB: Record<string, any> = {
    "ORD-98421": {
      id: "ORD-98421",
      customerName: "Ramesh Sharma",
      phone: "9123456789",
      date: "18 Sep 2026, 09:30 AM",
      totalAmount: 1298,
      statusStep: 4, // 1: Placed, 2: Confirmed, 3: Packed, 4: Shipped, 5: Out for Delivery, 6: Delivered
      courier: "Delhivery Express",
      trackingNumber: "DEL-88291039",
      estDelivery: "22 Sep 2026",
      items: [
        { name: "Shri Ganesh Puja Kit", qty: 1, price: 999 },
        { name: "Pavitra Gangajal Bottle (500ml)", qty: 2, price: 298 }
      ],
      address: "Flat 402, Shiv Shanti Apts, FC Road, Pune, MH - 411005"
    },
    "ORD-76120": {
      id: "ORD-76120",
      customerName: "Sunita Deshmukh",
      phone: "9876543210",
      date: "24 Aug 2026, 04:15 PM",
      totalAmount: 624,
      statusStep: 6, // Delivered
      courier: "BlueDart Express",
      trackingNumber: "BD-99120412",
      estDelivery: "Delivered on 27 Aug 2026",
      items: [
        { name: "Gomaya Sambrani Dhoop Cups", qty: 2, price: 440 },
        { name: "Natural Herbal Dhoop Sticks", qty: 1, price: 175 }
      ],
      address: "12/A Viraj Heights, Baner, Pune, MH - 411045"
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (targetId = orderId) => {
    const queryId = targetId.trim().toUpperCase();
    if (!queryId) return;

    setSearched(true);
    const found = mockTrackingDB[queryId] || {
      id: queryId,
      customerName: "Valued Devotee",
      phone: phone || "9123456789",
      date: "Today, 10:15 AM",
      totalAmount: 799,
      statusStep: 3, // Packed
      courier: "Express Delivery Partner",
      trackingNumber: "TRK-" + Math.floor(100000 + Math.random() * 900000),
      estDelivery: "Expected in 2-3 Business Days",
      items: [
        { name: "Pavitra Pooja Samagri Order", qty: 1, price: 799 }
      ],
      address: "Registered Delivery Address"
    };

    setTrackingData(found);
  };

  const steps = [
    { title: "Order Placed", desc: "Received", icon: "📝" },
    { title: "Confirmed", desc: "Sanctified", icon: "✅" },
    { title: "Packed", desc: "Secure Packaging", icon: "📦" },
    { title: "Shipped", desc: "In Transit", icon: "🚚" },
    { title: "Out for Delivery", desc: "Near Your Location", icon: "🛵" },
    { title: "Delivered", desc: "At Your Doorstep", icon: "🪔" },
  ];

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EFE4] text-[#D97706] text-xs font-semibold border border-[#E4D9C5]">
            <Truck className="w-3.5 h-3.5" /> Doorstep Order Lookup
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#4A0E17]">
            Track Your Order
          </h1>
          <p className="text-xs text-[#3A2A20]/70 max-w-md mx-auto">
            Enter your Order ID (e.g. <code className="bg-[#F5EFE4] px-1.5 py-0.5 rounded font-mono">ORD-98421</code>) and mobile number to view real-time delivery status.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#F5EFE4] p-6 sm:p-8 rounded-3xl border border-[#E4D9C5] shadow-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs"
          >
            <div className="sm:col-span-6">
              <label className="block font-semibold text-[#4A0E17] mb-1">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-98421"
                required
                className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] uppercase font-bold focus:outline-none focus:border-[#D97706]"
              />
            </div>
            <div className="sm:col-span-6">
              <label className="block font-semibold text-[#4A0E17] mb-1">Mobile Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9123456789"
                className="w-full p-3 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] focus:outline-none focus:border-[#D97706]"
              />
            </div>
            <div className="sm:col-span-12">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Track Sacred Package
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results Card */}
        {searched && trackingData && (
          <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 sm:p-8 shadow-2xl space-y-8 animate-fade-in">
            
            {/* Top Order Details Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E4D9C5]">
              <div>
                <span className="text-xs font-bold text-[#D97706] uppercase">Order #{trackingData.id}</span>
                <h2 className="text-lg font-serif font-bold text-[#4A0E17]">
                  Customer: {trackingData.customerName}
                </h2>
                <span className="text-xs text-[#3A2A20]/60">Placed on: {trackingData.date}</span>
              </div>
              <div className="text-left sm:text-right bg-[#FAF6EE] p-3 rounded-xl border border-[#E4D9C5]">
                <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Courier & AWB</span>
                <span className="text-xs font-bold text-[#4A0E17] block">{trackingData.courier}</span>
                <span className="text-xs text-[#D97706] font-mono">{trackingData.trackingNumber}</span>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-[#4A0E17]">
                Live Package Progress
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {steps.map((st, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = trackingData.statusStep >= stepNum;
                  const isCurrent = trackingData.statusStep === stepNum;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-[#4A0E17] text-[#FAF6EE] border-[#D97706] shadow-md ring-2 ring-[#D97706]/20'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : 'bg-[#FAF6EE]/50 text-[#3A2A20]/40 border-[#E4D9C5]'
                      }`}
                    >
                      <span className="text-xl block mb-1">{st.icon}</span>
                      <h4 className="text-xs font-bold leading-tight">{st.title}</h4>
                      <span className="text-[10px] opacity-75 block mt-0.5">{st.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Item Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E4D9C5] text-xs">
              <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] space-y-1">
                <span className="font-bold text-[#4A0E17] block mb-1">📍 Delivery Address:</span>
                <p className="text-[#3A2A20] leading-relaxed">{trackingData.address}</p>
              </div>

              <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] space-y-2">
                <span className="font-bold text-[#4A0E17] block mb-1">📦 Order Contents:</span>
                {trackingData.items.map((it: any, i: number) => (
                  <div key={i} className="flex justify-between text-[#3A2A20]">
                    <span>{it.qty}x {it.name}</span>
                    <span className="font-bold text-[#4A0E17]">₹{it.price * it.qty}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
