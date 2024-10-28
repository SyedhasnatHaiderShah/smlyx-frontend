import React, { useEffect, useState } from "react";
import TopNav from "./../navbar/TopNav";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import DashboardMiddle from "./DashboardMiddle";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setDependentsData,
  setUser,
  addDependent,
  updateDependent,
  removeDependent,
  setCurrentUser,
} from "../../../redux/slices/dependentsSlice.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const currentDependents = useSelector((state) => state.dependents.dependents);
  console.log(currentDependents);

  const fetchDependentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dependents/getDependents/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDependentsData();
  }, []);
  // console.log(userName);

  return (
    <div className=" flex items-start justify-start flex-col w-full bg-[#eeeeee] min-h-screen">
      {/* <DashboardHeader title={userName || "User Name"} /> */}
      <DashboardHeader />
      <DashboardMiddle />
    </div>
  );
};

export default Dashboard;
