import React from "react";
// import the brand logos
import image from "./assets/three-step.jpg";

const SimpleStep = () => {
  return (
    <div className=" container h-full  py-10  w-full flex items-center md:items-start md:justify-start justify-center gap-10  px-5 flex-col ">
      <div className="font-bold flex items-center justify-center gap-5 w-full flex-col ">
        <p className=" text-heading break-words  text-5xl font-semibold text-center ">
          3 Simple Steps
        </p>
        <p className=" text-center text-primary font-bold text-2xl ">
          For Your Healthiest Skin Ever
        </p>
        <div>
          <img src={image} alt="" className=" w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SimpleStep;
