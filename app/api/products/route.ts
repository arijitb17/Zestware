import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category, Brand, Prisma } from "@prisma/client"; // ✅ Import Prisma enums

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    // Ensure only valid 'category' values ('hoodie' or 'tshirt') are allowed
    if (category && !["hoodie", "tshirt"].includes(category.toLowerCase())) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Ensure only valid 'brand' values ('brahmand' or 'nirbhay') are allowed
    if (brand && !["brahmand", "nirbhay"].includes(brand.toLowerCase())) {
      return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
    }

    // Fix 1️⃣: Use `Prisma.ProductWhereInput` instead of `any`
    const filters: Prisma.ProductWhereInput = {};
    
    if (category) {
      filters.category = category.toLowerCase() as Category;
    }
    if (brand) {
      filters.brand = brand.toLowerCase() as Brand;
    }

    // Fix 2️⃣: Use `const` instead of `let` since `products` is not reassigned
    const products = await prisma.product.findMany({
      where: filters,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error); // Fix 3️⃣: Log the error to avoid unused variable issue
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
