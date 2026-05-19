import { Navigate, Outlet, useLocation } from "react-router";
import { isAdminSessionActive } from "../data/adminSession";

export function ProtectedDashboard() {
  const location = useLocation();

  if (!isAdminSessionActive()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
