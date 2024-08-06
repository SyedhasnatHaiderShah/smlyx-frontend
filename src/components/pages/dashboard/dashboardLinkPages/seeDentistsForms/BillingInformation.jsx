import React from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here");

const PaymentForm = () => {
  const { register, handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data) => {
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
    <div className="flex items-center justify-center min-h-screen bg-[#605fa4] w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Enter payment details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Card Information
            </label>
            <CardElement
              className="p-2 border rounded-md"
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardholderName"
              className="block text-sm font-medium text-gray-700"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              {...register("cardholderName", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country or region
            </label>
            <select
              id="country"
              {...register("country", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="Pakistan">Pakistan</option>
              {/* Add more country options as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("saveInfo")}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 block text-sm text-gray-900">
                Securely save my information for 1-click checkout
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primarybg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={!stripe}
          >
            Save card
          </button>
        </form>
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
