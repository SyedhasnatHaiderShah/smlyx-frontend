// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dependentsReducer from "./slices/dependentsSlice";
import currentUserSlice from "./slices/currentUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dependents: dependentsReducer,
    currentUser: currentUserSlice,
  },
});
