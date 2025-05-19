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
import PageRol from "./pages/newRol.jsx";
import Profile from "./pages/Profile.jsx";
import Company from "./pages/edithCompany.jsx";
import ChapterEdit from "./pages/chapterEdit.jsx";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";

import CompanyForm from "./components/Forms/CompanyForm.jsx";
import AuthorForm from "./components/Forms/AuthorForm.jsx";
import MangaForm from "./components/Forms/MangaForm.jsx";
import ChapterForm from "./components/Forms/ChapterForm.jsx";

import AuthorCompany from "./pages/AuthorCompany";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandarLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "details/:id", element: <DetailsManga /> },

      // Rutas públicas accesibles para todos
      { path: "author", element: <AuthorForm /> },
      { path: "company", element: <CompanyForm /> },
      { path: "newrol", element: <PageRol /> },

      // Rutas protegidas para usuarios autenticados
      {
        element: <PrivateRoute />,
        children: [
          { path: "mangas", element: <Mangas /> },
          { path: "favourites", element: <Favourites /> },
          { path: "profile", element: <Profile /> },
          { path: "become-author", element: <AuthorCompany /> }, // O cambia a PageRol si AuthorCompany no existe
        ],
      },

      // Rutas exclusivas para admin
      {
        element: <AdminRoute />,
        children: [
          { path: "panel", element: <Panel /> },
          { path: "company", element: <Company /> },
          { path: "newManga", element: <MangaForm /> },
          { path: "newChapter", element: <ChapterForm /> },
          // { path: "editChapter", element: <ChapterEdit /> },
        ],
      },
    ],
  },

  // Rutas públicas solo si no está autenticado
  {
    element: <PublicRoute />,
    children: [
      { path: "/signin", element: <SignInForm /> },
      { path: "/signup", element: <SignUpForm /> },
    ],
  },
  { path: "editChapter", element: <ChapterEdit /> },

  // Ruta 404
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
