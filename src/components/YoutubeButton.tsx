import { motion } from "framer-motion";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=J1NBbKr1hZY";
const VIDEO_ID = YOUTUBE_URL.split("v=")[1]?.split("&")[0];
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

const YouTubeButton = () => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        onMouseEnter={() => {
          setShowThumbnail(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowThumbnail(false);
          setShowTooltip(false);
        }}
        className="relative bg-gray-900 bg-opacity-90 rounded-lg p-3 sm:p-4 shadow-lg"
      >
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-700 transition text-4xl"
        >
          <FaYoutube />
        </a>
      </motion.div>

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: showThumbnail ? -80 : -40 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg shadow-lg whitespace-nowrap"
        >
          Watch on YouTube
        </motion.div>
      )}

      {showThumbnail && (
        <motion.img
          src={THUMBNAIL_URL}
          alt="YouTube Video Thumbnail"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 h-auto rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default YouTubeButton;
