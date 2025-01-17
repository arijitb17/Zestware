"use client";
import React, { useState } from "react";
import Image from "next/image";

const Services: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/serv/i1.png",
      text: "At Zestwear, we take pride in delivering premium quality uniforms designed for comfort, durability, and style. Our wide range includes uniforms for schools, corporates, sports teams, and industries. With a customer-first approach, we ensure an efficient system that includes customization options and hassle-free home delivery to meet your needs conveniently and happily.",
      width: "80%",
    },
    {
      image: "/serv/i2.png",
      text: `Zestwear and its co-brand Nirvai represent a dynamic partnership that blends quality, culture, and creativity into everyday apparel. Zestwear, a startup dedicated to creating uniforms, jerseys, and customized merchandise, stands out with its commitment to durability, comfort, and customer satisfaction. Catering to schools, corporations, industries, and sports teams, Zestwear combines utility with style, offering seamless home delivery services for added convenience.<br /><br />
      On the other hand, Nirvai, Zestwear’s co-brand, takes a bold approach to t-shirt fashion by celebrating cultural diversity. With its focus on designing stylish and artistic graphics, Nirvai captures the essence of cultures worldwide, making each piece more than just clothing—it’s a story.`,
      width: "70%",
    },
    {
      image: "/serv/i3.png",
      text: `Zestwear and its co-brand Brahmand exemplify a union of creativity and inspiration. Zestwear, renowned for its high-quality uniforms and customized apparel, caters to a diverse range of needs with a focus on comfort, durability, and style. Its dedication to providing seamless delivery and tailored products has made it a trusted name across industries.
      Brahmand, as Zestwear’s co-brand, takes inspiration from the vastness of the universe. With a deep dedication to cosmic themes, Brahmand offers t-shirts that depict the beauty and mystery of space, galaxies, and celestial elements. Each design is a gateway to the stars, blending science, art, and imagination in wearable form.<br /><br />
      Together, Zestwear and Brahmand aim to deliver not just clothing but experiences—combining quality craftsmanship with the boundless inspiration of Earth and beyond.`,
      width: "65%",
    },
    {
      image: "/serv/i4.png",
      text: `Elevate Your Writing Experience with Zestwear Notebooks.<br /><br />
      At Zestwear, we believe that every word you write deserves a perfect space. Our premium notebooks are designed with a focus on writing comfort, ensuring smooth, effortless writing. The high-quality paper offers an unmatched writing experience, while our stylish covers add a touch of elegance to your everyday essentials. Whether for work, study, or creativity, our notebooks are crafted to inspire and enhance your writing journey.<br /><br />
      Choose Zestwear for the ultimate combination of style, comfort, and durability. Write your story today with Zestwear notebooks!`,
      width: "60%",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col items-center p-8 mt-16">
      {/* Main Content */}
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 pl-10 pr-10">
        {/* Left Section (Image) */}
        <div className="w-full lg:w-5/12 ml-30">
          <div className="h-auto w-full">
            <Image
              src={slides[currentSlide].image}
              alt="Slide Image"
              className="object-cover rounded-lg shadow-md"
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
            />
          </div>
        </div>

        {/* Right Section (Text and Arrow) */}
        <div className="w-full lg:w-7/12 flex flex-col items-start">
          <p
            className="text-slate-100 leading-relaxed text-xl sm:text-2xl lg:text-3xl mb-6"
            dangerouslySetInnerHTML={{ __html: slides[currentSlide].text }}
          ></p>
          <div className="self-end">
            <button
              onClick={handleNext}
              className="text-white bg-transparent hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              aria-label="Next Slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
