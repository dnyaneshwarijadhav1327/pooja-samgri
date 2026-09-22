'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Truck, Check, RefreshCw } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-[#E4D9C5]">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
            Customer Order Management ({orders.length})
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            View orders, update package dispatch progress, and manage customer shipments.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="p-2 rounded-xl bg-[#F5EFE4] text-[#4A0E17] hover:bg-[#E4D9C5]"
          title="Refresh orders"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 shadow-card">
        {loading ? (
          <p className="text-xs text-[#D97706] py-8 text-center animate-pulse">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-xs text-[#3A2A20]/60 py-8 text-center">No customer orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4D9C5]">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#4A0E17] block">
                      Order ID: {ord.id}
                    </span>
                    <span className="text-[10px] text-[#3A2A20]/60">
                      Customer: {ord.customerName} ({ord.phone})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#D97706]">₹{ord.totalAmount}</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1 text-xs text-[#3A2A20]">
                  <span className="font-bold text-[#4A0E17] block mb-1">Items Ordered:</span>
                  {ord.orderItems?.map((it: any) => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.quantity}x {it.productName}</span>
                      <span className="font-bold text-[#4A0E17]">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Status Updater */}
                <div className="pt-3 border-t border-[#E4D9C5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[11px] text-[#3A2A20]/70">
                    <span>Address: {ord.street}, {ord.city} ({ord.pincode})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#4A0E17]">Update Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className="p-2 rounded-xl bg-[#F5EFE4] border border-[#E4D9C5] text-[#4A0E17] font-bold focus:outline-none focus:border-[#D97706]"
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PACKED">PACKED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
