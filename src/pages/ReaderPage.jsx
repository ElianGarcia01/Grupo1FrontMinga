import { useState, useEffect } from "react"
import MangaViewer from "../components/reader/MangaViewer"
import ReadingModeToggle from "../components/reader/ReadingModeToggle"
import ListComments from "../components/comments/ListComments"

const ReaderPage = () => {
  const [pages, setPages] = useState([])
  const [readingMode, setReadingMode] = useState("vertical") 

  // TODO: replace with real data fetch
  useEffect(() => {
    // Simulating page URLs for the chapter
    setPages([
      "/manga/ch1/page1.jpg",
      "/manga/ch1/page2.jpg",
      "/manga/ch1/page3.jpg"
    ])
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-3xl p-4">
        <ReadingModeToggle mode={readingMode} setMode={setReadingMode} />
        <MangaViewer pages={pages} mode={readingMode} />
        <ListComments chapterId="123" />
      </div>
    </div>
  )
}

export default ReaderPage