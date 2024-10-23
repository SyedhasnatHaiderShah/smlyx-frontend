// src/redux/slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  phone: "",
  receiveText: true,
  email: "",
  state: "",
  insurance: "",
  termsAndCondition: true,
  dentalInsuranceCarrier: "",
  patientRelation: "",
  subscriberFirstName: "",
  subscriberLastName: "",
  subscriberGender: "",
  subscriberDateOfBirth: "",
  subscriberId: "",
  employer: "",
  groupNo: "",
  subscriberAddress: "",
  subscriberCity: "",
  subscriberState: "",
  subscriberZip: "",
  country: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // Update state with the payload (POST request response data)
      return { ...state, ...action.payload };
    },
    resetUserData: (state) => {
      return { ...initialState };
    },
  },
});

export const { setUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
