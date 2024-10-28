import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { HiBell } from "react-icons/hi";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PopOver from "../../utils/PopOver";
import PopOverTwo from "../../utils/PopOverTwo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RightDrawer from "./../../utils/RightDrawer";
import UserManuDashboard from "../../utils/UserManuDashboard";
const DashboardNav = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const patientInfoData = [
    {
      head: "Patient Info",
      detail: [
        { title: "Wellness Score", route: "/dashboard/wellness-score" },
        { title: "Referrals", route: "/dashboard/referrals" },
        { title: "Uploads", route: "/dashboard/uploads" },
        { title: "Forms", route: "/dashboard/forms" },
        { title: "Notes", route: "/dashboard/notes" },
        { title: "visit History", route: "/dashboard/visit-history" },
        { title: "Education", route: "/dashboard/education" },
        { title: "Prescription", route: "/dashboard/prescription" },
      ],
    },
  ];
  const settingsData = [
    {
      head: "Setting",
      detail: [
        // { title: "Home", route: "/" },
        { title: "Profile Setting", route: "/dashboard/profile-setting" },
        { title: "Change Password", route: "/dashboard/change-password" },
        {
          title: "Billing Information",
          route: "/dashboard/billing-information",
        },
        { title: "My Dependents", route: "/dashboard/my-dependents" },
        { title: "Insurance", route: "/dashboard/insurance-information" },
        { title: "Sign Out", route: "#" },
      ],
    },
  ];
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("email")
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-[#eeeeee] flex items-center justify-between h-[85px] py-1  w-full px-5 md:px-10 ">
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12" />
        <p
          className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-32 font-bold"
          onClick={() => navigate("/dashboard")}
        >
          SMLYX
        </p>
      </div>

      <div className=" flex items-center justify-center gap-2">
        <div className=" md:flex hidden items-center justify-center">
          {/* large screen notification */}
          <PopOver />
        </div>
        {/* large screen links */}
        <div className="hidden md:flex items-center justify-center gap-5">
          <PopOverTwo
            // btn={btn}
            patientInfoData={patientInfoData}
          />
          <PopOverTwo
            // btn={btn}
            patientInfoData={settingsData}
          />
          {/* for user name to make the seprate look */}

          {localStorage.getItem("userName") ? (
            <div className=" flex items-center justify-center gap-0 cursor-pointer">
              <p
                // onClick={() => navigate(btn.route)}
                // key={index}
                className="text-[#983794] md:px-2 px-0 text-sm md:text-base   py-2 font-bold cursor-pointer relative group"
              >
                {/* <span className=" w-16 h-16 bg-heading text-white rounded-full">UN</span> */}
                {/* {userName} */}
                <div className=" w-full flex items-center justify-center ">
                  <UserManuDashboard />
                </div>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-[90%] flex items-center justify-center group-focus:w-[90%]"></span>
              </p>
              {/* {btn.icon && btn.icon} */}
            </div>
          ) : (
            <p
              // onClick={() => navigate(btn.route)}
              // key={index}
              className="text-[#983794] md:px-2 px-0 text-sm md:text-base   py-2 font-bold cursor-pointer relative group"
            >
              {/* <span className=" w-16 h-16 bg-heading text-white rounded-full">UN</span> */}
              no user found!
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-500 group-hover:w-[90%] flex items-center justify-center group-focus:w-[90%]"></span>
            </p>
          )}
          {/* <button className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold cursor-pointer">
            My Account
          </button> */}
        </div>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden flex items-center justify-between gap-3">
        <div className=" flex items-center justify-center">
          <PopOver />
        </div>
        <button
          onClick={handleMenuToggle}
          className="text-primary focus:outline-none"
        >
          {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 right-0 w-full min-h-72 bg-heading  shadow-md md:hidden p-5 gap-5">
          <div className="flex flex-col items-center py-4 gap-5">
            <div className=" flex items-center justify-center ">
              <PopOverTwo
                patientInfoData={patientInfoData}
                handleMenuToggle={handleMenuToggle}
              />{" "}
              {/* <ExpandMoreIcon className=" text-white" /> */}
            </div>
            <div className=" flex items-center justify-center ">
              <PopOverTwo
                patientInfoData={settingsData}
                handleMenuToggle={handleMenuToggle}
              />
              {/* <ExpandMoreIcon className=" text-white" /> */}
            </div>
            {/* 
      {btnData.map((btn, index) => (
              <p
                onClick={() => {
                  navigate(btn.route);
                  setIsOpen(false); 
                }}
                key={index}
                className="text-white px-6 py-2 font-medium cursor-pointer w-52 text-center relative group "
              >
                {btn.title}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-500 group-hover:w-[90%] group-focus:w-[90%]"></span>
              </p>
            ))} */}
            <button className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold mt-2">
              My Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
