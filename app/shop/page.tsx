import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ShopPage() {
  const rawProducts = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  const products = rawProducts.map((p) => ({
    ...p,
    categoryId: p.categoryId,
    category: { name: p.category.name, slug: p.category.slug },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  return (
    <ShopClient
      initialProducts={products}
      categories={categories}
      initialCategory=""
      initialSearch=""
    />
  );
}

