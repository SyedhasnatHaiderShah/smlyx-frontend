import React, { useState } from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SpaIcon from "@mui/icons-material/Spa";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./carousel.css";

const LandingRevolution = () => {
  const settings = {
    0: {
      items: 1,
    },
    769: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  };

  const tabData = [
    {
      title: "AI-Powered Diagnostics",
      content:
        "Utilize cutting-edge AI technology to improve the accuracy of diagnosing skin conditions. Our tools provide reliable insights, aiding in timely and precise treatment decisions.",
      icon: <SettingsSuggestIcon fontSize="large" />,
    },
    {
      title: "Business Automation",
      content:
        "Automate clinic operations with AI-driven tools to improve efficiency, reduce administrative burdens, and enhance overall patient experience.",
      icon: <BusinessIcon fontSize="large" />,
    },
    {
      title: "Personalized Treatment Plans",
      content:
        "Leverage AI to develop personalized treatment plans tailored to individual patient needs. Improve patient outcomes with targeted, data-driven care strategies.",
      icon: <PersonIcon fontSize="large" />,
    },
    {
      title: "Predictive Analytics",
      content:
        "Implement predictive analytics to anticipate patient needs and outcomes. Our AI solutions help tailor treatments to individual patients, enhancing personalized care.",
      icon: <AssessmentIcon fontSize="large" />,
    },
    {
      title: "Seamless Integration",
      content:
        "Easily integrate our AI diagnostic tools into your existing clinic workflow, ensuring minimal disruption and maximum efficiency.",
      icon: <IntegrationInstructionsIcon fontSize="large" />,
    },
    {
      title: "Enhanced Patient Care",
      content:
        "Improve patient care with AI-driven insights that support accurate diagnoses and effective treatment plans. Our tools empower dermatologists to provide superior care.",
      icon: <SpaIcon fontSize="large" />,
    },
    {
      title: "Enhanced Marketing Strategies",
      content:
        "Boost your clinic’s visibility and patient engagement with AI-enhanced marketing strategies. Utilize data-driven insights to optimize your marketing campaigns.",
      icon: <AutoAwesomeIcon fontSize="large" />,
    },
    {
      title: "Comprehensive Training and Support",
      content:
        "Ensure your team is well-equipped to use our AI tools with comprehensive training and support. We provide ongoing assistance to help you maximize the benefits of our solutions.",
      icon: <SupportAgentIcon fontSize="large" />,
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="py-20 w-full flex flex-col items-start justify-start gap-10 container px-5 ">
      <div className=" w-full flex items-center justify-center">
        <p className=" text-5xl font-bold text-heading text-center">
          Our AI-Powered Solutions
        </p>
      </div>
      <div className="w-full flex items-start justify-start flex-wrap gap-5">
        <OwlCarousel
          className="owl-theme"
          responsive={settings}
          loop={true}
          dots={true}
          autoplay={true}
          autoplayTimeout={4000}
          autoplaySpeed={1500}
          smartSpeed={1000}
          dotClass="owl-dot"
          dotsClass="owl-dots"
          dotContainerClass="owl-dot-container"
        >
          {tabData.map((item, index) => (
            <div
              className="w-full md:w-96 flex-col flex items-start justify-start gap-5 shadow-md rounded-xl p-5 hover:border hover:border-primarybg transform transition-all duration-300 ease-in-out min-h-52 bg-gradient-to-tr from-[#f5f5f5] to-[#fafafa]"
              key={index}
            >
              <div className="w-full flex items-center justify-center">
                <div className="w-1/3 flex items-center justify-center">
                  <p className="text-primarybg w-14 h-14 border-2 border-primarybg rounded-full flex items-center justify-center">
                    {item.icon}
                  </p>
                </div>
                <p className="text-xl font-bold text-[#605fa4] break-words w-2/3 flex items-center justify-center">
                  {item.title}
                </p>
              </div>
              <div className="w-full flex items-start justify-center gap-3 flex-col">
                <p className="w-full text-sm font-semibold text-zinc-500 leading-snug">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Watch Video
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="iframe-container">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/AYxY0YChWhY?si=xabRQQl22dWrFzBk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingRevolution;
