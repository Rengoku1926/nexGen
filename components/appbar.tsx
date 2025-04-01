"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  LuMessageSquareText,
  LuBellDot,
  LuSearch,
  LuMenu,
} from "react-icons/lu";
import { User } from "@/data/navbarData";

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = User[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="h-20 w-full border hidden md:flex justify-between items-center px-5">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input type="text" placeholder="Search" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gray-700 flex justify-center items-center rounded-sm">
              <LuMessageSquareText size={22} className="text-white" />
            </div>
            <div className="h-9 w-9 bg-gray-700 flex justify-center items-center rounded-sm">
              <LuBellDot size={22} className="text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                className="h-10 w-10 bg-gray-900 rounded-sm"
                src={`${currentUser.avatar}`}
                alt="User avatar"
              />
              {currentUser.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-2 border-gray-900 rounded-full"></div>
              )}
            </div>

            <div>
              <div className="text-xl font-semibold">{currentUser.name}</div>
              <div className="text-sm text-gray-500">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="h-16 w-full border flex md:hidden justify-between items-center px-4">
        {/* User Info on left for mobile */}
        <div className="flex items-center gap-2">
        <div className="relative">
              <img
                className="h-10 w-10 bg-gray-900 rounded-sm"
                src={`${currentUser.avatar}`}
                alt="User avatar"
              />
              {currentUser.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-2 border-gray-900 rounded-full"></div>
              )}
            </div>

          <div>
            <div className="text-lg font-semibold">{currentUser.name}</div>
            <div className="text-xs text-gray-500">{currentUser.role}</div>
          </div>
        </div>

        {/* Search icon and Hamburger on right for mobile */}
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 flex justify-center items-center">
            <LuSearch size={22} />
          </button>
          <button
            className="h-8 w-8 flex justify-center items-center"
            onClick={toggleMenu}
          >
            <LuMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (shows when hamburger is clicked) */}
      {isMenuOpen && (
        <div className="w-full border-t md:hidden bg-white py-4 px-4 absolute z-10">
          <div className="mb-4">
            <Input type="text" placeholder="Search" />
          </div>
          <div className="flex items-center gap-3 my-2">
            <div className="h-9 w-9 bg-gray-700 flex justify-center items-center rounded-sm">
              <LuMessageSquareText size={22} className="text-white" />
            </div>
            <span className="text-sm">Messages</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <div className="h-9 w-9 bg-gray-700 flex justify-center items-center rounded-sm">
              <LuBellDot size={22} className="text-white" />
            </div>
            <span className="text-sm">Notifications</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Appbar;
