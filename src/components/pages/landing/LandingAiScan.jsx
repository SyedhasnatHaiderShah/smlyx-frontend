import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image from "./assets/consult.png";
import { GoDotFill } from "react-icons/go";

const LandingAiScan = () => {
  return (
    <div className=" container h-full md:h-screen py-28  w-full flex flex-col md:flex-row items-center justify-around gap-0 p-10  ">
      <div className=" px-5 flex items-end justify-end flex-col gap-5 w-full  md:w-1/2">
        <div className="flex items-start justify-end gap-5 w-96 flex-col">
          <p className=" text-gray-500 text-3xl font-medium">
            AI Scan + Virtual Consultation
          </p>
          <div className="flex items-center md:justify-end justify-center gap-5">
            <p className="text-lg text-gray-600 font-medium ">
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
      <div className=" md:w-1/2 w-full px-5 flex items-center justify-start ">
        <img src={image} alt="" loading="lazy" className="  w-[90%]" />
      </div>
    </div>
  );
};

export default LandingAiScan;
