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
  category?: string; // Optional category for categorizing uniforms
};

type School = {
  name: string;
  uniforms: Uniform[];
};

// Import JSON data directly from the public directory
import schoolsData from "@/public/uniforms/schools.json";

// List of valid district names as a union type
type DistrictName = keyof typeof schoolsData.districts;

const UniformsPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictName>("Kamrup"); // Default to "Kamrup"
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [uniforms, setUniforms] = useState<Uniform[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle district selection change
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const district = event.target.value as DistrictName; // Typecast to DistrictName
    setSelectedDistrict(district);
    setSelectedSchool(""); // Reset selected school
    setUniforms([]); // Reset uniforms when district is changed
  };

  // Handle school selection change
  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const school = event.target.value || "";
    setSelectedSchool(school);
    const schoolData = schoolsData.districts[selectedDistrict]?.find(
      (s: School) => s.name === school
    );
    setUniforms(schoolData?.uniforms || []); // Set uniforms for the selected school or empty array if none
  };

  if (!isClient) {
    return null;
  }

  // Display uniforms based on selected school or default uniforms
  const displayUniforms = uniforms.length > 0 ? uniforms : schoolsData.defaultUniforms;

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
            {Object.keys(schoolsData.districts).map((district) => (
              <option key={district} value={district} className="bg-black">
                {district}
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
            {schoolsData.districts[selectedDistrict]?.length
              ? schoolsData.districts[selectedDistrict].map((school: School) => (
                  <option key={school.name} value={school.name} className="bg-black">
                    {school.name}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>

      {/* Display uniforms based on selected school or default uniforms */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-16 px-8 py-12 mt-10">
        {displayUniforms.length > 0 ? (
          displayUniforms.map((uniform: Uniform) => (
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
