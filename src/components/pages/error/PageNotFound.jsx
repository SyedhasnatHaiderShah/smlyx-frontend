import React from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center flex-col w-full  min-h-screen lg:px-36 md:px-24 py-20 sm:px-16 px-10 bg-[#fafafa] gap-10">
      {/* left */}
      {/* logo */}
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12" />
        <p
          className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-52 font-bold"
          onClick={() => navigate("/")}
        >
          SMLYX.com
        </p>
      </div>

      {/* right */}
      <div className="  w-full flex flex-col items-center justify-center  gap-10">
        <p className=" text-heading text-3xl font-bold">Page not found</p>
        <p className=" text-primarybg text-xl font-medium">Error 404</p>
        <p className=" text-primary text-base font-medium">
          Sory, the page you were looking for at this URL was not found.
        </p>
      </div>
      <div className="  text-center text-gray-800 font-semibold">
        <p>
          © 2024 smlyx.com. All Rights Reserved.
          <br />
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
