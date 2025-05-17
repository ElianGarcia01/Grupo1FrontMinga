export default function AuthorForm() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-gray-100 p-6 rounded-2xl w-full max-w-sm text-center shadow-md">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full" />
        </div>
        <h2 className="text-xl font-semibold mb-6">New Author</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Lucas Ezequiel"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Silva"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Caseros, Buenos Aires"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="28/12/2022"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <input
            type="text"
            placeholder="URL Profile Image"
            className="w-full border-b border-gray-500 bg-transparent py-2 px-1 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
