'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, Heart, LogOut, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pavitra_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Default demo user profile if not logged in
        setUser({
          name: 'Ramesh Sharma',
          email: 'ramesh@example.com',
          phone: '+91 9123456789',
          role: 'CUSTOMER'
        });
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pavitra_user');
    setUser(null);
    router.push('/login');
  };

  const sampleOrders = [
    {
      id: "ORD-98421",
      date: "Sep 18, 2026",
      status: "SHIPPED",
      total: 1298,
      items: [
        { name: "Shri Ganesh Puja Kit", qty: 1, price: 999 },
        { name: "Pavitra Gangajal Bottle (500ml)", qty: 2, price: 298 }
      ],
      tracking: "TRK-IN-88231"
    },
    {
      id: "ORD-76120",
      date: "Aug 24, 2026",
      status: "DELIVERED",
      total: 624,
      items: [
        { name: "Gomaya Sambrani Dhoop Cups", qty: 2, price: 440 },
        { name: "Natural Herbal Dhoop Sticks", qty: 1, price: 175 }
      ],
      tracking: "TRK-IN-66210"
    }
  ];

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E4D9C5]">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#4A0E17] text-[#FAF6EE] flex items-center justify-center text-2xl font-serif font-bold shadow-md border border-[#D97706]">
              🪔
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
                Namaste, {user?.name || 'Devotee'}
              </h1>
              <p className="text-xs text-[#3A2A20]/70">
                {user?.email} | {user?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-[#4A0E17] text-white text-xs font-serif font-bold border border-[#D97706] shadow-md flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#D97706]" /> Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-[#F5EFE4] hover:bg-red-100 hover:text-red-700 text-[#4A0E17] text-xs font-semibold border border-[#E4D9C5] transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Sidebar */}
          <aside className="bg-[#F5EFE4] p-4 rounded-2xl border border-[#E4D9C5] space-y-1 h-fit">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'orders' ? 'bg-[#D97706] text-white font-bold' : 'text-[#4A0E17] hover:bg-[#FAF6EE]'
              }`}
            >
              <Package className="w-4 h-4" /> My Orders ({sampleOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'profile' ? 'bg-[#D97706] text-white font-bold' : 'text-[#4A0E17] hover:bg-[#FAF6EE]'
              }`}
            >
              <User className="w-4 h-4" /> My Profile Info
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'addresses' ? 'bg-[#D97706] text-white font-bold' : 'text-[#4A0E17] hover:bg-[#FAF6EE]'
              }`}
            >
              <MapPin className="w-4 h-4" /> Saved Delivery Addresses
            </button>
            <Link
              href="/wishlist"
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-[#4A0E17] hover:bg-[#FAF6EE] flex items-center gap-2.5 transition-colors block"
            >
              <Heart className="w-4 h-4 text-red-500" /> Saved Wishlist Items
            </Link>
            <Link
              href="/track-order"
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-[#D97706] hover:bg-[#FAF6EE] flex items-center gap-2.5 transition-colors block"
            >
              <Truck className="w-4 h-4" /> Track Order Status
            </Link>
          </aside>

          {/* Main Dashboard Area */}
          <main className="lg:col-span-3">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-serif font-bold text-[#4A0E17]">
                  Recent Order History
                </h2>

                <div className="space-y-4">
                  {sampleOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#F5EFE4] rounded-2xl p-6 border border-[#E4D9C5] shadow-card space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4D9C5]">
                        <div>
                          <span className="text-xs font-bold text-[#4A0E17] block">Order ID: {ord.id}</span>
                          <span className="text-[11px] text-[#3A2A20]/60">Placed on {ord.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                            ord.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {ord.status}
                          </span>
                          <Link
                            href={`/track-order?orderId=${ord.id}`}
                            className="text-xs font-semibold text-[#D97706] hover:underline"
                          >
                            Track Package ➔
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 text-xs">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[#3A2A20]">
                            <span>{item.qty}x {item.name}</span>
                            <span className="font-semibold text-[#4A0E17]">₹{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="pt-3 border-t border-[#E4D9C5] flex justify-between items-center text-xs font-bold text-[#4A0E17]">
                        <span>Total Paid Amount:</span>
                        <span className="text-base text-[#D97706]">₹{ord.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#F5EFE4] p-6 rounded-2xl border border-[#E4D9C5] space-y-6">
                <h2 className="text-xl font-serif font-bold text-[#4A0E17]">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5]">
                    <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Full Name</span>
                    <span className="text-sm font-bold text-[#4A0E17]">{user?.name}</span>
                  </div>
                  <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5]">
                    <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Email Address</span>
                    <span className="text-sm font-bold text-[#4A0E17]">{user?.email}</span>
                  </div>
                  <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5]">
                    <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Mobile Number</span>
                    <span className="text-sm font-bold text-[#4A0E17]">{user?.phone}</span>
                  </div>
                  <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5]">
                    <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Account Type</span>
                    <span className="text-sm font-bold text-[#D97706]">{user?.role}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-[#F5EFE4] p-6 rounded-2xl border border-[#E4D9C5] space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold text-[#4A0E17]">
                    Saved Delivery Addresses
                  </h2>
                  <button className="px-3.5 py-1.5 rounded-xl bg-[#D97706] text-white text-xs font-bold">
                    + Add New Address
                  </button>
                </div>

                <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E4D9C5] space-y-1 text-xs text-[#3A2A20]">
                  <span className="font-bold text-[#4A0E17] block">Home (Primary Address)</span>
                  <p>Ramesh Sharma</p>
                  <p>Flat 402, Shiv Shanti Apartments, FC Road, Shivaji Nagar</p>
                  <p>Pune, Maharashtra - 411005</p>
                  <p>Phone: +91 9123456789</p>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
