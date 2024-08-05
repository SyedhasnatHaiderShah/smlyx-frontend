import React from "react";
import LandingFooter from "./../landing/LandingFooter";
import TopNav from "./../navbar/TopNav";

const PrivacyPractices = () => {
  return (
    <div className=" w-full flex items-start justify-start flex-col">
      <TopNav />
      <div className=" w-full h-screen container">Privacy</div>
      <div className="w-full">
        <LandingFooter />
      </div>
    </div>
  );
};

export default PrivacyPractices;
