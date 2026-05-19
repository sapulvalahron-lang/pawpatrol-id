import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PetRegistrationPage } from "./pages/PetRegistrationPage";
import { PetProfilePage } from "./pages/PetProfilePage";
import { LostFoundPage } from "./pages/LostFoundPage";

function PublicLayout() {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        Component: PublicLayout,
        children: [
          { index: true, Component: LandingPage },
          { path: "register-pet", Component: PetRegistrationPage },
          { path: "pet-profile", Component: PetProfilePage },
          { path: "pet-profile/:petSlug", Component: PetProfilePage },
          { path: "lost-found", Component: LostFoundPage },
          { path: "register", element: <Navigate to="/register-pet" replace /> },
          { path: "pet/:id", element: <Navigate to="/pet-profile" replace /> },
        ],
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "dashboard/all-pets",
        Component: DashboardPage,
      },
      {
        path: "dashboard/vaccinations",
        Component: DashboardPage,
      },
      {
        path: "dashboard/barangay-map",
        Component: DashboardPage,
      },
      {
        path: "dashboard/qr-generator",
        Component: DashboardPage,
      },
      {
        path: "dashboard/pet-owners",
        Component: DashboardPage,
      },
      {
        path: "dashboard/settings",
        Component: DashboardPage,
      },
    ],
  },
]);
