import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Add react-icons for the hamburger menu and close icon

const TopNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const btnData = [
    { title: "How It Works", route: "#" },
    { title: "Education", route: "#" },
    { title: "About Us", route: "#" },
    { title: "Sign in", route: "#" },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-transparent flex items-center justify-between h-[85px] py-3 container px-5 ">
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12" />
        <p
          className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-32 font-bold"
          onClick={() => navigate("/")}
        >
          SMLYX
        </p>
      </div>
      {/* large screen links */}
      <div className="hidden md:flex items-center justify-center gap-1">
        {btnData.map((btn, index) => (
          <p
            onClick={() => navigate(btn.route)}
            key={index}
            className="text-heading px-6 py-2 font-medium cursor-pointer relative group"
          >
            {btn.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-500 group-hover:w-[90%] flex items-center justify-center group-focus:w-[90%]"></span>
          </p>
        ))}
        <button className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold cursor-pointer">
          My Account
        </button>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={handleMenuToggle}
          className="text-primary focus:outline-none"
        >
          {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[85px] left-5 w-[85%] bg-heading  shadow-md md:hidden">
          <div className="flex flex-col items-center py-4">
            {btnData.map((btn, index) => (
              <p
                onClick={() => {
                  navigate(btn.route);
                  setIsOpen(false); // Close the menu after navigating
                }}
                key={index}
                className="text-white px-6 py-2 font-medium cursor-pointer w-52 text-center relative group "
              >
                {btn.title}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-500 group-hover:w-[90%] group-focus:w-[90%]"></span>
              </p>
            ))}
            <button className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold mt-2">
              My Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
