import { Navigate, Outlet } from "react-router-dom";

export default function privateRoutes() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "");

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
