import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const TopNav = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [activeLink, setActiveLink] = useState(location.pathname); // Track active link

  const btnData = [
    { title: "Home", route: "/" },
    { title: "Derma", route: "/derma" },
    // { title: "How It Works", route: "/how-it-works" },
    // { title: "Education", route: "/education" },
    { title: "About Us", route: "/about" },
    // { title: !userName && "Sign in", route: "/login" },
    // add the logout button
    // { title: userName && "Sign out", route: "/logout" },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setBgColor("bg-white shadow-md");
      } else {
        setBgColor("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (route) => {
    setActiveLink(route);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`${bgColor} flex items-center justify-between h-[85px] py-3 transition-colors duration-300 w-full container`}
    >
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12" />
        <p
          className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-32 font-bold"
          onClick={() => handleNavigation("/")}
        >
          SMLYX
        </p>
      </div>
      {/* Large screen links */}
      <div className="hidden lg:flex items-center justify-center gap-1">
        {btnData.map((btn, index) => (
          <p
            onClick={() => handleNavigation(btn.route)}
            key={index}
            className={`text-heading px-6 py-2 font-medium cursor-pointer relative group transition-all duration-300 ease-in-out ${
              activeLink === btn.route
                ? "text-primarybg"
                : "hover:text-primarybg"
            }`}
          >
            {btn.title}
            {activeLink === btn.route && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primarybg"></span>
            )}
          </p>
        ))}

        {!localStorage.getItem("token") && (
          <button
            className="bg-white rounded-full px-6 py-2 text-primarybg font-medium cursor-pointer"
            onClick={() => handleNavigation("/login")}
          >
            Sign In
          </button>
        )}
        {/* {!userName && (
          <button
            className="bg-white rounded-full px-6 py-2 text-primarybg font-semibold cursor-pointer"
            onClick={() => handleNavigation("/login")}
          >
            Sign In
          </button>
        )} */}
        {localStorage.getItem("token") && (
          <button
            className="bg-white rounded-full px-6 py-2 text-primarybg font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
        {/* {userName && (
         
        )} */}
        <button
          className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold cursor-pointer"
          onClick={() => handleNavigation("/dashboard")}
        >
          My Account
        </button>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={handleMenuToggle}
          className="text-primary focus:outline-none"
        >
          {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[85px] right-4 w-[90%] bg-heading shadow-md lg:hidden z-50 h-auto rounded-md">
          <div className="flex flex-col items-center py-4">
            {btnData.map((btn, index) => (
              <p
                onClick={() => {
                  handleNavigation(btn.route);
                  setIsOpen(false);
                }}
                key={index}
                className={`text-white px-6 py-2 font-medium cursor-pointer w-52 text-center relative group transition-all duration-300 ease-in-out ${
                  activeLink === btn.route
                    ? "bg-primarybg text-white rounded"
                    : "hover:bg-primarybg hover:text-white hover:rounded-md"
                }`}
              >
                {btn.title}
              </p>
            ))}
            {!localStorage.getItem("token") && (
              <button
                className="bg-white rounded-full px-6 py-2 text-primarybg font-semibold cursor-pointer"
                onClick={() => handleNavigation("/login")}
              >
                Sign In
              </button>
            )}
            {localStorage.getItem("token") && (
              <button
                className=" rounded-full px-6 py-2 text-white font-medium cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            )}
            {/* {userName && (
              <button
                className="bg-white rounded-full px-6 py-2 text-primarybg font-semibold cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            )} */}
            <button
              className="bg-primarybg rounded-full px-6 py-2 text-white font-semibold mt-2"
              onClick={() => handleNavigation("/dashboard")}
            >
              My Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
