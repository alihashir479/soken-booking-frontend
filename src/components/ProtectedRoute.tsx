import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const appContext = useContext(AppContext);
  return appContext?.isAuthenticated ? (<Outlet />) : (<Navigate to="/" replace />)
};
export default ProtectedRoute;
