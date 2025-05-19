export default function CategoryNavbar({ onSelect }) {
  const routes = [
    { _id: "682026e077220ba09b4eb784", name: "Komodo" },
    { _id: "682026e077220ba09b4eb783", name: "Shojo" },
    { _id: "682026e077220ba09b4eb781", name: "Shoen" },
    { _id: "682026e077220ba09b4eb782", name: "Seinen" }
  ];

  return (
    <ul className="w-full flex justify-center border-white/75 border-t border-b">
      <li className="w-[60%] p-5 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 text-center">
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