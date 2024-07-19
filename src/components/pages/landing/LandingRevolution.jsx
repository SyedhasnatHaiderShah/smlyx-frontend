import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";

// bg style
// bg-cover bg-center bg-no-repeat
const LandingRevolution = () => {
  return (
    <div className=" py-20  w-full flex flex-col md:flex-row items-center justify-center gap-10 container md:px-16 sm:px-10 px-5 ">
      {/* left */}
      <div className=" md:w-2/5 w-full  flex items-center justify-center flex-col  px-5">
        <div className=" w-full flex items-start justify-center flex-col gap-5">
          <p className="md:text-4xl text-2xl sm:text-3xl font-bold md:font-medium text-gray-500 leading-snug break-words">
            Revolutionize your dental care with a free AI dental scan
          </p>
          <p className="md:text-lg  text-base font-normal text-primary leading-loose">
            Get a clear picture of your oral health using your smart phone.
            After the scan you'll be able to review the results with a licensed
            dentist.
          </p>
          <div className="flex items-center gap-5 justify-center md:flex-row flex-col">
            <button className=" bg-primary font-bold text-white px-6 py-2 rounded-full hover:opacity-90">
              Start Now
            </button>
            <button className=" text-[#3b8dc6] border border-[#3b8dc6] rounded-full px-5 py-2 text-base font-extrabold hover:opacity-90 cursor-pointer">
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="md:w-3/5 w-full flex items-center justify-start px-5">
        <div className=" w-full">
          <div className="video-container">
            <iframe
              className="video-iframe"
              src="https://www.youtube.com/embed/AYxY0YChWhY?si=xabRQQl22dWrFzBk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingRevolution;
