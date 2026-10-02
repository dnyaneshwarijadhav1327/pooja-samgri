import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import { getShopifyProducts } from '@/lib/shopify';

export const revalidate = 30;

const defaultCategories = [
  { id: 'cat-1', name: 'Puja Essentials', slug: 'puja-essentials' },
  { id: 'cat-2', name: 'Dhoop & Incense', slug: 'dhoop-incense' },
  { id: 'cat-3', name: 'Havan Samagri', slug: 'havan-samagri' },
  { id: 'cat-4', name: 'Gomaya Products', slug: 'gomaya-products' },
  { id: 'cat-5', name: 'Puja Kits', slug: 'puja-kits' },
  { id: 'cat-6', name: 'Sacred Powders', slug: 'sacred-powders' },
];

export default async function ShopPage() {
  try {
    // 1. Fetch live products from Shopify
    const shopifyProducts = await getShopifyProducts(100);

    // 2. Fetch from DB with safety fallback
    let dbProducts: any[] = [];
    let dbCategories: any[] = defaultCategories;

    try {
      const [rawProducts, rawCategories] = await Promise.all([
        prisma.product.findMany({
          where: { isAvailable: true },
          take: 50,
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

      if (rawCategories && rawCategories.length > 0) {
        dbCategories = rawCategories;
      }

      if (rawProducts && rawProducts.length > 0) {
        dbProducts = rawProducts.map((p) => ({
          ...p,
          categoryId: p.categoryId,
          category: { name: p.category.name, slug: p.category.slug },
          images: p.images.map((img) => ({ url: img.url })),
        }));
      }
    } catch (dbErr) {
      console.warn('ShopPage database lookup skipped/fallback:', dbErr);
    }

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
        categories={defaultCategories}
        initialCategory=""
        initialSearch=""
      />
    );
  }
}
