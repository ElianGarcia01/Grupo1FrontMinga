import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();

  if (!state) return <p>No manga selected</p>;

  const { title, type, image } = state;

  return (
    <section className="w-full p-8 min-h-screen flex flex-col justify-center items-center">
      {/* Card */}
      <div>
        <div className="w-full md:w-1/6 h-1/2">
          <img src={image} alt={title} className="w-full h-full rounded-2xl" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4">{title}</h1>
          <p className="text-lg text-end">Company Name</p>
        </div>

        <div className="flex">
          <button
            className="bg-indigo-600 px-8 py-2 text-lg
      text-white cursor-pointer rounded-2xl"
          >
            Manga
          </button>
          <button
            className=" px-8 py-2 text-lg
      text-black cursor-pointer rounded-2xl"
          >
            Chopters
          </button>
        </div>
      </div>
    </section>
  );
};

export default Details;
