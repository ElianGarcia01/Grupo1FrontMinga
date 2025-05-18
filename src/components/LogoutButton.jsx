import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/signin");
  };

  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) return null;

  return (
    <button
      onClick={handleLogout}
      className="fixed top-2 right-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md z-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
