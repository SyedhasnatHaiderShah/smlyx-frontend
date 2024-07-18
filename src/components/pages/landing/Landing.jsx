import React from "react";
import LandingHome from "./LandingHome";
import LandingRevolution from "./LandingRevolution";
import LandingBrands from "./LandingBrands";
import LandingHowWorks from "./LandingHowWorks";
import LandingAiScan from "./LandingAiScan";
import LandingCustomers from "./LandingCustomers";
import LandingTestimonial from "./LandingTestimonial";
import LandingFooter from "./LandingFooter";

const Landing = () => {
  return (
    <div>
      <LandingHome />
      <LandingRevolution />
      <LandingBrands />
      <LandingHowWorks />
      <LandingAiScan />
      <LandingCustomers />
      <LandingTestimonial />
      <LandingFooter />
    </div>
  );
};

export default Landing;
