"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import Link from "next/link";

interface Size {
  size: string;
  price: string;
  stock: number;
}
interface Product {
  id: number;
  name: string;
  price: string;
  pricePerSize?: { [size: string]: string }; 
  image: string;
  mrp: string;
  discount: string;
  stockPhotos: string[];
  rating: number;
  description: string;
  details: string;
  artistDescription?: string;
  category: string;
  sizes: Size[]; // Array of sizes with prices
}

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isArtistDescriptionOpen, setIsArtistDescriptionOpen] = useState<boolean>(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image); // Set initial image
        setSelectedSize(data.sizes[0].size); // Default size selection (first size)

        // Fetch other products based on the same category
        const otherProductsResponse = await fetch(`/api/products?category=${data.category}&brand=brahmand`);
        const otherProductsData = await otherProductsResponse.json();
        setOtherProducts(otherProductsData.filter((p: Product) => p.id !== data.id)); // Exclude the current product

      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      }
    };

    fetchProduct();
  }, [id]);
 

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!product) {
    return <p className="text-white text-center">Loading...</p>;
  }
 // Find the selected size and calculate the price
 const selectedSizeData = product.sizes.find(size => size.size === selectedSize);
 const price = selectedSizeData ? selectedSizeData.price : product.price;

 const totalPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")) * quantity;

  return (
    <div className="min-h-screen font-sans">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          {/* Icons Section */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < product.rating ? "text-yellow-500" : "text-gray-400"}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
            </div>

            <button className="border p-2 rounded-full shadow-md hover:bg-gray-100">
              <FaHeart className="text-red-500 text-xl" />
            </button>
          </div>

          <div className="relative">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex space-x-20">
            {product.stockPhotos.slice(0, 3).map((photo, index) => (
              <div key={index} className="relative">
                <Image
                  src={photo}
                  alt={`Stock Photo ${index + 1}`}
                  width={80}
                  height={80}
                  className={`rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                    selectedImage === photo ? "border-2 border-gray-800 scale-105" : ""
                  }`}
                  onClick={() => setSelectedImage(photo)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <h1 className="text-6xl font-bold text-gray-100">{product.name}</h1>

          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-yellow-600">{`₹${totalPrice.toFixed(2)}`}</span>
            <span className="text-sm line-through text-gray-500">{product.mrp}</span>
            <span className="text-sm text-green-500">{product.discount} OFF</span>
          </div>
          <div className="text-gray-500">
            <p>MRP incl. of all taxes</p>
          </div>

          {/* Size Selector */}
          <div>
            <h2 className="text-lg font-medium text-gray-200">Please select a size</h2>
            <div className="flex-1 space-x-4 mt-4 py-4">
              {product.sizes.map((size) => (
                <button
                  key={size.size}
                  className={`px-4 py-2 rounded-3xl border ${selectedSize === size.size ? "bg-yellow-500 text-white border-gray-800" : "text-gray-100 border-gray-300"}`}
                  onClick={() => setSelectedSize(size.size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-100">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-16 p-2 text-center border rounded-lg text-gray-100 bg-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 text-2xl font-extrabold">
            <button className="flex-1 bg-red-500 text-white px-4 py-2 shadow hover:bg-red-600 uppercase">
              Add to Cart
            </button>
            <button className="flex-1 bg-transparent border border-red-500 text-white px-4 py-2 shadow hover:bg-red-600 uppercase">
              Buy Now
            </button>
          </div>

          {/* Delivery */}
          <div className="pt-6 text-2xl font-semibold">
            <h2>Delivery Details</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full pl-10 pr-20 py-2 border rounded-lg bg-transparent text-gray-600 focus:outline-none text-2xl font-thin"
              />
              <button
                className="uppercase text-xl font-semibold absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-blue-500 px-3 py-1 rounded-lg shadow hover:text-yellow-400"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-10 p-4 lg:p-8 mt-6">
      {/* Product Details Section */}
      <div className="border border-gray-100 rounded-lg shadow-md mb-6">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
          <h2 className="text-2xl font-bold text-gray-100">Product Details</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transform transition-transform ${
              isDetailsOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isDetailsOpen && (
          <div className="p-4 text-gray-100">
            <p>{product.details}</p>
          </div>
        )}
      </div>

      {/* Artist Description Section */}
      <div className="border border-gray-100 rounded-lg shadow-md mb-6">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsArtistDescriptionOpen(!isArtistDescriptionOpen)}
        >
          <h2 className="text-2xl font-bold text-gray-100">Artist Description</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transform transition-transform ${
              isArtistDescriptionOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isArtistDescriptionOpen && (
          <div className="p-4 text-gray-100">
            <p>{product.artistDescription || "No artist description available."}</p>
          </div>
        )}
      </div>

      {/* Materials Section */}
      <div className="border border-gray-100 rounded-lg shadow-md mb-6">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          <h2 className="text-2xl font-bold text-gray-100">Materials</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transform transition-transform ${
              isDescriptionOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isDescriptionOpen && (
          <div className="p-4 text-gray-100">
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
    {/* Other Products Bought Section */}
<div className="max-w-full mx-10 p-4 lg:p-8 mt-6 bg-transparent rounded-lg">
  <h2 className="text-3xl font-bold text-gray-200 mb-6">Others Also Bought</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    {otherProducts.map((product) => (
      <Link href={`/brahmand/hoodie/${product.id}`} key={product.id} passHref>
        <div className="p-4 rounded-lg text-center flex flex-col items-center bg-transparent hover:shadow-xl transition-all cursor-pointer">
          <div className="relative w-full h-64">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md mb-4"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">{product.name}</h3>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <p className="text-red-600 text-base font-semibold">{product.price}</p>
            <p className="text-sm line-through text-gray-400">{product.mrp}</p>
            {product.discount && (
              <p className="text-green-500 text-sm">↓ {product.discount}</p>
            )}
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductDetailsPage;
