import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const brahmand = await prisma.category.create({
    data: {
      name: "Brahmand",
      description: "Collection of hoodies and T-shirts",
      subcategories: {
        create: [
          { name: "Hoodies" },
          { name: "T-Shirts" }
        ]
      }
    }
  });

  const nirbhay = await prisma.category.create({
    data: {
      name: "Nirbhay",
      description: "Another collection of hoodies and T-shirts",
      subcategories: {
        create: [
          { name: "Hoodies" },
          { name: "T-Shirts" }
        ]
      }
    }
  });

  // Add Products
  const subcategory = await prisma.subcategory.findFirst({
    where: { name: "Hoodies" } // Adjust as needed
  });

  if (!subcategory) {
    console.error("Subcategory not found!");
    return;
  }

  await prisma.product.create({
    data: {
      name: "Black 300 gsm Full-Zip Hoodie",
      price: 1499,
      description: "A cozy black hoodie perfect for chilly evenings.",
      artistDescription: "Designed by a rising urban artist with a flair for monochrome aesthetics.",
      image: "/brah/stock/hoodie1/hoodie-main.png",
      mrp: 1999,
      discount: 25,
      stockPhotos: [
        "/brah/stock/hoodie1/stock1.png",
        "/brah/stock/hoodie1/stock2.png",
        "/brah/stock/hoodie1/stock3.png"
      ],
      details: "Material & Care: 100% Cotton, Machine Wash Cold",
      subcategory: {
        connect: { id: subcategory.id }
      }
    }
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
