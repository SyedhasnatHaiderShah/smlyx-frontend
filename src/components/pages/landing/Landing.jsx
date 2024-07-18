import React from "react";
import LandingHome from "./LandingHome";
import LandingRevolution from "./LandingRevolution";
import LandingBrands from "./LandingBrands";
import LandingHowWorks from "./LandingHowWorks";
import LandingAiScan from "./LandingAiScan";
import LandingCustomers from "./LandingCustomers";

const Landing = () => {
  return (
    <div>
      <LandingHome />
      <LandingRevolution />
      <LandingBrands />
      <LandingHowWorks />
      <LandingAiScan />
      <LandingCustomers />
    </div>
  );
};

export default Landing;
