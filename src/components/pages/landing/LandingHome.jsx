import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";

const LandingHome = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat w-full flex lg:items-start lg:justify-start items-center justify-center opacity-90"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className=" lg:w-1/2 w-full  flex items-center justify-center flex-col">
        <div className=" lg:w-2/3 w-full flex items-start justify-center flex-col gap-5">
          <p className="text-5xl font-extrabold text-heading leading-snug break-words">
            It's Time To Take Control Of Your Dental Health
          </p>
          <p className="text-xl font-medium text-heading leading-snug">
            Access all your dental needs in one location, anytime, anywhere.
          </p>
          <button className=" bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90">
            Start Your Journey
          </button>
          <p className=" text-primary underline text-base font-extrabold hover:opacity-90 cursor-pointer">
            See A Dentist Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingHome;
