import http from "http";
import getSongsByMood from "./moodMusic.js";

// The port is the "door" our server will listen on.
const PORT = 3000;

// Create the server.
// Whenever someone sends a request to our server, this function runs.
// `req` = information about what the client is asking for.
// `res` = what we use to send a response back.
const server = http.createServer(async (req, res) => {
  // Allow our server to receive requests from other websites/apps.
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Tell the browser which types of requests our server accepts.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Tell the browser which headers can be included in requests.
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Check if the request is asking for music.
  // For example: /api/music?mood=happy
  if (req.url.startsWith("/api/music")) {
    try{
        // Get the "mood" value from the URL.
        // Example:
        // /api/music?mood=happy
        //                 ↑
        //              "happy"
        const mood = new URL(req.url, "http://localhost").searchParams.get("mood");
    
        // Ask our getSongsByMood function to find songs
        // that match the mood the user requested.
        const songs = await getSongsByMood(mood);
    
        // Tell the client that the request was successful
        // and that we're sending back JSON.
        res.writeHead(200, { "Content-Type": "application/json" });
    
        // Convert our JavaScript array/object into JSON
        // and send it back to whoever made the request.
        return res.end(JSON.stringify(songs));
    } catch (error) {
        console.error("ERROR: ", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: error.message }));
    }
  }

  // If the URL didn't match /api/music, the route doesn't exist.
  res.writeHead(404);

  // Tell the client that we couldn't find the requested route.
  res.end("Not Found");
});

// Start the server on port 3000.
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
