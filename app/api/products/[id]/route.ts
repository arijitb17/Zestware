import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Named import
 // Ensure you have a valid Prisma client setup

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true, // Include sizes and their specific prices for the product
        orders: true, // Include orders related to this product
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: 'Failed to fetch product data' }, { status: 500 });
  }
}
