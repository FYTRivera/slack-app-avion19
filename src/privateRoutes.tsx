import { Navigate, Outlet } from "react-router-dom";

interface pRprops {
  isLoggedIn: boolean;
}

const privateRoutes: React.FC<pRprops> = ({ isLoggedIn }) => {
  // const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "");

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default privateRoutes;
