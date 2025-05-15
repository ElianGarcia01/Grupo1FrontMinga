import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
