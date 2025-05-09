import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Panel() {
  const authors = [
    {
      team: "Blue Team",
      url: "www.blueteam.com",
      color: "bg-blue-600",
    },
    {
      team: "Red Team",
      url: "www.redteam.com",
      color: "bg-red-500",
    },
    {
      team: "Orange Team",
      url: "www.orangeteam.com",
      color: "bg-orange-400",
    },
    {
      team: "Purple Team",
      url: "www.purpleteam.com",
      color: "bg-purple-500",
    },
  ];

  const [checked, setChecked] = useState([false, false, false, false]);

  const handleToggle = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white overflow-visible"
      style={{
        backgroundImage: "url('/assets/Panel.jpg')",
        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Titulo Principal */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight z-10">
        Panel
      </h1>

      {/* cuadro blanco */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2
        bg-white w-[95%] sm:w-11/12 md:w-3/4 z-20 rounded-xl shadow-2xl px-4 sm:px-10 md:px-20 pb-10"
        style={{ top: "75%" }}
      >

        {/* Titulo Secundario */}
        <h2 className="text-indigo-700 text-center text-2xl sm:text-3xl underline font-bold my-8">
          Entities
        </h2>

        {/* Tabla de companies */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden text-sm sm:text-base">
            <thead>
              <tr className="text-white">
                <th className="w-1/2 px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-center font-semibold bg-indigo-700">
                  Companies
                </th>
                <th className="w-1/2 px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-center font-semibold text-indigo-700">
                  Authors
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {authors.map((item, idx) => (
                <tr key={idx} className="border-b">
                  {/* Nombre y correo */}
                  <td className="px-2 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-indigo-600 text-sm sm:text-base"
                    />
                    <div>
                      <p className="font-medium">{item.team}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {item.url}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      {/* Círculo de color */}
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${item.color}`}
                      ></div>

                      {/* Checkbox tipo switch */}
                      <button
                        onClick={() => handleToggle(idx)}
                        className={`w-10 h-5 sm:w-11 sm:h-6 rounded-full cursor-pointer relative transition-colors duration-300 ${
                          checked[idx] ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                            checked[idx] ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
