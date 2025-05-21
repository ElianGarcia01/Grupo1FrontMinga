import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import CommentOptionsModal from "./CommentOptionsModal";
import { useNavigate } from "react-router-dom";
import { updateComment, deleteComment } from "../../services/commentsService";
import { useAuth } from "../../../hook/useAuth";

const Comment = ({
  comment,
  currentUserId,
  currentUserRole,
  chapterId,
  refreshComments,
  token // Recibir el token como prop
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { token: authToken } = useAuth(); // También obtenerlo del contexto como respaldo
  const navigate = useNavigate();
  
  // Usar el token pasado como prop o el del contexto de autenticación
  const effectiveToken = token || authToken;
  
  // Verificar si el comentario es del usuario actual
  // Comprobar tanto author_id como company_id
  const isMyComment = currentUserId && 
    ((comment.author_id && comment.author_id._id === currentUserId) || 
     (comment.company_id && comment.company_id._id === currentUserId));
     
  const canEditOrDelete = isMyComment || currentUserRole >= 2;
  
  // Determinar el nombre del autor
  const authorName = comment.author_id?.name || comment.company_id?.name || 'Unknown User';
  const userInitial = authorName.charAt(0).toUpperCase();
  
  const handleEdit = async (newText) => {
    try {
      await updateComment(chapterId, isMyComment, newText, effectiveToken);
      await refreshComments();
    } catch (error) {
      console.error("Failed to update comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteComment(comment._id, effectiveToken);
      await refreshComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };
  
  const formattedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return "Unknown date";
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 shadow-md border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {userInitial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{authorName}</p>
              <p className="text-xs text-gray-400">{formattedDate(comment.createdAt || new Date())}</p>
            </div>
            <p className="text-gray-300 mt-1">{comment.message}</p>
          </div>
        </div>
        
        {canEditOrDelete && (
          <div className="flex">
            <button
              onClick={() => setIsOptionsOpen(true)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
              aria-label="Comment options"
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
      />
    </div>
  );
};

export default Comment;