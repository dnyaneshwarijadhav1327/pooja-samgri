import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Total Products in DB: ${products.length}`);
  for (const p of products) {
    console.log(`- Product: "${p.name}" | Category: "${p.category?.name}" (${p.category?.slug}) | Images: ${p.images.length}`);
    for (const img of p.images) {
      console.log(`    URL: ${img.url.substring(0, 70)}...`);
    }
  }

  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
  });
  console.log('\nCategories in DB:');
  for (const c of categories) {
    console.log(`- Category: "${c.name}" | Slug: "${c.slug}" | ID: ${c.id} | Product count: ${c._count.products}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
