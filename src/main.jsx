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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  // children: [
  //   {
  //     path: "/",
  //     element: <Outlet />,
  //   },
  //   {
  //     path: "/protected",
  //     element: <PrivateRoute path="/protected" element={<ProtectedComponent />} />,
  //   },
  // ],
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
