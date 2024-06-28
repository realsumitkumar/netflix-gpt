import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="mx-2 p-1 bg-black">
      <h1 className="text-2xl mt-2 mx-1 text-white">{title + "▶️"}</h1>
      <div className="flex overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} poster_path={movie?.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
