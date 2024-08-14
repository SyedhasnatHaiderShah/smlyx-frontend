import React from "react";
import TopNav from "../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image1 from "./assets/one.jpg";
import image2 from "./assets/two.jpg";
import image3 from "./assets/three.jpg";

const FirstHand = () => {
  const brandData = [
    {
      img: image1,
      title: "Digital Therapeutics (DTx)",
      detail:
        "Nia Health’s expertise includes the development, market launch and continuous operation of scalable Digital Health Applications (DiGA). We meet the highest standards in quality management, data security and data protection. With regard to reimbursement options for DTx solutions, we have many years of experience and cooperate with a wide range of health insurance companies. Our solutions have already won numerous innovation awards.",
    },
    {
      img: image2,
      title: "Remote Patient Monitoring",
      detail:
        "Remote patient monitoring (RPM) opens up new opportunities for clinicians to assess patients’ conditions without having to be physically present in the same room. RPM means access to real-time medical information at a fingertip. Combined with Nia Health’s patient-centric solutions, this allows healthcare professionals to assess a patient’s condition from anywhere via PC or mobile devices. Thus, modifications within the treatment plan can be made in real time.",
    },
    {
      img: image3,
      title: "Digital Trial Tools",
      detail:
        "The requirements for combining, integrating and analysing complex data are growing: environmental factors, personal life circumstances as well as subjective concerns of the patient play an important role. Digital Trial Companions by Nia Health support clinical trials thanks to digital state-of-the-art data collection. The compliance of the study participants is increased through motivating interaction of our state-of-the-art clinical trial tools.",
    },
  ];
  return (
    <div className=" container h-full  py-10  w-full flex items-center md:items-start md:justify-start justify-center gap-10  px-5 flex-col ">
      <div className="font-bold flex items-center justify-center gap-5 w-full flex-col ">
        <p className=" text-heading break-words  text-5xl font-semibold text-center ">
          First-hand patient behavior insights make the difference!
        </p>
        <p className=" text-center text-primary font-bold text-2xl ">
          Solutions by Smlyx
        </p>
      </div>
      <div className=" w-full p-5 gap-3  flex items-baseline justify-center flex-wrap ">
        {brandData.map((item, index) => (
          <div
            key={index}
            className=" w-full sm:w-96  flex items-start justify-start flex-col gap-5 p-5 shadow-md hover:shadow-lg rounded-lg transition-all duration-200 ease-in-out "
          >
            <img
              src={item.img}
              alt="brand logo"
              className=" w-full object-cover object-center rounded-md"
              loading="lazy"
            />
            <p className=" text-gray-700 text-3xl  font-bold">{item.title}</p>
            <p className=" text-gray-500 text-base  font-medium">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstHand;
