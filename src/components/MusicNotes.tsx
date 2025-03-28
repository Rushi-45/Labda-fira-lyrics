import { motion } from "framer-motion";

const MusicImages = () => {
  return (
    <>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={200} // Adjust size for better background effect
        height={200}
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-10 top-1/4 -z-10 opacity-20" // Move behind the text
        initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      >
        <path d="M21.6464 2.23699C21.8707 2.42699 22 2.70606 22 3.00001V16C22 18.2091 20.2091 20 18 20C15.7909 20 14 18.2091 14 16C14 13.7909 15.7909 12 18 12C18.7286 12 19.4117 12.1948 20 12.5351V4.18047L10 5.84713V18L9.99999 18.0032C9.99824 20.2109 8.20806 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C6.72857 14 7.41165 14.1948 8 14.5351V5.00001C8 4.51117 8.35341 4.09398 8.8356 4.01361L20.8356 2.01361C21.1256 1.96529 21.4221 2.04698 21.6464 2.23699ZM20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16C16 17.1046 16.8954 18 18 18C19.1046 18 20 17.1046 20 16ZM6 16C7.10457 16 8 16.8954 8 18C8 19.1046 7.10457 20 6 20C4.89543 20 4 19.1046 4 18C4 16.8954 4.89543 16 6 16Z" />
      </motion.svg>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-10 top-1/4 -z-10 opacity-20"
        initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      >
        <path d="M13 18V10V2" />
        <path d="M14 18V10V2" />
        <circle cx="9" cy="18" r="4.5" />
        <circle cx="9" cy="18" r="3.5" />
        <path d="M19 8C15.6863 8 13 5.31371 13 2" />
        <path d="M20 8C16.6863 8 14 5.31371 14 2" />
      </motion.svg>
    </>
  );
};

export default MusicImages;
