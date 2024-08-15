import React from "react";
import TopNav from "../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
// import the brand logos
import image1 from "./assets/one.jpg";
import image2 from "./assets/two.jpg";
import image3 from "./assets/three.jpg";
import DermaAccordion from "../../utils/DermaAccordion";

const FAQ = () => {
  const [showMore, setShowMore] = React.useState(false);
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const handleShowMoreClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const faqData = [
    {
      title:
        "Can CureSkin arrange for a face-to-face consultation with the dermatologist?",
      detail:
        "No, we offer emergency chat consultation only if you’re already on your regimen. We don’t provide face to face consultation with the Dermatologist otherwise.Please chat with us on the app regarding your concerns and your Dermatologist will get in touch with you on priority over chat.",
    },
    {
      title:
        "How can the Dermatologist suggest treatment without seeing me in person?",
      detail:
        "Answering a few questions on your medical history and uploading clear photos on the App will help our Dermatologists in accurate diagnosis and to provide you with efficient treatment just as you would if you had met them personally. Skin clinic visits can often be time consuming and expensive. Choose the smarter way instead!",
    },
    {
      title:
        "Can I speak to a CureSkin Skin Advisor before buying the regimen?",
      detail:
        "Yes! If you wish to speak with our Skin Advisor regarding your regimen, Call us on 080-4709-5853, Monday to Saturday between 10AM and 7 PM.",
    },
    {
      title:
        "I don't have any serious skin or hair issues yet, can I still go for the treatment?",
      detail:
        "Yes, even if you don’t have a particular skin or hair problem, you can get a personalised hair / skin care regimen that suits your skin type to maintain a healthy skin and hair.",
    },
    {
      title: "What will my treatment kit include?",
      detail:
        "A typical CureSkin Skin Kit contains a combination of 4 products.",
      extra: [
        {
          extraDetail: "Cleansing Agent: Helps clean your skin gently.",
        },
        {
          extraDetail: " Sun Protection Cream: Helps avoid sun damage.",
        },
        {
          extraDetail: "Repair Product: Helps fix your skin concerns.",
        },
        {
          extraDetail: "Hydrant: Helps keep your skin moisturised.",
        },
      ],
    },
    {
      title: "Can I consult Dermatologist regarding my treatment plan?",
      detail:
        "Your treatment plan is carefully curated by one of our Dermatologist after analysing your skin/hair concerns to ensure good improvement. Regular follow-ups are done by the same Dermatologist to check if you’ve met progress. Despite this, if you wish to consult your Dermatologist, inform your skin advisor about it, and the Dermatologist will get in touch with you through the App on priority.",
    },
    {
      title: "How soon will I see results?",
      detail:
        "Your treatment plan is carefully curated by a Dermatologist to ensure 100% noticeable improvements. If you have not observed any positive difference after following your regimen as instructed, worry not! Our Dermatologists will regularly follow-up on your case to modify your regimen accordingly. Start following your upgraded regimen to see improvements. Good things need time and patience.",
    },
    {
      title: "What if I face adverse reaction to the treatment?",
      detail:
        "CureSkin Hair and Skin Products are 100% safe if used under the guidance of your Dermatologist. But, if you have faced an allergic reaction or noticed a side effect after starting your treatment, pause your treatment immediately and inform your Skin Advisor about your concerns on chat. Upload clear photos of the affected area, your Dermatologist will make necessary changes to your treatment plan and guide you.",
    },
    {
      title: "I am pregnant, can I take/continue the treatment?",
      detail:
        "Pause your regimen immediately! Inform Skin Advisors about your situation on chat. Wait for your Dermatologist to make necessary changes to your treatment plan. Note: It is always better to discuss with your doctor about your pregnancy planning to get a safe treatment that can be used even during your pregnancy period.",
    },
    {
      title: "I am unwell, should I continue my treatment?",
      detail: "Stop all your treatment immediately if you’ve fallen sick!",
    },
    {
      title: "What is CureSkin's regimen? How does it work?",
      detail:
        "CureSkin’s regimen is a treatment plan curated by a Dermatologist for your skin type and concern, after carefully analysing your photos and details.",
    },
    {
      title: "What after my treatment ends?",
      detail:
        "Once your concern gets solved, your dermatologist will suggest a maintenance routine with certain products ensuring that your skin/hair remains healthy for the long term as well.",
    },
  ];
  return (
    <div className=" container h-full  py-10  w-full flex items-center  justify-center gap-10  px-5 flex-col ">
      <div className="font-bold flex items-center justify-center gap-5 w-full flex-col ">
        <p className=" text-heading break-words  text-5xl font-semibold text-center ">
          FAQs
        </p>
        <p className=" text-center text-primary font-bold text-2xl ">
          {/* Solutions by Smlyx */}
        </p>
      </div>
      <div className=" w-full md:w-2/3">
        <DermaAccordion data={faqData} />
      </div>
      {/* <div className=" w-full p-5 gap-3  flex items-baseline justify-center flex-wrap ">
        {brandData.map((item, index) => (
          <div
            key={index}
            className=" w-full sm:w-5/12 md:w-4/12 lg:w-3/12  flex items-start justify-start flex-col gap-5 p-5 shadow-md hover:shadow-lg rounded-lg transition-all duration-200 ease-in-out min-h-[420px]  "
          >
            <img
              src={item.img}
              alt="brand logo"
              className=" w-full object-cover object-center rounded-md"
              loading="lazy"
            />
            <p className=" text-gray-700 text-2xl  font-bold">{item.title}</p>
            <p className="text-gray-500 text-base font-medium">
              {expandedIndex === index
                ? item.detail
                : `${item.detail.slice(0, 100)}...`}
              <span
                className="italic font-bold hover:underline px-2 cursor-pointer text-sm text-primarybg"
                onClick={() => handleShowMoreClick(index)}
              >
                {expandedIndex === index ? "Show Less" : "Show More..."}
              </span>
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FAQ;
