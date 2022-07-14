import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const privateRoutes: FC = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default privateRoutes;
