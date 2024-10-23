import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useNavigate } from "react-router-dom";
import { countries } from "./countries.js";

// Load your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here");

const PaymentForm = () => {
  const [formData, setFormData] = useState({});
  const [cvc, setCvc] = useState("");
  // console.log(formData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  const expirationDate = watch("expirationDate", "");
  const cardNumber = watch("cardNumber", "");

  // Add slash automatically after two digits
  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setValue("expirationDate", value, { shouldValidate: true });
  };

  // Add spaces automatically after every 4 digits for card number
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    if (value.length > 4) {
      value = value.match(/.{1,4}/g).join(" ");
    }

    setValue("cardNumber", value, { shouldValidate: true });
  };

  const handleCVCChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    setValue("cvc", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    })); // Save the form data to state

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: data.cardholderName,
        email: data.email,
        address: {
          country: data.country,
        },
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Handle successful payment method creation
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#605fa4] w-full rounded-lg">
      <div className="container w-full flex items-center justify-center flex-col gap-3">
        <p
          className="text-gray-100 text-xl cursor-pointer font-semibold"
          onClick={() => navigate("/")}
        >
          Smlyx.com
        </p>
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 gap-3">
          <h2 className="text-2xl font-bold text-center mb-4">
            Enter payment details
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-3 flex-col"
          >
            <div className="flex items-center justify-start px-3 py-2 text-sm text-gray-500 font-semibold bg-[#f7f7f7] rounded-full border">
              <label htmlFor="email" className="w-16">
                Email
              </label>
              <input
                defaultValue={formData.email || ""}
                placeholder="Enter your email"
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="block w-full bg-gray-100 text-gray-500 placeholder:font-medium border-none outline-none rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-1"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-500">
                Save card information
              </label>
              {/* <CardElement
                className="p-2 border rounded-md"
                options={{ style: { base: { fontSize: "16px" } } }}
              /> */}
            </div>

            <div>
              <div className="relative">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-bold text-gray-500"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  {...register("cardNumber", { required: true })}
                  onChange={handleCardNumberChange}
                  value={cardNumber}
                  maxLength={19}
                  className="mt-1 block w-full outline-none border p-2 rounded-2xl rounded-b-none border-gray-300 placeholder:font-medium shadow-sm focus:ring-indigo-800 focus:border-primarybg font-semibold text-gray-500 px-3 relative"
                  required
                />
                <CreditCardIcon
                  fontSize="medium"
                  className="absolute right-5 sm:bottom-2 bottom-11 text-gray-500  "
                />
              </div>
              <div className="flex items-start justify-start w-full">
                <input
                  type="text"
                  placeholder="MM/YY"
                  {...register("expirationDate", {
                    required: true,
                    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  })}
                  onChange={handleExpirationDateChange}
                  className="block w-full outline-none border p-2 rounded-2xl rounded-r-none rounded-tl-none border-gray-300 placeholder:font-medium border-r-0 shadow-sm focus:ring-indigo-800 focus:border-primarybg font-semibold text-gray-500 px-3 relative"
                  maxLength="5"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  {...register("cvc", { required: true })}
                  onChange={handleCVCChange}
                  // value={cvc}
                  className="block w-full outline-none border p-2 rounded-2xl rounded-tr-none rounded-l-none border-l-0 border-gray-300 placeholder:font-medium shadow-sm focus:ring-indigo-800 focus:border-primarybg font-semibold text-gray-500 px-3 relative"
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="cardholderName"
                className="block text-sm font-bold text-gray-500"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                placeholder="Full Name on Card"
                {...register("cardholderName", { required: true })}
                className="mt-1 block w-full outline-none border p-2 rounded-full border-gray-300 placeholder:font-medium shadow-sm focus:ring-indigo-800 focus:border-primarybg font-semibold text-gray-500 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-500"
                htmlFor="country"
              >
                Country or region
              </label>
              <select
                id="country"
                {...register("country", { required: true })}
                className="block w-full rounded-full border-primarybg focus:ring-primarybg py-2 text-sm outline-primarybg focus:border-primarybg sm:text-sm px-3 font-semibold text-gray-500
                "
                required
              >
                {countries.map((country) => (
                  <option
                    key={country}
                    value={country}
                    className=" text-sm font-medium text-gray-500"
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 border p-5 rounded-lg flex flex-col gap-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("saveInfo")}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 block text-sm text-gray-500 font-bold">
                  Securely save my information for 1-click checkout
                </span>
              </label>
              <span className="ml-2 block text-sm text-gray-500 font-medium">
                Pay faster on Smlyx.com and anywhere link is accepted.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#605fa4] text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primarybg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out"
              disabled={!stripe}
            >
              Save card
            </button>
          </form>
          <p className="text-xs py-3 text-gray-500 font-medium break-words">
            By saving your payment information, you allow Smlyx.com to charge
            you for future payments in accordance with their terms.
          </p>
        </div>
      </div>
    </div>
  );
};

const BillingInformation = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default BillingInformation;
