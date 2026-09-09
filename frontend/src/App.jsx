import { useState } from "react";

export default function App() {
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchSongs() {
    if (!mood) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/music?mood=${mood}`);
      const data = await res.json();
      setSongs(data);
    } catch (error) {
      console.log("Error fetching songs: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Moodify</h1>
      <input
        type="text"
        placeholder="Enter your mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchSongs();
          }
        }}
      />
      <button onClick={fetchSongs}>
        {loading ? "Loading..." : "Get Songs"}
      </button>

      {songs.length === 0 ? (
        <>
          <p>No songs yet - please enter a mood above!</p>
          <p>
            For instance: <span className="text-yellow-500">happy</span>,{" "}
            <span className="text-blue-500">sad</span>,{" "}
            <span className="text-orange-500">energetic</span>,{" "}
            <span className="text-green-500">relaxed</span>,{" "}
            <span className="text-red-500">angry</span>,{" "}
            <span className="text-pink-500">romantic</span>, or{" "}
            <span className="text-purple-500">focused</span>
          </p>
        </>
      ) : (
        songs.map((song, index) => {
          return (
            <div key={index}>
              <p>
                <strong>{song.name}</strong> - {song.artist}
              </p>
              <br />
              <a href={song.url} target="_blank" rel="noreferrer">
                Listen on Spotify
              </a>
            </div>
          );
        })
      )}
    </div>
  );
}
