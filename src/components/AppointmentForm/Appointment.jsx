import React, { useState } from "react";
import { FaCalendarAlt, FaStethoscope, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    department: "0",
    contact: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  const deptData = [
    { value: "0", label: "Select Department" },
    { value: "1", label: "Emergency" },
    { value: "2", label: "Gynecology" },
    { value: "3", label: "Neurology" },
    { value: "4", label: "Pediatric" },
    { value: "5", label: "Cardiology" },
    { value: "6", label: "Psychiatry" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (formData.date < today) {
      newErrors.date = "Cannot book appointment for past dates";
    }

    if (formData.department === "0") {
      newErrors.department = "Please select a department";
    }

    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter valid 10-digit number";
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // API call would go here
      console.log("Form submitted:", formData);
      alert("Appointment booked successfully!");
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto px-4">
      <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book an Appointment
        </h3>

        {/* Name Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4">
            <FaUserAlt className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-800 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`mt-1 block w-full bg-white rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } py-2.5 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
        </div>

        {/* Date Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4">
            <FaCalendarAlt className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-800 block">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 block w-full bg-white rounded-lg border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } py-2.5 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>
        </div>

        {/* Department Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4">
            <FaStethoscope className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-800 block">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`mt-1 block w-full bg-white rounded-lg border ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              } py-2.5 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {deptData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
          </div>
        </div>

        {/* Contact Number Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4">
            <FaPhoneAlt className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-800 block">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              className={`mt-1 block w-full bg-white rounded-lg border ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              } py-2.5 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
          </div>
        </div>

        {/* Pincode Field */}
        <div className="flex items-center py-4 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4">
            <FaLocationPin className="w-5 h-5" />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-800 block">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              className={`mt-1 block w-full bg-white rounded-lg border ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              } py-2.5 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold 
              py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] 
              hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2"
          >
            Book Appointment →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
