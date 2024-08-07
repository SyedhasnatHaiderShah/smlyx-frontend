import React from "react";
import img from "../assets/opinion.svg";
const Instruction = () => {
  const steps = [
    "Follow our guide to request your records or upload your own",
    "A licensed dentist will review your case",
    "Receive your second opinion report",
  ];
  return (
    <div className=" flex items-center justify-start flex-col p-5 bg-[#eeeeee] w-full min-h-screen  ">
      <div className=" w-full container flex flex-col">
        <p className=" text-3xl font-semibold text-gray-800 w-full mr-auto my-3">
          Get a Second Opinion
        </p>

        <div className=" flex items-center justify-start py-5 flex-col w-full bg-white min-h-96 rounded-lg gap-3 ">
          <img src={img} alt="" className=" w-44" />
          <p className=" text-xl font-semibold text-center text-gray-800">
            How it Works
          </p>
          <div className=" flex items-start justify-start  gap-3 flex-col">
            {steps.map((step, index) => (
              <p className=" text-sm font-semibold  text-gray-800 " key={index}>
                {step}
              </p>
            ))}
          </div>
          <p className=" text-sm font-semibold  text-primarybg my-3 ">
            Your second opinion report will give supporting documentation
            regarding your specific case.
          </p>

          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
