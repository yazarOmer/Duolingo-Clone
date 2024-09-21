import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/landing/LandingPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
