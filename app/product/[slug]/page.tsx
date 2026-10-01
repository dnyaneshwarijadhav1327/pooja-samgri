import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getShopifyProductByHandle, getShopifyProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

const fallbackItems = [
  {
    id: "ess-1",
    name: "Pure Natural Kumkum & Roli",
    slug: "pure-natural-kumkum-roli",
    shortDesc: "Traditional turmeric-based sacred vermillion powder.",
    description: "Prepared using organic turmeric and slaked lime in pure sacred traditions. Free from synthetic chemicals.",
    ingredients: "Organic Turmeric, Slaked Lime, Rose Essence",
    howToUse: "Apply with ring finger on deity or forehead.",
    price: 99,
    mrp: 149,
    discount: 33,
    rating: 4.9,
    reviewCount: 230,
    quantityUnit: "100g Pack",
    category: { name: "Sacred Powders" },
    images: [{ url: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-2",
    name: "Bhimseni Pure Camphor (Kapoor)",
    slug: "bhimseni-pure-camphor-kapoor",
    shortDesc: "100% pure crystalline edible grade camphor for divine aarti.",
    description: "Organic raw crystalline Bhimseni Kapoor that burns cleanly without leaving black residue.",
    ingredients: "100% Bhimseni Kapoor Flakes",
    howToUse: "Place on camphor holder / diya and ignite.",
    price: 199,
    mrp: 299,
    discount: 33,
    rating: 5.0,
    reviewCount: 310,
    quantityUnit: "100g Jar",
    category: { name: "Dhoop & Camphor" },
    images: [{ url: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-3",
    name: "Original Sandalwood Chandan Tika",
    slug: "original-sandalwood-chandan-tika",
    shortDesc: "Pure Mysore Sandalwood paste infused with saffron.",
    description: "Authentic chilled Chandan paste for daily Tilak and deity worship. Calms the mind and elevates spiritual focus.",
    ingredients: "Pure Sandalwood Extract, Saffron, Gangajal",
    howToUse: "Apply directly for tilak.",
    price: 149,
    mrp: 220,
    discount: 32,
    rating: 4.8,
    reviewCount: 180,
    quantityUnit: "50g Tub",
    category: { name: "Sacred Powders" },
    images: [{ url: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "ess-4",
    name: "Handmade Round Cotton Wicks (Phool Batti)",
    slug: "handmade-round-cotton-wicks-phool-batti",
    shortDesc: "Premium hand-rolled pure cotton diya wicks for long burning aarti.",
    description: "Unbleached pure cotton wicks crafted to hold ghee evenly for a continuous, steady flame during daily puja.",
    ingredients: "100% Pure Virgin Cotton",
    howToUse: "Dip in ghee/oil and place in diya.",
    price: 89,
    mrp: 120,
    discount: 25,
    rating: 4.9,
    reviewCount: 142,
    quantityUnit: "Pack of 200 Pcs",
    category: { name: "Puja Essentials" },
    images: [{ url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=600" }]
  },
  {
    id: "kit-1",
    name: "Daily Nitya Puja Kit",
    slug: "daily-nitya-puja-kit",
    shortDesc: "12 Essential Items for daily morning worship.",
    description: "Includes Gangajal, Dhoop cones, Bhimseni Kapoor, Cotton wicks, Brass diya, Matchboxes, Kumkum, Haldi, Chandan, Janeu, Attar & Bell.",
    ingredients: "12 Authentic Puja Items + Storage Box",
    howToUse: "Use components for morning and evening nitya puja.",
    price: 799,
    mrp: 1199,
    discount: 33,
    rating: 4.9,
    reviewCount: 185,
    quantityUnit: "Complete 12-Item Kit",
    category: { name: "Puja Kits" },
    images: [{ url: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-2",
    name: "Shri Ganesh Puja Kit",
    slug: "shri-ganesh-puja-kit",
    shortDesc: "21 Sacred Items for Ganesh Chaturthi & Tuesday Vrat.",
    description: "Contains Durva grass substitute bundle, Red cloth, Janeu pair, Modak prasad mold, Modak dhoop, Gangajal, Supari, Cardamom, Clove, Camphor, Dhoop, Kumkum, Haldi, Akshata, and Aarti booklet.",
    ingredients: "21 Sacred Ritual Ingredients + Aarti Chalisa Booklet",
    howToUse: "Follow included step-by-step ritual booklet.",
    price: 999,
    mrp: 1499,
    discount: 33,
    rating: 5.0,
    reviewCount: 154,
    quantityUnit: "Complete 21-Item Kit",
    category: { name: "Puja Kits" },
    images: [{ url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-3",
    name: "Shri Lakshmi Prosperity Puja Kit",
    slug: "shri-lakshmi-prosperity-puja-kit",
    shortDesc: "Special kit for Diwali Lakshmi Puja and Friday Dhan Aakarshan.",
    description: "Includes Kamal Gatta (Lotus Seeds), Yellow Kaudi (Cowrie shells), Gomti Chakra (5 Pcs), Shri Yantra Card, Pure Ghee Diya, Agarbatti, Red Chunri, Kuber Chalisa & Lakshmi Puja Paddhati guide.",
    ingredients: "Kamal Gatta, Gomti Chakra, Yellow Kaudi, Chunri, Puja Book, Samagri",
    howToUse: "Place items on puja thali during Lakshmi puja.",
    price: 1299,
    mrp: 1899,
    discount: 31,
    rating: 4.9,
    reviewCount: 198,
    quantityUnit: "Complete Kit + Guide",
    category: { name: "Puja Kits" },
    images: [{ url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-4",
    name: "Complete Home Havan Kit",
    slug: "complete-home-havan-kit-with-brass-kund",
    shortDesc: "Solid copper/brass havan kund + 500g samagri + mango wood & ghee.",
    description: "Everything required for conducting household Yajna or Griha Pravesh havan. Includes reusable heavy-duty Havan Kund, Mango wood sticks, Cow dung cakes, Havan samagri, Pure Cow Ghee (250g), Camphor & Havan spoon.",
    ingredients: "Copper/Brass Havan Kund, Mango Wood, Ghee, 51-herb Samagri",
    howToUse: "Setup Kund in ventilated open area and perform rituals.",
    price: 1699,
    mrp: 2499,
    discount: 32,
    rating: 5.0,
    reviewCount: 280,
    quantityUnit: "Full Box + Brass Kund",
    category: { name: "Puja Kits" },
    images: [{ url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800" }]
  }
];

export default async function ProductDetailPage({ params }: Props) {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch (e) {
    slug = params.slug;
  }

  try {
    // 1. Try Shopify Product by Handle (Supports Hindi and English handles)
    const shopifyProduct = await getShopifyProductByHandle(slug);
    if (shopifyProduct) {
      let shopifyRelated: any[] = [];
      try {
        const allShopify = await getShopifyProducts(10);
        shopifyRelated = allShopify
          .filter((p: any) => p.slug !== shopifyProduct.slug && p.id !== shopifyProduct.id)
          .slice(0, 4);
      } catch (err) {
        console.warn('Failed to load related Shopify products:', err);
      }

      return (
        <ProductDetailClient
          product={{
            ...shopifyProduct,
            reviewsList: [],
          }}
          relatedProducts={shopifyRelated}
        />
      );
    }

    // 2. Try Local Database
    let rawProduct: any = null;
    try {
      rawProduct = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          images: true,
          reviews: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    } catch (dbErr) {
      console.warn('Prisma lookup failed:', dbErr);
    }

    if (rawProduct) {
      // Parallel fetch related products from same category
      let rawRelated: any[] = [];
      try {
        rawRelated = await prisma.product.findMany({
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
      } catch (e) {}

      const product = {
        ...rawProduct,
        category: { name: rawProduct.category.name },
        images: rawProduct.images.map((img: any) => ({ url: img.url })),
        reviewsList: rawProduct.reviews.map((r: any) => ({
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

      const relatedProducts = rawRelated.map((p: any) => ({
        ...p,
        category: { name: p.category.name },
        images: p.images.map((img: any) => ({ url: img.url })),
      }));

      return (
        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
        />
      );
    }

    // 3. Fallback to Demo / Mock Products List
    const fallbackProduct = fallbackItems.find(
      (item) => item.slug === slug || item.slug === params.slug || item.id === slug
    );

    if (fallbackProduct) {
      const fallbackRelated = fallbackItems
        .filter((item) => item.slug !== fallbackProduct.slug)
        .slice(0, 4);

      return (
        <ProductDetailClient
          product={{
            ...fallbackProduct,
            stock: 50,
            reviewsList: [
              {
                id: 'rev-1',
                userName: 'Pooja Devotee',
                rating: 5,
                comment: 'Very pure and high quality item. Authentic aroma and sacred packaging.',
                createdAt: 'Today',
              },
            ],
          }}
          relatedProducts={fallbackRelated}
        />
      );
    }

    notFound();
  } catch (error) {
    console.error('Error fetching product details:', error);
    notFound();
  }
}
