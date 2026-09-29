/**
 * Shopify Storefront API Integration for Pooja Sanskar
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'crz04k-0c.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '563c77189a79529d8401d2f664585ac4';
const SHOPIFY_GRAPHQL_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

export async function shopifyFetch<T = any>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  try {
    const res = await fetch(SHOPIFY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    const body = await res.json();
    if (body.errors) {
      console.error('Shopify GraphQL Error:', body.errors);
      throw new Error(body.errors[0]?.message || 'Failed to query Shopify Storefront API');
    }

    return body.data;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

/**
 * Fetch all products from Shopify
 */
export async function getShopifyProducts(first = 50) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            productType
            tags
            availableForSale
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { edges: any[] } }>({
      query,
      variables: { first },
    });

    return data.products.edges.map(({ node }) => {
      const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
      const comparePrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');
      const discount = comparePrice > minPrice ? Math.round(((comparePrice - minPrice) / comparePrice) * 100) : 0;
      const images = node.images.edges.map((img: any) => ({ url: img.node.url }));
      const firstVariant = node.variants.edges[0]?.node;

      return {
        id: node.id,
        name: node.title,
        slug: node.handle,
        shortDesc: node.description ? node.description.slice(0, 140) + '...' : '',
        description: node.description || '',
        price: minPrice,
        mrp: comparePrice > minPrice ? comparePrice : minPrice,
        discount,
        rating: 4.9,
        reviewCount: 120,
        stock: 50,
        quantityUnit: firstVariant?.title && firstVariant.title !== 'Default Title' ? firstVariant.title : 'Standard Pack',
        category: { name: node.productType || (node.tags?.[0] || 'Puja Essentials') },
        images: images.length > 0 ? images : [{ url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600' }],
        variantId: firstVariant?.id || null,
        isShopify: true,
      };
    });
  } catch (error) {
    console.warn('Failed to load Shopify products, falling back to local database:', error);
    return [];
  }
}

/**
 * Fetch a single product by handle / slug
 */
export async function getShopifyProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        productType
        tags
        availableForSale
        images(first: 8) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: any }>({
      query,
      variables: { handle },
    });

    const node = data.product;
    if (!node) return null;

    const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
    const comparePrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');
    const discount = comparePrice > minPrice ? Math.round(((comparePrice - minPrice) / comparePrice) * 100) : 0;
    const images = node.images.edges.map((img: any) => ({ url: img.node.url }));
    const firstVariant = node.variants.edges[0]?.node;

    return {
      id: node.id,
      name: node.title,
      slug: node.handle,
      shortDesc: node.description ? node.description.slice(0, 140) + '...' : '',
      description: node.description || '',
      ingredients: '100% Pure & Authentic Sacred Ingredients',
      howToUse: 'Perform rituals and aarti as per sacred traditions.',
      price: minPrice,
      mrp: comparePrice > minPrice ? comparePrice : minPrice,
      discount,
      rating: 5.0,
      reviewCount: 160,
      stock: 50,
      quantityUnit: firstVariant?.title && firstVariant.title !== 'Default Title' ? firstVariant.title : 'Standard Pack',
      category: { name: node.productType || (node.tags?.[0] || 'Puja Essentials') },
      images: images.length > 0 ? images : [{ url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600' }],
      variantId: firstVariant?.id || null,
      variants: node.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: parseFloat(v.node.price?.amount || '0'),
        mrp: parseFloat(v.node.compareAtPrice?.amount || v.node.price?.amount || '0'),
      })),
      isShopify: true,
    };
  } catch (error) {
    console.warn(`Failed to load Shopify product handle ${handle}:`, error);
    return null;
  }
}

/**
 * Create a Shopify Cart session and return the Shopify Checkout URL
 */
export async function createShopifyCheckout(lines: Array<{ merchandiseId: string; quantity: number }>): Promise<string | null> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string };
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        input: {
          lines,
        },
      },
    });

    if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
      console.error('Cart Create Errors:', data.cartCreate.userErrors);
      return null;
    }

    return data.cartCreate.cart.checkoutUrl;
  } catch (error) {
    console.error('Error creating Shopify cart checkout:', error);
    return null;
  }
}
