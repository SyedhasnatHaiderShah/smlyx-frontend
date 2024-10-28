import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../redux/slices/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(" user :", user);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      const userData = response.data;
      const { access_token, ...remaining } = userData;
      if (remaining) {
        dispatch(setUserData(remaining));
      }
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("id", response.data?.id);
      localStorage.setItem("email", response.data?.email);
      localStorage.setItem("userName", response.data?.firstName);

      console.log(data);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      // setLoginError(error.response.data.message);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className=" flex items-center justify-center h-screen flex-col bg-[#eeeeee] gap-5 w-full px-5">
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
      {/* form */}
      <div className=" flex items-center justify-center flex-col  gap-5 md:w-[420px] w-full h-96 rounded-3xl bg-white">
        <form
          action="submit"
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-5 w-full h-full px-10"
        >
          <p className=" text-[#a53794] text-2xl font-semibold text-center">
            Sign in to your account
          </p>
          <div className=" flex items-center justify-center gap-1 flex-col w-full">
            <input
              type="email"
              placeholder="Email"
              className=" w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.email.message}
              </p>
            )}
          </div>
          <span
            className="cursor-pointer text-xs text-[#888897] font-bold float-right ml-auto hover:underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
          <div className=" flex items-center justify-center gap-1 flex-col w-full  ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className=" w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed 10 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.password.message}
              </p>
            )}
          </div>

          <span
            className="cursor-pointer text-xs text-[#888897] font-bold float-right underline italic ml-auto"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </span>
          <button
            type="submit"
            className=" bg-[#484691] text-white text-base font-bold hover:opacity-90  px-12 py-2 rounded-full "
            // disabled={!errors.email && !errors.password ? true : false}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </button>
        </form>
      </div>
      {/* footer */}
      <div>
        <p className=" font-semibold text-base text-gray-800">
          Don't have an account?
          <span
            className=" text-primarybg cursor-pointer underline px-2"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
