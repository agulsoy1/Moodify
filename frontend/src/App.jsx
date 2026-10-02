import { useState, useEffect } from "react";
import SongCard from "./components/SongCard";

export default function App() {
  const [mood, setMood] = useState("");
  const [searchedMood, setSearchedMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [searchKey, setSearchKey] = useState(0);

  const text = "Moodify";
  const leftSongs = songs.slice(0, 2);
  const middleSongs = songs.slice(2, 8);
  const topSongs = middleSongs.slice(0, 3);
  const bottomSongs = middleSongs.slice(3, 6);
  const rightSongs = songs.slice(8, 10);

  const moodColors = {
    happy: "bg-amber-300 border-amber-700",
    sad: "bg-blue-300 border-blue-700",
    energetic: "bg-orange-300 border-orange-700",
    relaxed: "bg-green-300 border-green-700",
    angry: "bg-red-300 border-red-700",
    romantic: "bg-pink-300 border-pink-700",
    focused: "bg-purple-300 border-purple-700",
  };

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTitle(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const getAnimationDelay = (index) => {
    return { animationDelay: `${index * 125}ms` };
  };

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  async function fetchSongs() {
    if (!mood) return;

    setLoading(true);
    try {
      const res = await fetch(`https://moodify-backend-phi.vercel.app/api/music?mood=${mood}`);
      const data = await res.json();
      setSongs(data);
      setSearchKey((prev) => prev + 1);
      setSearchedMood(mood);
    } catch (error) {
      console.log("Error fetching songs: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-stone-900 flex flex-col items-center justify-center overflow-y-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-stone-800/20 w-[70vw] h-[70vw] rounded-[50%] blob"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-stone-700/20 w-[60vw] h-[60vw] rounded-[50%] blob"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-stone-600/20 w-[50vw] h-[50vw] rounded-[50%] blob"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-stone-500/20 w-[40vw] h-[40vw] rounded-[50%] blob"></div>
      <div key={searchKey} className="grid grid-cols-3 gap-5 z-10">
        <div className="flex flex-col items-end justify-center gap-5">
          {leftSongs.map((song, index) => (
            <div key={`left-${index}`} className="fadeIn hover:scale-105 transition-all duration-300" style={getAnimationDelay(index + 0)}>
              <SongCard
                song={song}
                moodColors={moodColors}
                searchedMood={searchedMood}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex items-center gap-5 my-10">
            {topSongs.map((song, index) => (
              <div
                key={`middle-${index}`}
                className={`${index % 2 === 0 ? "translate-y-10" : "translate-y-0"} fadeIn hover:scale-105 transition-all duration-300`} style={getAnimationDelay(index + leftSongs.length)}
              >
                <SongCard
                  song={song}
                  moodColors={moodColors}
                  searchedMood={searchedMood}
                  formatDate={formatDate}
                />
              </div>
            ))}
          </div>
          <h1 className={`text-blue-500 text-6xl font-normal tracking-wide`}>
            {title}
            {showCursor && (
              <span className={`border border-black blink`}></span>
            )}
          </h1>
          <div className="flex gap-5 justify-center items-center">
            <input
              type="text"
              className="relative border border-black rounded bg-white px-2 py-2 text-3xl"
              placeholder="How do you feel?"
              value={mood}
              onChange={(e) => setMood(e.target.value.toLowerCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchSongs();
                }
              }}
            />
            <button
              className="h-full bg-blue-800 text-white p-2 rounded hover:bg-blue-500 transition-all duration-300"
              onClick={() => {
                fetchSongs();
              }}
            >
              {loading ? "Loading..." : `Search`}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button
              className="border-2 border-amber-700 rounded p-1 bg-amber-300 hover:bg-amber-100 active:bg-amber-700 transition-all duration-250"
              onClick={() => setMood("happy")}
            >
              Happy
            </button>
            <button
              className="border-2 border-blue-700 rounded p-1 bg-blue-300 hover:bg-blue-100 active:bg-blue-700 transition-all duration-250"
              onClick={() => setMood("sad")}
            >
              Sad
            </button>
            <button
              className="border-2 border-orange-700 rounded p-1 bg-orange-300 hover:bg-orange-100 active:bg-orange-700 transition-all duration-250"
              onClick={() => setMood("energetic")}
            >
              Energetic
            </button>
            <button
              className="border-2 border-green-700 rounded p-1 bg-green-300 hover:bg-green-100 active:bg-green-700 transition-all duration-250"
              onClick={() => setMood("relaxed")}
            >
              Relaxed
            </button>
            <button
              className="border-2 border-red-700 rounded p-1 bg-red-300 hover:bg-red-100 active:bg-red-700 transition-all duration-250"
              onClick={() => setMood("angry")}
            >
              Angry
            </button>
            <button
              className="border-2 border-pink-700 rounded p-1 bg-pink-300 hover:bg-pink-100 active:bg-pink-700 transition-all duration-250"
              onClick={() => setMood("romantic")}
            >
              Romantic
            </button>
            <button
              className="border-2 border-purple-700 rounded p-1 bg-purple-300 hover:bg-purple-100 active:bg-purple-700 transition-all duration-250"
              onClick={() => setMood("focused")}
            >
              Focused
            </button>
          </div>
          <div className="flex flex-row-reverse items-center gap-5 my-10">
            {bottomSongs.map((song, index) => (
              <div
                key={`bottom-${index}`}
                className={`${index % 2 === 0 ? "translate-y-0" : "translate-y-10"} fadeIn hover:scale-105 transition-all duration-300`}
                style={getAnimationDelay(index + leftSongs.length + topSongs.length + rightSongs.length)}
              >
                <SongCard
                  song={song}
                  moodColors={moodColors}
                  searchedMood={searchedMood}
                  formatDate={formatDate}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          {rightSongs.map((song, index) => (
            <div key={`right-${index}`} className="fadeIn hover:scale-105 transition-all duration-300" style={getAnimationDelay(index + leftSongs.length + topSongs.length)}>
              <SongCard
                song={song}
                moodColors={moodColors}
                searchedMood={searchedMood}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
