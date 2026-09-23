import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

export const revalidate = 60;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static pages for all products at build time
export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ select: { slug: true } });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const rawProduct = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
      reviews: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!rawProduct) {
    notFound();
  }

  // Related products from same category
  const rawRelated = await prisma.product.findMany({
    where: {
      isAvailable: true,
      categoryId: rawProduct.categoryId,
      NOT: { id: rawProduct.id },
    },
    take: 4,
    include: {
      category: true,
      images: true,
    },
  });

  const product = {
    ...rawProduct,
    category: { name: rawProduct.category.name },
    images: rawProduct.images.map((img) => ({ url: img.url })),
    reviewsList: rawProduct.reviews.map((r) => ({
      id: r.id,
      userName: r.userName,
      rating: r.rating,
      comment: r.comment,
      createdAt: new Date(r.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    })),
  };

  const relatedProducts = rawRelated.map((p) => ({
    ...p,
    category: { name: p.category.name },
    images: p.images.map((img) => ({ url: img.url })),
  }));

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
