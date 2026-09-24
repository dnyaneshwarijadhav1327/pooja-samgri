import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const festivalMeta: Record<string, { name: string; title: string; desc: string }> = {
  diwali: {
    name: "Diwali Mahotsav",
    title: "Deepotsav & Shri Lakshmi-Kuber Puja Essentials",
    desc: "Complete pure offerings, ghee diyas, brass samagri, chunri, and Lakshmi Puja kits for prosperous Diwali celebrations."
  },
  "ganesh-chaturthi": {
    name: "Ganesh Chaturthi",
    title: "Bappa Sthapana & Daily Aarti Samagri",
    desc: "Authentic Durva grass, Modak dhoop, Janeu, Red cloth, and complete Lord Ganesha Puja kits."
  },
  navratri: {
    name: "Maa Durga Navratri",
    title: "9 Days Devi Puja & Kanya Pujan Kit",
    desc: "Sacred Chunri, Akhand Diya, Coconut, Kumkum, and complete 9-day Puja materials."
  },
  mahashivratri: {
    name: "Mahashivratri",
    title: "Shiva Abhishekam & Belpatra Offerings",
    desc: "Purified Gangajal, Chandan paste, Bhasma, Bhang offerings, and Rudra Yajna samagri."
  },
  janmashtami: {
    name: "Shri Krishna Janmashtami",
    title: "Bal Gopal Jhula & Panchamrit Samagri",
    desc: "Kasturi Chandan, Tulsi leaves substitute, Attar, and sacred bath offerings."
  },
  "satyanarayan-puja": {
    name: "Satyanarayan Vrat",
    title: "Full Moon Vrat Katha & Puja Box",
    desc: "Ready katha kits, Tulsi wicks, Panchamrit essentials, and Prasad containers."
  },
  "griha-pravesh": {
    name: "Griha Pravesh Vastu Yajna",
    title: "New Home Blessing & Havan Samagri",
    desc: "Heavy brass havan kund, 51-herb samagri, mango wood, and Vastu purification items."
  },
  "ram-navami": {
    name: "Shri Ram Navami",
    title: "Ram Janmotsav & Sundarkand Samagri",
    desc: "Pure ghee, Hanumanji Sindoor, Chandan, and festival puja kits."
  }
};

export default async function FestivalPage({ params }: Props) {
  const { slug } = await params;
  const meta = festivalMeta[slug];

  if (!meta) {
    notFound();
  }

  const rawProducts = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { rating: 'desc' },
    include: {
      category: true,
      images: true,
    },
  });

  const allCategories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  const products = rawProducts.map((p) => ({
    ...p,
    category: { name: p.category.name },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  return (
    <div>
      {/* Festival Hero Banner */}
      <div className="bg-[#380B12] text-[#FAF6EE] py-14 px-4 text-center border-b-4 border-[#D97706] relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#D97706] font-semibold flex items-center justify-center gap-1.5">
            🪔 Sacred Festival Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6EE]">
            {meta.name}
          </h1>
          <p className="text-sm font-medium text-[#D97706]">
            {meta.title}
          </p>
          <p className="text-xs sm:text-sm text-[#FAF6EE]/80 max-w-xl mx-auto leading-relaxed">
            {meta.desc}
          </p>
        </div>
      </div>

      <ShopClient
        initialProducts={products}
        categories={allCategories}
      />
    </div>
  );
}
