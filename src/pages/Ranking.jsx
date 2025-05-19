import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RankingNavbar from "../components/ranking/RankingNavbar"
import AuthorNav from "../components/ranking/AuthorNav"
import CategoryNav from "../components/ranking/CategoryNav"

function Ranking() {

    const [topMangas, setTopMangas] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState("682026d3dfb90091adc4b2d6")
    const [selectedCategory, setSelectedCategory] = useState("682026e077220ba09b4eb784")
    const [authorMangas, setAuthorMangas] = useState([])
    const [categoryMangas, setCategoryMangas] = useState([])



    useEffect(() => {
        const fetchTopMangas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/ranking/topMangas')
                const data = response.data.rankings
                const sorted = data.sort((a, b) => b.score - a.score);
                setTopMangas(sorted)
            } catch (error) {
                console.error("Error fetching Top Mangas", error)
            }
        }
        fetchTopMangas()
    }, [])

    useEffect(() => {
        const fetchAuthorMangas = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/ranking/topMangasByAuthor/${selectedAuthor}`)
                const data = response.data.rankings
                const sorted = data.sort((a, b) => b.score - a.score);
                setAuthorMangas(sorted)
            } catch (error) {
                console.error("Error fetching mangas by author", error);
            }
        }
        fetchAuthorMangas()
    }, [selectedAuthor])

    useEffect(() => {
        const fetchCategoryMangas = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/ranking/topMangasByCategory/${selectedCategory}`)
                const data = response.data.rankings
                const sorted = data.sort((a, b) => b.score - a.score);
                setCategoryMangas(sorted)
            } catch (error) {
                console.error("Error fetching mangas by category", error);
            }
        }
        fetchCategoryMangas()
    }, [selectedCategory])



    return (
        <div className="min-h-[90vh] w-full bg-gradient-to-b from-[#96BAFF] via-[#5E52F3] to-[#6F61C0] flex flex-col px-15 scroll-smooth">

            <RankingNavbar></RankingNavbar>

            <div id="popular-mangas" className="w-5-6 mt-5 mb-10">
                <h1 className="text-3xl text-white pl-5">Popular Mangas</h1>

                {topMangas.length > 0 && (
                    <div className="flex flex-col items-center lg:flex-row gap-4 mt-5">
                        <div className="lg:w-1/2 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
                            <div className="flex transition-transform duration-300 hover:scale-105">
                                <Link to={`/details/${topMangas[0].manga._id}`} state={{ manga: topMangas[0].manga }}>
                                    <img className="w-md rounded-lg" src={topMangas[0].manga.cover_photo} alt={topMangas[0].manga.title} />
                                </Link>
                            </div>
                            <div className="text-white pl-3 mt-4">
                                <div className="flex items-center">
                                    <span className="text-white text-8xl mr-4 w-15 rounded-tl-lg">1</span>
                                    <h1 className="text-4xl">{topMangas[0].manga.title}</h1>
                                </div>
                                <p className="w-[85%]">{topMangas[0].manga.description}</p>
                                <br />
                                <span className="text-xl">⭐⭐⭐⭐⭐</span>
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">Opinions:</h2>
                                    <ul className="space-y-2 list-disc list-inside">
                                        {topMangas[0]?.comments?.slice(4, 9).map((comment, index) => (
                                            <li key={index} className="text-white/90 decoration-none">
                                                {comment.message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 flex flex-col ml-10">
                            {topMangas.slice(1).map((manga, index) => (
                                <div key={index + 1} className="flex mb-5 items-center">
                                    <Link to={`/details/${manga.manga._id}`} state={{ manga: manga.manga }}>
                                    <div className=" relative w-32 h-40 group overflow-hidden rounded shadow-lg transition-transform duration-400 hover:scale-110">                                       
                                            <img
                                                src={manga.manga.cover_photo}
                                                alt={manga.manga.title}
                                                className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500"
                                            />
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-opacity-70"></span>
                                    </div>
                                    </Link>
                                    <div className="text-white w-96 ml-5">
                                        <div className="flex items-center">
                                            <span className="text-4xl mr-4">{index + 2}</span>
                                            <h1 className="text-2xl">{manga.manga.title}</h1>
                                        </div>
                                        <p>{manga.manga.description.slice(0, 150) + "..."}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div id="popular-mangas-by-author" className="w-5-6 mt-15 mb-10">
                <h1 className="text-3xl text-white pl-5 mb-4">Top 3 By Author</h1>

                <AuthorNav onSelect={setSelectedAuthor}></AuthorNav>
                {authorMangas.length > 0 && (
                    <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                        {authorMangas.map((authorManga, index) => (
                            <div key={index} className="flex flex-col items-center mb-5">
                                <div className="flex items-center mt-5 text-white mb-5 ">
                                    <span className="text-4xl mr-4">{index + 1}</span>
                                    <h1 className="text-2xl">{authorManga.manga.title}</h1>
                                </div>
                                <div className="w-xs group overflow-hidden rounded shadow-xl transition-transform duration-400 hover:scale-105">

                                    <Link to={`/details/${authorManga.manga._id}`} state={{ manga: authorManga.manga }}>
                                        <img
                                            src={authorManga.manga.cover_photo}
                                            alt={authorManga.manga.title}
                                            className="w-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500"
                                        />
                                    </Link>

                                    <span
                                        className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-opacity-70">
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>


            <div id="popular-mangas-by-category" className="w-5-6 mt-10 mb-10">
                <h1 className="text-3xl text-white pl-5 mb-4">Top 3 By Category</h1>

                <CategoryNav onSelect={setSelectedCategory}></CategoryNav>
                {categoryMangas.length > 0 && (
                    <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                        {categoryMangas.map((categoryManga, index) => (
                            <div key={index} className="flex flex-col items-center mb-5">
                                <div className="flex items-center mt-5 text-white mb-5 ">
                                    <span className="text-4xl mr-4">{index + 1}.</span>
                                    <h1 className="text-2xl">{categoryManga.manga.title}</h1>
                                </div>
                                <div className="w-xs group overflow-hidden rounded shadow-lg transition-transform duration-400 hover:scale-105">

                                    <Link to={`/details/${categoryManga.manga._id}`} state={{ manga: categoryManga.manga }}>
                                        <img
                                            src={categoryManga.manga.cover_photo}
                                            alt={categoryManga.manga.title}
                                            className="w-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-500"
                                        />
                                    </Link>

                                    <span
                                        className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-opacity-70">
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>


        </div>
    )
}

export default Ranking