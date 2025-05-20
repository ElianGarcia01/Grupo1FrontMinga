import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import CommentOptionsModal from "./CommentOptionsModal";
import { useNavigate } from "react-router-dom";
import { updateComment, deleteComment } from "../../services/commentsService";
import { useAuth } from "../../../hook/useAuth";

const Comment = ({ comment, chapterId, refreshComments }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // Verifica si el comentario pertenece al usuario actual
  const isMyComment = user && (
    (user.author?._id === comment.author_id?._id) || 
    (user.company?._id === comment.company_id?._id)
  );

  // Permisos: usuario dueño o admin
  const canEditOrDelete = isMyComment || (user?.role === "admin");

  const authorName = comment.author_id?.name || comment.company_id?.name || 'Usuario Anónimo';
  const userInitial = authorName.charAt(0).toUpperCase();

  const handleEdit = async (newText) => {
    if (!user || !token) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      await updateComment(comment._id, newText, token);
      await refreshComments();
    } catch (error) {
      console.error("Error al editar comentario:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert("No se pudo editar el comentario. Por favor intente nuevamente.");
    }
  };

  const handleDelete = async () => {
    if (!user || !token) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      await deleteComment(comment._id, token);
      await refreshComments();
    } catch (error) {
      console.error("Error al eliminar comentario:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      alert("No se pudo eliminar el comentario. Por favor intente nuevamente.");
    }
  };

  const formattedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return "Fecha desconocida";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 shadow-md border border-gray-700 relative">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-white truncate">{authorName}</p>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {formattedDate(comment.createdAt || new Date())}
              </p>
            </div>
            <p className="text-gray-300 mt-1 break-words whitespace-pre-wrap">
              {comment.message}
            </p>
          </div>
        </div>

        {canEditOrDelete && (
          <div className="flex ml-2">
            <button
              onClick={() => setIsOptionsOpen(true)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Opciones del comentario"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

      <CommentOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        initialText={comment.message}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isOwnComment={isMyComment}
      />
    </div>
  );
};

export default Comment;