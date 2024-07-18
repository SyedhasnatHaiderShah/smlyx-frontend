import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";

// bg style
// bg-cover bg-center bg-no-repeat
const LandingRevolution = () => {
  return (
    <div className=" py-20  w-full flex flex-col md:flex-row items-center justify-center gap-10 ">
      <div className=" md:w-1/2 w-full  flex items-center justify-center flex-col  px-5">
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
      <div className=" md:w-1/2 w-full  flex items-center justify-center flex-col  px-5">
        <div className="iframe-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/AYxY0YChWhY?si=xabRQQl22dWrFzBk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LandingRevolution;
