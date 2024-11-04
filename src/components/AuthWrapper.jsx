import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setCurrentUser,
  setDependentsData,
} from "../redux/slices/dependentsSlice";
import { useDispatch } from "react-redux";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  // get the all dependents by id to call itself for all the dashboard
  const fetchDependentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dependents/getDependents/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data);
      dispatch(setCurrentUser());
      // dispatch(setDependentsData(response.data));
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch all the dependents

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // If no token, navigate to login
        navigate("/login");
        return;
      }

      try {
        // Verify token with the backend
        await axios.get("http://localhost:3000/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        // If token is invalid or expired, remove it and redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    // temperarily its removing to see the dashbaord
    validateToken();

    fetchDependentsData();
  }, [navigate]);

  return children;
};

export default AuthWrapper;

// import { jwtDecode } from "jwt-decode";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthWrapper = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard");
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return children;
// };

// export default AuthWrapper;
