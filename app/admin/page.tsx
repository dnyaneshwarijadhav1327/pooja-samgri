import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { DollarSign, ShoppingCart, Package, Tag, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Always fresh for admin dashboard

export default async function AdminDashboardPage() {
  const productsCount = await prisma.product.count();
  const categoriesCount = await prisma.category.count();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
          Admin Store Overview
        </h1>
        <p className="text-xs text-[#3A2A20]/70 mt-1">
          Welcome back to Pavitra Pooja dashboard management.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#F5EFE4] p-5 rounded-2xl border border-[#E4D9C5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Total Revenue</span>
            <span className="text-2xl font-bold text-[#4A0E17]">₹{totalRevenue}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center font-bold">
            ₹
          </div>
        </div>

        <div className="bg-[#F5EFE4] p-5 rounded-2xl border border-[#E4D9C5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Active Orders</span>
            <span className="text-2xl font-bold text-[#4A0E17]">{orders.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#F5EFE4] p-5 rounded-2xl border border-[#E4D9C5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Total Products</span>
            <span className="text-2xl font-bold text-[#4A0E17]">{productsCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#F5EFE4] p-5 rounded-2xl border border-[#E4D9C5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#3A2A20]/60 uppercase font-semibold block">Categories</span>
            <span className="text-2xl font-bold text-[#4A0E17]">{categoriesCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#F5EFE4] rounded-3xl border border-[#E4D9C5] p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4D9C5]">
          <h2 className="text-base font-serif font-bold text-[#4A0E17]">
            Recent Customer Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#D97706] hover:underline flex items-center gap-1"
          >
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-[#3A2A20]/60 py-4 text-center">No customer orders recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#3A2A20]">
              <thead className="bg-[#FAF6EE] text-[#4A0E17] font-serif uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4D9C5]/50">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6EE]/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#4A0E17] truncate max-w-[120px]">
                      {ord.id.substring(0, 8)}...
                    </td>
                    <td className="p-3 font-semibold">{ord.customerName}</td>
                    <td className="p-3 font-bold text-[#4A0E17]">₹{ord.totalAmount}</td>
                    <td className="p-3">{ord.paymentMethod} ({ord.paymentStatus})</td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/admin/orders"
                        className="text-xs text-[#D97706] font-semibold hover:underline"
                      >
                        View & Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
