import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { district, school } = req.query;

  if (!district || !school || typeof district !== 'string' || typeof school !== 'string') {
    return res.status(400).json({ error: 'Both district and school query parameters are required and must be strings.' });
  }

  try {
    // Fetch uniforms with the correct relation filter
    const uniforms = await prisma.uniform.findMany({
      where: {
        school: {
          name: school,
          district: {
            is: {
              name: district, // Correctly filter the related district
            },
          },
        },
      },
      include: {
        uniformSizes: true, // Include uniform sizes
      },
    });

    if (uniforms.length === 0) {
      return res.status(404).json({ error: 'No uniforms found for the provided district and school.' });
    }

    return res.status(200).json(uniforms);
  } catch (error) {
    console.error('Error fetching uniforms:', error);
    return res.status(500).json({ error: 'An error occurred while fetching uniforms.' });
  } finally {
    await prisma.$disconnect();
  }
}
