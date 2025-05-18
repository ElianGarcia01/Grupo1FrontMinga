import { useContext, useState, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Check, Users, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../hook/AuthContext";
import { UsersContext } from "../../hook/UsersContext";

export default function Panel() {
  const [activeTab, setActiveTab] = useState("companies");
  const [togglingUserId, setTogglingUserId] = useState(null);

  const { user } = useContext(AuthContext);
  const { authors, companies, loading, updateUserActiveStatus } =
    useContext(UsersContext);

  const navigate = useNavigate();

  if (!user || user.role !== 3) {
    toast.error("Access denied");
    navigate("/");
    return null;
  }

  const displayName = (u) => u.name?.trim() || u.email;

  const currentData = useMemo(
    () => (activeTab === "companies" ? companies : authors),
    [activeTab, authors, companies]
  );

  const TabIcon = activeTab === "companies" ? Users : Pen;

  const handleToggle = async (userToToggle) => {
    setTogglingUserId(userToToggle._id);
    try {
      const updated = { ...userToToggle, active: !userToToggle.active };
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/users/${userToToggle._id}`,
        { active: updated.active },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUserActiveStatus(updated);
      toast.success(
        `${displayName(userToToggle)} is now ${
          updated.active ? "active" : "inactive"
        }`
      );
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setTogglingUserId(null);
    }
  };

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
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <h1 className="text-3xl md:text-5xl font-bold leading-tight z-10 mb-8 relative">
        Panel
      </h1>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-white w-[95%] sm:w-11/12 md:w-3/4 z-20 rounded-xl shadow-2xl px-4 sm:px-10 md:px-20 pb-10"
        style={{ top: "75%" }}
      >
        <h2 className="text-indigo-700 text-center text-2xl sm:text-3xl underline font-bold my-8">
          Entities
        </h2>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            {["companies", "authors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-6 py-2 rounded-md font-medium transition-all duration-300 relative
                  ${
                    activeTab === tab
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

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : currentData.length === 0 ? (
          <p className="text-center text-gray-500">No {activeTab} found.</p>
        ) : (
          <>
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
                  {currentData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                          <TabIcon size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{displayName(item)}</p>
                          <p className="text-gray-500 text-sm">{item.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                item.active ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></span>
                            <span
                              className={`text-sm ${
                                item.active
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggle(item)}
                            disabled={togglingUserId === item._id}
                            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 ${
                              item.active ? "bg-indigo-600" : "bg-gray-200"
                            }`}
                            aria-label={`Toggle ${displayName(item)} status`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                item.active ? "translate-x-6" : ""
                              } flex items-center justify-center`}
                            >
                              {togglingUserId === item._id ? (
                                <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                item.active && (
                                  <Check
                                    size={12}
                                    className="text-indigo-600 opacity-80"
                                  />
                                )
                              )}
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-sm">Total {activeTab}</p>
                <p className="text-2xl font-semibold text-indigo-700">
                  {currentData.length}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-sm">Active {activeTab}</p>
                <p className="text-2xl font-semibold text-indigo-700">
                  {currentData.filter((item) => item.active).length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
