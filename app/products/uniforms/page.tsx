"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Define types for the school and uniform structure
type Uniform = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  mrp: string;
  rating: number;
  discount: string;
  uniformSizes?: {
    size: string;
    price: string;
    stock: number;
  }[];
};

type School = {
  name: string;
  uniforms: Uniform[];
};

type District = {
  id: number;
  name: string;
  schools: School[];
}; const defaultUniforms: Uniform[] = [
  {
    id: 7,
    name: "Half Sleeve White Shirt",
    slug: "half-sleeved-shirt",
    image: "/uniforms/half.png",
    price: "₹250",
    mrp: "₹300",
    rating: 4.5,
    discount: "17%",
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
  },
];

const UniformsPage = () => {
  const [districts, setDistricts] = useState<District[]>([]); // Store all districts
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // No default district selected
  const [selectedSchool, setSelectedSchool] = useState<string>(""); // Initially no school selected
  const [uniforms, setUniforms] = useState<Uniform[]>([]); // Store uniforms for selected school
  const [isClient, setIsClient] = useState<boolean>(false);

  // Default uniforms to show before any district or school is selected
 

  useEffect(() => {
    setIsClient(true); // Ensure code runs on the client side
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch("/api/districts");
      const data = await response.json();
      setDistricts(data);
      setUniforms(defaultUniforms);
    };

    fetchDistricts();
  }, [defaultUniforms]);
  
  

  // Handle district selection change
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setSelectedSchool(""); // Reset selected school
    setUniforms([]); // Reset uniforms when district is changed
  };

  // Handle school selection change
  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const school = event.target.value || "";
    setSelectedSchool(school);

    const district = districts.find((d) => d.name === selectedDistrict);
    const schoolData = district?.schools.find((s) => s.name === school);
    setUniforms(schoolData?.uniforms || []); // Set uniforms for the selected school or empty array if none
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-left px-8 pt-8">Uniforms</h1>

      <div className="flex flex-col items-center gap-6 px-8 py-6">
        {/* District Dropdown */}
        <div className="w-full md:w-96">
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full p-3 rounded-3xl bg-transparent text-white border border-white"
          >
            <option value="" className="bg-black">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name} className="bg-black">
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* School Dropdown */}
        <div className="w-full md:w-96">
          <select
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="w-full p-3 rounded-3xl bg-transparent text-white border border-white"
          >
            <option value="" className="bg-black">Select School</option>
            {districts
              .find((district) => district.name === selectedDistrict)
              ?.schools.map((school: School) => (
                <option key={school.name} value={school.name} className="bg-black">
                  {school.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Display uniforms based on selected school or default uniforms */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-16 px-8 py-12 mt-10">
        {uniforms.length > 0 ? (
          uniforms.map((uniform: Uniform) => (
            <Link
              key={uniform.slug}
              href={`/uniform/${uniform.slug}`}
              className="text-center w-full sm:w-2/3"
            >
              <Image
                src={uniform.image}
                alt={uniform.name}
                width={300}
                height={300}
                className="mx-auto"
              />
              <p className="text-xl mt-4">{uniform.name}</p>
            </Link>
          ))
        ) : (
          <p>No uniforms available for the selected school or district.</p>
        )}
      </div>
    </div>
  );
};

export default UniformsPage;
