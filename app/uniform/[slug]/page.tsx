"use client";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define types for the product
interface UniformSize {
  size: string;
  price: string;
  stock: number;
}

interface Uniform {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  mrp?: string;
  discount?: string;
  rating: number;
  sizes?: UniformSize[];
}

// Default Uniforms
const defaultUniforms: Uniform[] = [
  {
    id: 7,
    name: "Half Sleeve White Shirt",
    slug: "half-sleeved-shirt",
    image: "/uniforms/half.png",
    price: "₹250",
    mrp: "₹300",
    rating: 4.5,
    discount: "17%",
    sizes: [
      { size: "S", price: "₹240", stock: 10 },
      { size: "M", price: "₹250", stock: 15 },
      { size: "L", price: "₹260", stock: 8 },
    ],
  },
  {
    id: 8,
    name: "Full Sleeve White Shirt",
    slug: "full-sleeved-shirt",
    image: "/uniforms/full.png",
    price: "₹300",
    mrp: "₹350",
    rating: 4.7,
    discount: "14%",
    sizes: [
      { size: "S", price: "₹290", stock: 12 },
      { size: "M", price: "₹300", stock: 18 },
      { size: "L", price: "₹310", stock: 10 },
    ],
  },
  {
    id: 9,
    name: "Black Long Pant",
    slug: "black-pants",
    image: "/uniforms/pant.png",
    price: "₹500",
    mrp: "₹600",
    rating: 4.3,
    discount: "16%",
    sizes: [
      { size: "28", price: "₹490", stock: 20 },
      { size: "30", price: "₹500", stock: 25 },
      { size: "32", price: "₹510", stock: 15 },
    ],
  },
];

const CategoryPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Uniform | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<UniformSize | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/productDetails/${slug}`);
        if (!response.ok) throw new Error("Product not found");

        const data: Uniform = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // Use default product if API fails
        const defaultProduct = defaultUniforms.find((item) => item.slug === slug);
        if (defaultProduct) {
          setProduct(defaultProduct);
        } else {
          setError("Product not found");
        }
      }
    };

    fetchProduct();
  }, [slug]);

  if (error) {
    return <div className="text-red-500 text-center text-xl">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image and Wishlist */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < product.rating ? "text-yellow-500" : "text-gray-400"} />
              ))}
              <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
            </div>

            <button className="border p-2 rounded-full shadow-md hover:bg-gray-100">
              <FaHeart className="text-red-500 text-xl" />
            </button>
          </div>

          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-6xl font-bold text-gray-100">{product.name}</h1>

          {/* Dynamic Price Update */}
          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-yellow-600">
              {selectedSize ? `₹${parseInt(selectedSize.price.replace("₹", "")) * quantity}` : product.price}
            </span>
            {product.mrp && <span className="text-sm line-through text-gray-500">{product.mrp}</span>}
            {product.discount && <span className="text-sm text-green-500">{product.discount} OFF</span>}
          </div>

          <div className="text-gray-500">
            <p>MRP incl. of all taxes</p>
          </div>

          {/* Size Selector */}
          <div>
            <h2 className="text-lg font-medium text-gray-200">Please select a size</h2>
            {product.sizes && product.sizes.length > 0 ? (
              <div className="flex space-x-4 mt-4 py-4">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    className={`px-4 py-2 rounded-3xl border ${
                      selectedSize?.size === size.size
                        ? "bg-yellow-500 text-white border-gray-800"
                        : "text-gray-100 border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No sizes available</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-100">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const value = Math.max(1, Number(e.target.value)); // Ensuring at least 1
                setQuantity(value);
              }}
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
              <button className="uppercase text-xl font-semibold absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-blue-500 px-3 py-1 rounded-lg shadow hover:text-yellow-400">
                Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
