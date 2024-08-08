import React from "react";
import img from "../assets/opinion.svg";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Instruction = () => {
  const navigate = useNavigate();
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
              <div
                className=" flex items-start justify-start gap-3"
                key={index}
              >
                <div className=" w-9 h-9 bg-[#e0c84b] flex items-center justify-center rounded-full">
                  <ChevronRightIcon className=" text-white" />
                </div>

                <p
                  className=" text-sm font-semibold  text-gray-800 "
                  key={index}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
          <p className=" text-sm font-semibold  text-primarybg my-3 ">
            Your second opinion report will give supporting documentation
            regarding your specific case.
          </p>

          <button
            onClick={() => navigate("/dashboard/instruction-multiform")}
            className=" bg-[#605fa4] text-white w-1/3 py-2 rounded-full text-center "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
