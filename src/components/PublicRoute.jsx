import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { AuthContext } from "../../hook/AuthContext";
const PublicRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
