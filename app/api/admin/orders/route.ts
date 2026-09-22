import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, trackingNumber, courierName } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and Status required' }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(trackingNumber && { trackingNumber }),
        ...(courierName && { courierName }),
      },
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
