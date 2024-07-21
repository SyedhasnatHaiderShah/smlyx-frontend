import React, { useState } from "react";
import TopNav from "./../navbar/TopNav";
import lee from "./RichardLee.png";
import jackson from "./DrBillJackson.webp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LandingFooter from "./../landing/LandingFooter";

const About = () => {
  const [open, setOpen] = useState(false);
  const [selectedCeo, setSelectedCeo] = useState(null);

  const handleOpen = (ceo) => {
    setSelectedCeo(ceo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const ceoData = [
    {
      name: "Richard Lee",
      designation: "Chief Executive Officer",
      linkedin: "https://www.linkedin.com/in/richardslee",
      img: lee,
      detail:
        "Richard has 32 years of dental technology experience and is one of the dental industry’s most successful information technology entrepreneurs, having founded DentalXChange, Planet DDS, and Virtual Dental Care.DentalXChange is the industry’s leading connectivity company that launched the industry’s first internet-based, HIPAA compliant, real-time claims processing and eligibility verification system used by major insurance carriers.Planet DDS and its’ flagship product Denticon is the industry’s premier enterprise practice management system. As CEO, Richard guided the company to become the leading Cloud-Based Practice Management and Revenue Cycle Management company for DSO's. After successful exits with both companies, Richard founded Virtual Dental Care with Dr. Bill Jackson to continue their passion and mission to bring innovative technologies to the global healthcare community. Throughout his career, Richard has become known for his unique ability to successfully adapt new technologies into volatile markets. Richard has a passion for helping families and kids in the underserved communities and served as Chairman and currently a Board Director of Healthy Smiles for Kids of Orange County, the largest dental not-for-profit in Orange County, CA. To date Healthy Smiles for Kids has provide free dental services to over 800,000 kids and families in the Southern CA area.",
    },
    {
      name: "Dr. William Jackson",
      designation: "Chief Executive Officer",
      linkedin: "https://www.linkedin.com/in/williamjackson",
      img: jackson,
      detail:
        "Dr. Jackson is currently the co-founder and COO of Virtual Dental Care, Inc., a telehealth technology company founded in 2016. Bill practiced clinical dentistry for 10 years, while creating a small Knox-Keene licensed managed dental plan in Los Angeles, which was acquired by Prudential Healthcare in 1985. He became President of the Dental Division in 1990. In 1994, shortly after Blue Cross of California went public as Wellpoint Healthcare Networks, he was hired by Wellpoint to run their national dental division. In 1998, Bill left Wellpoint to start Dental Connect, the industry’s first real-time dental claims clearinghouse. The company later merged with DentalXChange, which grew to the largest real time clearinghouse in the industry. Upon the sale of DentalXChange in 2004, Bill helped start Planet DDS, Inc., the company that created the cloud-based dental practice management software, Denticon, which was focused on the needs of DSOs. Bill exited Planet DDS after its sale in 2017.",
    },
  ];

  return (
    <div className="container flex items-start justify-center gap-5 flex-col w-full">
      <TopNav />
      <div className="flex items-center justify-center flex-col gap-5 w-full mx-auto md:w-3/5 text-center md:py-16 py-8">
        <p className="text-3xl font-bold text-center w-full md:mb-8 mb-5">
          Meet the Founders
        </p>
        <p className="text-lg font-normal w-full text-center">
          Dental.com and Virtual Dental Care founders, Richard Lee and Dr.
          William Jackson, hold an impeccable track record in the dental
          technology space. In 1989, the duo created DentalXChange, the
          industry's largest real-time EDI claims clearinghouse. They then
          founded Planet DDS in 2003, the industry's first cloud-based
          enterprise dental practice management software.
          <br />
          <br />
          With the experience and know-how to build unique and strong products,
          Richard and Dr. Jackson set out to create technology to help
          facilitate dental care delivery to underserved populations.
        </p>
      </div>
      <div className="w-full md:w-2/3 mx-auto flex items-center justify-center md:my-10 my-5 flex-col md:flex-row gap-5 cursor-pointer">
        {ceoData.map((data, index) => (
          <div
            className="w-full flex items-center justify-center gap-5 flex-col"
            key={index}
            onClick={() => handleOpen(data)}
          >
            <img src={data.img} alt="" className="rounded-full w-36" />
            <p className="text-lg font-medium text-gray-950">{data.name}</p>
            <p className="text-lg font-medium text-gray-950">
              {data.designation}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-black text-black">Read Bio</p>
              <LinkedInIcon fontSize="medium" className="text-[#3b8dc6]" />
            </div>
          </div>
        ))}
      </div>
      {selectedCeo && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src={selectedCeo.img} alt="" className="rounded-full w-36" />
            <Typography variant="h6" component="h2">
              {selectedCeo.name}
            </Typography>
            <Typography variant="subtitle1">
              {selectedCeo.designation}
            </Typography>
            <Typography variant="body3" paragraph>
              {selectedCeo.detail}
            </Typography>
            <Button
              variant="contained"
              href={selectedCeo.linkedin}
              target="_blank"
              style={{
                color: "white",
                backgroundColor: "#3b8dc6",
              }}
            >
              LinkedIn Profile
            </Button>
          </Box>
        </Modal>
      )}
      {/* team */}
      <div className=" flex items-center justify-center flex-col w-full md:my-32 my-5 gap-10">
        <p className="  text-3xl font-semibold w-full text-center">Our Team</p>
        <p className=" text-lg   text-center md:w-1/2 w-full mx-auto">
          Meet the dental technology experts who work each day to make smlyx.com
          the best and most advanced teledentistry software on the market.
        </p>
      </div>
      {/* // footer */}
      <LandingFooter />
    </div>
  );
};

export default About;
