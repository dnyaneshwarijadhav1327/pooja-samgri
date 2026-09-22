'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, CheckCircle, Package } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function PujaKitSection() {
  const { addToCart } = useShop();

  const kits = [
    {
      id: "kit-1",
      name: "Daily Nitya Puja Kit",
      slug: "daily-nitya-puja-kit",
      itemsCount: "12 Essential Items",
      price: 799,
      mrp: 1199,
      included: ["Gangajal 250ml", "Bhimseni Kapoor", "Herbal Dhoop Cones", "Cotton Wicks 100 Pcs", "Brass Diya", "Pure Kumkum & Haldi"],
      image: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "kit-2",
      name: "Shri Ganesh Puja Kit",
      slug: "shri-ganesh-puja-kit",
      itemsCount: "21 Sacred Items",
      price: 999,
      mrp: 1499,
      included: ["Durva grass substitute bundle", "Red Chunri", "Janeu Pair", "Modak Prasad Mould", "Supari & Cardamom", "Ganesh Aarti Booklet"],
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "kit-3",
      name: "Shri Lakshmi Prosperity Puja Kit",
      slug: "shri-lakshmi-prosperity-puja-kit",
      itemsCount: "18 Ritual Items",
      price: 1299,
      mrp: 1899,
      included: ["Kamal Gatta Lotus Seeds", "Yellow Kaudi 5 Pcs", "Gomti Chakra", "Shri Yantra Card", "Ghee Diya & Chunri", "Lakshmi Puja Guide"],
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "kit-4",
      name: "Complete Home Havan Kit",
      slug: "complete-home-havan-kit-with-brass-kund",
      itemsCount: "Full Kund + 7 Items",
      price: 1699,
      mrp: 2499,
      included: ["Heavy Copper/Brass Kund", "500g 51-herb Samagri", "Mango Wood Logs", "Desi Cow Dung Cakes", "Desi Cow Ghee (250g)", "Havan Spoon"],
      image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-16 bg-[#FAF6EE] border-b border-[#E4D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-[#D97706] font-semibold">
            All-In-One Sacred Ready Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Complete Puja Kits
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2A20]/80">
            Carefully curated ready-to-use ritual boxes containing all authentic samagri required for your prayers and Yagnas.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="bg-[#F5EFE4] rounded-2xl border border-[#E4D9C5] p-5 shadow-card hover:shadow-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-[#E4D9C5]">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-[#4A0E17] text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D97706] flex items-center gap-1">
                    <Package className="w-3 h-3" /> {kit.itemsCount}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#4A0E17] mb-2 group-hover:text-[#D97706] transition-colors">
                  {kit.name}
                </h3>

                {/* What's included preview */}
                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-1 text-xs text-[#3A2A20]/80">
                    {kit.included.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-[#D97706] shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    {kit.included.length > 3 && (
                      <li className="text-[10px] text-[#3A2A20]/50 italic pl-4">
                        + {kit.included.length - 3} more items included
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#E4D9C5] flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#4A0E17]">₹{kit.price}</span>
                  <span className="ml-1.5 text-xs text-[#3A2A20]/50 line-through">₹{kit.mrp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${kit.slug}`}
                    className="px-3 py-2 rounded-lg bg-[#FAF6EE] hover:bg-[#E4D9C5] text-[#4A0E17] text-xs font-semibold border border-[#E4D9C5] transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => addToCart({
                      id: kit.id,
                      name: kit.name,
                      slug: kit.slug,
                      price: kit.price,
                      mrp: kit.mrp,
                      image: kit.image,
                      quantityUnit: kit.itemsCount,
                    })}
                    className="px-3 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
