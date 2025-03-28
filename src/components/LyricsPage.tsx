import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { lyricsPages } from "../constants/lyrics";

const LINES_PER_PAGE = 4;

const LyricsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const totalPages = Math.ceil(lyricsPages.length / LINES_PER_PAGE);

  const handleScroll = (event: React.WheelEvent) => {
    if (
      event.deltaY > 0 &&
      (currentPage + 1) * LINES_PER_PAGE < lyricsPages.length
    ) {
      setCurrentPage((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center relative w-full px-8 md:px-20 lg:px-32 z-10 overflow-hidden"
      onWheel={handleScroll}
    >
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4 font-montserrat"
      >
        {lyricsPages
          .slice(
            currentPage * LINES_PER_PAGE,
            (currentPage + 1) * LINES_PER_PAGE
          )
          .map((text, index) => (
            <motion.p
              key={text}
              className="text-3xl md:text-4xl font-bold text-white text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {text}
            </motion.p>
          ))}
      </motion.div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-1 bg-gray-700 rounded-md h-2/3 overflow-hidden">
        <div
          className="w-full bg-white transition-all duration-300"
          style={{ height: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-lg p-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={togglePlayPause}
          className="text-white text-lg font-semibold bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
        >
          {isPlaying ? "Pause ⏸️" : "Play ▶️"}
        </button>
        <audio ref={audioRef} src="/assets/labda-fira.mp3" />
      </div>
    </div>
  );
};

export default LyricsPage;
