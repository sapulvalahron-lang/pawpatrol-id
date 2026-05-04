import { createBrowserRouter, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PetRegistrationPage } from "./pages/PetRegistrationPage";
import { PetProfilePage } from "./pages/PetProfilePage";
import { LostFoundPage } from "./pages/LostFoundPage";

function PublicLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
          { path: "register", Component: PetRegistrationPage },
          { path: "pet/:id", Component: PetProfilePage },
          { path: "lost-found", Component: LostFoundPage },
        ],
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
    ],
  },
]);
