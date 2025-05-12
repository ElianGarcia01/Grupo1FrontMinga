import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import SignInForm from "./pages/SignIn";
import SignUpForm from "./pages/SignUp";
import Home from "./pages/Home";
import Mangas from "./pages/Mangas";
import StandarLayout from "./layouts/StandarLayout";
import AuthLayout from "./layouts/AuthLayout";
import Panel from "./pages/Panel";
import Favourites from "./pages/Favourites";
import DetailsManga from "./pages/DetailsManga";
import AuthorCompany from "./pages/AuthorCompany"; // ✅ IMPORTADO

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandarLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "panel",
        element: <Panel />,
      },
      {
        path: "mangas",
        element: <Mangas />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "details",
        element: <DetailsManga />,
      },
      {
        path: "authorcompany", // ✅ NUEVA RUTA
        element: <AuthorCompany />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signIn",
        element: <SignInForm />,
      },
      {
        path: "signUp",
        element: <SignUpForm />,
      },
      
    ],
  },
  
    {
      path: "newrol",
      element: <PageRol/>,
    },
  
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
