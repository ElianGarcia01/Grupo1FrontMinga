import React from 'react';
import Login from '../componentes/singIn';
import aldea from "../src/assets/aldea.jpg"

const pageSingIn = () => {

    return (
      

        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Login></Login>
            </div>

            <div
                className="hidden md:block w-1/2  min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${aldea})`}}
            ></div>



        </div>

    )
}
export default pageSingIn;