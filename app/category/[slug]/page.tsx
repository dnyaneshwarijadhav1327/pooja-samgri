import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ShopClient from '@/components/ShopClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const rawProducts = await prisma.product.findMany({
    where: {
      isAvailable: true,
      categoryId: category.id,
    },
    orderBy: { createdAt: 'desc' },
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
      {/* Category Hero Banner */}
      <div className="bg-[#4A0E17] text-[#FAF6EE] py-12 px-4 text-center border-b-4 border-[#D97706]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D97706] font-semibold">
            Sacred Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6EE]">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6EE]/80 max-w-xl mx-auto leading-relaxed">
            {category.description || `Pure and authentic ${category.name} carefully selected for your daily prayers and sacred rituals.`}
          </p>
        </div>
      </div>

      <ShopClient
        initialProducts={products}
        categories={allCategories}
        initialCategory={category.slug}
      />
    </div>
  );
}
