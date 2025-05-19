import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const CommentOptionsModal = ({ isOpen, onClose, initialText, onEdit, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState(initialText);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  if (!isOpen) return null;

  const handleEdit = () => {
    if (isEditMode) {
      if (editText.trim() !== "" && editText !== initialText) {
        onEdit(editText);
      }
      setIsEditMode(false);
      onClose();
    } else {
      setIsEditMode(true);
      setIsConfirmDelete(false);
    }
  };

  const handleConfirmDelete = () => {
    if (isConfirmDelete) {
      onDelete();
      onClose();
    } else {
      setIsConfirmDelete(true);
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setIsConfirmDelete(false);
    setEditText(initialText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={handleCancel}
      />
      
      <div className="relative z-10 w-full max-w-md bg-gray-800 text-white rounded-lg p-6 shadow-xl">
        <h3 className="text-lg font-medium mb-4">
          {isEditMode ? "Edit Comment" : 
           isConfirmDelete ? "Delete Comment" : 
           "Comment Options"}
        </h3>
        
        {isEditMode ? (
          <div className="mt-4">
            <textarea
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </div>
        ) : isConfirmDelete ? (
          <p className="text-gray-300 mb-4">Are you sure you want to delete this comment? This action cannot be undone.</p>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleEdit}
              className="w-full flex items-center gap-2 p-3 text-left rounded-md hover:bg-gray-700 transition"
            >
              <Edit size={18} />
              <span>Edit Comment</span>
            </button>
            <button
              onClick={handleConfirmDelete}
              className="w-full flex items-center gap-2 p-3 text-left rounded-md text-red-400 hover:bg-gray-700 transition"
            >
              <Trash2 size={18} />
              <span>Delete Comment</span>
            </button>
          </div>
        )}
        
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          
          {(isEditMode || isConfirmDelete) && (
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                isConfirmDelete 
                  ? "bg-red-600 hover:bg-red-500 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              } transition`}
              onClick={isEditMode ? handleEdit : handleConfirmDelete}
              disabled={isEditMode && (editText.trim() === "" || editText === initialText)}
            >
              {isEditMode ? "Save Changes" : "Delete Comment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentOptionsModal;