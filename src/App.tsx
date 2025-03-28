import LyricsPage from "./components/LyricsPage";
import Background from "./components/Background";
// import MusicVisualizer from "./components/MusicVisualizer";
import MusicNotes from "./components/MusicNotes";

const App = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <Background />
      <h1 className="font-montserrat text-5xl text-white absolute top-10 font-bold">
        Labda Fira Lyrics
      </h1>
      <MusicNotes /> {/* Animated Notes on Sides */}
      <LyricsPage />
      {/* <MusicVisualizer /> */}
    </div>
  );
};

export default App;
