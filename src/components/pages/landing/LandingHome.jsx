import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import { useNavigate } from "react-router-dom";

// bg style
// bg-cover bg-center bg-no-repeat
const LandingHome = () => {
  const navigate = useNavigate();
  return (
    <div
      className="md:min-h-[90vh]  w-full flex lg:items-start lg:justify-start items-center justify-center py-20 "
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "cover",
        objectPosition: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: "0.9",
        // height: "100vh",
      }}
    >
      <div className=" lg:w-1/2 w-full  flex items-center justify-center flex-col  px-5">
        <div className=" lg:w-2/3 w-full h-full flex items-start justify-start  flex-col gap-5 px-5">
          <div className=" flex flex-col items-start justify-start gap-3 ">
            <p className="md:text-5xl text-xl sm:text-3xl font-extrabold text-heading !leading-tight break-words">
              It's Time To Take Control Of Your Dental Health
            </p>
            <p className="md:text-xl text-base font-medium text-heading !leading-snug">
              Access all your dental needs in one location, anytime, anywhere.
            </p>
          </div>

          <div className=" flex items-start justify-start flex-col gap-3 ">
            <button
              className=" bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90  transition-all duration-300 ease-in-out"
              onClick={() => navigate("/sign-up")}
            >
              Start Your Journey
            </button>
            <p
              className=" text-primary underline text-base font-extrabold hover:opacity-90 cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              See A Dentist Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingHome;
