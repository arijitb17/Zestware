"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LArrowButton from "@/components/LArrow";
import RArrowButton from "@/components/RArrow";

interface ButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`w-1/4 sm:w-1/6 md:w-1/7 h-16 border-2 rounded-md ${
        isActive ? "border-yellow-500 text-yellow-500" : "border-white text-white"
      } hover:border-yellow-500 hover:text-yellow-500 text-center`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const UI: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Start from the first category
  const router = useRouter();

  const buttonLabels = [
    "ब्रह्मांड", // Universe
    "निर्भय", // Fearless
    "Uniforms",
    "Customized T-Shirt",
    "Jerseys"
  ];

  // Define routes for each category
  const categoryRoutes: { [key in typeof buttonLabels[number]]: string } = {
    "ब्रह्मांड": "/products/brahmand/category",
    "निर्भय": "/products/nirbhay/category",
    "Uniforms": "/products/uniforms",
    "Customized T-Shirt": "/products/customized-tshirt",
    "Jerseys": "/products/jerseys"
  };

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleViewClick = () => {
    const selectedButton = buttonLabels[activeIndex];

    // Navigate to the respective category page based on the selected category
    const route = categoryRoutes[selectedButton as keyof typeof categoryRoutes];
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 w-full min-h-screen justify-between">
      {/* Upper Arrow Section */}
      <div className="flex items-center mb-4 mt-20 text-5xl w-full justify-center">
        <LArrowButton
          ariaLabel="Previous Button"
          onClick={() =>
            handleButtonClick(((activeIndex - 1 + buttonLabels.length) % buttonLabels.length))
          }
          className="text-6xl mr-2"
        />
        <span className="text-white mx-2 text-4xl sm:text-6xl flex-grow text-center">
          {buttonLabels[activeIndex]}
        </span>
        <RArrowButton
          ariaLabel="Next Button"
          onClick={() =>
            handleButtonClick(((activeIndex + 1) % buttonLabels.length))
          }
          className="text-6xl ml-2"
        />
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap mt-2 sm:mt-12 justify-center items-center gap-6 w-full lg:text-2xl sm:text-sm">
        {buttonLabels.map((label, index) => (
          <Button
            key={index}
            label={label}
            isActive={index === activeIndex}
            onClick={() => handleButtonClick(index)}
          />
        ))}
      </div>

      {/* View Button */}
<div className="mt-6 sm:mt-12 mb-40 sm:mb-20 flex flex-col items-center gap-4">
  <button
    className="min-w-[10rem] px-8 h-16 bg-white text-black hover:bg-yellow-500 rounded-3xl text-xl font-extrabold flex items-center justify-center"
    onClick={handleViewClick}
  >
    View {buttonLabels[activeIndex]}
  </button>
</div>

    </div>
  );
};

export default UI;
