import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

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

    validateToken();
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
