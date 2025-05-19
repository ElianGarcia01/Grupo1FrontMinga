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
import ReaderPage from "./pages/ReaderPage.jsx";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";

import CompanyForm from "./components/Forms/CompanyForm.jsx";
import AuthorForm from "./components/Forms/AuthorForm.jsx";
import MangaForm from "./components/Forms/MangaForm.jsx";
import ChapterForm from "./components/Forms/ChapterForm.jsx";

// Importar el nuevo componente MangaList
import MangaList from "./components/MangaList.jsx";

import AuthorCompany from "./pages/AuthorCompany";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandarLayout />,
    children: [
      { path: "", element: <Home /> },
      // Rutas protegidas para usuarios autenticados
      {
        element: <PrivateRoute />,
        children: [
          { path: "mangas", element: <Mangas /> },
          { path: "manga-list", element: <MangaList /> }, // Nueva ruta para la lista de mangas con capítulos
          { path: "details/:id", element: <DetailsManga /> },
          { path: "reader", element: <ReaderPage /> }, // Ruta para leer sin parámetros
          { path: "reader/:chapterId", element: <ReaderPage /> }, // Ruta para leer con ID de capítulo
          { path: "newRol", element: <PageRol /> },
          { path: "author", element: <AuthorForm /> },
          { path: "company", element: <CompanyForm /> },
          { path: "profile", element: <Profile /> },
          { path: "favourites", element: <Favourites /> },
          { path: "newManga", element: <MangaForm /> },
          { path: "newChapter", element: <ChapterForm /> },
        ],
      },
      
      // Rutas exclusivas para admin
      {
        element: <AdminRoute />,
        children: [
          { path: "panel", element: <Panel /> },
          { path: "chapter-edit/:id", element: <ChapterEdit /> }, // Movido aquí si es solo para admin
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
  
  // Ruta 404
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;