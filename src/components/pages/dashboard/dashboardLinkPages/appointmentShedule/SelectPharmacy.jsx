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
  const [pharmacies] = useState([
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

  // Real-time search logic
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = pharmacies.filter((pharmacy) =>
        pharmacy.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPharmacies(filtered);
    } else {
      setFilteredPharmacies([]);
    }
  };

  const handleClearInput = () => {
    setSearchQuery("");
    setFilteredPharmacies([]);
  };

  const savePharmacy = (pharmacy) => {
    setFormData((prevData) => ({
      ...prevData,
      pharmacyName: pharmacy.name,
      pharmacyState: pharmacy.state,
      pharmacyCity: pharmacy.city,
      pharmacyZip: pharmacy.zip,
    }));
    goNext();
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
            onSubmit={(e) => e.preventDefault()}
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
                    onChange={handleSearch}
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
              </div>
            </div>

            {/* Display filtered pharmacies */}
            {filteredPharmacies.length > 0 && (
              <div className="mt-5 w-full">
                <h3 className="text-lg font-semibold text-gray-700">
                  Results:
                </h3>
                <div className="border p-5 w-full bg-[#f2f2f2] flex items-center justify-center flex-wrap rounded-md">
                  {filteredPharmacies.map((pharmacy, index) => (
                    <div
                      className="flex-col w-96 bg-white p-5 rounded-lg m-1 gap-3"
                      key={index}
                    >
                      <div className="w-full flex items-center justify-between gap-2 my-3">
                        <p className="text-gray-800 font-semibold">
                          {pharmacy.name}
                        </p>
                        <button
                          className="px-5 py-2 rounded-full bg-primarybg text-white text-sm font-semibold"
                          onClick={() => savePharmacy(pharmacy)}
                        >
                          Select
                        </button>
                      </div>
                      <hr className="w-full" />
                      <div className="w-full flex items-center justify-between gap-2 my-3">
                        <p className="text-gray-600 text-sm font-semibold">
                          City: {pharmacy.city}
                        </p>
                        <p className="text-gray-600 text-sm font-semibold">
                          State: {pharmacy.state}
                        </p>
                      </div>
                      <hr className="w-full" />
                      <div className="w-full flex items-center justify-between gap-2 my-3">
                        <p className="text-gray-600 text-sm font-semibold">
                          {pharmacy.zip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && filteredPharmacies.length === 0 && (
              <div className="mt-5 w-full">
                <h3 className="text-lg font-semibold text-gray-700">
                  Results:
                </h3>
                <p className="text-gray-700">No pharmacies found.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectPharmacy;
