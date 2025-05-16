import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import inga from '/assets/inga.png';
import athor from '/assets/athor.jpg';

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRole === 'author') {
      navigate('/author');
    } else if (selectedRole === 'company') {
      navigate('/company');
    }
  }, [selectedRole, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar /> 

      <div className="pt-20 flex flex-col justify-center items-center p-4">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-normal text-violet-600 mb-4">Change to role</h4>
          <img
            src={inga}
            alt="Minga"
            className="mx-auto bg-gradient-to-r from-violet-700 to-blue-400 w-40 rounded-lg p-2"
          />
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Author Button */}
          <button
            onClick={() => setSelectedRole('author')}
            className={`w-full h-[86px] py-4 px-6 rounded-xl border-2 transition-all duration-200 flex items-center
              ${selectedRole === 'author'
                ? 'border-violet-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-700 bg-white'}`}
          >
            <div className="flex -space-x-3 mr-4">
              <img src={athor} alt="Author 1" className="w-10 h-10 rounded-full border-2 border-white z-0" />
              <img src={athor} alt="Author 2" className="w-12 h-12 rounded-full border-2 border-white z-10" />
              <img src={athor} alt="Author 3" className="w-10 h-10 rounded-full border-2 border-white z-0" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-medium text-violet-600">Join as an Author!</p>
              <p className="text-violet-600 text-sm">I'm a reader writing a manga</p>
            </div>
          </button>

          {/* Company Button */}
          <button
            onClick={() => setSelectedRole('company')}
            className={`w-full h-[86px] py-4 px-6 rounded-xl border-2 transition-all duration-200 flex items-center
              ${selectedRole === 'company'
                ? 'border-violet-600 bg-blue-50'
                : 'border-gray-200 hover:border-violet-600 bg-white'}`}
          >
            <div className="flex items-center w-full">
              <div className="flex -space-x-3 mr-4">
                <img src={athor} alt="Company 1" className="w-10 h-10 rounded-full border-2 border-white z-0" />
                <img src={athor} alt="Company 2" className="w-12 h-12 rounded-full border-2 border-white z-10" />
                <img src={athor} alt="Company 3" className="w-10 h-10 rounded-full border-2 border-white z-0" />
              </div>
              <div className="flex flex-col items-start">
                <p className="font-medium text-violet-600">Join as a Company!</p>
                <p className="text-violet-600 text-sm">I'm a company and I want to publish my comics</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
