import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const PrivateRoute = () => {
  const { user,loading } = useAuth();
  if (loading) {
    return <div>Cargando...</div>; 
  }


  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
