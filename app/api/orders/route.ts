import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      email,
      phone,
      street,
      city,
      state,
      pincode,
      paymentMethod,
      items,
      couponCode,
      discountAmount = 0,
    } = body;

    if (!customerName || !phone || !street || !city || !pincode || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order details' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }

    const shippingFee = subtotal >= 499 ? 0 : 49;
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    // Create Order in Database
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        email: email || 'customer@pavitrapooja.com',
        phone,
        street,
        city,
        state: state || 'State',
        pincode,
        totalAmount: finalTotal,
        paymentMethod: paymentMethod || 'COD',
        paymentStatus: paymentMethod === 'ONLINE' ? 'PAID' : 'COD',
        status: 'PLACED',
        trackingNumber: 'TRK-' + Math.floor(100000 + Math.random() * 900000),
        courierName: 'Delhivery Express',
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id.includes('-') ? item.id : 'default-id',
            productName: item.name,
            productImage: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      order: newOrder,
    });
  } catch (error) {
    console.error('Order Creation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    );
  }
}
