import React from "react";
import LandingHome from "./LandingHome";
import LandingRevolution from "./LandingRevolution";
import LandingBrands from "./LandingBrands";
import LandingHowWorks from "./LandingHowWorks";
import LandingAiScan from "./LandingAiScan";
import LandingCustomers from "./LandingCustomers";
import LandingTestimonial from "./LandingTestimonial";
import LandingFooter from "./LandingFooter";
import TopNav from "../navbar/TopNav";
import { motion, useScroll, useTransform } from "framer-motion";

const Landing = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 2]);

  return (
    <div className=" relative">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className=" bg-primarybg fixed w-full h-1 top-0 left-0 z-50"
      />
      <TopNav />
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
