import { motion } from "framer-motion";

const Background = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800 via-black to-purple-800"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default Background;
