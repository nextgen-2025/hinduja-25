import React, { useState } from "react";
import Appointment from "../AppointmentForm/Appointment";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F7FF] w-full py-8 lg:py-12 lg:px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between relative z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-5/12 space-y-6 mb-8 lg:mb-0"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              WELCOME TO HINDUJA HOSPITAL
            </span>
            
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Your Path to Health and{" "}
              <span className="text-blue-600">Wellness</span>
            </h1>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Experience world-class healthcare with our team of expert doctors and 
              state-of-the-art facilities. Your well-being is our priority.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={() => setShowAppointment(true)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg 
                font-medium flex items-center justify-center group"
            >
              Book Appointment
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
            </button>
            
            <button className="w-full sm:w-auto px-6 py-3 border-2 border-blue-600 
              text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 
              font-medium"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-600">20+</h3>
              <p className="text-sm text-gray-600 font-medium">Specialties</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-600">100+</h3>
              <p className="text-sm text-gray-600 font-medium">Expert Doctors</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-600">50k+</h3>
              <p className="text-sm text-gray-600 font-medium">Happy Patients</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-6/12"
        >
          <div>
            <Appointment />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
