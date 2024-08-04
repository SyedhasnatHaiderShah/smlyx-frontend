import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image from "./assets/PatientSatisfaction.webp";
import { GoDotFill } from "react-icons/go";

const LandingCustomers = () => {
  return (
    <div className=" container md:min-h-screen h-full  py-20 flex flex-col md:flex-row items-center justify-around gap-10 px-5 md:px-10  ">
      {/* left */}
      <div className=" md:w-3/5 w-full flex items-center justify-center ">
        <img src={image} alt="" loading="lazy" className="  w-full" />
      </div>

      {/* right */}
      <div className=" flex items-start justify-start flex-col gap-5 w-full  md:w-2/5">
        <div className="flex md:items-start md:justify-start items-center justify-center gap-5 w-full md:w-4/5 flex-col ">
          <p className=" text-gray-800 md:text-3xl sm:text-2xl  text-xl font-medium">
            Our Customers Love Us
          </p>
          <div className="flex items-center md:justify-start justify-center gap-5">
            <p className="md:text-lg text-base text-gray-600">
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
