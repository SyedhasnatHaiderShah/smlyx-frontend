import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import "./landingevolution.css";
// import the brand logos
import image from "./assets/Testimonial.webp";
import { GoDotFill } from "react-icons/go";
import logo from "../../../assets/logo.png";

const LandingFooter = () => {
  // const footer links with routes "#"
  const footerData1 = [
    {
      title: "For Dental Practices & DSOs",
      route: "#",
    },
    {
      title: "For Mobile Dentistry",
      route: "#",
    },
    {
      title: "Start a Smart Scan",
      route: "#",
    },
    {
      title: "Contact Us",
      route: "#",
    },
  ];
  const footerData2 = [
    {
      title: "For Insurance Companies",
      route: "#",
    },
    {
      title: "See a Dentist Now",
      route: "#",
    },
    {
      title: "Terms and Conditions",
      route: "#",
    },
  ];
  const footerData3 = [
    {
      title: "For Public Health",
      route: "#",
    },
    {
      title: "Get a Second Opinion",
      route: "#",
    },
    {
      title: "Privacy Policy",
      route: "#",
    },
  ];
  return (
    <div className=" flex items-center justify-center flex-col w-full  md:h-[60vh]h-full lg:px-36 md:px-24 py-20 sm:px-16 px-10 bg-[#fafafa] gap-10">
      <div className="  w-full flex flex-col md:flex-row items-center justify-around gap-10">
        {/* left */}
        <div className=" md:w-1/4 w-full px-5 flex items-center md:justify-start justify-center">
          {/* logo */}
          <div className="flex items-center justify-center gap-3">
            <img src={logo} alt="logo" className="w-12" />
            <p
              className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-52 font-bold"
              onClick={() => navigate("/")}
            >
              SMLYX.com
            </p>
          </div>
        </div>

        {/* right */}
        <div className=" md:w-3/4 w-full flex lg:items-start lg:justify-start items-center justify-center flex-wrap gap-10">
          <div className="flex items-start justify-start flex-col">
            {footerData1.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-5 py-3"
              >
                <GoDotFill color="#3fbbeb" />
                <p className="text-base text-gray-600 font-medium cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-start flex-col">
            {footerData2.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-5 py-3 "
              >
                <GoDotFill color="#3fbbeb" />
                <p className="text-base text-gray-600 font-medium cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-start flex-col">
            {footerData3.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-5 py-3 "
              >
                <GoDotFill color="#3fbbeb" />
                <p className="text-base text-gray-600 font-medium cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="  text-center text-gray-800 font-semibold">
        <p>
          © 2024 smlyx.com. All Rights Reserved.
          <br />
        </p>
      </div>
    </div>
  );
};

export default LandingFooter;
