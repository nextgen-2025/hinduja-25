import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/login");
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Hinduja_Group_Logo.svg/1200px-Hinduja_Group_Logo.svg.png"
              alt="Hinduja Hospital"
              className="h-12 w-auto md:h-16 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 
                    ${isActive(item.link) 
                      ? 'text-indigo-600' 
                      : 'text-gray-700 hover:text-indigo-600'
                    }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left 
                    transition-transform duration-300 ${isActive(item.link) ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 
                      transition-all duration-300 transform hover:scale-105 focus:outline-none 
                      focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg 
                      hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/auth/register")}
                    className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 
                      transition-all duration-300 transform hover:scale-105 focus:outline-none 
                      focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-indigo-500"
          >
            <svg 
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300 ${
                isActive(item.link)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 
                  hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 text-white bg-red-600 rounded-lg 
                  hover:bg-red-700 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  navigate("/auth/login");
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-indigo-600 border border-indigo-600 
                  rounded-lg hover:bg-indigo-50 transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/auth/register");
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-white bg-indigo-600 rounded-lg 
                  hover:bg-indigo-700 transition-colors duration-300"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
