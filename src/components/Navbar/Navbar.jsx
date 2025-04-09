import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-10 py-4 md:px-20">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Hinduja_Group_Logo.svg/1200px-Hinduja_Group_Logo.svg.png"
          alt="logo"
          className="h-12 w-12 md:h-16 md:w-16"
        />
      </div>

      <div className="hidden md:flex justify-between items-center text-blue-800 p-4">
        <ul className="flex space-x-4">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative cursor-pointer">
              <a
                href={item.link}
                className="text-gray-800 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5"
              >
                {item.name}
                <span className="block h-[2px] w-full bg-[#494753] origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4 ml-8">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="hover:underline transition-transform duration-300 ease-in-out"
              >
                
                <Link to="/profile" className="text-gray-800 transition-transform duration-300 ease-in-out">
                  Profile
                </Link>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <ul
          className={`absolute top-20 right-0 w-full text-right bg-white shadow-lg px-8 py-2 transition ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
          }`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="py-2">
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li className="py-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  Profile
                </button>
              </li>
              <li className="py-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="py-2">
                <button
                  onClick={() => navigate("/auth/login")}
                  className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  Login
                </button>
              </li>
              <li className="py-2">
                <button
                  onClick={() => navigate("/auth/register")}
                  className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
