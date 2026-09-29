import { NextResponse } from 'next/server';
import { createShopifyCheckout } from '@/lib/shopify';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Filter items that have a Shopify variantId
    const shopifyLines = items
      .filter((item: any) => item.variantId)
      .map((item: any) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity || 1,
      }));

    if (shopifyLines.length > 0) {
      const checkoutUrl = await createShopifyCheckout(shopifyLines);
      if (checkoutUrl) {
        return NextResponse.json({ checkoutUrl });
      }
    }

    // Direct fallback store checkout link
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'crz04k-0c.myshopify.com';
    return NextResponse.json({
      checkoutUrl: `https://${domain}/cart`,
    });
  } catch (error: any) {
    console.error('Error in Shopify checkout route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
