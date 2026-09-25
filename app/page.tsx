import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PujaKitSection from '@/components/PujaKitSection';
import ProductMakingSection from '@/components/ProductMakingSection';
import ReviewSection from '@/components/ReviewSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh updates for newly added admin products

const fallbackEssentials = [
  {
    id: "ess-1",
    name: "Pure Natural Kumkum & Roli",
    slug: "pure-natural-kumkum-roli",
    shortDesc: "Traditional turmeric-based sacred vermillion powder.",
    description: "Prepared using organic turmeric and slaked lime in pure sacred traditions. Free from synthetic chemicals.",
    ingredients: "Organic Turmeric, Slaked Lime, Rose Essence",
    howToUse: "Apply with ring finger on deity or forehead.",
    price: 99,
    mrp: 149,
    discount: 33,
    rating: 4.9,
    reviewCount: 230,
    quantityUnit: "100g Pack",
    category: { name: "Sacred Powders" },
    images: [{ url: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-2",
    name: "Bhimseni Pure Camphor (Kapoor)",
    slug: "bhimseni-pure-camphor-kapoor",
    shortDesc: "100% pure crystalline edible grade camphor for divine aarti.",
    description: "Organic raw crystalline Bhimseni Kapoor that burns cleanly without leaving black residue.",
    ingredients: "100% Bhimseni Kapoor Flakes",
    howToUse: "Place on camphor holder / diya and ignite.",
    price: 199,
    mrp: 299,
    discount: 33,
    rating: 5.0,
    reviewCount: 310,
    quantityUnit: "100g Jar",
    category: { name: "Dhoop & Camphor" },
    images: [{ url: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-3",
    name: "Original Sandalwood Chandan Tika",
    slug: "original-sandalwood-chandan-tika",
    shortDesc: "Pure Mysore Sandalwood paste infused with saffron.",
    description: "Authentic chilled Chandan paste for daily Tilak and deity worship. Calms the mind and elevates spiritual focus.",
    ingredients: "Pure Sandalwood Extract, Saffron, Gangajal",
    howToUse: "Apply directly for tilak.",
    price: 149,
    mrp: 220,
    discount: 32,
    rating: 4.8,
    reviewCount: 180,
    quantityUnit: "50g Tub",
    category: { name: "Sacred Powders" },
    images: [{ url: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-4",
    name: "Handmade Round Cotton Wicks (Phool Batti)",
    slug: "handmade-round-cotton-wicks-phool-batti",
    shortDesc: "Premium hand-rolled pure cotton diya wicks for long burning aarti.",
    description: "Unbleached pure cotton wicks crafted to hold ghee evenly for a continuous, steady flame during daily puja.",
    ingredients: "100% Pure Virgin Cotton",
    howToUse: "Dip in ghee/oil and place in diya.",
    price: 89,
    mrp: 120,
    discount: 25,
    rating: 4.9,
    reviewCount: 142,
    quantityUnit: "Pack of 200 Pcs",
    category: { name: "Puja Essentials" },
    images: [{ url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=600" }]
  }
];

export default async function HomePage() {
  let products: any[] = fallbackEssentials;
  let pujaKits: any[] = [];

  try {
    // 1. Query ONLY Individual Essentials (Excludes Puja Kits)
    const rawProducts = await prisma.product.findMany({
      where: {
        isAvailable: true,
        NOT: {
          category: { slug: 'puja-kits' },
        },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: true,
      },
    });

    // 2. Query ONLY Puja Kits for the dedicated Puja Kit section
    const rawPujaKits = await prisma.product.findMany({
      where: {
        isAvailable: true,
        category: { slug: 'puja-kits' },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: true,
      },
    });

    if (rawProducts && rawProducts.length > 0) {
      products = rawProducts.map((p) => ({
        ...p,
        category: { name: p.category.name },
        images: p.images.map((img) => ({ url: img.url })),
      }));
    }

    if (rawPujaKits && rawPujaKits.length > 0) {
      pujaKits = rawPujaKits.map((p) => ({
        ...p,
        category: { name: p.category.name },
        images: p.images.map((img) => ({ url: img.url })),
      }));
    }
  } catch (error) {
    console.error('Database connection error in HomePage, loading fallback data:', error);
  }

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Sacred Essentials (ONLY Individual Essentials - No Puja Kits) */}
      <FeaturedProducts products={products} />

      {/* 5. Complete Puja Kits Showcase (ONLY Puja Kits) */}
      <PujaKitSection kits={pujaKits} />

      {/* 4. Product Making Videos Showcase ("How Our Sacred Products Are Made") */}
      <ProductMakingSection />

      {/* 5. Devotee Customer Reviews */}
      <ReviewSection />
    </main>
  );
}
