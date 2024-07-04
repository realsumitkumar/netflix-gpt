import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearchCards = () => {
  const { gptMoviesName, gptSearchResults } = useSelector((store) => store.gpt);

  if (!gptMoviesName) return;

  return (
    <div className="absolute w-full my-44 opacity-85 rounded-lg text-white">
      {gptMoviesName.map((movieName, index) => (
        <MovieList
          key={gptMoviesName[index]}
          title={gptMoviesName[index]}
          movies={gptSearchResults[index]}
        />
      ))}
    </div>
  );
};

export default GptSearchCards;
