'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'PAVITRA10', discountPercent: 10, minOrderValue: 499, active: true },
    { id: '2', code: 'FESTIVAL20', discountPercent: 20, minOrderValue: 999, active: true },
  ]);

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('15');
  const [minOrderValue, setMinOrderValue] = useState('499');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon = {
      id: Date.now().toString(),
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      minOrderValue: Number(minOrderValue),
      active: true,
    };

    setCoupons([...coupons, newCoupon]);
    setCode('');
  };

  const toggleActive = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E4D9C5]">
        <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
          Discount Coupons ({coupons.length})
        </h1>
        <p className="text-xs text-[#3A2A20]/70">
          Create promotional discount codes for your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#4A0E17] border-b border-[#E4D9C5] pb-2">
            Generate New Coupon
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Coupon Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. DIWALI30"
                required
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17] uppercase font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  placeholder="15"
                  required
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#4A0E17] mb-1">Min Order (₹)</label>
                <input
                  type="number"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  placeholder="499"
                  required
                  className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Save Coupon Code
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="lg:col-span-7 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#4A0E17] border-b border-[#E4D9C5] pb-2">
            Active Store Coupons
          </h3>

          <div className="space-y-3 text-xs">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#4A0E17] text-sm">{c.code}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.discountPercent}% OFF
                    </span>
                  </div>
                  <span className="text-[11px] text-[#3A2A20]/70 block">
                    Valid on orders above ₹{c.minOrderValue}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleActive(c.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                      c.active ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {c.active ? 'Active' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="p-1 text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
