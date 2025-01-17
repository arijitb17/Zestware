"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Underline from "./Underline";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Use this instead of useRouter

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="w-full p-4 flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          <Link href="/">
            <Image
              src="/images/logo1.png"
              alt="Zestwear"
              height={200}
              width={240}
            />
          </Link>
        </div>

        <div className="md:flex items-center hidden">
          <Link
            href="/auth/SignUp"  // Updated to reflect the correct path
            className={`mx-4 ${isActive("/auth/SignUp") ? "text-yellow-500" : "text-white"}`}
          >
            SIGNUP
          </Link>
          <Link
            href="/"
            className={`mx-4 ${isActive("/") ? "text-yellow-500" : "text-white"}`}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`mx-4 ${isActive("/about") ? "text-yellow-500" : "text-white"}`}
          >
            ABOUT
          </Link>
          <Link
            href="/services"
            className={`mx-4 ${isActive("/services") ? "text-yellow-500" : "text-white"}`}
          >
            SERVICES
          </Link>
          <Link
            href="/shop"
            className={`mx-4 ${isActive("/shop") ? "text-yellow-500" : "text-white"}`}
          >
            SHOP
          </Link>
          <Link
            href="/contact"
            className={`mx-4 ${isActive("/contact") ? "text-yellow-500" : "text-white"}`}
          >
            CONTACT
          </Link>
          <div className="hover:text-yellow-400">
          <AccountMenu />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between">
          
        <AccountMenu/>
        
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full p-4 bg-black bg-opacity-80">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl"
              >
                X {/* Cross button to close menu */}
              </button>
            </div>
            <Link
              href="/auth/signup"  // Updated to reflect the correct path
              className={`block mb-4 ${isActive("/auth/signup") ? "text-yellow-500" : "text-white"}`}
            >
              SIGNUP
            </Link>
            <Link
              href="/"
              className={`block mb-4 ${isActive("/") ? "text-yellow-500" : "text-white"}`}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={`block mb-4 ${isActive("/about") ? "text-yellow-500" : "text-white"}`}
            >
              ABOUT
            </Link>
            <Link
              href="/services"
              className={`block mb-4 ${isActive("/services") ? "text-yellow-500" : "text-white"}`}
            >
              SERVICES
            </Link>
            <Link
              href="/shop"
              className={`block mb-4 ${isActive("/shop") ? "text-yellow-500" : "text-white"}`}
            >
              SHOP
            </Link>
            <Link
              href="/contact"
              className={`block mb-4 ${isActive("/contact") ? "text-yellow-500" : "text-white"}`}
            >
              CONTACT
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Underline color="white" thickness="2px" width="90%" />
      </div>
    </div>
  );
};

export default Navbar;
