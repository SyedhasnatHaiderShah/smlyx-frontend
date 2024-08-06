import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const SelectPharmacy = ({ formData, setFormData, goBack, goNext }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [pharmacies, setPharmacies] = useState([
    {
      name: "Pharmacy New",
      state: "Alabama",
      city: "Birmingham",
      zip: "35201",
    },
    { name: "Pharmacy Old", state: "Alaska", city: "Juneau", zip: "99801" },
    { name: "Pharmacy C", state: "Arizona", city: "Phoenix", zip: "85001" },
    // Add more sample data here
  ]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const onSubmit = (data) => {
    // Perform your search logic here
    console.log("Search Data:", data);
    const { pharmacyName, state, city, zip } = data;

    const filtered = pharmacies.filter((pharmacy) => {
      return (
        (!pharmacyName ||
          pharmacy.name.toLowerCase().includes(pharmacyName.toLowerCase())) &&
        (!state || pharmacy.state === state) &&
        (!city || pharmacy.city === city) &&
        (!zip || pharmacy.zip === zip)
      );
    });

    setFilteredPharmacies(filtered);
    setFormData(data);
    setSearchPerformed(true); // Indicate that a search has been performed
  };

  const handleClearInput = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex items-start justify-start w-full md:w-2/3 xl:w-1/2 container px-5 py-10">
      <div className="flex items-start justify-start flex-col gap-2 w-full">
        <p className="text-2xl text-gray-800 font-semibold">
          Add a Preferred Pharmacy
        </p>
        <p className="text-lg text-primary font-semibold">
          Search a nearby pharmacy{" "}
          <span className="text-red-500 text-xl">*</span>
        </p>
        <div className="w-full flex items-start justify-start">
          <form
            className="w-full flex items-start justify-start flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-start justify-start md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="pharmacyName"
                  className="float-left mr-auto font-semibold"
                >
                  Pharmacy Name
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Enter pharmacy name"
                    className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                    value={searchQuery}
                    {...register("pharmacyName", {
                      required: "Pharmacy Name is required",
                    })}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={handleClearInput}
                    >
                      <ClearIcon fontSize="small" className=" text-primarybg" />
                    </button>
                  )}
                </div>
                {errors.pharmacyName && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.pharmacyName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5 flex-wrap">
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="state"
                  className="float-left mr-auto font-semibold"
                >
                  State <span className="text-red-500 text-xl">*</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("state")}
                >
                  <option value="">Select State</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="city"
                  className="float-left mr-auto font-semibold"
                >
                  City <span className="text-red-500 text-xl">*</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("city")}
                >
                  <option value="">Select City</option>
                  <option value="Birmingham">Birmingham</option>
                  <option value="Juneau">Juneau</option>
                  <option value="Phoenix">Phoenix</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="zip"
                  className="float-left mr-auto font-semibold"
                >
                  Zip <span className="text-red-500 text-xl">*</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("zip")}
                >
                  <option value="">Select Zip</option>
                  <option value="35201">35201</option>
                  <option value="99801">99801</option>
                  <option value="85001">85001</option>
                </select>
                {errors.zip && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.zip.message}
                  </p>
                )}
              </div>
              <div className="flex items-start justify-start w-full">
                <button
                  className="px-7 py-3 rounded-full bg-primarybg text-white text-base font-semibold"
                  type="submit"
                >
                  Search Pharmacy
                </button>
              </div>
            </div>
          </form>
        </div>
        {searchPerformed && filteredPharmacies.length > 0 && (
          <div className="mt-5 w-full">
            <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
            <ul className="list-disc pl-5">
              {filteredPharmacies.map((pharmacy, index) => (
                <li key={index} className="text-gray-700">
                  {pharmacy.name} - {pharmacy.city}, {pharmacy.state}{" "}
                  {pharmacy.zip}
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchPerformed && filteredPharmacies.length === 0 && (
          <div className="mt-5 w-full">
            <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
            <p className="text-gray-700">No pharmacies found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPharmacy;
