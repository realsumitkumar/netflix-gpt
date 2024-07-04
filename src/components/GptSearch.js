import React, { useRef } from "react";
import { LOGIN_PAGE_BACKGROUND, MovieAPIOptions } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { addGptMoviesSearchResults } from "../utils/gptSlice";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GptSearch = () => {
  const languageSelector = useSelector((store) => store.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const tmdbMovieSearchResults = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      MovieAPIOptions
    );
    const json = await data.json();
    return json.results;
  };

  const handleButtonClick = async () => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "Act as a movie recommendation system to suggest the names of the five movies for the query" +
      searchText.current.value +
      ". Just Give comma seperated 5 names just like the example given ahead, and don't add anything extra like year or any other info, just the name . Example: Movie1,Movie2,Movie3,Movie4,Movie5";
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const moviesList = response
      .text()
      .split(",")
      .map((movie) => movie.trim()); //making array of the 5 movies got from the result and Correcting the split and trimming spaces

    const promiseMovieArray = moviesList.map((movie) =>
      tmdbMovieSearchResults(movie)
    );
    const tmdbResults = await Promise.all(promiseMovieArray);

    dispatch(
      addGptMoviesSearchResults({
        moviesList: moviesList,
        searchResults: tmdbResults,
      })
    );
  };

  return (
    <div>
      <div className="flex justify-center absolute w-full h-full">
        <img
          className="fixed -z-10 h-screen object-cover md:h-auto"
          src={LOGIN_PAGE_BACKGROUND}
          alt="background"
        ></img>
        <form
          className="grid grid-cols-12 w-full md:w-1/2 h-1/6 py-10 md:p-8 mt-16 text-white"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            className="col-span-9 border border-red-600 bg-gray-900 opacity-80 rounded-lg px-6 "
            type="text"
            placeholder={lang[languageSelector].gptPlaceHolder}
          ></input>
          <button
            onClick={handleButtonClick}
            className="bg-red-600 rounded-lg text-white opacity-80 col-span-3 font-semibold mx-1 p-1 text-lg"
          >
            {lang[languageSelector].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearch;
