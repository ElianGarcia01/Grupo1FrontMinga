import React, { useState } from 'react';
import dragonballZ from "../src/assets/dragonballZ.jpg"
import NavBarFooter from "./navbarfooter.jsx"

const Footer = () => {
    return (
        <div className="w-full bg-white relative mt-auto"> 

        
            <div className="w-full h-[337px] overflow-hidden relative">
                <img
                    src={dragonballZ}
                    alt="footer img"
                    className="w-full h-full object-cover"
                    style={{
                        clipPath: 'path("M0,60% L0,70% Q50% 100% 100% 70% L100% 0 Z")'
                    }}
                />
            </div>

            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
                <NavBarFooter />
            </div>

        </div>



    )
}
export default Footer;