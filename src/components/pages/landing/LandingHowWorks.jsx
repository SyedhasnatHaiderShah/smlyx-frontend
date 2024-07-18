import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image from "./assets/mobile.png";
import { GoDotFill } from "react-icons/go";

const cardData = [
  "Create your dental.com account",
  "Take and submit 5 photos - we'll show you how",
  "Get your score delivered in your secure, personalized patient portal",
  "Further questions? Meet virtually with a licensed dentist at your convenience",
];

const LandingHowWorks = () => {
  return (
    <div className=" container h-full md:h-screen py-28  w-full flex flex-col md:flex-row items-center justify-around gap-0 p-10  ">
      <div className=" md:w-1/2 w-full px-5 flex items-center justify-end ">
        <img src={image} alt="" loading="lazy" className=" w-full" />
      </div>
      <div className=" px-5 flex items-start justify-start flex-col gap-5 w-full  md:w-1/2">
        <p className=" text-gray-500 text-3xl font-medium">How It Works</p>
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-5 w-2/3"
          >
            <GoDotFill color={index === 1 ? "#7a4c97" : "#3fbbeb"} />
            <p className="text-lg text-gray-600 font-medium">{card}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingHowWorks;
