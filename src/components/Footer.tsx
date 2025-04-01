import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-gray-900 text-white text-xs sm:text-sm py-3 sm:py-4 fixed bottom-0 px-4"
    >
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p>
          Lyrics from <span className="font-semibold">Labda Fira</span> by
          <a
            href="https://www.instagram.com/ayootaran/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 hover:text-blue-500 transition-all duration-200"
          >
            {" "}
            Taran Singh
          </a>
        </p>
        <p className="mt-1 text-[8px] sm:text-xs opacity-80 leading-tight sm:leading-normal">
          This website is for educational & non-commercial purposes only.
          <span className="block sm:hidden mt-1" />
          All rights belong to the original artist and copyright holders.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
