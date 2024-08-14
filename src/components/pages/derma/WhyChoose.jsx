import React from "react";
import TopNav from "../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image from "./assets/choose.webp";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import SupportIcon from "@mui/icons-material/Support";

const WhyChoose = () => {
  const tabData = [
    {
      title: "Cutting-edge AI technology customized for dermatology.",
      icon: <DashboardCustomizeIcon fontSize="large" />,
    },
    {
      title: "Proven advancements in diagnostic accuracy.",
      icon: <AdsClickIcon fontSize="large" />,
    },
    {
      title: "Comprehensive training and support for smooth implementation.",
      icon: <SupportIcon fontSize="large" />,
    },
  ];
  return (
    <div className=" container md:min-h-screen h-full  py-20 flex flex-col md:flex-row items-center justify-center gap-10 px-5 md:px-10   ">
      {/* left */}

      <div className=" flex items-center justify-center w-full md:w-3/5 flex-col  p-5">
        <div className=" flex items-start justify-start flex-col gap-5 w-full ">
          <div className="flex md:items-start md:justify-start items-center justify-center gap-5 w-full  flex-col ">
            <p className=" text-primary md:text-5xl font-bold  text-3xl">
              Why Choose Us?
            </p>
            <div className="flex items-center md:justify-start justify-center gap-5 w-full">
              <p className=" text-lg font-semibold text-[#8281b6]  ">
                Our specialized AI solutions and smart technology make
                dermatology clinics run better, helping you provide top-notch
                patient care with proven results. Choose Digitbite for advanced
                AI-driven diagnostic tools, personalized treatment plans, and
                comprehensive support tailored to dermatology clinics.
              </p>
            </div>
            {/* <button className=" bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90">
              Start Your Journey
            </button> */}
          </div>
          <div className=" w-full flex items-start justify-start ">
            <img src={image} alt="" loading="lazy" className="  w-full" />
          </div>
        </div>
      </div>
      {/* right */}

      <div className=" flex items-start justify-start flex-col w-full border p-5 shadow-xl rounded-xl md:w-2/5 ">
        {tabData.map((item, index) => (
          <div
            className=" w-full flex items-start justify-start gap-12 flex-col p-5"
            key={index}
          >
            <div className=" flex w-full items-start justify-start gap-3">
              <p className=" text-[#a53794]">{item.icon}</p>

              <p className=" md:text-lg text-base font-semibold text-[#8281b6] ">
                {item.title}
              </p>
            </div>
            <hr className={`${index === 2 ? "hidden" : "block"} w-full `} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
