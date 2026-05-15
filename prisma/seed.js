const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

async function main() {
  console.log("Seeding database...");

  try {
    // Clear existing data
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // 1. Create Categories
    const categories = [
      {
        id: "ethnic",
        name: "Ethnic Wear",
        description: "Traditional Indian elegance for every occasion.",
        image: "https://images.unsplash.com/photo-1610189035105-0158fb7e0349?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "casual",
        name: "Casual Wear",
        description: "Comfortable and stylish everyday essentials.",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "shirts",
        name: "Premium Shirts",
        description: "Luxury fabrics tailored for a sharp look.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "wedding",
        name: "Wedding Collection",
        description: "Grand attire for your most special moments.",
        image: "https://images.unsplash.com/photo-1510255823126-1049ea267ce2?q=80&w=600&auto=format&fit=crop",
      },
    ];

    for (const cat of categories) {
      await prisma.category.create({
        data: cat,
      });
    }

    // 2. Create Products
    const products = [
      {
        name: "Emerald Green Silk Kurta",
        description: "Exquisite silk kurta with intricate embroidery.",
        price: 4500,
        categoryId: "ethnic",
        images: "https://picsum.photos/seed/kurta1/800/800",
        sizes: "S,M,L,XL,XXL",
        isNew: true,
      },
      {
        name: "Classic Beige Linen Shirt",
        description: "Breathable linen shirt for premium comfort.",
        price: 2800,
        categoryId: "shirts",
        images: "https://picsum.photos/seed/shirt1/800/800",
        sizes: "S,M,L,XL",
        isNew: false,
      },
      {
        name: "Midnight Black Suit",
        description: "Sharp three-piece suit for wedding and formal events.",
        price: 12500,
        categoryId: "wedding",
        images: "https://picsum.photos/seed/suit1/800/800",
        sizes: "38,40,42,44",
        isNew: true,
      },
      {
        name: "Textured Casual Polo",
        description: "Premium cotton polo with subtle textures.",
        price: 1500,
        categoryId: "casual",
        images: "https://picsum.photos/seed/polo1/800/800",
        sizes: "S,M,L,XL",
        isNew: false,
      },
      {
        name: "Ivory Sherwani with Gold Threadwork",
        description: "Luxurious sherwani for the modern groom.",
        price: 18000,
        categoryId: "wedding",
        images: "https://picsum.photos/seed/sherwani1/800/800",
        sizes: "38,40,42,44",
        isNew: false,
      },
      {
        name: "Olive Green Chinos",
        description: "Tailored chinos with a perfect fit.",
        price: 2200,
        categoryId: "casual",
        images: "https://picsum.photos/seed/chinos1/800/800",
        sizes: "30,32,34,36",
        isNew: false,
      },
      {
        name: "Royal Blue Kurta Pajama",
        description: "Classic ethnic set for festive occasions.",
        price: 3500,
        categoryId: "ethnic",
        images: "https://picsum.photos/seed/kurta2/800/800",
        sizes: "S,M,L,XL",
        isNew: false,
      },
      {
        name: "White Oxford Button-Down",
        description: "Essential white shirt for every wardrobe.",
        price: 2400,
        categoryId: "shirts",
        images: "https://picsum.photos/seed/shirt2/800/800",
        sizes: "S,M,L,XL",
        isNew: false,
      },
    ];

    for (const prod of products) {
      await prisma.product.create({
        data: prod,
      });
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
