import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

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
import DependentsHome from "./components/pages/dashboard/dependents/DependentsHome.jsx";
import WellnessScore from "./components/pages/dashboard/WellnesScore.jsx";
import Refferals from "./components/pages/dashboard/Refferals";
import Forms from "./components/pages/dashboard/Forms";
import Notes from "./components/pages/dashboard/Notes.jsx";
import VisitHistory from "./components/pages/dashboard/VisitHistory";
import Education from "./components/pages/dashboard/Education.jsx";
import Prescription from "./components/pages/dashboard/Prescription.jsx";
import Uploads from "./components/pages/dashboard/Uploads.jsx";
import SmartScan from "./components/pages/dashboard/dashboardLinkPages/SmartScan";
import SeeDentist from "./components/pages/dashboard/dashboardLinkPages/SeeDentist";
import AppointmentShedule from "./components/pages/dashboard/dashboardLinkPages/AppointmentShedule";
import Instruction from "./components/pages/dashboard/dashboardLinkPages/Instruction";
import PrivacyPractices from "./components/pages/others/PrivacyPractices";
import InstructionMultiForm from "./components/pages/dashboard/dashboardLinkPages/InstructionMultiForm";
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
    path: "/privacy-practices",
    element: <PrivacyPractices />,
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
        element: <DependentsHome />,
      },
      {
        path: "/dashboard/insurance-information",
        element: <InsuranceInformation />,
      },
      {
        path: "/dashboard/wellness-score",
        element: <WellnessScore />,
      },
      {
        path: "/dashboard/referrals",
        element: <Refferals />,
      },
      {
        path: "/dashboard/forms",
        element: <Forms />,
      },
      {
        path: "/dashboard/notes",
        element: <Notes />,
      },
      {
        path: "/dashboard/visit-history",
        element: <VisitHistory />,
      },
      {
        path: "/dashboard/education",
        element: <Education />,
      },
      {
        path: "/dashboard/prescription",
        element: <Prescription />,
      },
      {
        path: "/dashboard/uploads",
        element: <Uploads />,
      },
      {
        path: "/dashboard/smart-scan",
        element: <SmartScan />,
      },
      {
        path: "/dashboard/see-dentist",
        element: <SeeDentist />,
      },
      {
        path: "/dashboard/appointment-shedule",
        element: <AppointmentShedule />,
      },
      {
        path: "/dashboard/instruction",
        element: <Instruction />,
      },
      {
        path: "/dashboard/instruction-multiform",
        element: <InstructionMultiForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
