import { createSlice } from "@reduxjs/toolkit";

// Initial state for dependents
const initialState = {
  dependents: [],
  currentUser: [],
  userName: localStorage.getItem("userName") || "",
  fileUrl: "",
  // Initialize with an empty array
};

export const dependentsSlice = createSlice({
  name: "dependents",
  initialState,
  reducers: {
    // Action to set all dependents
    setDependentsData: (state, action) => {
      state.userData = action.payload; // Replace dependents with the fetched data
    },
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.fileUrl = action.payload.fileUrl;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    // Action to add a single dependent
    addDependent: (state, action) => {
      state.dependents.push(action.payload); // Add new dependent to the array
    },

    // Action to update a specific dependent by ID
    updateDependent: (state, action) => {
      const index = state.dependents.findIndex(
        (dep) => dep.id === action.payload.id
      );
      if (index !== -1) {
        state.dependents[index] = {
          ...state.dependents[index],
          ...action.payload,
        };
      }
    },

    // Action to remove a dependent by ID
    removeDependent: (state, action) => {
      state.dependents = state.dependents.filter(
        (dep) => dep.id !== action.payload
      );
    },
  },
});

// Exporting the actions
export const {
  setDependentsData,
  setUser,
  setCurrentUser,
  addDependent,
  updateDependent,
  removeDependent,
} = dependentsSlice.actions;

export default dependentsSlice.reducer;
