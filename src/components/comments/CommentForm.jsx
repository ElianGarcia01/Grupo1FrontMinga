import { useState } from "react";

const CommentForm = ({ onSubmit, submitLabel, initialText = "", placeholder }) => {
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "" || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(text);
      if (!initialText) setText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={text.trim() === "" || isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;