export default function SearchBar({ value, onChange }) {
    return (
      <div className="w-full max-w-xl relative z-10">
        <input
          type="text"
          placeholder="Find your manga here..."
          value={value}
          onChange={onChange}
          className="w-full px-6 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    );
  }
  