import React from "react";
import { TMDB_IMG_URL } from "../utils/constants";

const MovieCard = ({ poster_path, onClick }) => {
  if (!poster_path) return null;

  return (
    <div
      className="w-28 md:w-36 m-1 rounded-lg border hover:border-gray-600 cursor-pointer border-gray-500 hover:opacity-50"
      onClick={onClick}
    >
      <img
        className="rounded-lg"
        src={poster_path && TMDB_IMG_URL + poster_path}
        alt="movie-card"
      />
    </div>
  );
};

export default MovieCard;
