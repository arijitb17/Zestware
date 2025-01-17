import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const XIcon: React.FC = () => (
  <Image
    src="/cont/twitter.svg"
    alt="Twitter X Icon"
    width={40}
    height={40}
  />
);

const IIcon: React.FC = () => (
  <Image
    src="/cont/insta.svg"
    alt="Instagram Icon"
    width={40}
    height={40}
  />
);

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 relative">
      <h1 className="text-5xl font-bold text-center mb-8 mt-10">Contact Us</h1>
      <div className="flex flex-col items-start mt-32">
        {/* Phone */}
        <div className="mb-6 flex items-center space-x-4 text-2xl">
          <a href="tel:7002137717" className="flex items-center space-x-4 text-white hover:text-green-500">
            <FaPhoneAlt size={32} className="text-white" />
            <span>7002137717</span>
          </a>
        </div>

        {/* Email */}
        <div className="mb-6 flex items-center space-x-4 text-2xl">
          <a
            href="mailto:zeswearindia@gmail.com"
            className="flex items-center space-x-4 text-white hover:text-red-500"
          >
            <FaEnvelope size={32} className="text-white" />
            <span>zeswearindia@gmail.com</span>
          </a>
        </div>

        {/* Website */}
        <div className="mb-6 flex items-center space-x-4 text-2xl">
          <a
            href="https://zestwearindia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 text-white hover:text-blue-500"
          >
            <FaGlobe size={32} className="text-white" />
            <span>zestwearindia.com</span>
          </a>
        </div>

        {/* Instagram */}
        <div className="mb-6 flex items-center space-x-4 text-2xl">
          <a
            href="https://www.instagram.com/zestwearindia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 text-white hover:text-pink-600"
          >
            <IIcon />
            <span>@zestwearindia</span>
          </a>
        </div>

        {/* Twitter X (SVG Icon) */}
        <div className="mb-6 flex items-center space-x-4 text-2xl">
          <a
            href="https://twitter.com/zestwearindia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 text-white hover:text-blue-400"
          >
            <XIcon />
            <span>@zestwearindia</span>
          </a>
        </div>
      </div>

      {/* Photo Slot - Mobile Friendly */}
      <div className="block md:absolute bottom-8 right-8 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg items-center">
        <Image
          src="/cont/qr.png"
          alt="Photo Slot"
          width={192}
          height={192}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ContactPage;
