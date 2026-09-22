'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  shortDesc: string;
  quantityUnit: string;
  category: { name: string };
  images: { url: string }[];
}

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (e) {
        console.error('Search fetch error', e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-maroon-900/60 backdrop-blur-sm transition-opacity">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-2xl shadow-2xl border border-[#E4D9C5] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E4D9C5] bg-[#F5EFE4]">
          <Search className="w-5 h-5 text-[#D97706] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Dhoop, Pavitra Jal, Havan, Kapoor, Puja Kits..."
            className="w-full bg-transparent border-none text-[#4A0E17] placeholder-[#3A2A20]/50 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#3A2A20]/60 hover:text-[#4A0E17] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 p-1.5 rounded-full bg-[#FAF6EE] text-[#4A0E17] hover:bg-[#E4D9C5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Chips */}
        {!query && (
          <div className="p-4 bg-[#FAF6EE] border-b border-[#E4D9C5]/60 text-xs text-[#3A2A20]/70">
            <span className="font-semibold text-[#4A0E17] block mb-2">Popular Searches:</span>
            <div className="flex flex-wrap gap-2">
              {['Dhoop & Incense', 'Pavitra Jal', 'Bhimseni Kapoor', 'Ganesh Puja Kit', 'Havan Samagri', 'Gomaya Cups'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 rounded-full bg-[#F5EFE4] hover:bg-[#D97706] hover:text-white transition-colors border border-[#E4D9C5]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && (
            <div className="py-8 text-center text-[#D97706] text-sm animate-pulse font-medium">
              Searching sacred essentials...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-[#3A2A20]/70 text-sm">
              No products found matching &quot;<span className="font-semibold text-[#4A0E17]">{query}</span>&quot;.
            </div>
          )}

          {!loading && results.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              onClick={() => setIsSearchOpen(false)}
              className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#F5EFE4] transition-colors border border-transparent hover:border-[#E4D9C5] group"
            >
              <div className="w-14 h-14 rounded-lg bg-stone-200 overflow-hidden shrink-0 border border-[#E4D9C5]">
                <img
                  src={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=300'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-semibold text-[#D97706] tracking-wider">
                  {item.category?.name}
                </span>
                <h4 className="text-sm font-semibold text-[#4A0E17] truncate group-hover:text-[#D97706] transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-[#3A2A20]/70 truncate">{item.shortDesc}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-[#4A0E17]">₹{item.price}</span>
                {item.mrp > item.price && (
                  <span className="block text-[10px] text-[#3A2A20]/50 line-through">₹{item.mrp}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {query && results.length > 0 && (
          <div className="p-3 bg-[#F5EFE4] border-t border-[#E4D9C5] text-center">
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={() => setIsSearchOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D97706] hover:text-[#4A0E17] transition-colors"
            >
              View all results for &quot;{query}&quot; <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
