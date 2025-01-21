import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define types for the product and the response data structure
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  type: string;
  colors?: string[]; // Optional
  textures?: string[]; // Optional
  frontImageUrl?: string;
  backImageUrl?: string;
  mrp?: string;
  discount?: string;
  [key: string]: any; // Include other fields dynamically
}

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

// Add a product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileKey, newProduct } = body;

    console.log("Received Payload:", body); // Debug log

    if (!fileKey || !jsonFileMap[fileKey] || !newProduct) {
      return NextResponse.json({ error: 'Invalid fileKey or product data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), jsonFileMap[fileKey]);

    // Read the existing data from the JSON file
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    let jsonData: Product[] = JSON.parse(fileData);

    console.log("Existing Products:", jsonData); // Debug log

    // Ensure jsonData is an array
    if (!Array.isArray(jsonData)) {
      return NextResponse.json({ error: 'Data is not in the expected format (array)' }, { status: 500 });
    }

    // If the id isn't provided, generate it
    if (!newProduct.id) {
      const maxId = jsonData.reduce((max: number, product: Product) => Math.max(max, product.id || 0), 0);
      newProduct.id = maxId + 1;
    }

    // Add the new product to the list
    jsonData.push(newProduct);

    // Write updated data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ message: 'Product added successfully!' });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}


// Delete a product
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileKey, id } = body;

    // Validate fileKey and id
    if (!fileKey || !jsonFileMap[fileKey] || !id) {
      return NextResponse.json({ error: 'Invalid fileKey or product ID' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), jsonFileMap[fileKey]);

    // Read the existing data from the JSON file
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const jsonData: Product[] = JSON.parse(fileData);

    // Filter out the product with the provided ID
    const updatedData = jsonData.filter((product: Product) => product.id !== id);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ message: 'Product deleted successfully!' });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
