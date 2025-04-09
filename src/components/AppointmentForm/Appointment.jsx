import React from "react";
import { FaCalendarAlt, FaStethoscope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const appointment = () => {
  const deptData = [
    { value: "0", label: "Select Department" },
    { value: "1", label: "Emergency" },
    { value: "2", label: "Gynecology" },
    { value: "3", label: "Neurology" },
    { value: "4", label: "Pediatric" },
    { value: "5", label: "Cardiology" },
    { value: "6", label: "Psychiatry" },
  ];
  return (
    <div className="md:w-1/2 px-4 md:px-8 flex justify-center md:justify-end">
      <form className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-md w-full max-w-sm">
        {/* Date Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
            <FaCalendarAlt className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label
              htmlFor="date"
              className="text-sm font-semibold text-gray-800 block"
            >
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
            <select className="mt-1 block w-full bg-white bg-opacity-50 rounded-md border border-gray-300 py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {deptData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Number Field */}
        <div className="flex items-center py-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
            <FaPhoneAlt className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-800 block"
            >
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
        <div className="flex items-center py-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-4">
            <FaLocationPin className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-800 block"
            >
              Location
            </label>
            <input
              type="number"
              id="location"
              name="contact"
              placeholder="Pin Code"
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
  );
};

export default appointment;
