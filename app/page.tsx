import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PujaKitSection from '@/components/PujaKitSection';
import FestivalSection from '@/components/FestivalSection';
import ReviewSection from '@/components/ReviewSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh updates for newly added admin products

export default async function HomePage() {
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

  const products = rawProducts.map((p) => ({
    ...p,
    category: { name: p.category.name },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  const pujaKits = rawPujaKits.map((p) => ({
    ...p,
    category: { name: p.category.name },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Sacred Essentials (ONLY Individual Essentials - No Puja Kits) */}
      <FeaturedProducts products={products} />

      {/* 5. Complete Puja Kits Showcase (ONLY Puja Kits) */}
      <PujaKitSection kits={pujaKits} />

      {/* 6. Festival Collections */}
      <FestivalSection />

      {/* 7. Devotee Customer Reviews */}
      <ReviewSection />
    </main>
  );
}
