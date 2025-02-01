
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the Product type
interface Product {
  id: string; // Updated to string type since `id` should be a string in the API
  name: string;
  price: string;
  description: string;
  image: string;
  mrp: string;
  discount: string;
}

const HoodiesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the API endpoint (assuming the API is set up for this)
        const response = await fetch("/api/products?category=hoodie&brand=nirbhay");

        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("An error occurred while fetching the product data.");
          console.error(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-transparent text-white min-h-screen">
      <div className="flex justify-center items-center my-6">
        <p className="text-yellow-500 text-2xl text-center">HOODIES</p>
      </div>
      <div className="flex justify-between items-center px-6 py-2">
      <h1 className="text-7xl font-bold">निर्भय</h1>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Product Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 px-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg text-center flex flex-col items-center bg-transparent hover:shadow-lg transition"
          >
            {/* Link to Product Page */}
            <Link href={`/brahmand/hoodie/${product.id}`} className="mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
            </Link>
            <h3 className="text-lg font-bold text-gray-200">{product.name}</h3>
            <div className="flex justify-center space-x-4 items-center mt-2">
              <p className="text-red-600 text-base font-semibold">
                {product.price}
              </p>
              <p className="text-sm line-through text-gray-400">{product.mrp}</p>
              {product.discount && (
                <p className="text-green-500 text-sm">↓ {product.discount}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoodiesPage;
