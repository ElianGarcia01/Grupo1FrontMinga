import React from 'react';
import FormSignUp from '../componentes/singup';
import aldea from "../src/assets/aldea.jpg"

const pageSingUp = () => {

    return (


        <div className="flex min-h-screen">
            <div
                className="hidden md:block w-1/2  min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${aldea})` }}
            ></div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
            <FormSignUp></FormSignUp>

            </div>

        </div>

    )
}
export default pageSingUp;