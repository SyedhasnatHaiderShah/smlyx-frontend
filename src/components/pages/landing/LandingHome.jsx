import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";

// bg style
// bg-cover bg-center bg-no-repeat
const LandingHome = () => {
  return (
    <div
      className="md:min-h-[90vh] h-full  w-full flex lg:items-start lg:justify-start items-center justify-center mt-20 py-20"
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
        <div className=" lg:w-2/3 w-full h-full flex items-center justify-center flex-col gap-5">
          <p className="md:text-5xl text-xl sm:text-3xl font-extrabold text-heading leading-snug break-words">
            It's Time To Take Control Of Your Dental Health
          </p>
          <p className="md:text-xl text-base font-medium text-heading leading-snug">
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
