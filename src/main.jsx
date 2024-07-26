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
import BillingInformation from "./components/pages/dashboard/BillingInformation.jsx";
import MyDependents from "./components/pages/dashboard/dependents/MyDependents.jsx";
import InsuranceInformation from "./components/pages/dashboard/InsuranceInformation";
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
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/dashboard/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/dashboard/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/dashboard/profile-setting",
        element: <ProfileSetting />,
      },
      {
        path: "/dashboard/billing-information",
        element: <BillingInformation />,
      },
      {
        path: "/dashboard/my-dependents",
        element: <MyDependents />,
      },
      {
        path: "/dashboard/insurance-information",
        element: <InsuranceInformation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
