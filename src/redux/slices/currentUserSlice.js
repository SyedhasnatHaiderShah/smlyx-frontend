// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName"), // Default user name
  avatarUrl: "", // Default avatar
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
