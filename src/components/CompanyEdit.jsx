import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth"; //maneja datos del usuario
import axios from "axios";
import AlertSave from "./AlertSave"
import AlertDelete from "./AlertDelete";
import { useNavigate } from "react-router-dom";

const CompanyEdit = () => {
  const { user } = useAuth(); //aqui estan los datos almacneados
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [showSaveAlert, setShowSaveAlert] = useState(false);   // para usar el componente de alerta
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); //igual que arriba 
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (user && user.company) {
      const { name, description, website, photo, _id } = user.company;
      setCompanyName(name || '');
      setDescription(description || '');
      setWebsite(website || '');
      setPhotoUrl(photo || '');
      setCompanyId(_id);
    }
  }, [user]);

const handleSave = () => {
  axios.put(
    "http://localhost:8080/api/companies/update",
    {
      _id: companyId,
      name: companyName,
      description: description,
      website: website,
      photo: photoUrl
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(() => alert("Profile updated successfully"))
    .catch((err) => {
      console.error(err);
      alert("Error al actualizar");
    });

  setShowSaveAlert(true);
};

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/api/companies/delete/${companyId}`)
      .then(() => {
        alert("Company Account Deleted");
        navigate("/");
      })
      .catch(err => {
        console.error(err);
        alert("Delete Error");
      });
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false);
  };



  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row gap-12 max-w-4xl w-full">

        <div className="order-1 md:order-2 w-full md:w-[396px] h-auto md:h-[276px] flex flex-col items-center text-center">
          <img
            src={
              photoUrl.trim()
                ? photoUrl
                : 'https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740'
            }
            alt="Company"
            className="w-[180px] h-[180px] object-cover rounded-full mb-4"
          />
          <h3 className="font-[Roboto] font-normal text-xl leading-none tracking-normal text-center text-black">
            {companyName || 'Company Name'}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-location-dot mr-1" /> {description || 'Location'}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            <i className="fa-solid fa-globe mr-1" /> {website || 'Website'}
          </p>
        </div>

        <div className="w-[337px] h[453px] order-2 md:order-1 flex-1">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
            placeholder="Company Name"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
            placeholder="Description"
          />
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border-b border-gray-400 p-2 mb-4 text-sm text-black focus:outline-none placeholder-gray-500"
            placeholder="Website"
          />
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full border-b border-gray-400 p-2 mb-6 text-sm text-black focus:outline-none placeholder-gray-500"
            placeholder="URL Company Photo"
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
              Delete Company
            </button>
          </div>
        </div>
      </div>
      {showSaveAlert && <AlertSave onClose={() => setShowSaveAlert(false)} />}

      {showDeleteAlert && (
        <AlertDelete onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
    
  );
};

export default CompanyEdit;
