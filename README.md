# Moodify

A full-stack music recommendation application that recommends songs based on the user's mood using React, Node.js, and the Spotify Web API.

## Live Demo

[View the live application](https://moodify-phi-lyart.vercel.app/)

## Overview

Moodify started as a Node.js command-line application that recommends songs based on the user's current mood. The project was later expanded into a web application by connecting a React and Vite frontend to a Node.js backend.

The application maps different moods to corresponding music genres, communicates with the Spotify Web API, and retrieves recommended tracks based on the user's selection. The web application displays the recommendations through an interactive and responsive interface.

## Tech Stack

* React
* JavaScript
* Vite
* Node.js
* Spotify Web API
* Axios
* dotenv
* HTML
* CSS

## Features

* Mood-based music recommendations
* Interactive web interface
* Interactive command-line interface
* Mood-to-genre mapping
* Spotify Web API integration
* Spotify Client Credentials authentication
* Node.js backend
* React frontend
* Axios HTTP requests
* Displays recommended song titles and artists
* Provides Spotify links for recommended tracks
* Secure environment variable configuration
* Error handling for API requests
* Responsive user interface

## My Contributions

I developed this project to practice working with Node.js, React, external APIs, authentication, and full-stack application development. My contributions included:

* Developed the original Moodify command-line application using Node.js
* Implemented interactive user input using Node.js readline
* Created mood-to-genre recommendation logic
* Integrated the Spotify Web API
* Implemented Spotify Client Credentials authentication
* Used Axios to handle HTTP requests
* Configured environment variables using dotenv
* Implemented error handling for API requests
* Built the web application frontend using React and Vite
* Developed a Node.js backend to handle Spotify API requests
* Connected the React frontend with the Node.js backend
* Implemented mood-based song recommendations in the web application
* Built responsive and interactive user interfaces
* Used Git for version control and incremental development

## Getting Started

### Prerequisites

* Node.js
* npm
* Spotify Developer Account

### Installation

Clone the repository:

```bash
git clone https://github.com/agulsoy1/Moodify.git
cd Moodify
```

Install the project dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

Replace the placeholder values with your Spotify Developer credentials.

The backend uses these credentials to authenticate with the Spotify Web API through Spotify's Client Credentials flow.

Make sure `.env` is included in `.gitignore` so your credentials are not committed to GitHub.

### Running the Application

Start the Node.js backend from the `backend` directory:

```bash
node moodMusic.js
```

Then start the React/Vite frontend:

```bash
npm run dev
```

Open the local Vite development URL provided in the terminal to use Moodify.
