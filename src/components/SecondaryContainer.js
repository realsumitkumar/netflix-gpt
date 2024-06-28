import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const moviesSelector = useSelector((store) => store.movies);

  return (
    <div className="">
      <div className="bg-black -my-28">
        <MovieList
          title={"Now Playing"}
          movies={moviesSelector?.nowPlayingMovies}
        />
        <MovieList title={"Popular"} movies={moviesSelector?.popularMovies} />
        <MovieList title={"Comedy"} movies={moviesSelector?.nowPlayingMovies} />
        <MovieList title={"Drama"} movies={moviesSelector?.nowPlayingMovies} />
        <MovieList title={"Horror"} movies={moviesSelector?.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
