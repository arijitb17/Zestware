"use client";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define types for product and uniforms
interface Uniform {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  mrp: string;
  discount: string;
  rating: number;
  details: string;
  description: string;
}

interface School {
  name: string;
  uniforms: Uniform[];
}

interface Districts {
  Kamrup: School[]; 
}

interface SchoolsData {
  districts: Districts;
  defaultUniforms: Uniform[];
}

const CategoryPage = () => {
  const { category } = useParams();
  const [product, setProduct] = useState<Uniform | null>(null);
  const [defaultProducts, setDefaultProducts] = useState<Uniform[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string>(""); 
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the uniforms data
        const response = await fetch(`/uniforms/schools.json`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }

        const data: SchoolsData = await response.json();

        if (category) {
          // Extract uniforms from districts and check if the category slug matches
          const districtUniforms = Object.values(data.districts)
            .flat()
            .flatMap((school) => school.uniforms);

          const matchedProduct = districtUniforms.find(
            (item) => item.slug === category
          ) || data.defaultUniforms.find((item) => item.slug === category);

          if (matchedProduct) {
            setProduct(matchedProduct); // Set the matched product
          } else {
            setError("Product not found.");
          }
        } else {
          // No category provided; set default uniforms
          setDefaultProducts(data.defaultUniforms);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    };

    fetchProducts();
  }, [category]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product && !defaultProducts.length) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image and Wishlist */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between px-4">
            {/* Stars */}
            <div className="flex items-center space-x-1">
  {[...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      className={product && i < product.rating ? "text-yellow-500" : "text-gray-400"}
    />
  ))}
  <span className="text-sm text-gray-500 ml-1">{product?.rating ?? 0}</span>
</div>


            {/* Wishlist Icon */}
            <button className="border p-2 rounded-full shadow-md hover:bg-gray-100">
              <FaHeart className="text-red-500 text-xl" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative">
            <Image
              src={product?.image || "/default.jpg"}
              alt={product?.name || "Product"}
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col space-y-6">
          {category && product ? (
            <>
              <h1 className="text-6xl font-bold text-gray-100">{product?.name}</h1>

              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-yellow-600">{product?.price}</span>
                <span className="text-sm line-through text-gray-500">{product?.mrp}</span>
                <span className="text-sm text-green-500">{product?.discount} OFF</span>
              </div>
              <div className="text-gray-500">
                <p>MRP incl. of all taxes</p>
              </div>

              {/* Size Selector */}
              <div>
                <h2 className="text-lg font-medium text-gray-200">
                  Please select a size
                  <button className="pl-2 font-thin uppercase text-blue-400">Size Chart</button>
                </h2>

                <div className="flex space-x-4 mt-4 py-4">
                  {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-3xl border ${selectedSize === size ? "bg-yellow-500 text-white border-gray-800" : "text-gray-100 border-gray-300"}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
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
                  <button className="uppercase text-xl font-semibold absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-blue-500 px-3 py-1 rounded-lg shadow hover:text-yellow-400">
                    Check
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultProducts.map((defaultProduct) => (
                <div key={defaultProduct.id} className="border p-4 rounded-lg">
                  <Image
                    src={defaultProduct.image}
                    alt={defaultProduct.name}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                  <h3 className="text-xl font-bold text-gray-100">{defaultProduct.name}</h3>
                  <p className="text-lg font-semibold text-yellow-600">{defaultProduct.price}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
