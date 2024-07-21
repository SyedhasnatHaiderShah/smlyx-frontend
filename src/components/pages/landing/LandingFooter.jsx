import React from "react";
import "./landingevolution.css";
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
    <div className=" flex items-center justify-center flex-col w-full  md:min-h-[60vh]h-full lg:px-10 py-10 sm:py-16 md:py-20  px-5 bg-[#fafafa] gap-10">
      {/* first half */}
      <div className="  w-full flex flex-col sm:flex-row items-center justify-around gap-5 flex-wrap">
        <div className="h-48 sm:w-72 w-full px-5 flex md:items-start items-center md:justify-start justify-center">
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

        <div className="  min-h-48 sm:w-72 w-full flex lg:items-start lg:justify-start items-center justify-center flex-wrap md:gap-10 gap-5">
          <div className="flex items-start justify-start flex-col w-full">
            {footerData1.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-start gap-5 py-3 w-full"
              >
                <GoDotFill color="#3fbbeb" />
                <p className="text-base text-gray-600 font-medium cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="  sm:w-72 h-48 w-full flex lg:items-start lg:justify-start items-center justify-center flex-wrap md:gap-10 gap-5">
          <div className="flex items-start justify-start flex-col w-full">
            {footerData2.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-start gap-5 py-3 w-full"
              >
                <GoDotFill color="#3fbbeb" />
                <p className="text-base text-gray-600 font-medium cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className=" sm:w-72 h-48 w-full flex lg:items-start lg:justify-start items-center justify-center flex-wrap md:gap-10 gap-5">
          <div className="flex items-start justify-start flex-col w-full">
            {footerData3.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-start gap-5 py-3 w-full"
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

      {/* second half */}
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
