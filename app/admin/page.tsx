'use client';

import React, { useState, useEffect } from 'react';

interface Color {
  name: string;
  frontImageUrl: string;
  backImageUrl: string;
}

interface Texture {
  name: string;
  frontImageUrl: string;
  backImageUrl: string;
}

interface Product {
  id: number;
  name?: string;
  price?: string;
  description?: string;
  image?: string;
  type?: string;
  colors?: Color[]; // Optional array, we will default to empty array if not provided
  textures?: Texture[];
  frontImageUrl?: string;
  backImageUrl?: string;
  mrp?: string;
  discount?: string;
  artistDescription?: string;
  stockPhotos?: string[];
  materials?: string;
  district?: string;
  school?: string;
  uniform?: string;
  [key: string]: any;
}

const AdminPage = () => {
  const [categories] = useState([
    { label: "Brahmand Hoodies", value: "brah_hoodie" },
    { label: "Brahmand T-Shirts", value: "brah_tshirt" },
    { label: "Nirbhay Hoodies", value: "nirbh_hoodie" },
    { label: "Nirbhay T-Shirts", value: "nirbh_tshirt" },
    { label: "Customized T-Shirts", value: "custom_tshirt" },
    { label: "Jerseys", value: "jersey" },
    { label: "Uniforms", value: "uniforms" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    colors: [], // Default to an empty array
    textures: [],
    frontImageUrl: '',
    backImageUrl: '',
    mrp: '',
    discount: '',
    artistDescription: '',
    stockPhotos: [],
    materials: '',
    district: '',
    school: '',
    uniform: '',
  });

  const [dynamicFields, setDynamicFields] = useState<string[]>([]);

  const getFieldsForCategory = (category: string): string[] => {
    switch (category) {
      case "brah_hoodie":
      case "brah_tshirt":
      case "nirbh_hoodie":
      case "nirbh_tshirt":
        return ["name", "price", "description", "artistDescription", "image", "mrp", "discount", "stockPhotos", "materials"];
      case "custom_tshirt":
        return ["type", "colors", "textures", "frontImageUrl", "backImageUrl"];
      case "jersey":
        return ["name", "image", "price", "mrp", "discount", "description"];
      case "uniforms":
        return ["district", "school", "uniform"];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setDynamicFields(getFieldsForCategory(selectedCategory));

      fetch(`/api/fetch-products?fileKey=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          if (selectedCategory === 'custom_tshirt') {
            setProducts(data.tshirts);
          } else {
            setProducts(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          alert("Failed to load products. Please try again later.");
        });
    }
  }, [selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'colors' || name === 'textures' || name === 'stockPhotos') {
      // Ensure we are always updating as an array
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()) || [],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return alert("Select a category first");

    // Check if type already exists, and either colors or textures must be added
    if (formData.type) {
      const existingProduct = products.find((product) => product.type === formData.type);
      if (existingProduct && (formData.colors?.length === 0 && formData.textures?.length === 0)) {
        return alert("Please add either a color or a texture for this product.");
      }
    }

    const newProduct = { ...formData, id: Date.now() };

    const response = await fetch(`/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileKey: selectedCategory, newProduct }),
    });

    if (response.ok) {
      setProducts([...products, newProduct]);
      setFormData({
        id: 0,
        name: '',
        price: '',
        description: '',
        image: '',
        type: '',
        colors: [],
        textures: [],
        frontImageUrl: '',
        backImageUrl: '',
        mrp: '',
        discount: '',
        artistDescription: '',
        stockPhotos: [],
        materials: '',
        district: '',
        school: '',
        uniform: '',
      });
    } else {
      alert("Failed to add product.");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/upload`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileKey: selectedCategory, id }),
    });

    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
    } else {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="mb-8">
        <label className="block text-xl font-medium mb-4">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">-- Select Category --</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dynamicFields.map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
              value={formData[field] || ''}
              onChange={handleInputChange}
              className="p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ))}
          <button
            type="submit"
            className="col-span-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all"
          >
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">No products found for the selected category.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <li key={product.id} className="bg-gray-800 rounded-lg p-4 flex flex-col items-start shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{product.name || product.type}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg mb-4 w-full h-40 object-cover"
                />
                <p className="text-gray-400">{product.price}</p>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-all"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
