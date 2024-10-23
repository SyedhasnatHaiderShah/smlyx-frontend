import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import InsuranceProfile from "./InsuranceProfile";
import InsuranceInfo from "./InsuranceInfo";
import { useForm } from "react-hook-form";
import MyDependents from "./MyDependents";
import EditInsurance from "./EditInsurance";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDependentsData } from "../../../../redux/slices/dependentsSlice";

const DependentsHome = () => {
  const dispatch = useDispatch();
  const userDependentsData = useSelector(
    (state) => state.dependents.dependents
  );
  console.log(userDependentsData);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  // add dependents here
  const [showAddDependents, setShowAddDependents] = useState(false);

  // edit state
  const [currentEditUserId, setCurrentEditUserId] = useState(null);

  // fetch user data
  const [userData, setUserData] = useState([]);
  // console.log(userData);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (data.haveInsurance === "Yes" && step < 2) {
      setStep(step + 1);
    } else {
      // console.log("Form submitted:", updatedData);
    }
  };

  const handleEdit = (userId) => {
    setCurrentEditUserId((prevUserId) =>
      prevUserId === userId ? null : userId
    );
  };

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

      // console.log(response.data);
      setUserData(response.data);
      dispatch(setDependentsData(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDependentsData();
  }, [showAddDependents, step, setCurrentEditUserId]);

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl px-5 min-h-screen gap-5">
      <div className="flex items-center justify-center w-full flex-col rounded-lg container my-5">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </span>{" "}
          / My Dependents
        </div>
        <div className="flex items-center justify-between w-full my-2">
          <div className=" flex items-start justify-start flex-col">
            <p className="text-3xl text-gray-900 font-medium mt-1 w-full">
              My Dependents
            </p>
            <p className="text-lg text-primarybg font-semibold w-full">
              Family Member's Profile
            </p>
          </div>

          <div className=" flex items-start  ">
            <button
              className=" text-white bg-primarybg px-7 font-bold py-2 rounded-full"
              onClick={() => setShowAddDependents(!showAddDependents)}
            >
              + Add Dependents
            </button>
          </div>
        </div>

        {/* show dependents form here */}
        <div className=" w-full">
          {showAddDependents && (
            <MyDependents setShowAddDependents={setShowAddDependents} />
          )}
        </div>
        <br />

        {/* fetch user data edit here */}
        <div className=" bg-white rounded-xl px-5 py-5 w-full">
          {userData.map((data) => (
            <div key={data.id} className=" flex flex-col w-full gap-5 ">
              <div
                className="flex items-center justify-between min-h-12 border p-5 font-bold cursor-pointer text-sm"
                onClick={() => handleEdit(data.id)}
              >
                <p className=" ">{data.firstName}</p>
                <div className=" flex items-center justify-end w-1/2 gap-1">
                  <div className=" px-5 py-1 bg-primarybg text-white rounded-full">
                    Edit
                  </div>
                  <HiChevronDown className=" text-primarybg text-xl" />
                </div>
              </div>
              {currentEditUserId === data.id && (
                // edit dependents component here
                <EditInsurance
                  fetchData={data}
                  setCurrentEditUserId={setCurrentEditUserId}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DependentsHome;
