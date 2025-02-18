import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
import useTrending from "../hooks/useTrending";
import useAiringToday from "../hooks/useAiringToday";
import useTopRated from "../hooks/useTopRated";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  //custom hook
  useNowPlayingMovies();
  usePopularMovies();
  useTrending();
  useAiringToday();
  useTopRated();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
