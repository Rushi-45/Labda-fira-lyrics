import LyricsPage from "./components/LyricsPage";
import Background from "./components/Background";
import MusicNotes from "./components/MusicNotes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <Background />
      <h1 className="font-montserrat text-4xl sm:text-5xl text-white absolute top-10 font-bold text-center w-full">
        Labda Fira Lyrics
      </h1>
      <MusicNotes />

      <div className="flex-1 overflow-y-auto">
        <LyricsPage />
      </div>

      <Footer />
    </div>
  );
};

export default App;
