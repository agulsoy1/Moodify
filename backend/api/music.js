import getSongsByMood from "./moodMusic.js";

export default async function handler(req, res) {
  try {
    const mood = req.query.mood;

    const songs = await getSongsByMood(mood);

    res.status(200).json(songs);
  } catch (error) {
    console.error("ERROR", error);
    res.status(500).json({ error: error.message });
  }
}
