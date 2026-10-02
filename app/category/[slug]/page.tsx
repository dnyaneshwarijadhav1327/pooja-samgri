import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import { getShopifyProducts } from '@/lib/shopify';

export const revalidate = 30;

interface Props {
  params: {
    slug: string;
  };
}

const defaultCategories = [
  { id: 'cat-1', name: 'Puja Essentials', slug: 'puja-essentials', description: 'Essential pure items for daily prayers and aarti.' },
  { id: 'cat-2', name: 'Dhoop & Incense', slug: 'dhoop-incense', description: 'Natural herbal dhoop, sambrani cups, and organic camphor.' },
  { id: 'cat-3', name: 'Havan Samagri', slug: 'havan-samagri', description: '51-herb sacred havan samagri, mango wood, and copper kund.' },
  { id: 'cat-4', name: 'Gomaya Products', slug: 'gomaya-products', description: 'Sacred Desi cow dung cakes, gomutra, and pure cow ghee.' },
  { id: 'cat-5', name: 'Puja Kits', slug: 'puja-kits', description: 'Complete ready-to-use ritual boxes containing all authentic samagri.' },
  { id: 'cat-6', name: 'Sacred Powders', slug: 'sacred-powders', description: 'Pure organic turmeric kumkum, chandan paste, and abir gulal.' },
];

const fallbackKits = [
  {
    id: "kit-1",
    name: "Daily Nitya Puja Kit",
    slug: "daily-nitya-puja-kit",
    shortDesc: "12 Essential Items for daily morning worship.",
    description: "Includes Gangajal, Dhoop cones, Bhimseni Kapoor, Cotton wicks, Brass diya, Matchboxes, Kumkum, Haldi, Chandan, Janeu, Attar & Bell.",
    ingredients: "12 Authentic Puja Items + Storage Box",
    price: 799,
    mrp: 1199,
    discount: 33,
    rating: 4.9,
    reviewCount: 185,
    quantityUnit: "Complete 12-Item Kit",
    category: { name: "Puja Kits", slug: "puja-kits" },
    images: [{ url: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-2",
    name: "Shri Ganesh Puja Kit",
    slug: "shri-ganesh-puja-kit",
    shortDesc: "21 Sacred Items for Ganesh Chaturthi & Tuesday Vrat.",
    description: "Contains Durva grass substitute bundle, Red cloth, Janeu pair, Modak prasad mold, Modak dhoop, Gangajal, Supari, Cardamom, Clove, Camphor, Dhoop, Kumkum, Haldi, Akshata, and Aarti booklet.",
    ingredients: "21 Sacred Ritual Ingredients + Aarti Chalisa Booklet",
    price: 999,
    mrp: 1499,
    discount: 33,
    rating: 5.0,
    reviewCount: 154,
    quantityUnit: "Complete 21-Item Kit",
    category: { name: "Puja Kits", slug: "puja-kits" },
    images: [{ url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-3",
    name: "Shri Lakshmi Prosperity Puja Kit",
    slug: "shri-lakshmi-prosperity-puja-kit",
    shortDesc: "Special kit for Diwali Lakshmi Puja and Friday Dhan Aakarshan.",
    description: "Includes Kamal Gatta (Lotus Seeds), Yellow Kaudi (Cowrie shells), Gomti Chakra (5 Pcs), Shri Yantra Card, Pure Ghee Diya, Agarbatti, Red Chunri, Kuber Chalisa & Lakshmi Puja Paddhati guide.",
    ingredients: "Kamal Gatta, Gomti Chakra, Yellow Kaudi, Chunri, Puja Book, Samagri",
    price: 1299,
    mrp: 1899,
    discount: 31,
    rating: 4.9,
    reviewCount: 198,
    quantityUnit: "Complete Kit + Guide",
    category: { name: "Puja Kits", slug: "puja-kits" },
    images: [{ url: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=800" }]
  },
  {
    id: "kit-4",
    name: "Complete Home Havan Kit",
    slug: "complete-home-havan-kit-with-brass-kund",
    shortDesc: "Solid copper/brass havan kund + 500g samagri + mango wood & ghee.",
    description: "Everything required for conducting household Yajna or Griha Pravesh havan. Includes reusable heavy-duty Havan Kund, Mango wood sticks, Cow dung cakes, Havan samagri, Pure Cow Ghee (250g), Camphor & Havan spoon.",
    ingredients: "Copper/Brass Havan Kund, Mango Wood, Ghee, 51-herb Samagri",
    price: 1699,
    mrp: 2499,
    discount: 32,
    rating: 5.0,
    reviewCount: 280,
    quantityUnit: "Full Box + Brass Kund",
    category: { name: "Puja Kits", slug: "puja-kits" },
    images: [{ url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800" }]
  }
];

export default async function CategoryPage({ params }: Props) {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch (e) {
    slug = params.slug;
  }

  // Find matching default category or generate title
  const matchedDefault = defaultCategories.find(c => c.slug === slug);
  let categoryName = matchedDefault?.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  let categoryDesc = matchedDefault?.description || `Pure and authentic ${categoryName} carefully selected for your daily prayers and sacred rituals.`;

  try {
    // 1. Fetch live Shopify products
    let shopifyProducts: any[] = [];
    try {
      const allShopify = await getShopifyProducts(50);
      shopifyProducts = allShopify.filter((p: any) => {
        const cat = p.category?.name?.toLowerCase();
        return cat === slug.toLowerCase() || cat === categoryName.toLowerCase() || (slug === 'puja-kits' && cat?.includes('kit'));
      });
    } catch (err) {
      console.warn('Shopify category fetch warning:', err);
    }

    // 2. Fetch from DB if available
    let dbProducts: any[] = [];
    let allCategories: any[] = defaultCategories;

    try {
      const dbCategory = await prisma.category.findUnique({
        where: { slug },
      });

      if (dbCategory) {
        categoryName = dbCategory.name;
        if (dbCategory.description) categoryDesc = dbCategory.description;

        const rawProducts = await prisma.product.findMany({
          where: {
            isAvailable: true,
            categoryId: dbCategory.id,
          },
          orderBy: { createdAt: 'desc' },
          include: {
            category: true,
            images: true,
          },
        });

        dbProducts = rawProducts.map((p) => ({
          ...p,
          category: { name: p.category.name },
          images: p.images.map((img) => ({ url: img.url })),
        }));
      }

      const dbCats = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true, slug: true },
      });
      if (dbCats && dbCats.length > 0) {
        allCategories = dbCats;
      }
    } catch (dbErr) {
      console.warn('Database category fetch warning:', dbErr);
    }

    // 3. Select active products or fallback kits
    let products = shopifyProducts.length > 0 ? shopifyProducts : dbProducts;
    if (products.length === 0 && slug === 'puja-kits') {
      products = fallbackKits;
    }

    return (
      <div>
        {/* Category Hero Banner */}
        <div className="bg-[#4A0E17] text-[#FAF6EE] py-12 px-4 text-center border-b-4 border-[#D97706]">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D97706] font-semibold">
              Sacred Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6EE]">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6EE]/80 max-w-xl mx-auto leading-relaxed">
              {categoryDesc}
            </p>
          </div>
        </div>

        <ShopClient
          initialProducts={products}
          categories={allCategories}
          initialCategory={slug}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in CategoryPage:', error);
    return (
      <div>
        <div className="bg-[#4A0E17] text-[#FAF6EE] py-12 px-4 text-center border-b-4 border-[#D97706]">
          <h1 className="text-3xl font-serif font-bold">{categoryName}</h1>
        </div>
        <ShopClient
          initialProducts={slug === 'puja-kits' ? fallbackKits : []}
          categories={defaultCategories}
          initialCategory={slug}
        />
      </div>
    );
  }
}
