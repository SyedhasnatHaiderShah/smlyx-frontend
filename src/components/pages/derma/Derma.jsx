import React from "react";
import LandingHome from "./LandingHome";
import LandingRevolution from "./LandingRevolution";
import LandingHowWorks from "./LandingHowWorks";
import LandingAiScan from "./LandingAiScan";
import LandingTestimonial from "./LandingTestimonial";
import LandingFooter from "./LandingFooter";
import TopNav from "../navbar/TopNav";
import DermaCustomer from "./WhyChoose";
import WhyChoose from "./WhyChoose";
import Carousel from "./Carousel";
import FirstHand from "./FirstHand";

const Landing = () => {
  return (
    <div>
      <TopNav />
      <LandingHome />
      {/* <Carousel /> */}
      <LandingRevolution />
      <WhyChoose />
      <FirstHand />
      <LandingHowWorks />
      <LandingAiScan />
      <LandingTestimonial />
      <LandingFooter />
    </div>
  );
};

export default Landing;
