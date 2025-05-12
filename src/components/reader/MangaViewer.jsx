import { motion } from "framer-motion"

const MangaViewer = ({ pages, mode }) => {
  if (mode === "vertical") {
    return (
      <div className="flex flex-col gap-4">
        {pages.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Page ${index + 1}`}
            className="w-full rounded shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    )
  }

  // Horizontal mode
  return (
    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4">
      {pages.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`Page ${index + 1}`}
          className="h-[80vh] snap-center rounded shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  )
}

export default MangaViewer