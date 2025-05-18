
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const AuthorCompanyRoute = () => {
  const { user } = useAuth();

  if (!user || (user.role !== 1 && user.role !== 2)) {
    return <Navigate to="/newrol" replace />;
  }

  return <Outlet />;
};

export default AuthorCompanyRoute;
