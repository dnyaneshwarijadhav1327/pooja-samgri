'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Folders, RefreshCw } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: desc }),
      });

      if (res.ok) {
        setName('');
        setDesc('');
        fetchCats();
      }
    } catch (e) {} finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-[#E4D9C5]">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">
            Category Management ({categories.length})
          </h1>
          <p className="text-xs text-[#3A2A20]/70">
            Organize spiritual items into shop category listings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Create Category Form */}
        <div className="lg:col-span-5 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#4A0E17] border-b border-[#E4D9C5] pb-2">
            Create New Category
          </h3>

          <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Diya & Lamps"
                required
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#4A0E17] mb-1">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Brass and terracotta diyas for daily morning Aarti..."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-[#E4D9C5] bg-[#FAF6EE] text-[#4A0E17]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Save Category
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-7 bg-[#F5EFE4] p-6 rounded-3xl border border-[#E4D9C5] shadow-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#4A0E17] border-b border-[#E4D9C5] pb-2">
            Active Shop Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-3.5 bg-[#FAF6EE] rounded-2xl border border-[#E4D9C5] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4A0E17]">{cat.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706]">
                    {cat._count?.products || 0} Products
                  </span>
                </div>
                <p className="text-[11px] text-[#3A2A20]/70 line-clamp-2">{cat.description || 'No description'}</p>
                <span className="text-[10px] text-[#3A2A20]/50 font-mono block">/category/{cat.slug}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
