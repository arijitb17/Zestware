"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import next/image

const CategoryPage = () => {
  const router = useRouter();

  const [randomImages, setRandomImages] = useState<string[]>([]);

  // Fetch random T-shirt and Hoodie images
  useEffect(() => {
    // Simulate fetching T-shirt and Hoodie product images
    const tshirts = [...Array(5)].map((_, index) => `/brah/stock/tshirt${index + 1}/tshirt-main.png`);
    const hoodies = [...Array(5)].map((_, index) => `/brah/stock/hoodie${index + 1}/hoodie-main.png`);

    // Combine T-shirt and Hoodie images
    const allImages = [...tshirts, ...hoodies];

    // Shuffle and select 5 random images
    const randomSelectedImages = allImages.sort(() => 0.5 - Math.random()).slice(0, 5);

    setRandomImages(randomSelectedImages);
  }, []);

  // Navigate to T-Shirts or Hoodies product page
  const handleCategoryClick = (category: string) => {
    router.push(`/products/brahmand/${category}`);
  };

  return (
    <div className="bg-transparent text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-center items-center my-6">
        <p className="text-yellow-500 text-2xl text-center">CHOOSE A CATEGORY</p>
      </div>
      <div className="flex justify-between items-center px-6 py-2">
        <h1 className="text-7xl font-bold">ब्रह्मांड</h1>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-10 mt-12">
        {/* T-Shirts */}
        <div
          className="cursor-pointer text-center"
          onClick={() => handleCategoryClick("tshirt")}
        >
          <div className="relative w-56 h-56">
            <Image
              src="/brah/teemain.png"
              alt="T-Shirts"
              layout="fill" // Fills the container, maintaining aspect ratio
              objectFit="contain" // Ensures the image fits within the container
              className="rounded-md"
            />
          </div>
          <p className="text-yellow-500 text-lg mt-4">T-Shirts</p>
        </div>

        {/* Hoodies */}
        <div
          className="cursor-pointer text-center"
          onClick={() => handleCategoryClick("hoodies")}
        >
          <div className="relative w-56 h-56">
            <Image
              src="/brah/hoodmain.png"
              alt="Hoodies"
              layout="fill" // Fills the container, maintaining aspect ratio
              objectFit="contain" // Ensures the image fits within the container
              className="rounded-md"
            />
          </div>
          <p className="text-yellow-500 text-lg mt-4">Hoodies</p>
        </div>
      </div>

      {/* Random Images Section */}
      <div className="mt-12 px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {randomImages.map((image, index) => (
            <div key={index} className="p-4 rounded-lg text-center">
              <Image
                src={image}
                alt={`brahmand ${index + 1}`}
                width={300} // Image width
                height={225} // Image height
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
