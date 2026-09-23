import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';

export const dynamic = 'force-static';
export const revalidate = 60;

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
    category: { name: p.category.name },
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

