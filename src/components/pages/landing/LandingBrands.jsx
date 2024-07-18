import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image1 from "./assets/1.webp";
import image2 from "./assets/2.webp";
import image3 from "./assets/3.webp";
import image4 from "./assets/4.webp";
import image5 from "./assets/5.webp";
import image6 from "./assets/6.webp";

const brandData = [image1, image2, image3, image4, image5, image6];
const LandingBrands = () => {
  return (
    <div className=" container h-full py-28  w-full flex items-center justify-center gap-10 p-5 relative ">
      <div className=" min-h-52 h-full w-full border border-primary rounded-[50px]  flex items-center justify-center flex-wrap relative">
        {brandData.map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt="brand logo"
            className=" w-40 object-cover object-center"
            loading="lazy"
          />
        ))}
      </div>
      <div className=" absolute top-12  font-bold w-52 bg-white py-3 ">
        <p className=" text-primary bg-white w-72 text-xl font-semibold text-center absolute top-12 left-0  ">
          Inurance Partners
        </p>
      </div>
    </div>
  );
};

export default LandingBrands;
