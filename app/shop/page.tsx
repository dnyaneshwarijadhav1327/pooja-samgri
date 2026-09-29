import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import { getShopifyProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ShopPage() {
  try {
    // 1. Fetch live products from Shopify
    const shopifyProducts = await getShopifyProducts(100);

    const [rawProducts, dbCategories] = await Promise.all([
      prisma.product.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          images: true,
        },
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true, slug: true },
      }),
    ]);

    const dbProducts = rawProducts.map((p) => ({
      ...p,
      categoryId: p.categoryId,
      category: { name: p.category.name, slug: p.category.slug },
      images: p.images.map((img) => ({ url: img.url })),
    }));

    const products = shopifyProducts.length > 0 ? shopifyProducts : dbProducts;

    return (
      <ShopClient
        initialProducts={products}
        categories={dbCategories}
        initialCategory=""
        initialSearch=""
      />
    );
  } catch (error) {
    console.error('Error loading shop page:', error);
    return (
      <ShopClient
        initialProducts={[]}
        categories={[]}
        initialCategory=""
        initialSearch=""
      />
    );
  }
}
