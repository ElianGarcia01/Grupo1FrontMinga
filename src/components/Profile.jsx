import React, { useState } from 'react';

const UserProfileEdit = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [joinDate, setJoinDate] = useState('');

    const handleDateChange = (e) => {
        setJoinDate(e.target.value);

    };

    const handleSave = () => {
        console.log('Saved:', { firstName, lastName, location, joinDate, imageUrl });
    };

    const handleDelete = () => {
        console.log('Account deleted');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="flex flex-col md:flex-row gap-12 max-w-4xl w-full">
                <div className="order-1 md:order-2 w-full md:w-[396px] h-auto md:h-[276px] flex flex-col items-center text-center">
                    <img
                        src={
                            imageUrl.trim()
                                ? imageUrl
                                : "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740"
                        }
                        alt="Profile"
                        className="w-[180px] h-[180px] object-cover rounded-full mb-4"
                    />

                    <h3 className="font-[Roboto] font-normal text-xl leading-none tracking-normal text-center text-black">
                        {firstName || lastName ? `${firstName} ${lastName}` : "Full Name"}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                        <i className="fa-solid fa-location-dot mr-1" />
                        {location || "Location"}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                        <i className="fa-solid fa-lock mr-1" />
                        {joinDate || "Birth Date"}
                    </p>
                </div>

            
                <div className=" w-[337px] h[453px] order-2 md:order-1 flex-1">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
                        placeholder="Last Name"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
                        placeholder="Location"
                    />
                    <input
                        type="date"
                        value={joinDate}
                        onChange={handleDateChange}
                        className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
                    />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border-b border-gray-400 p-2 mb-6 text-sm text-black focus:outline-none placeholder-gray-500"
                        placeholder="URL Profile Image"
                    />

                    <div className="flex flex-col items-center w-full"> 
                        <button
                            onClick={handleSave}
                            className="w-[280px] h-[68px] bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-2 rounded-full mb-4"
                        >
                            Save
                        </button>

                        <button
                            onClick={handleDelete}
                            className="w-[280px] h-[68px] bg-red-100 hover:bg-red-200 text-red-500 font-semibold py-2 rounded-full"
                        >
                            Delete Account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default UserProfileEdit;
