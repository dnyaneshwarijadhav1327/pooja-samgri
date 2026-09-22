import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Please enter a coupon code' }, { status: 400 });
    }

    const uppercaseCode = code.trim().toUpperCase();

    // Check predefined coupons or database coupons
    const coupon = await prisma.coupon.findUnique({
      where: { code: uppercaseCode },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 404 });
    }

    if (cartTotal < coupon.minOrderValue) {
      return NextResponse.json(
        { error: `Minimum order value for ${uppercaseCode} is ₹${coupon.minOrderValue}` },
        { status: 400 }
      );
    }

    const discountAmount = Math.round((cartTotal * coupon.discountPercent) / 100);

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      discountAmount,
    });
  } catch (error) {
    console.error('Coupon validation error', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
