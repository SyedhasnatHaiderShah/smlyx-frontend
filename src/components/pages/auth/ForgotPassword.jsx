import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useForm } from "react-hook-form";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setFormData(data);
    console.log(data);
  };
  return (
    <div className=" flex items-center justify-center h-screen flex-col bg-[#eeeeee] gap-5 w-full">
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
      <div className=" flex items-center justify-center flex-col  gap-5 w-[420px] h-52 rounded-3xl bg-white">
        <form
          action="submit"
          className="flex items-center justify-center flex-col gap-5 w-full h-full px-10"
        >
          <p className=" text-[#a53794] text-2xl font-semibold text-center">
            Forgot Password
          </p>
          <div className=" flex items-center justify-center gap-1 flex-col w-full">
            <label
              htmlFor="email"
              className=" float-left mr-auto font-semibold"
            >
              Email ID
            </label>
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
          <button
            type="submit"
            className=" bg-[#484691] text-white text-base font-bold hover:opacity-90  px-12 py-2 rounded-full "
            // disabled={!errors.email && !errors.password ? true : false}
            onClick={handleSubmit(onSubmit)}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
