import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteAlert from "./AlertDelete";
import { getChaptersByManga } from "../../redux/chapterSlice";
import { toast } from "react-toastify";
import { API_URL } from "../../data/url"

const EditChapter = () => {
  const { id: mangaId } = useParams();
  const dispatch = useDispatch();

  const { list: allChapters = [], loading } = useSelector(
    (state) => state.chapters
  );

  const filteredChapters = allChapters.filter(
    (ch) => ch.manga_id?._id === mangaId || ch.manga_id === mangaId
  );

  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: "",
    pages: [],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (mangaId) {
      dispatch(getChaptersByManga(mangaId));
    }
  }, [mangaId]);

  useEffect(() => {
    const chapter = filteredChapters.find((ch) => ch._id === selectedChapterId);
    if (chapter) {
      setFormData({
        title: chapter.title || "",
        description: chapter.description || "",
        order: chapter.order || "",
        pages: chapter.pages || [],
      });
    }
  }, [selectedChapterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar mensajes de error al cambiar los campos
    if (errorMessage) setErrorMessage("");
  };

  const handleEdit = async () => {
    if (!formData.title || !formData.order) {
      setErrorMessage("Title and Order are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/chapters/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            _id: selectedChapterId, // enviar el ID aquí
            title: formData.title,
            order: parseInt(formData.order),
            pages: formData.pages,
            cover_photo: formData.pages[0] || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          data.message ||
          (data.errors && data.errors.map((e) => e.msg).join(", ")) ||
          "Error updating chapter";
        throw new Error(errorMsg);
      }

      toast.success("Chapter edited successfully!");

      setErrorMessage("");
      setTimeout(() => setShowSuccess(false), 3000);

      dispatch(getChaptersByManga(mangaId));

      // Redirigir
      setTimeout(() => {
        navigate("/manager");
      });
    } catch (error) {
      console.error("Error al editar capítulo:", error);
      setErrorMessage(error.message);
    }
  };

  const handleDelete = () => {
    console.log("Eliminando capítulo:", selectedChapterId);
    setShowDelete(true);
    setTimeout(() => setShowDelete(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Chapter</h2>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p>Chapter edited successfully!</p>
          </div>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{errorMessage}</p>
          </div>
        )}

        {showDelete && <DeleteAlert message="Chapter deleted!" />}

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-blue-600">
              Loading chapters...
            </p>
          </div>
        ) : (
          <>
            {/* Selector de capítulos */}
            <select
              className="w-full mb-4 border-b border-gray-400 focus:outline-none p-2 text-sm text-gray-600"
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
            >
              <option value="" disabled>
                Select a chapter
              </option>
              {filteredChapters.map((ch) => (
                <option key={ch._id} value={ch._id}>
                  Chapter {ch.order} – {ch.title}
                </option>
              ))}
            </select>

            {selectedChapterId && (
              <>
                <div className="mb-3">
                  <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 focus:outline-none p-2 text-sm"
                  />
                  {errorMessage.includes("Title") && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 focus:outline-none p-2 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <input
                    name="order"
                    type="number"
                    placeholder="Order"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                    className="w-full border-b border-gray-400 focus:outline-none p-2 text-sm"
                  />
                  {errorMessage.includes("Order") && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                  )}
                </div>

                {formData.pages.length > 0 && (
                  <img
                    src={formData.pages[0]}
                    alt="Chapter cover"
                    className="w-full h-[200px] object-cover rounded-lg shadow mb-4"
                  />
                )}

                <button
                  onClick={handleEdit}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-full mb-3"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-full"
                >
                  Delete Chapter
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditChapter;
