const routes = [
    {path: "#popular-mangas", name: "Popular Mangas"},
    {path: "#popular-mangas-by-category", name: "Popular Mangas By Category"}
]

export default function RankingNavbar() {

    return(
        <div className="px-10 mt-20">
            {/* fixed top-35 right-0 left-0 z-50 */}
        <ul className="w-full flex justify-center border-white/75 border-t border-b "> 
          <li id="Content-Navbar" className="w-[60%] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-center">
            {routes.map((route) => (
              <a className="text-xl text-white hover:underline" key={route.path} href={route.path}>{route.name}</a>  
            ))}   
          </li>
        </ul>
        </div>
    )
}