import React from "react";
import { FaCalendarAlt, FaStethoscope, FaPhoneAlt } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="bg-[#E6F3FF] w-full h-screen py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Heading & Paragraph */}
        <div className="md:w-1/2 pl-20 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Path to Health and Wellness Begins Here
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your Trusted Partner in Comprehensive Healthcare, Where Your
            Well-being is Our Priority, Providing Quality Care and Support
            for All Your Health Needs.
          </p>
        </div>

        {/* Right Side: Transparent Form */}
        <div className="md:w-1/2 pr-35 flex justify-center md:justify-end">
          <form className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-md w-full max-w-sm">
            {/* Date Field */}
            <div className="flex items-center py-4 border-b border-gray-200">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
                <FaCalendarAlt className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="date" className="text-sm font-semibold text-gray-800 block">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 block w-full bg-white bg-opacity-50 rounded-md border border-gray-300 py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Department Field */}
            <div className="flex items-center py-4 border-b border-gray-200">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
                <FaStethoscope className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="department" className="text-sm font-semibold text-gray-800 block">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  placeholder="Enter department"
                  className="mt-1 block w-full bg-white bg-opacity-50 rounded-md border border-gray-300 py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contact Number Field */}
            <div className="flex items-center py-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="contact" className="text-sm font-semibold text-gray-800 block">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  placeholder="Enter contact number"
                  className="mt-1 block w-full bg-white bg-opacity-50 rounded-md border border-gray-300 py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-md transition-colors hover:from-blue-600 hover:to-blue-700"
              >
                Book Now →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
