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
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
