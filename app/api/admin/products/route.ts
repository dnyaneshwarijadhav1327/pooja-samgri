import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all products for admin
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: true,
      },
    });
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      shortDesc,
      description,
      ingredients,
      howToUse,
      price,
      mrp,
      stock,
      quantityUnit,
      categoryId,
      imageUrl,
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, Price, and Category are required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    const numPrice = Number(price);
    const numMrp = Number(mrp || price);
    const discount = numMrp > numPrice ? Math.round(((numMrp - numPrice) / numMrp) * 100) : 0;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        shortDesc: shortDesc || name,
        description: description || name,
        ingredients,
        howToUse,
        price: numPrice,
        mrp: numMrp,
        discount,
        stock: Number(stock || 50),
        quantityUnit: quantityUnit || '1 Pack',
        categoryId,
        images: {
          create: [
            {
              url: imageUrl || 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800',
              isPrimary: true,
              altText: name,
            },
          ],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT update existing product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      shortDesc,
      description,
      ingredients,
      howToUse,
      price,
      mrp,
      stock,
      quantityUnit,
      categoryId,
      imageUrl,
    } = body;

    if (!id || !name || !price || !categoryId) {
      return NextResponse.json({ error: 'ID, Name, Price, and Category are required' }, { status: 400 });
    }

    const numPrice = Number(price);
    const numMrp = Number(mrp || price);
    const discount = numMrp > numPrice ? Math.round(((numMrp - numPrice) / numMrp) * 100) : 0;

    // Update main product details
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        shortDesc,
        description,
        ingredients,
        howToUse,
        price: numPrice,
        mrp: numMrp,
        discount,
        stock: Number(stock),
        quantityUnit,
        categoryId,
      },
      include: {
        category: true,
        images: true,
      },
    });

    // Update primary image URL if provided
    if (imageUrl) {
      const primaryImage = updatedProduct.images.find((img) => img.isPrimary) || updatedProduct.images[0];
      if (primaryImage) {
        await prisma.productImage.update({
          where: { id: primaryImage.id },
          data: { url: imageUrl },
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: id,
            url: imageUrl,
            isPrimary: true,
            altText: name,
          },
        });
      }
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
