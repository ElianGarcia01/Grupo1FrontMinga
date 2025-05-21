import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../data/url";

const CompanyEdit = () => {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

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
      `${API_URL}/companies/update`,
      {
        _id: companyId,
        name: companyName,
        description,
        website,
        photo: photoUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(() => {
        const updatedUser = { ...user };
        updatedUser.company = {
          ...updatedUser.company,
          _id: companyId,
          name: companyName,
          description,
          website,
          photo: photoUrl
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Profile updated successfully',
          confirmButtonColor: '#10b981',
        }).then(() => {
          window.location.href = "/";
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error updating profile',
          confirmButtonColor: '#ef4444',
        });
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete your company account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await confirmDelete();
      }
    });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${API_URL}/companies/delete/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newToken = res.data?.token;
      let user = JSON.parse(localStorage.getItem("user"));

      user.role = 0;
      delete user.company;

      if (newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
      }

      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Company Account Deleted',
        confirmButtonColor: '#10b981',
      }).then(() => {
        window.location.href = "/";
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error deleting company',
        confirmButtonColor: '#ef4444',
      });
    }
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
    </div>
  );
};

export default CompanyEdit;
