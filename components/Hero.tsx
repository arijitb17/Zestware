import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-wrap items-start p-8">
      {/* Left Section (Text) */}
      <div className="w-full lg:w-7/12 mb-8 lg:mb-0 flex flex-col justify-between">
        <p className="text-slate-100 leading-relaxed text-xl sm:text-2xl lg:text-3xl text-center lg:text-left lg:pr-48 pr-4">
          Zestwear is Assam’s first revolutionary online uniform startup, dedicated to transforming how to shop for
          uniforms, customized t-shirts, jerseys, and sports items. With our seamless online platform, you can book and
          customize your products effortlessly, ensuring quick and reliable home delivery. Our commitment to innovation
          and excellence drives us to provide top-quality services and products, promising to contribute to building a
          new India with our innovative spirit and outstanding performance. Experience convenience, quality, and style
          all in one place with Zestwear!
        </p>

        {/* Center Button under Paragraph */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gray-200 text-black text-2xl font-extrabold hover:bg-yellow-500 hover:text-black rounded-full w-56 py-3 transition-all duration-300"
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Right Section (Images) */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between mb-8 lg:mb-0 pr-4 lg:pr-0">
        {/* Top Row */}
        <div className="flex space-x-4 mb-4">
          <div className="h-auto w-1/2">
            <Image
              src="/images/i1.png"
              alt="Product 1"
              className="object-cover rounded-lg shadow-md"
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
            />
          </div>
          <div className="h-auto w-1/2">
            <Image
              src="/images/i2.png"
              alt="Product 2"
              className="object-cover rounded-lg shadow-md"
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
            />
          </div>
        </div>
        {/* Bottom Row */}
        <div className="flex space-x-4">
          <div className="h-auto w-1/2">
            <Image
              src="/images/i3.png"
              alt="Product 3"
              className="object-cover rounded-lg shadow-md"
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
            />
          </div>
          <div className="h-auto w-1/2">
            <Image
              src="/images/i4.png"
              alt="Product 4"
              className="object-cover rounded-lg shadow-md"
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
