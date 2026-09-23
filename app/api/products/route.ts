import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort');

    const where: any = { isAvailable: true };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { shortDesc: { contains: search } },
        { description: { contains: search } },
        { category: { name: { contains: search } } },
      ];
    }

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    let orderBy: any = { createdAt: 'desc' };

    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
