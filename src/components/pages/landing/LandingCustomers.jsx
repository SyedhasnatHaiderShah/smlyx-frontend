import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image from "./assets/PatientSatisfaction.webp";
import { GoDotFill } from "react-icons/go";

const LandingCustomers = () => {
  return (
    <div className=" container h-full  py-20 flex flex-col md:flex-row items-center justify-around gap-10 p-10  ">
      {/* left */}
      <div className=" md:w-1/2 w-full px-5 flex items-center justify-center ">
        <img src={image} alt="" loading="lazy" className="  w-full" />
      </div>

      {/* right */}
      <div className=" px-5 flex items-start justify-start flex-col gap-5 w-full  md:w-1/2">
        <div className="flex items-center justify-start gap-5 w-full flex-col ">
          <p className=" text-gray-800 text-3xl font-medium">
            Our Customers Love Us
          </p>
          <div className="flex items-center md:justify-start justify-center gap-5">
            <p className="text-lg text-gray-600 font-medium ">
              smlyx.com provides simple yet advanced tools to make dental health
              accessible to all. With a team of highly dedicated dental
              professionals available 24/7/365, we are always here when you need
              us.
            </p>
          </div>
          <button className=" bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingCustomers;
