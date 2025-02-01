import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path to where your Prisma client is imported

export async function GET() {
  try {
    const districts = await prisma.district.findMany({
      include: {
        schools: {
          include: {
            uniforms: {
              include: {
                uniformSizes: true, // Include uniform sizes for each uniform
              },
            },
          },
        },
      },
    });

    return NextResponse.json(districts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Unable to fetch data" }, { status: 500 });
  }
  
}
