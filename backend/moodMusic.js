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

export default async function getSongsByMood(mood) {
  //fetches songs from Spotify based on the provided mood
  // try {
  const token = await getAccessToken(); //get the access token from Spotify using client credentials
  const genre = moodToGenre(mood); //map the provided mood to a corresponding music genre

  const response = await axios.get(
    //send a GET request to the Spotify API to search for tracks based on the genre
    `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=10`, //Spotify API endpoint to search for tracks based on the genre
    {
      headers: {
        Authorization: `Bearer ${token}`, //Authorization header for the HTTP request using the Bearer token obtained from Spotify`
      },
    },
  );
  const tracks = response.data.tracks.items.map((track) => ({
    name: track.name,
    image: track.album.images[0].url,
    artist: track.artists[0].name,
    url: track.external_urls.spotify,
    date: track.album.release_date,
  })); //extract the array of track objects from the Spotify API response

  return tracks;
}