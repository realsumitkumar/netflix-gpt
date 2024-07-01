import React from "react";
import { LOGIN_PAGE_BACKGROUND } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearch = () => {
  const languageSelector = useSelector((store) => store.config?.lang);

  return (
    <div>
      <div className="flex justify-center absolute w-full h-full">
        <img
          className="absolute -z-10"
          src={LOGIN_PAGE_BACKGROUND}
          alt="background"
        ></img>
        <form className="grid grid-cols-12 w-1/2 h-1/6 p-8 mt-16 text-white">
          <input
            className="col-span-9 border border-red-600 bg-gray-900 opacity-80 rounded-lg px-6 "
            type="text"
            placeholder={lang[languageSelector].gptPlaceHolder}
          ></input>
          <button className="bg-red-600 rounded-lg text-white opacity-80 col-span-3 font-semibold mx-1 p-1 text-lg">
            {lang[languageSelector].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearch;
