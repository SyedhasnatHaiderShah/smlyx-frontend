import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image from "./assets/Testimonial.webp";
import { GoDotFill } from "react-icons/go";

const LandingTestimonial = () => {
  return (
    <div className=" container h-full py-20  w-full flex flex-col md:flex-row items-center justify-around gap-0  ">
      <div className="  w-full px-5 flex items-center justify-start ">
        <img src={image} alt="" loading="lazy" className="  w-[90%]" />
      </div>
    </div>
  );
};

export default LandingTestimonial;
