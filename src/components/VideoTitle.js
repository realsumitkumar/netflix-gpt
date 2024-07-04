import React from "react";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video bg-gradient-to-r to-black">
      <div className="mt-32 md:mt-48 md:mx-24 mx-2">
        <h1 className="font-bold text-white text-sm md:text-3xl md:my-2">
          {title}
        </h1>
        <p className="hidden md:inline-block w-1/3 text-md  text-white ">
          {overview}
        </p>
      </div>
      <div>
        <button className="border bg-white font-bold text-sm md:text-xl rounded-md md:rounded-lg md:w-28 md:p-1 p-[1px] md:ml-24 ml-2 mr-8 hover:bg-opacity-50">
          ▶️Play
        </button>
        <button className="hidden md:inline-block border bg-gray-200 bg-opacity-20 font-bold text-xl rounded-lg p-1 w-28 hover:bg-opacity-50">
          Infoℹ️
        </button>
      </div>
    </div>
  );
};
