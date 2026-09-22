const SongCard = ({ song, moodColors, searchedMood, formatDate }) => {
  return (
    <div
      className={`fadeIn transition-all duration-300 flex flex-col items-center border-2 w-[250px] max-h-[450px] gap-5
      ${
        moodColors[searchedMood] || "border-gray-500 bg-gray-300/60"
      } rounded p-4`}
    >
      <p className="w-full h-14 text-xl font-bold max-w-75 text-center overflow-hidden">
        <strong>{song.name}</strong>
      </p>
      <img src={song.image} width="200" height="200" alt={song.name} className="shrink-0"/>
      <div className="flex flex-col">
        <p>{song.artist}</p>
        <p>Release Date: {formatDate(song.date)}</p>
      </div>
      <a href={song.url} target="_blank" rel="noreferrer" className="bg-blue-800 text-white font-bold px-4 py-1 rounded-[50px] hover:bg-blue-400 active:bg-blue-900 transition-all duration-300">
        Listen on Spotify
      </a>
    </div>
  );
};

export default SongCard;
