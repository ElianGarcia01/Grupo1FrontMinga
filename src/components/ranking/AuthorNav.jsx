export default function AuthorNavbar({ onSelect }) {
  const routes = [
    { _id: "682026d3dfb90091adc4b2d6", name: "Alejandro" },
    { _id: "682026d4dfb90091adc4b2d9", name: "Lucas" },
    { _id: "682026d4dfb90091adc4b2dc", name: "Eric" }
  ];

  return (
    <ul className="w-full flex justify-center border-white/75 border-t border-b">
      <li className="w-[60%] p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
        {routes.map((route) => (
          <button
            key={route._id}
            onClick={() => onSelect(route._id)}
            className="text-xl text-white hover:underline"
          >
            {route.name}
          </button>
        ))}
      </li>
    </ul>
  );
}