import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PujaKitSection from '@/components/PujaKitSection';
import FestivalSection from '@/components/FestivalSection';
import ReviewSection from '@/components/ReviewSection';

export const revalidate = 60; // Refresh data every 60 seconds

export default async function HomePage() {
  const rawProducts = await prisma.product.findMany({
    where: { isAvailable: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      images: true,
    },
  });

  const products = rawProducts.map((p) => ({
    ...p,
    rating: p.rating,
    category: { name: p.category.name },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Section */}
      <TrustSection />

      {/* 3. Shop by Category */}
      <CategorySection />

      {/* 4. Featured Sacred Essentials */}
      <FeaturedProducts products={products} />

      {/* 5. Complete Puja Kits Showcase */}
      <PujaKitSection />

      {/* 6. Festival Collections */}
      <FestivalSection />

      {/* 7. Devotee Customer Reviews */}
      <ReviewSection />
    </main>
  );
}
