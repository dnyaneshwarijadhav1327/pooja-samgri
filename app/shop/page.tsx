import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || '';
  const initialSearch = resolvedParams?.search || '';

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
      initialCategory={initialCategory}
      initialSearch={initialSearch}
    />
  );
}
