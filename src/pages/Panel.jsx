import { useState, useEffect } from "react";
import { Check, Users, Pen } from "lucide-react";

export default function Panel() {
  const [activeTab, setActiveTab] = useState("companies");
  const [companies, setCompanies] = useState([]);
  const [authors, setAuthors] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const [companyRes, authorRes] = await Promise.all([
        fetch("http://localhost:8080/api/companies/active", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/api/authors/active", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const companyData = await companyRes.json();
      const authorData = await authorRes.json();

      setCompanies(companyData.response || []);
      setAuthors(authorData.response || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (index) => {
    const isCompany = activeTab === "companies";
    const entityList = isCompany ? companies : authors;
    const entity = entityList[index];
    const updatedActive = !entity.active;

    const url = isCompany
      ? "http://localhost:8080/api/companies/updateActive"
      : "http://localhost:8080/api/authors/updateActive";

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: entity.id, active: updatedActive }),
      });

      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const currentData = activeTab === "companies" ? companies : authors;
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
                  ${activeTab === tab ? "bg-indigo-700 text-white" : "text-gray-700 hover:bg-gray-200"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse rounded-xl text-sm sm:text-base">
            <thead>
              <tr className="text-white">
                <th className="w-1/2 px-4 py-4 text-xl text-center font-semibold bg-indigo-700">
                  <div className="flex items-center justify-center gap-2">
                    <TabIcon size={20} />
                    <span className="capitalize">{activeTab}</span>
                  </div>
                </th>
                <th className="w-1/2 px-4 py-4 text-xl text-center font-semibold text-indigo-700">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentData.map((item, idx) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img src={item.photo} alt={item.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.url}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.active ? "bg-green-500" : "bg-gray-300"}`}></span>
                        <span className={`text-sm ${item.active ? "text-green-600" : "text-gray-500"}`}>
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={() => handleToggle(idx)}
                        className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 ${
                          item.active ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            item.active ? "translate-x-6" : ""
                          } flex items-center justify-center`}
                        >
                          {item.active && <Check size={12} className="text-indigo-600 opacity-80" />}
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
              {currentData.filter((item) => item.active).length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}