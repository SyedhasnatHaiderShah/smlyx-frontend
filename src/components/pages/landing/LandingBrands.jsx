import React from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image1 from "./assets/1.webp";
import image2 from "./assets/2.webp";
import image3 from "./assets/3.webp";
import image4 from "./assets/4.webp";
import image5 from "./assets/5.webp";
import image6 from "./assets/6.webp";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const brandData = [image1, image2, image3, image4, image5, image6];
const LandingBrands = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { triggerOnce: false });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      ref={containerRef}
      className=" w-full items-center justify-center flex-col min-h-[50vh] "
    >
      <div className=" container h-full md:py-28 sm:py-16 py-10  w-full flex items-center justify-center gap-10 md:px-16 px-5 sm:px-10 relative ">
        <div className=" min-h-52 h-full w-full border border-primary rounded-[50px]  flex items-center justify-center flex-wrap relative">
          {brandData.map((brand, index) => (
            <motion.img
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                repeatType: "reverse",
                repeatDelay: 0.5,
                // repeat: Infinity,
                type: "spring",
                stiffness: 100,
                staggerChildren: index * 0.3,
              }}
              exit={{ opacity: 0, y: 100 }}
              key={index}
              src={brand}
              alt="brand logo"
              className=" w-40 object-cover object-center"
              loading="lazy"
            />
          ))}
        </div>
        <div className=" absolute top-12  font-bold w-52 bg-white py-3 ">
          <p className=" text-primary bg-white w-72 text-xl font-semibold text-center absolute md:top-12 -top-5 sm:top-0 md:left-0 -left-10  ">
            Inurance Partners
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingBrands;
