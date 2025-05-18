import { useState } from "react";

const CommentForm = ({ onSubmit, submitLabel, initialText = "", placeholder }) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="w-full p-2 border rounded resize-none text-sm"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="self-end px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;