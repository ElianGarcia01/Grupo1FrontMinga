import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/NotFound";
import SignInForm from "./pages/SignIn";
import SignUpForm from "./pages/SignUp";
import Home from "./pages/Home";
import Mangas from "./pages/Mangas";
import StandarLayout from "./layouts/StandarLayout";
import Panel from "./pages/Panel";
import Favourites from "./pages/Favourites";
import DetailsManga from "./pages/DetailsManga";
import AuthorCompany from "./pages/AuthorCompany";
import PageRol from "./pages/newRol";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandarLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "details", element: <DetailsManga /> },
      { path: "company", element: <AuthorCompany /> },

      // Rutas protegidas
      {
        element: <PrivateRoute />,
        children: [
          { path: "mangas", element: <Mangas /> },
          { path: "panel", element: <Panel /> },
          { path: "favourites", element: <Favourites /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },

  // Rutas públicas solo si NO está autenticado
  {
    element: <PublicRoute />,
    children: [
      { path: "/signin", element: <SignInForm /> },
      { path: "/signup", element: <SignUpForm /> },
    ],
  },

  { path: "/newrol", element: <PageRol /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
