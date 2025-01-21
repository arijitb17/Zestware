import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Map categories to their respective JSON file paths
const jsonFileMap: Record<string, string> = {
  brah_hoodie: 'public/brah/hoodie.json',
  brah_tshirt: 'public/brah/Tshirt.json',
  nirbh_hoodie: 'public/nirbh/hoodie.json',
  nirbh_tshirt: 'public/nirbh/Tshirt.json',
  custom_tshirt: 'public/custom/tshirts.json',
  jersey: 'public/jersey/jersey.json',
  uniforms: 'public/uniforms/schools.json',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileKey = searchParams.get('fileKey');

  if (!fileKey || !jsonFileMap[fileKey]) {
    return NextResponse.json({ error: 'Invalid fileKey' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), jsonFileMap[fileKey]);

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
