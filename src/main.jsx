import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import all the components
import LandingHome from "./components/pages/landing/LandingHome";
import TopNav from "./components/pages/navbar/TopNav.jsx";
import Layout from "./Layout.jsx";
import Landing from "./components/pages/landing/Landing.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      // {
      //   path: "/protected",
      //   element: <PrivateRoute path="/protected" element={<ProtectedComponent />} />,
      // },
    ],
  },
  // loader: rootLoader,
  // children: [
  //   {
  //     path: "team",
  //     element: <Team />,
  //     loader: teamLoader,
  //   },
  // ],
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
