import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();


  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
