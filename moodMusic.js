import axios from "axios";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

async function getAccessToken() {
  const response = await axios.post(
    //the post https request is a way to send data to the server and for it to respond with the requested data
    "https://accounts.spotify.com/api/token", //this is the endpoint url provided by Spotify for obtaining the access token
    "grant_type=client_credentials", //this specifies the type of authorization grant being requested, in this case, client credentials
    {
      headers: {
        //this section contains the headers for the HTTP request, including the authorization and content type
        Authorization:
          "Basic " + //Basic authorization scheme for HTTP requests
          Buffer.from(
            //Buffer used to create a base64 encoded string for the authorization header exactly as required by the Basic authorization scheme from Spotify
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString("base64"), //convert the buffer to a base64 encoded string as required by the Basic authorization scheme
        "Content-type": "application/x-www-form-urlencoded", //specifies the media type of the resource being sent to the server
      },
    },
  );
  return response.data.access_token; //return the access token obtained from the Spotify API response
}

function moodToGenre(mood) {
  //function to map a given mood to a corresponding music genre
  const mapping = {
    happy: "pop",
    sad: "blues",
    energetic: "dance",
    relaxed: "ambient",
    angry: "rock",
    romantic: "r-n-b",
    focused: "classical",
  };

  return mapping[mood.toLowerCase()] || "pop"; //return the genre corresponding to the provided mood, defaulting to "pop" if the mood is not mapped
}

async function getSongsByMood(mood) {
  //fetches songs from Spotify based on the provided mood
  try {
    const token = await getAccessToken(); //get the access token from Spotify using client credentials
    const genre = moodToGenre(mood); //map the provided mood to a corresponding music genre

    const response = await axios.get(
      //send a GET request to the Spotify API to search for tracks based on the genre
      `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=5`, //Spotify API endpoint to search for tracks based on the genre
      {
        headers: {
          Authorization: `Bearer ${token}`, //Authorization header for the HTTP request using the Bearer token obtained from Spotify`
        },
      },
    );
    const tracks = response.data.tracks.items; //extract the array of track objects from the Spotify API response

    console.log(`\nRecommended songs for mood ${mood} (${genre})\n`); //log the recommended songs for the given mood and genre

    tracks.forEach((track, i) => {
      console.log(
        `${i + 1}. ${track.name} - & ${track.artists[0].name}\n${
          track.external_urls.spotify
        }\n`,
      ); //log each recommended track with its name, artist, and Spotify URL
    });
  } catch (error) {
    console.error("\nError fetching songs by mood:\n"); //log an error message if there is an issue fetching songs from Spotify
    console.error(error.response?.data || error.message); //log the detailed error information from the Spotify API response or the error message
  }
}

// const mood = process.argv[2];
// if (!mood) {
//   console.log("\nPlease provide a mood."); //prompt the user to provide a mood as a command-line argument
//   console.log("\nFor example: node moodMusic.js happy\n"); //provide an example of how to run the script with a mood argument
// } else {
//   getSongsByMood(mood); //invoke the function to fetch and display songs based on the provided mood
// }

if (process.argv.length > 2) {
  //check if the program is run with any command-line arguments, which is not allowed
  console.error("\nError: Please run the program without any arguments\n");
  console.error("Example: node moodMusic.js\n");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin, //standard input stream for reading user input
  output: process.stdout, //standard output stream for writing user prompts and messages
});

process.stdin.setRawMode(true); //enable raw mode for the standard input to capture key presses immediately
process.stdin.on("data", (key) => {
  if (key.toString() === "\x1b") {
    //check if the pressed key is the Escape key
    console.log("\nExiting...");
    rl.close(); //close the readline interface
    process.exit(0); //exit the program gracefully
  }
});

rl.question(
  //prompt the user to enter their current mood
  "What is your current mood? (e.g., happy, sad, energetic, relaxed, angry, romantic, focused)\n",
  (mood) => {
    //callback function to handle the user's input for their current mood
    getSongsByMood(mood);
    rl.close();
  },
);
