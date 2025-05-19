import { useState } from "react";

const AddCommentModal = ({ isOpen, onClose, onSubmit }) => {
  // We'll create our own modal since @headlessui might not be installed
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 w-full max-w-md bg-gray-800 text-white rounded-lg p-6 shadow-xl">
        <h3 className="text-lg font-medium leading-6 mb-4">
          Add a Comment
        </h3>
        
        <div className="mt-2">
          <CommentForm 
            onSubmit={(text) => {
              onSubmit(text);
              onClose();
            }}
            placeholder="Share your thoughts on this chapter..."
            submitLabel="Post Comment"
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Import directly within this file to avoid import errors
const CommentForm = ({ onSubmit, submitLabel, initialText = "", placeholder }) => {
  const [text, setText] = useState(initialText);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSubmit(text);
    if (!initialText) setText(""); // Clear only if not editing
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={text.trim() === ""}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default AddCommentModal;