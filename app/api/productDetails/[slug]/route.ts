import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params; // get slug from params

  // If slug is not provided, return a 400 error
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Fetch the product data from the database
    const product = await prisma.uniform.findUnique({
      where: { slug },
      include: {
        school: true,
        uniformSizes: {
          select: {
            id: true,
            size: true,
            price: true,
            stock: true,
          },
        },
      },
    });

    // If no product is found, return a 404 error
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Return the product data in the response
    return NextResponse.json({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      mrp: product.mrp,
      rating: product.rating,
      discount: product.discount,
      school: product.school,
      sizes: product.uniformSizes.map((size) => ({
        id: size.id,
        size: size.size,
        price: size.price,
        stock: size.stock,
      })),
    });
  } catch (error: unknown) {
    // Catch any unexpected errors and return a 500 error
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
