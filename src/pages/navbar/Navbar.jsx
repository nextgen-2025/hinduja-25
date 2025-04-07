import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-10 py-4 md:px-20">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Hinduja_Group_Logo.svg/1200px-Hinduja_Group_Logo.svg.png"
          alt="logoImage"
          className="h-12 w-12 md:h-16 md:w-16"
        />
      </div>
      <div className="navbarList hidden md:flex justify-between items-center text-blue-800 p-4">
        <ul className="flex space-x-4">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:text-blue-600 cursor-pointer">
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-blue-800 focus:outline-none transition duration-300 ease-in-out"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <ul
          className={`md:hidden absolute top-20 right-0 w-full text-right bg-white shadow-lg px-8 py-2 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-5 opacity-0 pointer-events-none"
          }`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="hover:text-blue-600 cursor-pointer">
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
