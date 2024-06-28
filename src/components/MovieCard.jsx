import React from "react";
import { TMDB_IMG_URL } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-36 m-1 rounded-lg border hover:border-gray-600 cursor-pointer border-gray-500 hover:opacity-50">
      <img
        className="rounded-lg"
        src={poster_path && TMDB_IMG_URL + poster_path}
        alt="movie-card"
      />
    </div>
  );
};

export default MovieCard;
