import React from 'react';
import { NavLink } from 'react-router-dom';
import inga from "../../public/assets/inga.png";
import { FaFacebookF, FaTwitter, FaVimeoV, FaYoutube } from 'react-icons/fa';

const NavBarFooter = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
        
            <div className="flex justify-end pt-2">
                <div className="w-full sm:w-[221px] flex justify-between text-xl text-black">
                    <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
                    <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                    <FaVimeoV className="hover:text-blue-500 cursor-pointer" />
                    <FaYoutube className="hover:text-red-600 cursor-pointer" />
                </div>
            </div>


            <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
          
                <div className="order-1 sm:order-none flex gap-4 sm:gap-8 text-sm font-medium text-black w-full sm:w-[221px] justify-center sm:justify-start">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `hover:text-violet-600 ${isActive ? 'text-violet-600 font-bold' : 'text-black'}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `hover:text-violet-600 ${isActive ? 'text-violet-600 font-bold' : 'text-black'}`
                        }
                    >
                        Mangas
                    </NavLink>
                </div>

           
                <div className="order-first sm:order-none mx-auto sm:mx-0">
                    <img
                        src={inga}
                        alt="Minga"
                        className="bg-gradient-to-r from-violet-700 to-blue-400 w-40"
                    />
                </div>
                <div className="order-2 sm:order-none w-full sm:w-[221px] flex justify-center sm:justify-end">
                    <button className="w-full sm:w-[221px] h-[43px] bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-colors">
                        Donate <span>♡</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBarFooter;
