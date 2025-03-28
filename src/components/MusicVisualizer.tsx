import { motion } from "framer-motion";

const MusicVisualizer = () => {
  return (
    <div className="absolute bottom-10 flex gap-2">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-white rounded"
          animate={{
            height: [10, 40, 10],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
