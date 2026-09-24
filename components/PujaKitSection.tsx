'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, CheckCircle, Package } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import QuickViewModal, { QuickViewProduct } from './QuickViewModal';

interface Props {
  kits?: QuickViewProduct[];
}

export default function PujaKitSection({ kits = [] }: Props) {
  const { addToCart } = useShop();
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);

  // Default Fallback Kits if database has no puja kits yet
  const fallbackKits = [
    {
      id: "kit-1",
      name: "Daily Nitya Puja Kit",
      slug: "daily-nitya-puja-kit",
      shortDesc: "12 Essential Items for daily morning worship.",
      description: "Includes Gangajal, Dhoop cones, Bhimseni Kapoor, Cotton wicks, Brass diya, Matchboxes, Kumkum, Haldi, Chandan, Janeu, Attar & Bell.",
      ingredients: "12 Authentic Puja Items + Storage Box",
      price: 799,
      mrp: 1199,
      discount: 33,
      rating: 4.9,
      reviewCount: 185,
      quantityUnit: "Complete 12-Item Kit",
      category: { name: "Puja Kits" },
      images: [{ url: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800" }]
    },
    {
      id: "kit-2",
      name: "Shri Ganesh Puja Kit",
      slug: "shri-ganesh-puja-kit",
      shortDesc: "21 Sacred Items for Ganesh Chaturthi & Tuesday Vrat.",
      description: "Contains Durva grass substitute bundle, Red cloth, Janeu pair, Modak prasad mold, Modak dhoop, Gangajal, Supari, Cardamom, Clove, Camphor, Dhoop, Kumkum, Haldi, Akshata, and Aarti booklet.",
      ingredients: "21 Sacred Ritual Ingredients + Aarti Chalisa Booklet",
      price: 999,
      mrp: 1499,
      discount: 33,
      rating: 5.0,
      reviewCount: 154,
      quantityUnit: "Complete 21-Item Kit",
      category: { name: "Puja Kits" },
      images: [{ url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800" }]
    },
    {
      id: "kit-3",
      name: "Shri Lakshmi Prosperity Puja Kit",
      slug: "shri-lakshmi-prosperity-puja-kit",
      shortDesc: "Special kit for Diwali Lakshmi Puja and Friday Dhan Aakarshan.",
      description: "Includes Kamal Gatta (Lotus Seeds), Yellow Kaudi (Cowrie shells), Gomti Chakra (5 Pcs), Shri Yantra Card, Pure Ghee Diya, Agarbatti, Red Chunri, Kuber Chalisa & Lakshmi Puja Paddhati guide.",
      ingredients: "Kamal Gatta, Gomti Chakra, Yellow Kaudi, Chunri, Puja Book, Samagri",
      price: 1299,
      mrp: 1899,
      discount: 31,
      rating: 4.9,
      reviewCount: 198,
      quantityUnit: "Complete Kit + Guide",
      category: { name: "Puja Kits" },
      images: [{ url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=800" }]
    },
    {
      id: "kit-4",
      name: "Complete Home Havan Kit",
      slug: "complete-home-havan-kit-with-brass-kund",
      shortDesc: "Solid copper/brass havan kund + 500g samagri + mango wood & ghee.",
      description: "Everything required for conducting household Yajna or Griha Pravesh havan. Includes reusable heavy-duty Havan Kund, Mango wood sticks, Cow dung cakes, Havan samagri, Pure Cow Ghee (250g), Camphor & Havan spoon.",
      ingredients: "Copper/Brass Havan Kund, Mango Wood, Ghee, 51-herb Samagri",
      price: 1699,
      mrp: 2499,
      discount: 32,
      rating: 5.0,
      reviewCount: 280,
      quantityUnit: "Full Box + Brass Kund",
      category: { name: "Puja Kits" },
      images: [{ url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800" }]
    }
  ];

  const displayKits = kits.length > 0 ? kits : fallbackKits;

  return (
    <section className="py-14 sm:py-16 bg-white relative overflow-hidden border-b border-stone-200/80">
      {/* Background Decorative Hibiscus Flower Motifs - Crystal Clear HD */}
      <img
        src="/images/hibiscus_bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute -top-6 -left-6 w-48 sm:w-64 lg:w-72 h-auto object-contain opacity-90 pointer-events-none select-none rotate-12"
      />
      <img
        src="/images/hibiscus_bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-44 sm:w-56 lg:w-64 h-auto object-contain opacity-80 pointer-events-none select-none -rotate-6"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
          {displayKits.map((kit) => {
            const mainImg = kit.images?.[0]?.url || 'https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800';

            return (
              <div
                key={kit.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm hover:shadow-xl hover:border-[#D97706]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Kit Image Frame */}
                  <Link href={`/product/${kit.slug}`} className="block">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-stone-100 bg-stone-50">
                      <img
                        src={mainImg}
                        alt={kit.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-[#4A0E17] text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D97706] flex items-center gap-1 shadow-sm">
                        <Package className="w-3 h-3" /> {kit.quantityUnit}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#4A0E17] mb-2 group-hover:text-[#D97706] transition-colors line-clamp-1">
                      {kit.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#3A2A20]/75 line-clamp-2 leading-relaxed mb-4">
                    {kit.shortDesc}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#4A0E17]">₹{kit.price}</span>
                    {kit.mrp > kit.price && (
                      <span className="ml-1.5 text-xs text-[#3A2A20]/50 line-through">₹{kit.mrp}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/product/${kit.slug}`}
                      className="px-3 py-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-[#4A0E17] text-xs font-semibold border border-stone-200 transition-colors"
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
                        image: mainImg,
                        quantityUnit: kit.quantityUnit,
                      })}
                      className="px-3 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
