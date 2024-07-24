import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import all the components
import Layout from "./Layout.jsx";
import Landing from "./components/pages/landing/Landing.jsx";
import Login from "./components/pages/auth/Login.jsx";
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import PageNotFound from "./components/pages/error/PageNotFound";
import SignUp from "./components/pages/auth/SignUp";
import About from "./components/pages/about/About.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard";
import ChangePassword from "./components/pages/auth/ChangePassword.jsx";
import ProfileSetting from "./components/pages/dashboard/ProfileSetting";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/profile-setting",
    element: <ProfileSetting />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      // { path: "name", element: <name /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
