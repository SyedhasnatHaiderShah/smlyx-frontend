import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image from "./assets/consult.png";
import { GoDotFill } from "react-icons/go";

const LandingAiScan = () => {
  return (
    <div className=" container h-full py-20  w-full flex flex-col md:flex-row items-center justify-around gap-10 md:px-16 sm:px-10 px-5   ">
      <div className=" px-5 flex items-center justify-center flex-col gap-5 w-full  md:w-1/2">
        <div className="flex items-start justify-end gap-5 md:w-2/3 w-full flex-col">
          <p className=" text-gray-500 text-3xl font-medium">
            AI Scan + Virtual Consultation
          </p>
          <div className="flex items-center md:justify-center justify-center gap-5">
            <p className="text-lg text-gray-600  ">
              While the AI scan is a great first step, a virtual consultation
              with a licensed dentist will help clarify any questions. Also, the
              scan can help uncover potential problems, but a discussion of
              treatment options requires a licensed dentist.
            </p>
          </div>
          <button className=" bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90">
            Start Now
          </button>
        </div>
      </div>
      <div className=" md:w-1/2 w-full px-5 flex items-center md:justify-start justify-center ">
        <img src={image} alt="" loading="lazy" className="  w-[90%]" />
      </div>
    </div>
  );
};

export default LandingAiScan;
