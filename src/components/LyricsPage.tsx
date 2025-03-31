import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { lyricsPages } from "../constants/lyrics";
import Howler from "react-howler";
import { FaPlay, FaPause, FaYoutube } from "react-icons/fa";
import labda_fira from "../assets/audio/labda_fira.mp3";
import { FiVolume2 } from "react-icons/fi";
import { IIdleTimer, useIdleTimer } from "react-idle-timer";
import { IoClose } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Tooltip } from "./common/Tooltip";

const LINES_PER_PAGE = 4;
const YOUTUBE_URL = "https://www.youtube.com/watch?v=J1NBbKr1hZY";

const LyricsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isInactive, setIsInactive] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const idleTimerRef = useRef<IIdleTimer | null>(null);
  const playerRef = useRef<Howler | null>(null);

  const totalPages = Math.ceil(lyricsPages.length / LINES_PER_PAGE);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const seek = playerRef.current.seek() || 0;
        setProgress(seek);
      }
    }, 1000);

    const handleClickOutside = () => {
      setIsInactive(false);
      reset();
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      clearInterval(interval);
    };
  }, []);

  const onIdle = () => {
    setIsInactive(true);
  };

  const { reset } = useIdleTimer({
    timeout: 5000,
    onIdle,
    debounce: 500,
    ref: idleTimerRef as React.RefObject<IIdleTimer>,
  });

  const handleScroll = (event: React.WheelEvent) => {
    if (scrollTimeout) return;

    setIsInactive(false);
    reset();
    setScrollTimeout(
      setTimeout(() => {
        if (
          event.deltaY > 0 &&
          (currentPage + 1) * LINES_PER_PAGE < lyricsPages.length
        ) {
          setCurrentPage((prev) => prev + 1);
        } else if (event.deltaY < 0 && currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
        setScrollTimeout(null);
      }, 300)
    );
  };
  const formatTime = (seconds: number | undefined) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
      <motion.div
        className="flex gap-4 justify-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Tooltip text="Previous">
          <motion.button
            onClick={() =>
              setCurrentPage((prev: number) => Math.max(0, prev - 1))
            }
            className="p-3 bg-transparent cursor-pointer text-gray-700 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-xl"
            disabled={currentPage === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ opacity: currentPage === 0 ? 0.5 : 1 }}
          >
            <BiChevronLeft className="w-6 h-6" />
          </motion.button>
        </Tooltip>

        <Tooltip text="Next">
          <motion.button
            onClick={() =>
              setCurrentPage((prev: number) =>
                (prev + 1) * LINES_PER_PAGE < lyricsPages.length
                  ? prev + 1
                  : prev
              )
            }
            className="p-3 bg-transparent cursor-pointer text-gray-700 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-xl"
            disabled={(currentPage + 1) * LINES_PER_PAGE >= lyricsPages.length}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              opacity:
                (currentPage + 1) * LINES_PER_PAGE >= lyricsPages.length
                  ? 0.5
                  : 1,
            }}
          >
            <BiChevronRight className="w-6 h-6" />
          </motion.button>
        </Tooltip>
      </motion.div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-1 bg-gray-700 rounded-md h-2/3 overflow-hidden">
        <div
          className="w-full bg-white transition-all duration-300"
          style={{ height: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-900 bg-opacity-90 rounded-lg p-4 flex items-center gap-6 w-auto shadow-lg"
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white text-lg font-semibold bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>

          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={(e) =>
              playerRef.current?.seek(parseFloat(e.target.value))
            }
            className="w-40 h-1 bg-white rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-white text-sm">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
          <FiVolume2 size={20} className="text-white" />
          <motion.input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-0 h-1 bg-white rounded-lg appearance-none cursor-pointer"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "4rem", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="bg-gray-900 bg-opacity-90 rounded-lg p-4 shadow-lg"
        >
          {" "}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-700 transition text-4xl"
          >
            <FaYoutube />
          </a>
        </motion.div>
      </motion.div>

      <Howler
        src={labda_fira}
        playing={isPlaying}
        volume={volume}
        ref={playerRef}
        onLoad={() => setDuration(playerRef.current?.duration() || 0)}
      />
      {isInactive && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4"
        >
          <p className="text-lg font-semibold">
            Scroll to move to the next page
          </p>
          <button
            onClick={() => {
              setIsInactive(false);
              reset();
            }}
            className="text-white hover:text-gray-400 transition"
          >
            <IoClose size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LyricsPage;
