import { useState } from "react";
import { Check, Users, Pen } from "lucide-react";

export default function Panel() {
  const [activeTab, setActiveTab] = useState("companies");

  const entities = {
    companies: [
      { name: "Blue Team", url: "www.blueteam.com", color: "bg-blue-600" },
      { name: "Red Team", url: "www.redteam.com", color: "bg-red-500" },
      { name: "Orange Team", url: "www.orangeteam.com", color: "bg-orange-400" },
      { name: "Purple Team", url: "www.purpleteam.com", color: "bg-purple-500" },
    ],
    authors: [
      { name: "Alex Writer", url: "alex@writingteam.com", color: "bg-green-600" },
      { name: "Sam Novelist", url: "sam@authorgroup.com", color: "bg-yellow-500" },
      { name: "Jordan Pen", url: "jordan@creatives.com", color: "bg-pink-400" },
      { name: "Taylor Script", url: "taylor@writershub.com", color: "bg-teal-500" },
    ],
  };

  const [companyToggles, setCompanyToggles] = useState(Array(entities.companies.length).fill(false));
  const [authorToggles, setAuthorToggles] = useState(Array(entities.authors.length).fill(false));

  const handleToggle = (index) => {
    if (activeTab === "companies") {
      const updated = [...companyToggles];
      updated[index] = !updated[index];
      setCompanyToggles(updated);
    } else {
      const updated = [...authorToggles];
      updated[index] = !updated[index];
      setAuthorToggles(updated);
    }
  };

  const currentData = activeTab === "companies" ? entities.companies : entities.authors;
  const currentToggles = activeTab === "companies" ? companyToggles : authorToggles;
  const TabIcon = activeTab === "companies" ? Users : Pen;

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-visible"
      style={{
        backgroundImage: "url('/assets/Panel.jpg')",

        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 z-0" />



      {/* Título principal */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight z-10 mb-8 relative">
        Panel
      </h1>

      {/* Contenedor de contenido */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-white w-[95%] sm:w-11/12 md:w-3/4 z-20 rounded-xl shadow-2xl px-4 sm:px-10 md:px-20 pb-10" style={{ top: "75%" }}>
        {/* Subtítulo */}
        <h2 className="text-indigo-700 text-center text-2xl sm:text-3xl underline font-bold my-8">
          Entities
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            {["companies", "authors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-6 py-2 rounded-md font-medium transition-all duration-300 relative
                  ${activeTab === tab
                    ? "bg-indigo-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute inset-0 rounded-md animate-pulse-subtle bg-white opacity-10"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla de datos */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden text-sm sm:text-base">
            <thead>
              <tr className="text-white">
                <th className="w-1/2 px-4 py-4 text-xl text-center font-semibold bg-indigo-700">
                  <div className="flex items-center justify-center gap-2">
                    <TabIcon size={20} />
                    <span className="capitalize">{activeTab}</span>
                  </div>
                </th>
                <th className="w-1/2 px-4 py-4 text-xl text-center font-semibold text-indigo-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white`}>
                      <TabIcon size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.url}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${currentToggles[idx] ? "bg-green-500" : "bg-gray-300"}`}></span>
                        <span className={`text-sm ${currentToggles[idx] ? "text-green-600" : "text-gray-500"}`}>
                          {currentToggles[idx] ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Toggle switch */}
                      <button
                        onClick={() => handleToggle(idx)}
                        className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 ${
                          currentToggles[idx] ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                        aria-label={currentToggles[idx] ? "Disable" : "Enable"}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            currentToggles[idx] ? "translate-x-6" : ""
                          } flex items-center justify-center`}
                        >
                          {currentToggles[idx] && <Check size={12} className="text-indigo-600 opacity-80" />}
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Total {activeTab}</p>
            <p className="text-2xl font-semibold text-indigo-700">{currentData.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">Active {activeTab}</p>
            <p className="text-2xl font-semibold text-indigo-700">
              {currentToggles.filter(Boolean).length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
