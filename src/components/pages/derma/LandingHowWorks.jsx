import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
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
    <div className=" container h-full py-20  w-full flex flex-col md:flex-row items-center justify-around gap-5 px-5 md:px-10  ">
      <div className=" md:w-1/2 w-full flex items-center md:justify-end justify-center ">
        <img src={image} alt="" loading="lazy" className=" w-full md:w-[90%]" />
      </div>
      <div className=" flex items-start justify-start flex-col gap-5 w-full  md:w-1/2">
        <p className=" text-gray-500 text-3xl font-medium w-full">
          How It Works
        </p>
        <div className="flex items-start justify-start flex-col flex-wrap gap-3 w-full">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex items-start justify-start gap-5 md:w-2/3 w-full"
            >
              <GoDotFill color={index === 1 ? "#7a4c97" : "#3fbbeb"} />
              <p className="md:text-lg text-sm text-gray-600 font-medium w-full">
                {card}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingHowWorks;
