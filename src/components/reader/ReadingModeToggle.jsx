const ReadingModeToggle = ({ mode, setMode }) => {
    return (
      <div className="flex justify-center mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded ${mode === "vertical" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("vertical")}
        >
          Vertical
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "horizontal" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("horizontal")}
        >
          Horizontal
        </button>
      </div>
    )
  }
  
  export default ReadingModeToggle