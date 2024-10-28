// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: localStorage.getItem("userName") || "",
  lastName: localStorage.getItem("lastName") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      // state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
