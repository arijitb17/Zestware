"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface Jersey {
  image: string;
  price: string;
  mrp: string;
  description: string;
  name: string;
  discount: string;
}

interface Department {
  name: string;
  jersey: Jersey;
}

interface Institute {
  name: string;
  departments: Department[];
}

const JerseysPage: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);
  const [isUploadVisible, setIsUploadVisible] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeChartImage] = useState("/images/i1.png");

  useEffect(() => {
    const fetchJerseyData = async () => {
      try {
        const response = await fetch("/jersey/jersey.json");
        const data = await response.json();
        setInstitutes(data.institutes);
      } catch (error) {
        console.error("Error fetching jersey data:", error);
      }
    };
    fetchJerseyData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInstituteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instituteName = e.target.value;
    setSelectedInstitute(instituteName);
    setSelectedDepartment("");
    setSelectedJersey(null);
    setIsUploadVisible(true);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const departmentName = e.target.value;
    setSelectedDepartment(departmentName);
    setIsUploadVisible(false);

    const institute = institutes.find((inst) => inst.name === selectedInstitute);
    if (institute) {
      const department = institute.departments.find((dept) => dept.name === departmentName);
      if (department) {
        setSelectedJersey(department.jersey);
      }
    }
  };

  const selectedInstituteData = institutes.find((institute) => institute.name === selectedInstitute);
  const departments = selectedInstituteData?.departments || [];

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Jerseys</h1>

      {/* Dropdowns */}
      <div className="space-y-6 w-full max-w-md">
        <select
          className="w-full bg-transparent border border-gray-500 text-gray-300 py-3 px-4 rounded-full appearance-none focus:outline-none"
          value={selectedInstitute}
          onChange={handleInstituteChange}
        >
          <option className="bg-black" value="">
            SELECT INSTITUTE
          </option>
          {institutes.map((institute) => (
            <option key={institute.name} value={institute.name} className="bg-black">
              {institute.name}
            </option>
          ))}
        </select>

        {selectedInstitute && (
          <select
            className="w-full bg-transparent border border-gray-500 text-gray-300 py-3 px-4 rounded-full appearance-none focus:outline-none"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option className="bg-black" value="">
              SELECT DEPARTMENT
            </option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.name} className="bg-black">
                {dept.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Upload Design (visible only if no department is selected) */}
      {isUploadVisible && (
        <div className="mt-12">
          <label
            htmlFor="uploadDesign"
            className="w-64 h-96 border border-gray-500 flex flex-col justify-center items-center rounded-lg cursor-pointer hover:border-gray-300"
          >
            <span className="text-5xl font-light">+</span>
            <p className="mt-4 text-gray-400">Upload your own design</p>
          </label>
          <input type="file" id="uploadDesign" className="hidden" />
        </div>
      )}

      {/* Show jersey details if department is selected */}
      {selectedDepartment && selectedJersey && (
        <div className="mt-12 flex flex-col md:flex-row justify-between w-full max-w-7xl">
          {/* Jersey Image (Left Section) */}
          <div className="flex-1 flex justify-center items-center mb-6 md:mb-0">
            <Image
              src={selectedJersey.image}
              alt="Jersey"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Price and Description (Right Section) */}
          <div className="flex-1 px-6 space-y-6">
            <h1 className="text-4xl font-bold text-gray-100">{selectedJersey.name}</h1>
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-yellow-600">{selectedJersey.price}</span>
              <span className="text-sm line-through text-gray-500">{selectedJersey.mrp}</span>
              <span className="text-sm text-green-500">{selectedJersey.discount} OFF</span>
            </div>
            <div className="text-gray-500">
              <p>MRP incl. of all taxes</p>
            </div>

            {/* Size Selector */}
            <div>
              <h2 className="text-lg font-medium text-gray-200">
                Please select a size
                <button
                  onClick={openModal}
                  className="pl-2 font-thin uppercase text-blue-400"
                >
                  Size Chart
                </button>
              </h2>
              <div className="flex-1 space-x-4 mt-4 py-4">
                {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-3xl border ${
                      selectedSize === size
                        ? "bg-yellow-500 text-white border-gray-800"
                        : " text-gray-100 border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal for Size Chart */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
                  >
                    X
                  </button>
                  <Image
                    src={sizeChartImage}
                    alt="Size Chart"
                    width={600}
                    height={600}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

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
            <div className="flex space-x-6 text-xl font-extrabold md:text-2xl">
  <button className="flex-1 bg-red-500 text-white px-4 py-2 shadow hover:bg-red-600 uppercase text-sm md:text-xl">
    Add to Cart
  </button>
  <button className="flex-1 bg-transparent border border-red-500 text-white px-4 py-2 shadow hover:bg-red-600 uppercase text-sm md:text-xl">
    Buy Now
  </button>
  <button className="border p-3 rounded-full shadow-md hover:bg-gray-100 text-sm md:p-4 md:text-xl">
    <FaHeart className="text-red-500 text-xl" />
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
      )}
    </div>
  );
};

export default JerseysPage;
