import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import { useNavigate } from "react-router-dom";

// Background style
const LandingHome = () => {
  const navigate = useNavigate();

  // Ref to track the container element
  const containerRef = useRef(null);

  // Determine if the container is in view
  const isInView = useInView(containerRef, { triggerOnce: false });

  return (
    <motion.div
      ref={containerRef}
      className="md:min-h-[90vh] w-full flex lg:items-start lg:justify-start items-center justify-center py-20"
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "cover",
        objectPosition: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: "0.9",
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lg:w-1/2 w-full flex items-center justify-center flex-col px-5">
        <div className="lg:w-2/3 w-full h-full flex items-start justify-start flex-col gap-5 px-5">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1,
            }}
            className="flex flex-col items-start justify-start gap-3"
          >
            <p className="md:text-5xl text-xl sm:text-3xl font-extrabold text-heading !leading-tight break-words">
              It's Time To Take Control Of Your Dental Health
            </p>
            <p className="md:text-xl text-base font-medium text-heading !leading-snug">
              Access all your dental needs in one location, anytime, anywhere.
            </p>
          </motion.div>

          <motion.div
            className="flex items-start justify-start flex-col gap-3"
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="bg-primary font-bold text-white px-5 py-3 rounded-full hover:opacity-90 transition-all duration-300 ease-in-out"
              onClick={() => navigate("/sign-up")}
            >
              Start Your Journey
            </motion.button>
            <p
              className="text-primary underline text-base font-extrabold hover:opacity-90 cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              See A Dentist Now
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingHome;
