"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FaShoppingCart, FaHeart, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useCart }from "@/context/CartContextprovider"

import { useSession,signIn,signOut } from 'next-auth/react';
const AccountMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { cart } = useCart();
  const session = useSession();
  return (
    <div className="relative">
      {/* Account Icon */}
      <MdOutlineAccountCircle
        className="w-10 h-10 mx-3 cursor-pointer"
        onClick={toggleDropdown}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 text-white rounded-2xl shadow-lg opacity-100 transition-opacity duration-300">
          <ul className="py-2">
            <li>
              <Link
                href="/orders"
                className="flex items-center px-4 py-2 border border-white rounded-2xl bg-transparent hover:text-yellow-500 transition-colors"
              >
                <FaClipboardList className="w-5 h-5 mr-2" />
                My Orders
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href="/cart"
                className="flex items-center px-4 py-2 border border-white rounded-2xl bg-transparent hover:text-yellow-500 transition-colors"
              >
                <FaShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
          </span>
                )}
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href="/wishlist"
                className="flex items-center px-4 py-2 border border-white rounded-2xl bg-transparent hover:text-yellow-500 transition-colors"
              >
                <FaHeart className="w-5 h-5 mr-2" />
                Wishlist
              </Link>
            </li>
            <li className="mt-2">
            <Link
                href="/api/auth/signin"
                className="flex items-center px-4 py-2 border border-white rounded-2xl bg-transparent hover:text-yellow-500 transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5 mr-2" />
                {session.status=== "unauthenticated" ? <button onClick={()=>{signIn()}}>Sign In</button>:<button onClick={()=>{signOut()}}>LogOut</button>}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
