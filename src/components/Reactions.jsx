import React, { useEffect, useState } from "react";
import { FaSurprise, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Reactions({ mangaId }) {
  const reactions = [
    { icon: FaThumbsUp, value: "like" },
    { icon: FaThumbsDown, value: "dislike" },
    { icon: FaSurprise, value: "surprised" },
    { icon: FaFaceGrinHearts, value: "love" },
  ];

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  

  const fetchReactionFromDB = async () => {
    if (user?.role === 0) {
      setSelected(null)
      return;
    }
    try {
    const response = await fetch(
      `http://localhost:8080/api/reactions/byManga?manga_id=${mangaId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
    
      const data = await response.json()

      if (data?.reaction) {
        setSelected(data.reaction)
      } else {
        setSelected(null)
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchReactionFromDB()
  }, [mangaId])

  const handleReactionClick = async (value) => {
    if (user?.role === 0) {
      navigate("/newRol")
      return;
    }
    setLoading(true)

    try {
      const response = await fetch(
        "http://localhost:8080/api/reactions/reaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            reaction: value,
            manga_id: mangaId
          })
        }
      )

      const data = await response.json();

      await fetchReactionFromDB();
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="flex gap-4 mt-8 flex-wrap">
      {reactions.map(({ icon: Icon, value }, idx) => (
        <button
          key={idx}
          onClick={() => handleReactionClick(value)}
          disabled={loading}
          className={`p-4 lg:p-5 cursor-pointer rounded-full shadow-md transition 
            ${selected === value ? "bg-yellow-200" : "bg-white hover:bg-yellow-100"}
            ${loading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <Icon
            className={`text-2xl lg:text-3xl ${
              selected === value ? "text-yellow-600" : "text-yellow-500"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
