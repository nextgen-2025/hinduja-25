import React from "react";
import Appoinment from "../AppointmentForm/Appointment";

const HeroSection = () => {
  return (
    <div className="bg-[#E6F3FF] w-full min-h-screen py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 px-4 md:px-8 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Path to Health and Wellness Begins Here
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Your Trusted Partner in Comprehensive Healthcare, Where Your
            Well-being is Our Priority, Providing Quality Care and Support for
            All Your Health Needs.
          </p>
        </div>
        <Appoinment />
      </div>
    </div>
  );
};

export default HeroSection;
