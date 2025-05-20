import { useState } from "react";

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

export default CommentForm;