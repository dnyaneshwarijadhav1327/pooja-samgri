import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Pavitra Pooja Database...");

  // Clean existing tables
  await prisma.wishlist.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin & Customer Users
  const admin = await prisma.user.create({
    data: {
      name: "Pavitra Admin",
      email: "admin@pavitrapooja.com",
      password: "adminpassword123",
      role: "ADMIN",
      phone: "+91 9876543210",
    },
  });

  const demoCustomer = await prisma.user.create({
    data: {
      name: "Ramesh Sharma",
      email: "ramesh@example.com",
      password: "userpassword123",
      role: "CUSTOMER",
      phone: "+91 9123456789",
    },
  });

  // Create Categories
  const categories = [
    {
      name: "Pavitra Jal",
      slug: "pavitra-jal",
      description: "Sacred and purified holy water sources from sacred Indian rivers.",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Dhoop & Incense",
      slug: "dhoop-incense",
      description: "Natural herbal dhoop, sambrani cups, and chemical-free incense sticks.",
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Gomaya Products",
      slug: "gomaya-products",
      description: "Traditional Shenachya Guarya (cow dung cakes) and sacred havan ingredients.",
      image: "https://images.unsplash.com/photo-1545232979-fbfd44da0b84?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Havan Samagri",
      slug: "havan-samagri",
      description: "Purifying 51-herb havan mixtures, wood logs, and sacred offerings.",
      image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Puja Essentials",
      slug: "puja-essentials",
      description: "Daily worship necessities: Camphor, Kumkum, Haldi, Akshata & Wicks.",
      image: "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Puja Kits",
      slug: "puja-kits",
      description: "All-in-one authentic ready puja sets for daily and festival rituals.",
      image: "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Festival Samagri",
      slug: "festival-samagri",
      description: "Specially crafted samagri boxes for Diwali, Navratri, Ganesh Chaturthi & Mahashivratri.",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Flowers & Offerings",
      slug: "flowers-offerings",
      description: "Fresh marigold malas, sacred leaves, and traditional offerings.",
      image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }

  // Create Products
  const products = [
    {
      name: "Pavitra Gangajal Bottle (500ml)",
      slug: "pavitra-gangajal-500ml",
      shortDesc: "Purified sacred Gangajal sourced directly from Gangotri.",
      description: "Pavitra Gangajal is collected from pristine natural river sources in Gangotri with traditional reverence. Sealed securely in copper-tinted protective bottles to retain natural purity and sanctity for all your daily pujas and holy baths.",
      ingredients: "100% Pure Filtered Natural Gangajal",
      howToUse: "Sprinkle small drops around your puja room or altar. Use for abhishekam of deities or add a few drops to bathing water during auspicious days.",
      price: 149,
      mrp: 199,
      discount: 25,
      rating: 4.9,
      reviewCount: 128,
      stock: 100,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "500ml Bottle",
      categoryId: categoryMap["pavitra-jal"],
      images: [
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Shenachya Guarya (Desi Cow Dung Cakes - 12 Pcs)",
      slug: "shenachya-guarya-cow-dung-cakes",
      shortDesc: "Sun-dried natural organic cow dung cakes for sacred havan and dhoop.",
      description: "Prepared traditionally from indigenous Desi cow dung, sun-dried without any chemical binders. Ideal for creating clean, authentic smoke that purifies household atmosphere during daily rituals and Yagnas.",
      ingredients: "100% Indigenous Desi Cow Dung",
      howToUse: "Ignite a piece gently over a small flame until glowing embers form. Place in a havan kund or brass dhoop holder with camphor or ghee.",
      price: 199,
      mrp: 299,
      discount: 33,
      rating: 4.8,
      reviewCount: 94,
      stock: 80,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "Pack of 12",
      categoryId: categoryMap["gomaya-products"],
      images: [
        "https://images.unsplash.com/photo-1545232979-fbfd44da0b84?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Natural Herbal Dhoop Sticks (100g)",
      slug: "natural-herbal-dhoop-sticks",
      shortDesc: "Bamboo-less aromatic herbal dhoop sticks made with guggul and loban.",
      description: "Handcrafted from pure natural resins including Guggul, Loban, Nagarmotha, and Jatamansi. Completely bamboo-less and charcoal-free for a soothing, meditative fragrance.",
      ingredients: "Guggul, Loban, Sandalwood Powder, Natural Herbs",
      howToUse: "Light the top tip of the stick, let it burn for 5 seconds, gently blow out the flame and place on the ceramic holder provided.",
      price: 175,
      mrp: 250,
      discount: 30,
      rating: 4.9,
      reviewCount: 210,
      stock: 150,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "100g Box",
      categoryId: categoryMap["dhoop-incense"],
      images: [
        "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Gomaya Sambrani Dhoop Cups (12 Cups)",
      slug: "gomaya-sambrani-dhoop-cups",
      shortDesc: "Charcoal-free cow dung cups filled with natural loban and bhimseni kapoor.",
      description: "These traditional Gomaya cups burn evenly, releasing traditional temple aroma that displaces negative energy and leaves your home filled with divine peace.",
      ingredients: "Desi Cow Dung Base, Guggul, Natural Resin, Bhimseni Kapoor",
      howToUse: "Hold cup from bottom, light the upper rim until it catches fire evenly. Place on the fireproof plate supplied.",
      price: 220,
      mrp: 300,
      discount: 26,
      rating: 4.9,
      reviewCount: 165,
      stock: 90,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "12 Cups + Holder",
      categoryId: categoryMap["gomaya-products"],
      images: [
        "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Pavitra 51 Herbal Havan Samagri (500g)",
      slug: "pavitra-51-herbal-havan-samagri",
      shortDesc: "Blend of 51 sacred herbs, dry roots, seeds, and aromatic leaves.",
      description: "Authentic Vedic formulation containing 51 herbs including Agar, Tagar, Kapoor Kachri, Tulsi leaves, Till, Jowar, and Sugandh Mantri. Ensures complete and sanctified Yajna offerings.",
      ingredients: "51 Sacred Herbs, Guggul, Loban, dry dry fruits, Till & Jowar",
      howToUse: "Offer small pinches into active Havan fire while chanting mantras accompanied by cow ghee offerings.",
      price: 299,
      mrp: 399,
      discount: 25,
      rating: 4.8,
      reviewCount: 142,
      stock: 120,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "500g Pack",
      categoryId: categoryMap["havan-samagri"],
      images: [
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Pure Bhimseni Camphor / Kapoor (100g)",
      slug: "pure-bhimseni-camphor-kapoor",
      shortDesc: "100% Pure edible-grade unadulterated crystal Bhimseni camphor.",
      description: "Natural Bhimseni Camphor derived from pine trees. Leaves zero black residue upon burning and diffuses a therapeutic, fresh camphor fragrance that clarifies air quality.",
      ingredients: "100% Pure Bhimseni Camphor Crystals",
      howToUse: "Place 2-3 small crystals in a camphor burner or brass diya during evening Aarti.",
      price: 249,
      mrp: 350,
      discount: 28,
      rating: 5.0,
      reviewCount: 310,
      stock: 200,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "100g Container",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Hand-rolled Cotton Wicks / Rui Batti (200 Pcs)",
      slug: "handrolled-cotton-wicks-rui-batti",
      shortDesc: "Soft absorbent long & round cotton wicks for brass diyas.",
      description: "Carefully rolled using 100% pure organic unbleached cotton. Ensures steady flame and prolonged burning time for daily deepam ritual.",
      ingredients: "100% Natural Organic Cotton",
      howToUse: "Dip top tip in ghee or sesame oil before placing inside brass or terracotta diya.",
      price: 99,
      mrp: 149,
      discount: 33,
      rating: 4.7,
      reviewCount: 88,
      stock: 250,
      isAvailable: true,
      isFeatured: false,
      quantityUnit: "200 Wicks Pack",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Pure Natural Roli Kumkum (100g)",
      slug: "pure-natural-roli-kumkum",
      shortDesc: "Authentic chemical-free turmeric & lime processed auspicious Kumkum.",
      description: "Traditional Kumkum prepared strictly using organic turmeric root and slaked lime. Skin-friendly, rich divine red hue ideal for deity tilak and auspicious celebrations.",
      ingredients: "Organic Turmeric & Natural Alum / Slaked Lime process",
      howToUse: "Mix a pinch with a drop of Gangajal or pure water to apply Tilak on forehead or deity idols.",
      price: 120,
      mrp: 160,
      discount: 25,
      rating: 4.9,
      reviewCount: 76,
      stock: 140,
      isAvailable: true,
      isFeatured: false,
      quantityUnit: "100g Pack",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Organic Kasturi Haldi Powder (100g)",
      slug: "organic-kasturi-haldi-powder",
      shortDesc: "Aromatic wild turmeric powder for deity ritual abhishekam.",
      description: "Pure Kasturi Manjal harvested naturally. Possesses a pleasant camphor-like aroma essential for holy bath offerings and festival rituals.",
      ingredients: "100% Natural Wild Curcuma Aromatica Root",
      howToUse: "Add to panchamrit or mix with water for idol abhishekam during puja.",
      price: 135,
      mrp: 180,
      discount: 25,
      rating: 4.8,
      reviewCount: 65,
      stock: 110,
      isAvailable: true,
      isFeatured: false,
      quantityUnit: "100g Pack",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Shuddh Kumkum Akshata (200g)",
      slug: "shuddh-kumkum-akshata",
      shortDesc: "Whole unbroken rice grains coated in natural Kumkum & cow ghee.",
      description: "Flawless unbroken rice grains mixed with natural vermillion and pure cow ghee. Symbolizes abundance and divine blessing during all sacred mantras.",
      ingredients: "Unbroken Rice Grains, Pure Kumkum, Desi Cow Ghee",
      howToUse: "Offer whole grains during mantra chanting, deity invitations, and blessing rituals.",
      price: 110,
      mrp: 150,
      discount: 26,
      rating: 4.8,
      reviewCount: 52,
      stock: 130,
      isAvailable: true,
      isFeatured: false,
      quantityUnit: "200g Box",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Natural Chandan Paste & Powder (50g)",
      slug: "natural-chandan-paste-powder",
      shortDesc: "Pure Mysore sandalwood paste with cooling soothing aroma.",
      description: "Grinded directly from authentic sandalwood blocks. Free from artificial perfumes or yellow dyes. Perfect for deity tilak and peace of mind.",
      ingredients: "100% Pure Sandalwood Bark Powder",
      howToUse: "Mix with Gangajal or rose water in a copper cup to form a fine paste for deity application.",
      price: 280,
      mrp: 350,
      discount: 20,
      rating: 4.9,
      reviewCount: 118,
      stock: 75,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "50g Jar",
      categoryId: categoryMap["puja-essentials"],
      images: [
        "https://images.unsplash.com/photo-1614088458028-e044199c0872?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Sacred Puja Essentials Combo Box",
      slug: "sacred-puja-essentials-combo-box",
      shortDesc: "Complete monthly supply of Kumkum, Haldi, Akshata, Camphor & Wicks.",
      description: "Everything required for daily household worship conveniently packed in airtight traditional tin containers.",
      ingredients: "Bhimseni Kapoor (50g), Kumkum (50g), Haldi (50g), Akshata (100g), Cotton Wicks (100 Pcs)",
      howToUse: "Keep in your home altar for quick daily morning and evening puja readiness.",
      price: 499,
      mrp: 699,
      discount: 28,
      rating: 4.9,
      reviewCount: 230,
      stock: 60,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "5-in-1 Box",
      categoryId: categoryMap["puja-kits"],
      images: [
        "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Daily Nitya Puja Kit",
      slug: "daily-nitya-puja-kit",
      shortDesc: "Comprehensive monthly kit containing 12 key daily worship samagri.",
      description: "Includes Gangajal, Dhoop cones, Bhimseni Kapoor, Cotton wicks, Brass diya, Matchboxes, Kumkum, Haldi, Chandan, Janeu, Attar & Bell.",
      ingredients: "12 Authentic Puja Items + Storage Box",
      howToUse: "Open the curated box and place items neatly in your home mandir.",
      price: 799,
      mrp: 1199,
      discount: 33,
      rating: 4.9,
      reviewCount: 185,
      stock: 45,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "Complete 12-Item Kit",
      categoryId: categoryMap["puja-kits"],
      images: [
        "https://images.unsplash.com/photo-1574043864009-847d0f98fb91?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Shri Ganesh Puja Kit",
      slug: "shri-ganesh-puja-kit",
      shortDesc: "Complete 21-item kit for Ganesh Chaturthi & Tuesday Vrat worship.",
      description: "Contains Durva grass substitute bundle, Red cloth, Janeu pair, Modak prasad mold, Modak dhoop, Gangajal, Supari, Cardamom, Clove, Camphor, Dhoop, Kumkum, Haldi, Akshata, and Aarti booklet.",
      ingredients: "21 Sacred Ritual Ingredients + Aarti Chalisa Booklet",
      howToUse: "Follow the step-by-step ritual guide included inside the kit for flawless Lord Ganesha worship.",
      price: 999,
      mrp: 1499,
      discount: 33,
      rating: 5.0,
      reviewCount: 154,
      stock: 40,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "Complete 21-Item Kit",
      categoryId: categoryMap["puja-kits"],
      images: [
        "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Shri Lakshmi Prosperity Puja Kit",
      slug: "shri-lakshmi-prosperity-puja-kit",
      shortDesc: "Special kit for Diwali Lakshmi Puja and Friday Dhan Aakarshan.",
      description: "Includes Kamal Gatta (Lotus Seeds), Yellow Kaudi (Cowrie shells), Gomti Chakra (5 Pcs), Shri Yantra Card, Pure Ghee Diya, Agarbatti, Red Chunri, Kuber Chalisa & Lakshmi Puja Paddhati guide.",
      ingredients: "Kamal Gatta, Gomti Chakra, Yellow Kaudi, Chunri, Puja Book, Samagri",
      howToUse: "Arrange offerings on a clean red cloth during auspicious Muhurat following the ritual book provided.",
      price: 1299,
      mrp: 1899,
      discount: 31,
      rating: 4.9,
      reviewCount: 198,
      stock: 35,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "Complete Kit + Guide",
      categoryId: categoryMap["puja-kits"],
      images: [
        "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Complete Home Havan Kit with Brass Kund",
      slug: "complete-home-havan-kit-with-brass-kund",
      shortDesc: "Solid copper/brass havan kund + 500g samagri + mango wood & ghee.",
      description: "Everything required for conducting household Yajna or Griha Pravesh havan. Includes reusable heavy-duty Havan Kund, Mango wood sticks, Cow dung cakes, Havan samagri, Pure Cow Ghee (250g), Camphor & Havan spoon.",
      ingredients: "Copper/Brass Havan Kund, Mango Wood, Ghee, 51-herb Samagri",
      howToUse: "Place kund on a fire-resistant surface. Layer mango wood over cow dung cakes, ignite with camphor and offer samagri.",
      price: 1699,
      mrp: 2499,
      discount: 32,
      rating: 5.0,
      reviewCount: 280,
      stock: 25,
      isAvailable: true,
      isFeatured: true,
      quantityUnit: "Full Box + Brass Kund",
      categoryId: categoryMap["havan-samagri"],
      images: [
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800"
      ]
    }
  ];

  for (const p of products) {
    const { images, ...prodData } = p;
    const createdProduct = await prisma.product.create({
      data: prodData,
    });

    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: images[i],
          isPrimary: i === 0,
          altText: createdProduct.name,
        },
      });
    }

    // Add initial reviews
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userId: demoCustomer.id,
        userName: "Sunita Deshmukh",
        rating: 5,
        comment: "Beautifully packed and the products arrived safely. Highly authentic quality.",
        isApproved: true,
      },
    });

    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userName: "Rajesh Kumar",
        rating: 5,
        comment: "Good quality and very convenient for our daily morning puja. Smells pure and traditional.",
        isApproved: true,
      },
    });
  }

  // Create Coupons
  await prisma.coupon.create({
    data: {
      code: "PAVITRA10",
      discountPercent: 10,
      minOrderValue: 499,
      expiryDate: new Date("2028-12-31"),
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: "FESTIVAL20",
      discountPercent: 20,
      minOrderValue: 999,
      expiryDate: new Date("2028-12-31"),
      isActive: true,
    },
  });

  console.log("Database successfully seeded with 16 authentic products, categories, coupons, and sample reviews!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
