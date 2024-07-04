import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const moviesSelector = useSelector((store) => store.movies);

  return (
    <div className="">
      <div className="bg-black -my-12 md:-my-28">
        <MovieList
          title={"Now Playing"}
          movies={moviesSelector?.nowPlayingMovies}
        />
        <MovieList title={"Top Rated"} movies={moviesSelector?.topRated} />
        <MovieList title={"Trending"} movies={moviesSelector?.trending} />
        <MovieList
          title={"Airing Today"}
          movies={moviesSelector?.airingToday}
        />
        <MovieList title={"Popular"} movies={moviesSelector?.popularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
