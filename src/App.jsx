import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import SignInForm from './pages/SignIn'
import SignUpForm from './pages/SignUp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "signIn",
        element: <SignInForm />
      },
      {
        path: "signUp",
        element: <SignUpForm />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;
