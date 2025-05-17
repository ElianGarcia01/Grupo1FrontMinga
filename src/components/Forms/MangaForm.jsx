export default function MangaForm() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-gray-100 p-6 rounded-2xl w-full max-w-sm text-center shadow-md">
        <h2 className="text-xl font-semibold mb-6">New Manga</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Insert title"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <select className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none">
            <option value="">Insert category</option>
            <option value="shonen">Shonen</option>
            <option value="seinen">Seinen</option>
          </select>
          <input
            type="text"
            placeholder="Insert cover photo"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Insert description"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 rounded-full font-semibold hover:bg-indigo-800 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
