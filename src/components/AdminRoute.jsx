import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user || user.email !== "administrador@gmail.com") {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
