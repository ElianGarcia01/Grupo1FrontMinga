import React from "react";
import { Link } from 'react-router-dom';
import inga from "../src/assets/inga.png"

const Login = () =>{
    return(
        <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
         <div>
          <img
            src={inga}
            alt="Minga"
            className="bg-gradient-to-r from-black to-blue-400 w-40"
          />
        </div>      
        <form     
          className="bg-white px-8 py-6 w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome <span className="text-indigo-600">back</span>
          </h2>
            <p className="text-md mb-6 text-center text-gray-800">
            Discover manga, manhua and manhwa, track your progress, have fun,
            read manga
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full pr-10 pl-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="pepitoperes@example.com"
                required
              />  
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full pr-10 pl-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="password"
                required
              />     
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2
          px-4 rounded-xl transition duration-300 cursor-pointer mb-4"
          >
            Login
          </button>          
          <button className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 mb-4">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
          <p className="mt-6 text-center text-md text-gray-600">
            You don't have an account?
            <Link
              to="/"
              className="text-blue-500 font-bold hover:underline ms-2"
            >
              Sign Up here
            </Link>
          </p>          
          <p className="mt-2 text-center text-md text-gray-600">
            Go back to
            <Link
              to="/"
              className="text-blue-500 font-bold hover:underline ms-2"
            >
              Home Page
            </Link>
          </p>
        </form>
      </div>


    )

}
export default Login;